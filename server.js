const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) console.error(err.message);
    else console.log('Connected to database');
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
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
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

// Settings
app.get('/api/settings', (req, res) => {
    db.all('SELECT key, value FROM settings', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const settings = {};
        rows.forEach(row => { settings[row.key] = row.value; });
        res.json(settings);
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
