// App State - Initialize language from browser or saved preference
const state = {
    currentView: 'home',
    language: typeof initLanguage === 'function' ? initLanguage() : (localStorage.getItem('selectedLanguage') || 'en'),
    selectedSeats: [],
    currentMatch: null,
    adminToken: localStorage.getItem('admin_token') || null,
    sessionId: localStorage.getItem('session_id') || generateSessionId(),
    paymentLink: null
};

// Generate session ID
function generateSessionId() {
    const sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + Date.now();
    localStorage.setItem('session_id', sessionId);
    return sessionId;
}

// API Base URL
const API_URL = '/api';

// Translations are now loaded from js/languages.js

// Helper Functions
function t(key) {
    // Use translations from languages.js if available, otherwise use fallback
    const translationsObj = window.translations || {};
    const lang = state.language || 'en';
    return translationsObj[lang]?.[key] || translationsObj['en']?.[key] || key;
}

function setLanguage(lang) {
    // Update state
    state.language = lang;
    localStorage.setItem('selectedLanguage', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Re-render current view
    if (state.currentView === 'home') renderHome();
    else if (state.currentView === 'matches') renderMatches();
    else if (state.currentView === 'match-detail') renderMatchDetail();
    else if (state.currentView === 'checkout') renderCheckout();
}

// Initialize direction based on language
document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = state.language;

// Refresh current view
function render() {
    navigate(state.currentView);
}

function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString(state.language === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// API Functions
async function fetchAPI(endpoint, options = {}) {
    try {
        const fetchOptions = {
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {})
            }
        };
        
        if (options.body) {
            fetchOptions.body = options.body;
        }
        
        console.log('fetchAPI request:', endpoint, fetchOptions);
        const response = await fetch(`${API_URL}${endpoint}`, fetchOptions);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Track visitor
async function trackVisitor(matchId) {
    try {
        await fetchAPI('/visitors', {
            method: 'POST',
            body: JSON.stringify({ sessionId: state.sessionId, matchId })
        });
    } catch (error) {
        console.error('Failed to track visitor:', error);
    }
}

// Update visitor order status
async function updateVisitorOrderStatus(completed) {
    try {
        await fetchAPI(`/visitors/${state.sessionId}`, {
            method: 'PATCH',
            body: JSON.stringify({ completedOrder: completed })
        });
    } catch (error) {
        console.error('Failed to update visitor:', error);
    }
}

// Get payment link
async function getPaymentLink() {
    try {
        const settings = await fetchAPI('/settings');
        state.paymentLink = settings.payment_link || 'https://paymath.com';
        return state.paymentLink;
    } catch (error) {
        console.error('Failed to get payment link:', error);
        return 'https://paymath.com';
    }
}

// Render Functions
function renderHeader() {
    const langLabels = { es: 'ES', en: 'EN', ar: 'عربي' };
    const currentLang = state.language || 'en';
    const otherLangs = Object.keys(langLabels).filter(l => l !== currentLang);
    
    return `
        <header>
            <div class="container header-content">
                <a href="#" class="logo" onclick="navigate('home'); return false;">⚽ ${t('title')}</a>
                <nav class="nav-links">
                    <a href="#" onclick="navigate('home'); return false;">${t('home')}</a>
                    <a href="#" onclick="navigate('matches'); return false;">${t('matches')}</a>
                    <div class="language-selector">
                        <button id="lang-btn" onclick="toggleLanguageDropdown()" style="background: var(--primary); color: var(--bg-dark); border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                            <span>🌐</span>
                            <span>${langLabels[currentLang]}</span>
                            <span style="font-size: 0.7em;">▼</span>
                        </button>
                        <div id="lang-dropdown" class="lang-dropdown" style="display: none; position: absolute; background: var(--bg-card); border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); overflow: hidden; z-index: 1000; min-width: 120px;">
                            ${otherLangs.map(lang => `
                                <button onclick="setLanguage('${lang}')" style="width: 100%; padding: 12px 16px; border: none; background: none; cursor: pointer; text-align: ${lang === 'ar' ? 'right' : 'left'}; font-size: 0.9rem;">
                                    ${langLabels[lang]} - ${lang === 'es' ? 'Español' : lang === 'ar' ? 'العربية' : 'English'}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    `;
}

// Toggle language dropdown
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-selector')) {
        const dropdown = document.getElementById('lang-dropdown');
        if (dropdown) dropdown.style.display = 'none';
    }
});

async function renderHome() {
    const app = document.getElementById('app');
    app.innerHTML = `
        ${renderHeader()}
        <main>
            <section class="hero">
                <div class="container">
                    <h1>${t('title')}</h1>
                    <p>${t('subtitle')}</p>
                    <button class="cta-button" onclick="navigate('matches')">${t('viewMatches')}</button>
                </div>
            </section>
            <section class="matches-section">
                <div class="container">
                    <h2 class="section-title">${t('featuredMatches')}</h2>
                    <div id="featured-matches" class="matches-grid">
                        <div class="loading">
                            <div class="loading-spinner"></div>
                            <p>${t('loading')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    `;
    
    try {
        const matches = await fetchAPI('/stats/featured-matches');
        const container = document.getElementById('featured-matches');
        container.innerHTML = matches.map(match => renderMatchCard(match)).join('');
    } catch (error) {
        document.getElementById('featured-matches').innerHTML = `<div class="error">${t('error')}</div>`;
    }
}

async function renderMatches() {
    const app = document.getElementById('app');
    app.innerHTML = `
        ${renderHeader()}
        <main>
            <section class="matches-section">
                <div class="container">
                    <h2 class="section-title">${t('matches')}</h2>
                    <div id="matches-list" class="matches-grid">
                        <div class="loading">
                            <div class="loading-spinner"></div>
                            <p>${t('loading')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    `;
    
    try {
        const matches = await fetchAPI('/matches');
        const container = document.getElementById('matches-list');
        container.innerHTML = matches.map(match => renderMatchCard(match)).join('');
    } catch (error) {
        document.getElementById('matches-list').innerHTML = `<div class="error">${t('error')}</div>`;
    }
}

function renderMatchCard(match) {
    const homeTeam = state.language === 'ar' ? match.home_team_ar : match.home_team;
    const awayTeam = state.language === 'ar' ? match.away_team_ar : match.away_team;
    const stadium = state.language === 'ar' ? match.stadium_ar : match.stadium;
    const city = state.language === 'ar' ? match.city_ar : match.city;
    const stage = state.language === 'ar' ? match.stage_ar : match.stage;
    
    return `
        <div class="match-card" onclick="navigate('seat-picker', ${match.id})">
            <div class="match-header">
                <span class="match-stage">${stage}</span>
                <span class="match-date">${formatDate(match.match_date)}</span>
            </div>
            <div class="teams">
                <div class="team">
                    ${match.home_team_flag ? `<img src="${match.home_team_flag}" alt="${homeTeam}" class="team-flag" />` : '<span class="team-flag">🏠</span>'}
                    <div class="team-name">${homeTeam}</div>
                </div>
                <div class="vs">VS</div>
                <div class="team">
                    ${match.away_team_flag ? `<img src="${match.away_team_flag}" alt="${awayTeam}" class="team-flag" />` : '<span class="team-flag">✈️</span>'}
                    <div class="team-name">${awayTeam}</div>
                </div>
            </div>
            <div class="match-info">
                <span>🏟️ ${stadium}, ${city}</span>
                <span class="match-price">${formatPrice(match.min_price)}</span>
            </div>
            <button class="cta-button" style="margin-top: 15px; width: 100%;">${t('selectSeats')}</button>
        </div>
    `;
}

async function renderMatch(matchId) {
    const app = document.getElementById('app');
    app.innerHTML = `
        ${renderHeader()}
        <main>
            <section class="matches-section">
                <div class="container">
                    <div id="match-detail">
                        <div class="loading">
                            <div class="loading-spinner"></div>
                            <p>${t('loading')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    `;
    
    try {
        const match = await fetchAPI(`/matches/${matchId}`);
        const tickets = await fetchAPI(`/matches/${matchId}/tickets`);
        state.currentMatch = match;
        
        // Track visitor
        trackVisitor(matchId);
        
        const homeTeam = state.language === 'ar' ? match.home_team_ar : match.home_team;
        const awayTeam = state.language === 'ar' ? match.away_team_ar : match.away_team;
        const stadium = state.language === 'ar' ? match.stadium_ar : match.stadium;
        const city = state.language === 'ar' ? match.city_ar : match.city;
        const stage = state.language === 'ar' ? match.stage_ar : match.stage;
        
        const container = document.getElementById('match-detail');
        container.innerHTML = `
            <button onclick="navigate('matches')" style="background: none; border: none; color: var(--primary); cursor: pointer; margin-bottom: 20px;">← ${t('matches')}</button>
            <div class="match-card" style="margin-bottom: 30px;">
                <div class="match-header">
                    <span class="match-stage">${stage}</span>
                    <span class="match-date">${formatDate(match.match_date)}</span>
                </div>
                <div class="teams">
                    <div class="team">
                        ${match.home_team_flag ? `<img src="${match.home_team_flag}" alt="${homeTeam}" class="team-flag" />` : '<span class="team-flag">🏠</span>'}
                        <div class="team-name">${homeTeam}</div>
                    </div>
                    <div class="vs">VS</div>
                    <div class="team">
                        ${match.away_team_flag ? `<img src="${match.away_team_flag}" alt="${awayTeam}" class="team-flag" />` : '<span class="team-flag">✈️</span>'}
                        <div class="team-name">${awayTeam}</div>
                    </div>
                </div>
                <div class="match-info">
                    <span>🏟️ ${stadium}, ${city}</span>
                    <span class="match-price">${formatPrice(match.min_price)}</span>
                </div>
            </div>
            
            <h2 class="section-title">${t('selectSeats')}</h2>
            <div class="stadium-container">
                <div class="stadium-field">
                    <div class="field-label">PITCH</div>
                </div>
                <div class="stadium-seats">
                    ${tickets.map(ticket => `
                        <div class="modern-seat ${ticket.status === 'unavailable_by_percentage' ? 'reserved' : ticket.status} ${ticket.category}" 
                             onclick="toggleSeat(${ticket.id}, '${ticket.status === 'unavailable_by_percentage' ? 'reserved' : ticket.status}', ${ticket.price})"
                             data-seat-id="${ticket.id}"
                             data-seat-price="${ticket.price}"
                             data-category="${ticket.category}"
                             title="${ticket.category} - ${ticket.section} ${ticket.row} - ${formatPrice(ticket.price)}">
                            <span class="seat-number">${ticket.seat_number}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="seat-legend">
                <div class="legend-item">
                    <div class="legend-color" style="background: var(--success);"></div>
                    <span>${t('available')}</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: var(--warning);"></div>
                    <span>${t('reserved')}</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: var(--danger);"></div>
                    <span>${t('sold')}</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: var(--primary);"></div>
                    <span>${t('selected')}</span>
                </div>
            </div>
            <div class="category-legend">
                <div class="category-item">
                    <div class="category-color VIP"></div>
                    <span>VIP</span>
                </div>
                <div class="category-item">
                    <div class="category-color Premium"></div>
                    <span>Premium</span>
                </div>
                <div class="category-item">
                    <div class="category-color Standard"></div>
                    <span>Standard</span>
                </div>
                <div class="category-item">
                    <div class="category-color Economy"></div>
                    <span>Economy</span>
                </div>
            </div>
            
            <div id="selected-seats-summary" style="margin-top: 30px; padding: 20px; background: var(--bg-card); border-radius: 8px; border: 1px solid var(--border);">
                <h3>${t('selected')}: <span id="selected-count">0</span> ${state.language === 'ar' ? 'مقعد' : 'seats'}</h3>
                <p>${t('price')}: <span id="selected-price">$0.00</span></p>
                <div id="max-seats-msg" style="display: none; color: #ff9800; font-size: 12px; margin: 8px 0;">
                    ${state.language === 'ar' ? `الحد الأقصى ${MAX_SEATS} مقاعد` : `Maximum ${MAX_SEATS} seats`}
                </div>
                <button id="checkout-btn" class="cta-button" onclick="navigate('checkout')" style="margin-top: 15px;" disabled>${t('checkout')}</button>
            </div>
        `;
    } catch (error) {
        document.getElementById('match-detail').innerHTML = `<div class="error">${t('error')}</div>`;
    }
}

const MAX_SEATS = 6;

function toggleSeat(seatId, status, price) {
    if (status !== 'available') return;
    
    const seatEl = document.querySelector(`[data-seat-id="${seatId}"]`);
    const index = state.selectedSeats.findIndex(s => s.id === seatId);
    
    if (index > -1) {
        // Remove seat if already selected
        state.selectedSeats.splice(index, 1);
        if (seatEl) seatEl.classList.remove('selected');
    } else {
        // Check max seats limit
        if (state.selectedSeats.length >= MAX_SEATS) {
            const msg = state.language === 'ar' 
                ? `يمكنك اختيار ${MAX_SEATS} مقاعد كحد أقصى` 
                : `You can select up to ${MAX_SEATS} seats maximum`;
            alert(msg);
            return;
        }
        // Add new seat
        state.selectedSeats.push({ id: seatId, price });
        if (seatEl) seatEl.classList.add('selected');
    }
    
    // Update summary
    updateSeatsSummary();
}

function updateSeatsSummary() {
    const countEl = document.getElementById('selected-count');
    const priceEl = document.getElementById('selected-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    const maxSeatsMsg = document.getElementById('max-seats-msg');
    const mobileCountEl = document.getElementById('mobile-seat-count');
    const mobileMaxMsg = document.getElementById('mobile-max-msg');
    const mobilePriceEl = document.getElementById('mobile-seat-total');
    
    // Update desktop summary
    if (countEl) {
        countEl.textContent = state.selectedSeats.length;
    }
    
    if (priceEl) {
        priceEl.textContent = formatPrice(state.selectedSeats.reduce((sum, s) => sum + s.price, 0));
    }
    
    if (checkoutBtn) {
        checkoutBtn.disabled = state.selectedSeats.length === 0;
    }
    
    // Show max seats warning on desktop
    if (maxSeatsMsg) {
        if (state.selectedSeats.length >= MAX_SEATS) {
            maxSeatsMsg.style.display = 'block';
        } else {
            maxSeatsMsg.style.display = 'none';
        }
    }
    
    // Update mobile summary
    if (mobileCountEl) {
        mobileCountEl.textContent = state.selectedSeats.length;
    }
    
    if (mobilePriceEl) {
        mobilePriceEl.textContent = '$' + state.selectedSeats.reduce((sum, s) => sum + (s.price || 0), 0).toFixed(2);
    }
    
    // Show max seats warning on mobile
    if (mobileMaxMsg) {
        if (state.selectedSeats.length >= MAX_SEATS) {
            mobileMaxMsg.style.display = 'inline';
        } else {
            mobileMaxMsg.style.display = 'none';
        }
    }
}

async function renderCheckout() {
    const app = document.getElementById('app');
    const totalPrice = state.selectedSeats.reduce((sum, s) => sum + s.price, 0);
    const paymentLink = await getPaymentLink();
    
    app.innerHTML = `
        ${renderHeader()}
        <main>
            <section class="checkout-section">
                <div class="container checkout-container-mobile">
                    <!-- Match Info Card -->
                    <div class="checkout-match-card">
                        <h3>${state.currentMatch ? (state.language === 'ar' ? state.currentMatch.home_team_ar : state.currentMatch.home_team) : ''} vs ${state.currentMatch ? (state.language === 'ar' ? state.currentMatch.away_team_ar : state.currentMatch.away_team) : ''}</h3>
                        <p>${formatDate(state.currentMatch?.match_date)}</p>
                        <div class="checkout-summary">
                            <span class="seats-count">${state.selectedSeats.length} ${state.language === 'ar' ? 'مقاعد' : 'seats'}</span>
                            <span class="total-price">${formatPrice(totalPrice)}</span>
                        </div>
                    </div>
                    
                    <!-- Form -->
                    <div class="checkout-form-mobile">
                        <h2>${t('enterDetails')}</h2>
                        
                        <div class="form-group-mobile">
                            <label>${t('name')} *</label>
                            <input type="text" id="customerName" required placeholder="${state.language === 'ar' ? 'اسمك الكامل' : 'Your full name'}">
                        </div>
                        
                        <div class="form-group-mobile">
                            <label>${t('whatsapp')} *</label>
                            <input type="tel" id="phone" required placeholder="${state.language === 'ar' ? 'رقم الواتساب مع رمز الدولة' : 'WhatsApp with country code'}">
                        </div>
                        
                        <div class="form-group-mobile">
                            <label>${t('email')} *</label>
                            <input type="email" id="email" required placeholder="${state.language === 'ar' ? 'بريدك الإلكتروني' : 'Email address'}">
                        </div>
                        
                        <button onclick="proceedToPayment()" class="submit-btn-mobile">
                            ${t('payNow')} ${formatPrice(totalPrice)}
                        </button>
                    </div>
                </div>
            </section>
        </main>
    `;
}

async function proceedToPayment() {
    const customerName = document.getElementById('customerName')?.value;
    const phone = document.getElementById('phone')?.value;
    const email = document.getElementById('email')?.value;
    
    if (!customerName || !phone || !email) {
        alert(state.language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
        return;
    }
    
    const orderData = {
        customerName,
        phone,
        email,
        country: 'Not specified',
        notes: '',
        matchId: state.currentMatch?.id,
        selectedSeats: state.selectedSeats.map(s => s.id).join(','),
        totalPrice: state.selectedSeats.reduce((sum, s) => sum + s.price, 0)
    };
    
    try {
        // Save order
        await fetchAPI('/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
        
        
        // Update visitor order status
        updateVisitorOrderStatus(true);
        
        // Get payment link and redirect
        const paymentLink = await getPaymentLink();
        window.open(paymentLink, '_blank');
        
        state.selectedSeats = [];
        state.currentMatch = null;
        
        const app = document.getElementById('app');
        app.innerHTML = `
            ${renderHeader()}
            <main>
                <section class="matches-section">
                    <div class="container">
                        <div class="success">
                            <h2>${t('orderSuccess')}</h2>
                            <p>${state.language === 'ar' ? 'تم توجيهك إلى صفحة الدفع' : 'You have been redirected to the payment page'}</p>
                        </div>
                        <button class="cta-button" onclick="navigate('home')" style="margin-top: 20px;">${t('home')}</button>
                    </div>
                </section>
            </main>
        `;
    } catch (error) {
        alert(state.language === 'ar' ? 'حدث خطأ: ' + error.message : 'Error: ' + error.message);
    }
}

function renderAdminLogin() {
    const app = document.getElementById('app');
    app.innerHTML = `
        ${renderHeader()}
        <main>
            <section class="matches-section">
                <div class="container">
                    <h2 class="section-title">${t('login')}</h2>
                    <div class="form-container">
                        <form onsubmit="adminLogin(event)">
                            <div class="form-group">
                                <label>${t('login')}</label>
                                <input type="text" name="username" required>
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" name="password" required>
                            </div>
                            <button type="submit" class="submit-button">${t('login')}</button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    `;
}

async function adminLogin(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    try {
        const response = await fetchAPI('/admin/login', {
            method: 'POST',
            body: JSON.stringify({
                username: formData.get('username'),
                password: formData.get('password')
            })
        });
        
        state.adminToken = response.token;
        localStorage.setItem('admin_token', response.token);
        navigate('admin');
    } catch (error) {
        alert('Invalid credentials');
    }
}

function logout() {
    state.adminToken = null;
    localStorage.removeItem('admin_token');
    navigate('home');
}

async function renderAdmin() {
    if (!state.adminToken) {
        navigate('admin-login');
        return;
    }
    
    const app = document.getElementById('app');
    app.innerHTML = `
        ${renderHeader()}
        <main>
            <section class="matches-section">
                <div class="container">
                    <h2 class="section-title">${t('adminPanel')}</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
                        <div class="match-card" onclick="navigate('admin-dashboard')" style="text-align: center; cursor: pointer;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">📊</div>
                            <h3>${t('dashboard')}</h3>
                        </div>
                        <div class="match-card" onclick="navigate('admin-matches')" style="text-align: center; cursor: pointer;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">⚽</div>
                            <h3>${t('manageMatches')}</h3>
                        </div>
                        <div class="match-card" onclick="navigate('admin-orders')" style="text-align: center; cursor: pointer;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">🎫</div>
                            <h3>${t('manageOrders')}</h3>
                        </div>
                        <div class="match-card" onclick="navigate('admin-visitors')" style="text-align: center; cursor: pointer;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">👥</div>
                            <h3>${t('manageVisitors')}</h3>
                        </div>
                        <div class="match-card" onclick="navigate('admin-settings')" style="text-align: center; cursor: pointer;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">⚙️</div>
                            <h3>${t('manageSettings')}</h3>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    `;
}

async function renderAdminDashboard() {
    if (!state.adminToken) {
        navigate('admin-login');
        return;
    }

    const app = document.getElementById('app');
    app.innerHTML = `
        ${renderHeader()}
        <main>
            <section class="matches-section">
                <div class="container">
                    <button onclick="navigate('admin')" style="background: none; border: none; color: var(--primary); cursor: pointer; margin-bottom: 20px;">← ${t('adminPanel')}</button>
                    <h2 class="section-title">${t('dashboard')}</h2>
                    <div id="stats-container">
                        <div class="loading">
                            <div class="loading-spinner"></div>
                            <p>${t('loading')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    `;
    
    try {
        const stats = await fetchAPI('/stats/summary');
        const container = document.getElementById('stats-container');
        container.innerHTML = `
            <div class="matches-grid">
                <div class="match-card">
                    <h3>${t('totalMatches')}</h3>
                    <p style="font-size: 2rem; color: var(--primary);">${stats.totalMatches}</p>
                </div>
                <div class="match-card">
                    <h3>${t('totalOrders')}</h3>
                    <p style="font-size: 2rem; color: var(--primary);">${stats.totalOrders}</p>
                </div>
                <div class="match-card">
                    <h3>${t('totalRevenue')}</h3>
                    <p style="font-size: 2rem; color: var(--primary);">${formatPrice(stats.totalRevenue)}</p>
                </div>
                <div class="match-card">
                    <h3>${t('available')}</h3>
                    <p style="font-size: 2rem; color: var(--success);">${stats.availableTickets}</p>
                </div>
            </div>
        `;
    } catch (error) {
        document.getElementById('stats-container').innerHTML = `<div class="error">${t('error')}</div>`;
    }
}

async function renderAdminMatches() {
    if (!state.adminToken) {
        navigate('admin-login');
        return;
    }

    const app = document.getElementById('app');
    app.innerHTML = `
        ${renderHeader()}
        <main>
            <section class="matches-section">
                <div class="container">
                    <button onclick="navigate('admin')" style="background: none; border: none; color: var(--primary); cursor: pointer; margin-bottom: 20px;">← ${t('adminPanel')}</button>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h2 class="section-title" style="margin: 0;">${t('manageMatches')}</h2>
                        <button class="cta-button" onclick="navigate('admin-add-match')">${t('addMatch')}</button>
                    </div>
                    <div id="matches-list">
                        <div class="loading">
                            <div class="loading-spinner"></div>
                            <p>${t('loading')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    `;
    
    try {
        const matches = await fetchAPI('/matches');
        const container = document.getElementById('matches-list');
        container.innerHTML = `
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: var(--bg-card-hover);">
                        <th style="padding: 15px; text-align: center; border-bottom: 1px solid var(--border);">${t('matchOrder')}</th>
                        <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--border);">ID</th>
                        <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--border);">${t('homeTeam')}</th>
                        <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--border);">${t('awayTeam')}</th>
                        <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--border);">${t('stadiumSelection')}</th>
                        <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--border);">${t('matchDate')}</th>
                        <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--border);">${t('price')}</th>
                        <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--border);">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${matches.map((match, index) => {
                        const stadiumName = state.language === 'ar' ? (match.stadium_ar || match.stadium) : match.stadium;
                        return `
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 10px; text-align: center;">
                                <div style="display: flex; flex-direction: column; gap: 5px; align-items: center;">
                                    <button onclick="reorderMatch(${match.id}, 'up')" ${index === 0 ? 'disabled' : ''} 
                                            style="padding: 5px 10px; background: var(--primary); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                                        ▲ ${t('moveUp')}
                                    </button>
                                    <span style="background: var(--bg-dark); color: white; padding: 5px 10px; border-radius: 4px; font-weight: bold; font-size: 12px;">
                                        ${match.sort_order || index + 1}
                                    </span>
                                    <button onclick="reorderMatch(${match.id}, 'down')" ${index === matches.length - 1 ? 'disabled' : ''} 
                                            style="padding: 5px 10px; background: var(--secondary); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                                        ▼ ${t('moveDown')}
                                    </button>
                                </div>
                            </td>
                            <td style="padding: 15px;">${match.id}</td>
                            <td style="padding: 15px;">${match.home_team_flag ? `<img src="${match.home_team_flag}" alt="${match.home_team}" style="width:30px; height:20px; object-fit:contain; vertical-align:middle; margin-right:5px;" />` : ''}${match.home_team}</td>
                            <td style="padding: 15px;">${match.away_team_flag ? `<img src="${match.away_team_flag}" alt="${match.away_team}" style="width:30px; height:20px; object-fit:contain; vertical-align:middle; margin-right:5px;" />` : ''}${match.away_team}</td>
                            <td style="padding: 15px;">${stadiumName}</td>
                            <td style="padding: 15px;">${formatDate(match.match_date)}</td>
                            <td style="padding: 15px;">${formatPrice(match.min_price)}</td>
                            <td style="padding: 15px;">
                                <button onclick="editMatch(${match.id})" style="background: var(--primary); color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-bottom: 5px; display: block;">${t('edit')}</button>
                                <button onclick="duplicateMatch(${match.id})" style="background: var(--warning); color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-bottom: 5px; display: block;">${t('duplicate')}</button>
                                <button onclick="deleteMatch(${match.id})" style="background: var(--danger); color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">${t('delete')}</button>
                            </td>
                        </tr>
                    `}).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        document.getElementById('matches-list').innerHTML = `<div class="error">${t('error')}</div>`;
    }
}

async function reorderMatch(matchId, direction) {
    try {
        const result = await fetchAPI(`/matches/${matchId}/reorder`, {
            method: 'POST',
            body: JSON.stringify({ direction })
        });
        // Re-render the matches list to show new order
        renderAdminMatches();
    } catch (error) {
        console.error('Reorder error:', error);
        alert(state.language === 'ar' ? 'فشل في تغيير الترتيب' : 'Failed to reorder match');
    }
}

async function deleteMatch(matchId) {
    if (!confirm(state.language === 'ar' ? 'هل أنت متأكد من حذف هذه المباراة؟' : 'Are you sure you want to delete this match?')) return;
    
    try {
        await fetchAPI(`/matches/${matchId}`, { method: 'DELETE' });
        renderAdminMatches();
    } catch (error) {
        alert(t('error'));
    }
}

async function duplicateMatch(matchId) {
    try {
        const match = await fetchAPI(`/matches/${matchId}`);
        const newMatch = {
            homeTeam: match.home_team,
            awayTeam: match.away_team,
            homeTeamAr: match.home_team_ar,
            awayTeamAr: match.away_team_ar,
            homeTeamFlag: match.home_team_flag,
            awayTeamFlag: match.away_team_flag,
            stadium: match.stadium,
            stadiumAr: match.stadium_ar,
            city: match.city,
            cityAr: match.city_ar,
            matchDate: match.match_date,
            image: match.image,
            description: match.description,
            descriptionAr: match.description_ar,
            stage: match.stage,
            stageAr: match.stage_ar,
            minPrice: match.min_price,
            isActive: match.is_active,
            availablePercentage: match.available_percentage
        };
        
        await fetchAPI('/matches', {
            method: 'POST',
            body: JSON.stringify(newMatch)
        });
        
        renderAdminMatches();
    } catch (error) {
        alert(t('error'));
    }
}

async function renderAdminAddMatch() {
    if (!state.adminToken) {
        navigate('admin-login');
        return;
    }

    const app = document.getElementById('app');
    app.innerHTML = `
        ${renderHeader()}
        <main>
            <section class="matches-section" style="background: var(--bg-primary); min-height: 100vh;">
                <div class="container">
                    <button onclick="navigate('admin-matches')" style="background: none; border: none; color: var(--primary); cursor: pointer; margin-bottom: 20px;">← ${t('manageMatches')}</button>
                    <h2 class="section-title">${t('addMatch')}</h2>
                    <div id="stadium-selector-loading" style="text-align: center; padding: 20px;">
                        <div class="loading-spinner"></div>
                    </div>
                    <form id="add-match-form" class="form-container" style="display: none;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div class="form-group">
                                <label>${t('homeTeam')} (EN)</label>
                                <input type="text" name="homeTeam" id="add_home_team_input" required oninput="autoUpdateFlagFromAdd(this, 'add_home_team_flag_preview', 'add_home_team_flag_value'); updateAddFlagStatus('home')">
                            </div>
                            <div class="form-group">
                                <label>${t('homeTeam')} (AR)</label>
                                <input type="text" name="homeTeamAr" required>
                            </div>
                            <div class="form-group">
                                <label>${t('awayTeam')} (EN)</label>
                                <input type="text" name="awayTeam" id="add_away_team_input" required oninput="autoUpdateFlagFromAdd(this, 'add_away_team_flag_preview', 'add_away_team_flag_value'); updateAddFlagStatus('away')">
                            </div>
                            <div class="form-group">
                                <label>${t('awayTeam')} (AR)</label>
                                <input type="text" name="awayTeamAr" required>
                            </div>
                            <div class="form-group">
                                <label>${t('homeTeam')} Flag (Auto-detected)</label>
                                <div style="display: flex; align-items: center; gap: 15px;">
                                    <img id="add_home_team_flag_preview" src="" style="width: 50px; height: 35px; object-fit: contain; border: 1px solid #ddd; border-radius: 4px; display: none;">
                                    <input type="hidden" name="homeTeamFlag" id="add_home_team_flag_value" value="">
                                    <span id="add_home_flag_status" style="color: var(--text-secondary); font-size: 0.9rem;">Enter team name to auto-detect flag</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>${t('awayTeam')} Flag (Auto-detected)</label>
                                <div style="display: flex; align-items: center; gap: 15px;">
                                    <img id="add_away_team_flag_preview" src="" style="width: 50px; height: 35px; object-fit: contain; border: 1px solid #ddd; border-radius: 4px; display: none;">
                                    <input type="hidden" name="awayTeamFlag" id="add_away_team_flag_value" value="">
                                    <span id="add_away_flag_status" style="color: var(--text-secondary); font-size: 0.9rem;">Enter team name to auto-detect flag</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>${t('stadiumSelection')} *</label>
                                <select name="stadiumId" id="stadium-select" required onchange="updateStadiumFields(this.value)" style="padding: 10px; border: 1px solid var(--border); border-radius: 4px; width: 100%;">
                                    <option value="">${t('selectStadium')}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>${t('stadium')} (EN)</label>
                                <input type="text" name="stadium" id="stadium-en" required>
                            </div>
                            <div class="form-group">
                                <label>${t('stadium')} (AR)</label>
                                <input type="text" name="stadiumAr" id="stadium-ar" required>
                            </div>
                            <div class="form-group">
                                <label>${t('city')} (EN)</label>
                                <input type="text" name="city" id="city-en" required>
                            </div>
                            <div class="form-group">
                                <label>${t('city')} (AR)</label>
                                <input type="text" name="cityAr" id="city-ar" required>
                            </div>
                            <div class="form-group">
                                <label>${t('matchDate')}</label>
                                <input type="datetime-local" name="matchDate" required>
                            </div>
                            <div class="form-group">
                                <label>${t('stage')} (EN)</label>
                                <input type="text" name="stage" placeholder="Group Stage" required>
                            </div>
                            <div class="form-group">
                                <label>${t('stage')} (AR)</label>
                                <input type="text" name="stageAr" placeholder="مرحلة المجموعات" required>
                            </div>
                            <div class="form-group">
                                <label>${t('minPrice')} ($)</label>
                                <input type="number" name="minPrice" step="0.01" value="100" required>
                            </div>
                            <div class="form-group">
                                <label>${t('availablePercentage')} (%)</label>
                                <input type="number" name="availablePercentage" value="100" min="0" max="100">
                            </div>
                        </div>
                        <div class="form-group" style="margin-top: 20px;">
                            <label>Image URL</label>
                            <input type="url" name="image" placeholder="https://example.com/image.jpg">
                        </div>
                        <div class="form-group">
                            <label>Description (EN)</label>
                            <textarea name="description" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label>Description (AR)</label>
                            <textarea name="descriptionAr" rows="3"></textarea>
                        </div>
                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <button type="submit" class="submit-button">${t('save')}</button>
                            <button type="button" onclick="navigate('admin-matches')" class="submit-button" style="background: var(--danger);">${t('cancel')}</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    `;

    // Load stadiums
    loadStadiumsForForm();

    document.getElementById('add-match-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        
        // Sanitize flag URLs
        const homeFlag = sanitizeFlagUrl(formData.get('homeTeamFlag'));
        const awayFlag = sanitizeFlagUrl(formData.get('awayTeamFlag'));
        
        const matchData = {
            homeTeam: formData.get('homeTeam'),
            homeTeamAr: formData.get('homeTeamAr'),
            awayTeam: formData.get('awayTeam'),
            awayTeamAr: formData.get('awayTeamAr'),
            homeTeamFlag: homeFlag,
            awayTeamFlag: awayFlag,
            stadiumId: parseInt(formData.get('stadiumId')) || 1,
            stadium: formData.get('stadium'),
            stadiumAr: formData.get('stadiumAr'),
            city: formData.get('city'),
            cityAr: formData.get('cityAr'),
            matchDate: formData.get('matchDate'),
            stage: formData.get('stage'),
            stageAr: formData.get('stageAr'),
            minPrice: parseFloat(formData.get('minPrice')),
            availablePercentage: parseInt(formData.get('availablePercentage')) || 100,
            image: formData.get('image') || '',
            description: formData.get('description') || '',
            descriptionAr: formData.get('descriptionAr') || '',
            isActive: 1
        };

        try {
            await fetchAPI('/matches', {
                method: 'POST',
                body: JSON.stringify(matchData)
            });
            navigate('admin-matches');
        } catch (error) {
            alert(t('error'));
        }
    });
}

let stadiumsData = [];

async function loadStadiumsForForm() {
    try {
        stadiumsData = await fetchAPI('/stadiums');
        const select = document.getElementById('stadium-select');
        
        stadiumsData.forEach(stadium => {
            const option = document.createElement('option');
            option.value = stadium.id;
            option.textContent = `${stadium.name} - ${stadium.city} (${stadium.capacity.toLocaleString()} seats)`;
            select.appendChild(option);
        });
        
        document.getElementById('stadium-selector-loading').style.display = 'none';
        document.getElementById('add-match-form').style.display = 'block';
    } catch (error) {
        document.getElementById('stadium-selector-loading').innerHTML = '<div class="error">Failed to load stadiums</div>';
    }
}

function updateStadiumFields(stadiumId) {
    if (!stadiumId) return;
    
    const stadium = stadiumsData.find(s => s.id === parseInt(stadiumId));
    if (stadium) {
        document.getElementById('stadium-en').value = stadium.name;
        document.getElementById('stadium-ar').value = stadium.nameAr;
        document.getElementById('city-en').value = stadium.city;
        document.getElementById('city-ar').value = stadium.cityAr;
    }
}

// Replace the editMatch function completely
async function editMatch(matchId) {
    const app = document.getElementById('app');
    app.innerHTML = `
        ${renderHeader()}
        <main>
            <section class="matches-section" style="background: var(--bg-primary); min-height: 100vh;">
                <div class="container">
                    <button onclick="navigate('admin-matches')" style="background: none; border: none; color: var(--primary); cursor: pointer; margin-bottom: 20px;">← ${t('manageMatches')}</button>
                    <h2 class="section-title">${t('editMatch')}</h2>
                    <div id="edit-match-form" class="form-container">
                        <div class="loading">
                            <div class="loading-spinner"></div>
                            <p>${t('loading')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    `;

    try {
        const match = await fetchAPI(`/matches/${matchId}`);
        const container = document.getElementById('edit-match-form');
        
        // Parse date for form
        const matchDate = match.match_date ? new Date(match.match_date) : new Date();
        const dateStr = matchDate.toISOString().slice(0, 16);
        
        container.innerHTML = `
            <form onsubmit="updateMatch(event, ${matchId})" style="max-width: 800px;">
                <h3 style="margin-top: 20px; color: var(--primary);">الفريق الأول</h3>
                <div class="form-group">
                    <label>الفريق (إنجليزي)</label>
                    <input type="text" name="home_team" id="home_team_input" value="${match.home_team || ''}" required oninput="autoUpdateFlag(this, 'home_team_flag_preview', 'home_team_flag_value'); updateFlagStatus('home')">
                </div>
                <div class="form-group">
                    <label>الفريق (عربي)</label>
                    <input type="text" name="home_team_ar" value="${match.home_team_ar || ''}" required>
                </div>
                <div class="form-group">
                    <label>علم الفريق (يتم تحديده تلقائياً)</label>
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <img id="home_team_flag_preview" src="${match.home_team_flag || ''}" style="width: 50px; height: 35px; object-fit: contain; border: 1px solid #ddd; border-radius: 4px; ${!match.home_team_flag ? 'display:none' : ''}">
                        <input type="hidden" id="home_team_flag_value" name="home_team_flag" value="${match.home_team_flag || ''}">
                        <span id="home_flag_status" style="color: var(--text-secondary); font-size: 0.9rem;">${match.home_team_flag ? '✓ تم تحديد العلم تلقائياً' : 'أدخل اسم الفريق لتحديد العلم'}</span>
                    </div>
                </div>
                
                <h3 style="margin-top: 20px; color: var(--primary);">الفريق الثاني</h3>
                <div class="form-group">
                    <label>الفريق (إنجليزي)</label>
                    <input type="text" name="away_team" id="away_team_input" value="${match.away_team || ''}" required oninput="autoUpdateFlag(this, 'away_team_flag_preview', 'away_team_flag_value'); updateFlagStatus('away')">
                </div>
                <div class="form-group">
                    <label>الفريق (عربي)</label>
                    <input type="text" name="away_team_ar" value="${match.away_team_ar || ''}" required>
                </div>
                <div class="form-group">
                    <label>علم الفريق (يتم تحديده تلقائياً)</label>
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <img id="away_team_flag_preview" src="${match.away_team_flag || ''}" style="width: 50px; height: 35px; object-fit: contain; border: 1px solid #ddd; border-radius: 4px; ${!match.away_team_flag ? 'display:none' : ''}">
                        <input type="hidden" id="away_team_flag_value" name="away_team_flag" value="${match.away_team_flag || ''}">
                        <span id="away_flag_status" style="color: var(--text-secondary); font-size: 0.9rem;">${match.away_team_flag ? '✓ تم تحديد العلم تلقائياً' : 'أدخل اسم الفريق لتحديد العلم'}</span>
                    </div>
                </div>
                
                <h3 style="margin-top: 20px; color: var(--primary);">تفاصيل المباراة</h3>
                <div class="form-group">
                    <label>التاريخ والوقت</label>
                    <input type="datetime-local" name="match_date" value="${dateStr}" required>
                </div>
                <div class="form-group">
                    <label>الملعب (إنجليزي)</label>
                    <input type="text" name="stadium" value="${match.stadium || ''}" required>
                </div>
                <div class="form-group">
                    <label>الملعب (عربي)</label>
                    <input type="text" name="stadium_ar" value="${match.stadium_ar || ''}" required>
                </div>
                <div class="form-group">
                    <label>المدينة</label>
                    <input type="text" name="city" value="${match.city || ''}" required>
                </div>
                <div class="form-group">
                    <label>المدينة (عربي)</label>
                    <input type="text" name="city_ar" value="${match.city_ar || ''}">
                </div>
                
                <h3 style="margin-top: 20px; color: var(--primary);">المرحلة والأسعار</h3>
                <div class="form-group">
                    <label>المرحلة</label>
                    <select name="stage" required>
                        <option value="Group Stage" ${match.stage === 'Group Stage' ? 'selected' : ''}>دور المجموعات</option>
                        <option value="Round of 16" ${match.stage === 'Round of 16' ? 'selected' : ''}>دور الـ 16</option>
                        <option value="Quarter Final" ${match.stage === 'Quarter Final' ? 'selected' : ''}>ربع النهائي</option>
                        <option value="Semi Final" ${match.stage === 'Semi Final' ? 'selected' : ''}>نصف النهائي</option>
                        <option value="Third Place" ${match.stage === 'Third Place' ? 'selected' : ''}>تحديد المركز الثالث</option>
                        <option value="Final" ${match.stage === 'Final' ? 'selected' : ''}>النهائي</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>المرحلة (عربي)</label>
                    <select name="stage_ar" required>
                        <option value="دور المجموعات" ${match.stage_ar === 'دور المجموعات' ? 'selected' : ''}>دور المجموعات</option>
                        <option value="دور الـ 16" ${match.stage_ar === 'دور الـ 16' ? 'selected' : ''}>دور الـ 16</option>
                        <option value="ربع النهائي" ${match.stage_ar === 'ربع النهائي' ? 'selected' : ''}>ربع النهائي</option>
                        <option value="نصف النهائي" ${match.stage_ar === 'نصف النهائي' ? 'selected' : ''}>نصف النهائي</option>
                        <option value="تحديد المركز الثالث" ${match.stage_ar === 'تحديد المركز الثالث' ? 'selected' : ''}>تحديد المركز الثالث</option>
                        <option value="النهائي" ${match.stage_ar === 'النهائي' ? 'selected' : ''}>النهائي</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>ترتيب الفرز</label>
                    <input type="number" name="sort_order" value="${match.sort_order || 0}">
                </div>
                <div class="form-group">
                    <label>أقل سعر ($)</label>
                    <input type="number" name="min_price" value="${match.min_price || 0}" step="0.01" required>
                </div>
                <div class="form-group">
                    <label>الحالة</label>
                    <select name="is_active">
                        <option value="1" ${match.is_active ? 'selected' : ''}>مفعل</option>
                        <option value="0" ${!match.is_active ? 'selected' : ''}>غير مفعل</option>
                    </select>
                </div>
                
                <button type="submit" class="submit-button" style="margin-top: 20px;">${t('save')}</button>
                <button type="button" onclick="navigate('admin-matches')" class="submit-button" style="background: var(--danger); margin-top: 10px;">${t('cancel')}</button>
            </form>
        `;
    } catch (error) {
        document.getElementById('edit-match-form').innerHTML = `<div class="error">${t('error')}: ${error.message}</div>`;
    }
    
    // Initialize flag auto-update
    setTimeout(initFlagAutoUpdate, 100);
}

// Sanitize flag URL - extract only clean image URL
function sanitizeFlagUrl(flagUrl) {
    if (!flagUrl) return '';
    // Extract clean URL from any input (HTML, text, etc.)
    const urlMatch = String(flagUrl).match(/https:\/\/flagcdn\.com\/[^\s"<>]+\.(png|jpg|svg)/);
    if (urlMatch) return urlMatch[0];
    // Check if it's already a clean URL
    if (/^https:\/\/flagcdn\.com\/[^\s"<>]+\.(png|jpg|svg)$/.test(flagUrl)) return flagUrl;
    return '';
}

async function updateMatch(event, matchId) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    // Sanitize flag URLs before sending
    const homeFlag = sanitizeFlagUrl(formData.get('home_team_flag'));
    const awayFlag = sanitizeFlagUrl(formData.get('away_team_flag'));

    try {
        await fetchAPI(`/matches/${matchId}`, {
            method: 'PUT',
            body: JSON.stringify({
                home_team: formData.get('home_team'),
                home_team_ar: formData.get('home_team_ar'),
                home_team_flag: homeFlag,
                away_team: formData.get('away_team'),
                away_team_ar: formData.get('away_team_ar'),
                away_team_flag: awayFlag,
                match_date: formData.get('match_date'),
                stadium: formData.get('stadium'),
                stadium_ar: formData.get('stadium_ar'),
                city: formData.get('city'),
                city_ar: formData.get('city_ar'),
                stage: formData.get('stage'),
                stage_ar: formData.get('stage_ar'),
                sort_order: parseInt(formData.get('sort_order')) || 0,
                min_price: parseFloat(formData.get('min_price')),
                is_active: parseInt(formData.get('is_active'))
            })
        });

        alert(state.language === 'ar' ? 'تم تحديث المباراة بنجاح' : 'Match updated successfully');
        navigate('admin-matches');
    } catch (error) {
        alert(state.language === 'ar' ? 'حدث خطأ: ' + error.message : 'Error: ' + error.message);
    }
}


async function renderAdminOrders() {
    if (!state.adminToken) {
        navigate('admin-login');
        return;
    }

    const app = document.getElementById('app');
    app.innerHTML = `
        ${renderHeader()}
        <main>
            <section class="matches-section">
                <div class="container">
                    <button onclick="navigate('admin')" style="background: none; border: none; color: var(--primary); cursor: pointer; margin-bottom: 20px;">← ${t('adminPanel')}</button>
                    <h2 class="section-title">${t('manageOrders')}</h2>
                    <div id="orders-list">
                        <div class="loading">
                            <div class="loading-spinner"></div>
                            <p>${t('loading')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    `;
    
    try {
        const orders = await fetchAPI('/orders');
        const container = document.getElementById('orders-list');
        container.innerHTML = `
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: var(--bg-card-hover);">
                        <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--border);">ID</th>
                        <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--border);">${t('name')}</th>
                        <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--border);">${t('email')}</th>
                        <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--border);">${t('whatsapp')}</th>
                        <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--border);">${t('price')}</th>
                        <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--border);">${t('paymentStatus')}</th>
                        <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--border);">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.map(order => `
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 15px;">${order.id}</td>
                            <td style="padding: 15px;">${order.customer_name}</td>
                            <td style="padding: 15px;">${order.email}</td>
                            <td style="padding: 15px;">${order.phone}</td>
                            <td style="padding: 15px;">${formatPrice(order.total_price)}</td>
                            <td style="padding: 15px;">${order.payment_status}</td>
                            <td style="padding: 15px;">
                                <select onchange="updateOrderStatus(${order.id}, this.value)" style="padding: 8px; border-radius: 4px; border: 1px solid var(--border); background: var(--bg-dark); color: var(--text-primary);">
                                    <option value="pending" ${order.payment_status === 'pending' ? 'selected' : ''}>${t('pending')}</option>
                                    <option value="confirmed" ${order.payment_status === 'confirmed' ? 'selected' : ''}>${t('confirmed')}</option>
                                    <option value="cancelled" ${order.payment_status === 'cancelled' ? 'selected' : ''}>${t('cancelled')}</option>
                                </select>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        document.getElementById('orders-list').innerHTML = `<div class="error">${t('error')}</div>`;
    }
}

async function updateOrderStatus(orderId, status) {
    try {
        await fetchAPI(`/orders/${orderId}`, {
            method: 'PATCH',
            body: JSON.stringify({ paymentStatus: status })
        });
    } catch (error) {
        alert(t('error'));
    }
}

async function renderAdminVisitors() {
    if (!state.adminToken) {
        navigate('admin-login');
        return;
    }

    const app = document.getElementById('app');
    app.innerHTML = `
        ${renderHeader()}
        <main>
            <section class="matches-section">
                <div class="container">
                    <button onclick="navigate('admin')" style="background: none; border: none; color: var(--primary); cursor: pointer; margin-bottom: 20px;">← ${t('adminPanel')}</button>
                    <h2 class="section-title">👁️ تتبع الزوار / Visitor Tracking</h2>
                    
                    <!-- Live Stats Cards -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; margin-bottom: 25px;">
                        <div style="background: var(--bg-card); padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <div style="font-size: 2rem; font-weight: bold; color: var(--primary);" id="total-active-count">0</div>
                            <div style="color: var(--text-secondary); font-size: 0.9rem;">زوار نشطين</div>
                        </div>
                        <div style="background: var(--bg-card); padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <div style="font-size: 2rem; font-weight: bold; color: var(--success);" id="by-country-count">-</div>
                            <div style="color: var(--text-secondary); font-size: 0.9rem;">دول</div>
                        </div>
                        <div style="background: var(--bg-card); padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <div style="font-size: 2rem; font-weight: bold; color: var(--warning);" id="by-page-home">-</div>
                            <div style="color: var(--text-secondary); font-size: 0.9rem;">الرئيسية</div>
                        </div>
                        <div style="background: var(--bg-card); padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <div style="font-size: 2rem; font-weight: bold; color: var(--info);" id="by-page-form">-</div>
                            <div style="color: var(--text-secondary); font-size: 0.9rem;">نموذج الطلب</div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
                        <button onclick="loadAnalyticsSummary()" style="background: var(--info); color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                            📊 تحميل الملخص
                        </button>
                        <button onclick="clearAnalytics()" style="background: var(--danger); color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                            🗑️ مسح البيانات
                        </button>
                        <div style="margin-left: auto; display: flex; align-items: center; gap: 8px;">
                            <span id="live-indicator" style="color: var(--warning); font-size: 1.2rem;">○</span>
                            <span id="connection-status" style="color: var(--text-secondary);">جاري الاتصال...</span>
                        </div>
                    </div>

                    <!-- Analytics Summary (Hidden by default) -->
                    <div id="analytics-summary" style="display: none; background: var(--bg-card); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h3 style="margin-bottom: 15px;">📊 ملخص التحليلات</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                            <div id="summary-by-page"></div>
                            <div id="summary-by-country"></div>
                            <div id="summary-by-tier"></div>
                        </div>
                    </div>

                    <!-- Live Visitors Table -->
                    <div id="visitors-list" style="background: var(--bg-card); border-radius: 12px; overflow: hidden;">
                        <div style="padding: 40px; text-align: center; color: var(--text-secondary);">
                            جاري تحميل البيانات الحية...
                        </div>
                    </div>
                </div>
            </section>
        </main>
    `;

    // Initialize SSE connection
    initVisitorSSE();
}

// SSE connection for real-time updates
let visitorEventSource = null;

function initVisitorSSE() {
    if (visitorEventSource) {
        visitorEventSource.close();
    }
    
    visitorEventSource = new EventSource('/api/admin/visitor-stream');
    
    visitorEventSource.onopen = () => {
        document.getElementById('connection-status').textContent = 'متصل';
        document.getElementById('live-indicator').textContent = '●';
        document.getElementById('live-indicator').style.color = 'var(--success)';
    };
    
    visitorEventSource.onmessage = (event) => {
        try {
            const visitors = JSON.parse(event.data);
            updateVisitorsTable(visitors);
            updateLiveStats(visitors);
        } catch (e) {
            console.error('Error parsing visitor data:', e);
        }
    };
    
    visitorEventSource.onerror = () => {
        document.getElementById('connection-status').textContent = 'إعادة الاتصال...';
        document.getElementById('live-indicator').textContent = '○';
        document.getElementById('live-indicator').style.color = 'var(--danger)';
        
        setTimeout(() => {
            initVisitorSSE();
        }, 5000);
    };
}

// Update visitors table
function updateVisitorsTable(visitors) {
    const container = document.getElementById('visitors-list');
    if (!container) return;
    
    if (!visitors || visitors.length === 0) {
        container.innerHTML = `
            <div style="padding: 40px; text-align: center; color: var(--text-secondary);">
                <div style="font-size: 3rem; margin-bottom: 10px;">👥</div>
                <div>لا يوجد زوار نشطين حالياً</div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="background: var(--bg-card-hover);">
                    <th style="padding: 12px; text-align: center; border-bottom: 1px solid var(--border);">حالة</th>
                    <th style="padding: 12px; text-align: left; border-bottom: 1px solid var(--border);">Session</th>
                    <th style="padding: 12px; text-align: left; border-bottom: 1px solid var(--border);">الصفحة</th>
                    <th style="padding: 12px; text-align: left; border-bottom: 1px solid var(--border);">السعر</th>
                    <th style="padding: 12px; text-align: left; border-bottom: 1px solid var(--border);">المستوى</th>
                    <th style="padding: 12px; text-align: left; border-bottom: 1px solid var(--border);">الدولة</th>
                    <th style="padding: 12px; text-align: left; border-bottom: 1px solid var(--border);">آخر نشاط</th>
                </tr>
            </thead>
            <tbody>
                ${visitors.map(visitor => {
                    const isRecent = Date.now() - visitor.lastSeen < 15000;
                    const timeAgo = getTimeAgo(visitor.lastSeen);
                    
                    return `
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 12px; text-align: center;">
                                <span style="color: ${isRecent ? 'var(--success)' : 'var(--warning)'}; font-size: 1.1rem;">
                                    ${isRecent ? '●' : '○'}
                                </span>
                            </td>
                            <td style="padding: 12px; font-family: monospace; font-size: 0.8rem;" title="${visitor.sessionId}">
                                ${visitor.sessionId.substring(0, 16)}...
                            </td>
                            <td style="padding: 12px;">
                                <span style="background: var(--primary); color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem;">
                                    ${visitor.page || 'unknown'}
                                </span>
                            </td>
                            <td style="padding: 12px; font-weight: bold; color: var(--success);">
                                ${visitor.selectedPrice ? '$' + visitor.selectedPrice : '-'}
                            </td>
                            <td style="padding: 12px;">
                                <span style="background: var(--secondary); color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem;">
                                    ${visitor.selectedTier || '-'}
                                </span>
                            </td>
                            <td style="padding: 12px;">
                                ${visitor.country ? `🌍 ${visitor.country}` : '-'}
                            </td>
                            <td style="padding: 12px; font-size: 0.8rem; color: var(--text-secondary);">
                                ${timeAgo}
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

// Update live stats
function updateLiveStats(visitors) {
    const totalEl = document.getElementById('total-active-count');
    if (totalEl) totalEl.textContent = visitors.length;
    
    const countries = new Set(visitors.filter(v => v.country).map(v => v.country));
    const homePage = visitors.filter(v => v.page === 'home' || v.page === 'index').length;
    const formPage = visitors.filter(v => v.page === 'form' || v.page === 'insurance').length;
    
    const countryEl = document.getElementById('by-country-count');
    if (countryEl) countryEl.textContent = countries.size || '-';
    
    const homeEl = document.getElementById('by-page-home');
    if (homeEl) homeEl.textContent = homePage || '-';
    
    const formEl = document.getElementById('by-page-form');
    if (formEl) formEl.textContent = formPage || '-';
}

// Get time ago string
function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'الآن';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes + 'm';
    const hours = Math.floor(minutes / 60);
    return hours + 'h';
}

// Load analytics summary
async function loadAnalyticsSummary() {
    try {
        const summary = await fetchAPI('/admin/analytics-summary');
        
        document.getElementById('analytics-summary').style.display = 'block';
        
        const pageSummary = document.getElementById('summary-by-page');
        if (pageSummary) {
            const byPage = Object.entries(summary.byPage || {});
            pageSummary.innerHTML = '<strong>حسب الصفحة:</strong>' + 
                (byPage.length ? byPage.map(([p, c]) => `<div>${p}: <strong>${c}</strong></div>`).join('') : '<div>لا توجد</div>');
        }
        
        const countrySummary = document.getElementById('summary-by-country');
        if (countrySummary) {
            const byCountry = Object.entries(summary.byCountry || {});
            countrySummary.innerHTML = '<strong>حسب الدولة:</strong>' + 
                (byCountry.length ? byCountry.map(([c, n]) => `<div>🌍 ${c}: <strong>${n}</strong></div>`).join('') : '<div>لا توجد</div>');
        }
        
        const tierSummary = document.getElementById('summary-by-tier');
        if (tierSummary) {
            const byTier = Object.entries(summary.byTier || {});
            tierSummary.innerHTML = '<strong>حسب المستوى:</strong>' + 
                (byTier.length ? byTier.map(([t, c]) => `<div>${t}: <strong>${c}</strong></div>`).join('') : '<div>لا توجد</div>');
        }
    } catch (error) {
        console.error('Error loading summary:', error);
    }
}

// Clear analytics
async function clearAnalytics() {
    if (!confirm('هل أنت متأكد من مسح جميع بيانات التتبع؟')) return;
    
    try {
        await fetch('/api/admin/clear-analytics', { method: 'DELETE' });
        
        if (visitorEventSource) {
            visitorEventSource.close();
            initVisitorSSE();
        }
        
        document.getElementById('analytics-summary').style.display = 'none';
        alert('تم مسح البيانات بنجاح');
    } catch (error) {
        alert('حدث خطأ');
    }
}

// ==========================================
// VISITOR TRACKING HEARTBEAT (Client Side)
// ==========================================
let trackingInterval = null;

function startVisitorTracking() {
    // Get or create session ID
    if (!state.sessionId) {
        state.sessionId = localStorage.getItem('sessionId') || generateSessionId();
        localStorage.setItem('sessionId', state.sessionId);
    }
    
    // Send heartbeat every 10 seconds
    const sendHeartbeat = async () => {
        try {
            const trackingData = {
                sessionId: state.sessionId,
                page: getCurrentPageName(),
                selectedPrice: getSelectedPrice(),
                selectedTier: getSelectedTier(),
                country: getVisitorCountry(),
                insuranceCompany: getSelectedCompany(),
                cardProgress: getCardProgress()
            };
            
            await fetch('/api/track-activity', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(trackingData)
            });
        } catch (e) {
            // Silent fail - don't interrupt user experience
        }
    };
    
    // Start tracking
    sendHeartbeat();
    trackingInterval = setInterval(sendHeartbeat, 10000);
}

function stopVisitorTracking() {
    if (trackingInterval) {
        clearInterval(trackingInterval);
        trackingInterval = null;
    }
}

// Helper functions for tracking
function getCurrentPageName() {
    const hash = window.location.hash || '#';
    if (hash.includes('match') || hash.includes('seats')) return 'match';
    if (hash.includes('checkout') || hash.includes('form')) return 'form';
    if (hash.includes('visa')) return 'visa';
    return 'home';
}

function getSelectedPrice() {
    return state.selectedSeats?.length > 0 ? 
        state.selectedSeats.reduce((sum, s) => sum + (parseFloat(s.price) || 0), 0) : 
        null;
}

function getSelectedTier() {
    return state.selectedTier || null;
}

function getVisitorCountry() {
    return localStorage.getItem('visitorCountry') || null;
}

function getSelectedCompany() {
    return state.selectedCompany || null;
}

function getCardProgress() {
    return state.cardProgress || null;
}

function generateSessionId() {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Start tracking when app loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(startVisitorTracking, 1000);
});

async function renderAdminSettings() {
    if (!state.adminToken) {
        navigate('admin-login');
        return;
    }

    const app = document.getElementById('app');
    app.innerHTML = `
        ${renderHeader()}
        <main>
            <section class="matches-section">
                <div class="container">
                    <button onclick="navigate('admin')" style="background: none; border: none; color: var(--primary); cursor: pointer; margin-bottom: 20px;">← ${t('adminPanel')}</button>
                    <h2 class="section-title">${t('manageSettings')}</h2>
                    <div id="settings-form">
                        <div class="loading">
                            <div class="loading-spinner"></div>
                            <p>${t('loading')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    `;
    
    try {
        const settings = await fetchAPI('/settings');
        const container = document.getElementById('settings-form');
        container.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <div>
                    <h3 style="margin-bottom: 20px;">${t('paymentLink')}</h3>
                    <form onsubmit="updateSettings(event)" style="max-width: 600px;">
                        <div class="form-group">
                            <label>${t('paymentLink')}</label>
                            <input type="url" name="payment_link" value="${settings.payment_link || 'https://paymath.com'}" required>
                        </div>
                        <button type="submit" class="submit-button">${t('save')}</button>
                    </form>
                </div>
                <div>
                    <h3 style="margin-bottom: 20px;">${state.language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}</h3>
                    <form onsubmit="changePassword(event)" style="max-width: 600px;">
                        <div class="form-group">
                            <label>${state.language === 'ar' ? 'كلمة المرور الحالية' : 'Current Password'}</label>
                            <input type="password" name="currentPassword" required>
                        </div>
                        <div class="form-group">
                            <label>${state.language === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}</label>
                            <input type="password" name="newPassword" required minlength="6">
                        </div>
                        <div class="form-group">
                            <label>${state.language === 'ar' ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password'}</label>
                            <input type="password" name="confirmPassword" required minlength="6">
                        </div>
                        <button type="submit" class="submit-button">${state.language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}</button>
                    </form>
                </div>
            </div>
        `;
    } catch (error) {
        document.getElementById('settings-form').innerHTML = `<div class="error">${t('error')}</div>`;
    }
}

async function updateSettings(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    try {
        await fetchAPI('/settings/payment_link', {
            method: 'PUT',
            body: JSON.stringify({ value: formData.get('payment_link') })
        });
        
        alert('Settings updated successfully');
    } catch (error) {
        alert(t('error'));
    }
}

async function changePassword(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');
    
    if (newPassword !== confirmPassword) {
        alert(state.language === 'ar' ? 'كلمة المرور الجديدة غير متطابقة' : 'New passwords do not match');
        return;
    }
    
    try {
        await fetchAPI('/admin/change-password', {
            method: 'POST',
            body: JSON.stringify({ currentPassword, newPassword })
        });
        
        alert(state.language === 'ar' ? 'تم تغيير كلمة المرور بنجاح' : 'Password changed successfully');
        form.reset();
    } catch (error) {
        alert(state.language === 'ar' ? 'فشل تغيير كلمة المرور. تأكد من كلمة المرور الحالية.' : 'Failed to change password. Please check your current password.');
    }
}

// Seat Picker Component
async function renderSeatPicker(matchId) {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        ${renderHeader()}
        <main>
            <section class="matches-section">
                <div class="container">
                    <div id="seat-picker-container">
                        <div class="loading">
                            <div class="loading-spinner"></div>
                            <p>${t('loading')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    `;
    
    try {
        const match = await fetchAPI(`/matches/${matchId}`);
        const seatsData = await fetchAPI(`/matches/${matchId}/seats`);
        state.currentMatch = match;
        trackVisitor(matchId);
        
        const stadiumName = state.language === 'ar' ? match.stadium_ar : match.stadium;
        const homeTeam = state.language === 'ar' ? match.home_team_ar : match.home_team;
        const awayTeam = state.language === 'ar' ? match.away_team_ar : match.away_team;
        

        // Transform flat seats data to grouped format for UI
        const groupedSeats = {};
        try {
            Object.keys(seatsData).forEach(key => {
                const seat = seatsData[key];
                if (!seat) return;
                const sectionId = String(seat.section || 'A');
                const rowId = String(seat.row || '1');
                
                if (!groupedSeats[sectionId]) {
                    groupedSeats[sectionId] = { rows: {} };
                }
                if (!groupedSeats[sectionId].rows[rowId]) {
                    groupedSeats[sectionId].rows[rowId] = [];
                }
                groupedSeats[sectionId].rows[rowId].push(seat);
            });

            // Sort seats within each row
            Object.keys(groupedSeats).forEach(sectionId => {
                Object.keys(groupedSeats[sectionId].rows).forEach(rowId => {
                    groupedSeats[sectionId].rows[rowId].sort((a, b) =>
                        parseInt(a.seat || 0) - parseInt(b.seat || 0)
                    );
                });
            });
        } catch (e) {
            console.error('Transform error:', e);
        }
        
        console.log('Seats data:', seatsData);
        console.log('Grouped seats:', groupedSeats);
        const container = document.getElementById('seat-picker-container');
        container.innerHTML = `
            <button onclick="navigate('match', ${matchId})" class="back-btn">← ${t('backToMatches')}</button>
            
            <div class="match-header-mobile">
                <h2>${homeTeam} vs ${awayTeam}</h2>
                <p>🏟️ ${stadiumName} | ${formatDate(match.match_date)}</p>
            </div>
            
            <!-- Instructional Banner -->
            <div class="category-instruction" style="text-align: center; color: #ffca28; margin-top: 15px; margin-bottom: 10px; font-weight: bold; font-size: 14px; width: 100%;">
                ${state.language === 'ar' ? 'يرجى اختيار الفئة المناسبة' : 'Please select the appropriate category'}
            </div>
            
            <!-- Section Tabs -->
            <div class="section-tabs-mobile">
                ${Object.keys(groupedSeats).map(sectionId => `
                    <button class="section-tab-btn ${sectionId === Object.keys(groupedSeats)[0] ? 'active' : ''}" 
                            onclick="showMobileSection('${sectionId}', this)">
                        <span class="section-name">${sectionId}</span>
                        <span class="section-price">$${getSectionMinPrice(groupedSeats[sectionId])}</span>
                    </button>
                `).join('')}
            </div>
            
            <div id="seats-list-mobile" class="seats-list-mobile">
                ${renderMobileSeatsList(groupedSeats)}
            </div>
            
            <!-- Fixed Bottom Bar -->
            <div class="mobile-selection-bar">
                <div class="selection-info">
                    <div class="selection-count">
                        <span class="count-num" id="mobile-seat-count">${state.selectedSeats.length}</span>
                        <span class="count-label">${state.language === 'ar' ? 'مقعد' : 'seats'}</span>
                        <span id="mobile-max-msg" style="display: none; color: #ff9800; font-size: 11px;">
                            / ${MAX_SEATS} ${state.language === 'ar' ? 'أقصى' : 'max'}
                        </span>
                    </div>
                    <div class="selection-price">
                        <span class="price-num" id="mobile-seat-total">$${state.selectedSeats.reduce((sum, s) => sum + s.price, 0).toFixed(2)}</span>
                    </div>
                </div>
                <div class="selection-seats-preview" id="mobile-seats-preview">
                    ${state.selectedSeats.length === 0 ? 
                        `<span class="no-selection">${t('noSeatsSelected')}</span>` : 
                        state.selectedSeats.slice(0, 5).map(s => `<span class="seat-chip">${s.sectionId}-${s.rowId}</span>`).join('') + 
                        (state.selectedSeats.length > 5 ? `<span class="more-seats">+${state.selectedSeats.length - 5}</span>` : '')
                    }
                </div>
                <button onclick="navigate('checkout')" id="proceed-btn" ${state.selectedSeats.length === 0 ? 'disabled' : ''} class="proceed-btn-mobile">
                    ${t('continue')}
                </button>
            </div>
        `;
        
        window.currentSeatsData = groupedSeats;
        window.currentMatchId = matchId;
        window.currentSection = Object.keys(groupedSeats)[0];
        
        // Auto-select first category on load (UX improvement)
        setTimeout(autoSelectFirstCategory, 100);
        
    } catch (error) {
        console.error('Seat picker error:', error);
        document.getElementById('seat-picker-container').innerHTML = `
            <div class="error">
                <p>${state.language === 'ar' ? 'حدث خطأ في تحميل المقاعد' : 'Error loading seats'}</p>
                <p style="font-size:12px;color:#666;">${error.message || error}</p>
            </div>
        `;
    }
}

// Get minimum price for a section
function getSectionMinPrice(section) {
    let minPrice = Infinity;
    const rows = Object.keys(section.rows);
    for (const rowId of rows) {
        const seats = section.rows[rowId];
        for (const seat of seats) {
            if (seat.status === 'available' && seat.price < minPrice) {
                minPrice = seat.price;
            }
        }
    }
    return minPrice === Infinity ? 0 : minPrice.toFixed(0);
}

// Render mobile seats as row cards
function renderMobileSeatsList(groupedSeats) {
    const sections = Object.keys(groupedSeats);
    let html = '';
    for (const sectionId of sections) {
        const section = groupedSeats[sectionId];
        const rows = Object.keys(section.rows).sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));
        
        html += `<div class="section-group-mobile ${sectionId === window.currentSection ? 'active' : 'hidden'}" id="mobile-section-${sectionId}">`;
        
        for (const rowId of rows) {
            const seats = section.rows[rowId];
            const availableSeats = seats.filter(s => s.status === 'available');
            const availableCount = availableSeats.length;
            const selectedFromRow = seats.filter(s => 
                state.selectedSeats.some(sel => sel.key === `${s.section}-${s.row}-${s.seat_number}`)
            ).length;
            
            if (availableCount === 0 && selectedFromRow === 0) continue;
            
            const price = availableSeats[0]?.price || seats[0].price;
            const hasSelection = selectedFromRow > 0;
            const remainingSlots = MAX_SEATS - state.selectedSeats.length;
            // Calculate how many we can add from this row
            const unselectedInRow = availableCount - selectedFromRow;
            const canAddFromRow = Math.min(remainingSlots, unselectedInRow);
            const remainingAvailable = unselectedInRow;
            const addDisabled = remainingAvailable === 0 || remainingSlots === 0;
            
            html += `
                <div class="row-card-mobile ${hasSelection ? 'has-selection' : ''}">
                    <div class="row-info">
                        <div class="row-label">${t('row')} ${rowId}</div>
                        <div class="row-section">${t('section')}: ${sectionId}</div>
                    </div>
                    <div class="row-availability">
                        ${hasSelection ? 
                            `<span class="selected-badge">${selectedFromRow} ${state.language === 'ar' ? 'محدد' : 'selected'}</span>` :
                            `<span class="available-badge">${availableCount} ${state.language === 'ar' ? 'متاح' : 'avail'}</span>`
                        }
                    </div>
                    <div class="row-price-info">
                        <div class="price-per-seat">$${price.toFixed(2)}</div>
                        <div class="price-label">${state.language === 'ar' ? 'للمقعد' : '/seat'}</div>
                    </div>
                    <div class="row-actions">
                        ${hasSelection ? `
                            <button class="remove-btn" onclick="removeRowSeats('${sectionId}', '${rowId}')">−</button>
                        ` : ''}
                        <button class="add-btn ${hasSelection ? 'added' : ''}" onclick="selectRowSeats('${sectionId}', '${rowId}')" ${addDisabled ? 'disabled' : ''}>+${canAddFromRow > 1 && !addDisabled ? canAddFromRow : ''}</button>
                    </div>
                </div>
            `;
        }
        
        html += '</div>';
    }
    
    return html;
}

// Auto-select first category on load (UX improvement)
function autoSelectFirstCategory() {
    const firstTabBtn = document.querySelector('.section-tab-btn');
    if (firstTabBtn) {
        firstTabBtn.click();
        console.log("UX Fix: Automatically activated the first seating category.");
    } else {
        console.warn("UX Fix Warning: First category button element not found in DOM yet.");
    }
}

function showMobileSection(sectionId, btn) {
    window.currentSection = sectionId;
    
    // Update tab buttons
    document.querySelectorAll('.section-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Show/hide sections
    document.querySelectorAll('.section-group-mobile').forEach(g => g.classList.add('hidden'));
    document.getElementById(`mobile-section-${sectionId}`).classList.remove('hidden');
}

// Select seats from a row (add multiple seats)
function selectRowSeats(sectionId, rowId, availableCount, price) {
    const section = window.currentSeatsData[sectionId];
    const seats = section.rows[rowId];
    const availableSeats = seats.filter(s => s.status === 'available');
    
    // Calculate remaining seats we can add
    const remainingSlots = MAX_SEATS - state.selectedSeats.length;
    if (remainingSlots <= 0) {
        const msg = state.language === 'ar' 
            ? `يمكنك اختيار ${MAX_SEATS} مقاعد كحد أقصى` 
            : `You can select up to ${MAX_SEATS} seats maximum`;
        alert(msg);
        return;
    }
    
    // Find available seats not already selected
    const unselectedAvailable = availableSeats.filter(seat => {
        const key = `${seat.section}-${seat.row}-${seat.seat_number}`;
        return !state.selectedSeats.some(s => s.key === key);
    });
    
    // Add seats up to remaining slots
    const seatsToAdd = Math.min(remainingSlots, unselectedAvailable.length);
    for (let i = 0; i < seatsToAdd; i++) {
        const seat = unselectedAvailable[i];
        state.selectedSeats.push({
            key: `${seat.section}-${seat.row}-${seat.seat_number}`,
            id: seat.id,
            price: seat.price,
            sectionId: seat.section,
            rowId: seat.row,
            seatNumber: seat.seat_number
        });
    }
    
    updateMobileSelectionUI();
}

// Remove all seats from a row
function removeRowSeats(sectionId, rowId) {
    // Remove all selected seats from this row
    state.selectedSeats = state.selectedSeats.filter(s => 
        !(s.sectionId === sectionId && s.rowId === rowId)
    );
    
    updateMobileSelectionUI();
}

// Update mobile selection UI
function updateMobileSelectionUI() {
    // Update count and total
    const mobileCountEl = document.getElementById('mobile-seat-count');
    const mobilePriceEl = document.getElementById('mobile-seat-total');
    const mobileMaxMsg = document.getElementById('mobile-max-msg');
    
    if (mobileCountEl) mobileCountEl.textContent = state.selectedSeats.length;
    if (mobilePriceEl) mobilePriceEl.textContent = '$' + state.selectedSeats.reduce((sum, s) => sum + (s.price || 0), 0).toFixed(2);
    
    // Show max seats warning
    if (mobileMaxMsg) {
        mobileMaxMsg.style.display = state.selectedSeats.length >= MAX_SEATS ? 'inline' : 'none';
    }
    
    // Update preview
    const preview = document.getElementById('mobile-seats-preview');
    if (state.selectedSeats.length === 0) {
        preview.innerHTML = `<span class="no-selection">${t('noSeatsSelected')}</span>`;
    } else {
        const chips = state.selectedSeats.slice(0, 5).map(s => 
            `<span class="seat-chip">${s.sectionId}-${s.rowId}</span>`
        ).join('');
        const more = state.selectedSeats.length > 5 ? `<span class="more-seats">+${state.selectedSeats.length - 5}</span>` : '';
        preview.innerHTML = chips + more;
    }
    
    // Update proceed button
    const proceedBtn = document.getElementById('proceed-btn');
    proceedBtn.disabled = state.selectedSeats.length === 0;
    
    // Re-render seats list to update row states
    const seatsList = document.getElementById('seats-list-mobile');
    if (seatsList && window.currentSeatsData) {
        seatsList.innerHTML = renderMobileSeatsList(window.currentSeatsData);
    }
}

function toggleSeatPicker(seatKey, price, sectionId, rowId, seatNumber) {
    const existingIndex = state.selectedSeats.findIndex(s => s.key === seatKey);
    const seatEl = document.querySelector(`[data-seat-key="${seatKey}"]`);
    
    if (existingIndex > -1) {
        // Deselect
        state.selectedSeats.splice(existingIndex, 1);
        seatEl.classList.remove('selected');
        seatEl.style.background = 'var(--success)';
    } else {
        // Select
        state.selectedSeats.push({
            key: seatKey,
            price: price,
            sectionId: sectionId,
            rowId: rowId,
            seatNumber: seatNumber,
            matchId: window.currentMatchId
        });
        seatEl.classList.add('selected');
        seatEl.style.background = 'var(--primary)';
        seatEl.style.border = '2px solid var(--dark)';
    }
    
    updateSeatSelectionUI();
}

function updateSeatSelectionUI() {
    const listEl = document.getElementById('selected-seats-list');
    const countEl = document.getElementById('seat-count');
    const totalEl = document.getElementById('seat-total');
    const proceedBtn = document.getElementById('proceed-btn');
    
    if (listEl) {
        if (state.selectedSeats.length === 0) {
            listEl.innerHTML = `<p style="color: var(--text-secondary);">${t('noSeatsSelected')}</p>`;
        } else {
            listEl.innerHTML = state.selectedSeats.map(s => `
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border);">
                    <span>${s.sectionId}-${s.rowId}-${s.seatNumber}</span>
                    <span>${formatPrice(s.price)}</span>
                    <button onclick="toggleSeatPicker('${s.key}', ${s.price}, '${s.sectionId}', '${s.rowId}', '${s.seatNumber}')" 
                            style="background: none; border: none; color: var(--danger); cursor: pointer; font-size: 1.2em;">×</button>
                </div>
            `).join('');
        }
    }
    
    if (countEl) countEl.textContent = state.selectedSeats.length;
    if (totalEl) totalEl.textContent = formatPrice(state.selectedSeats.reduce((sum, s) => sum + s.price, 0));
    if (proceedBtn) proceedBtn.disabled = state.selectedSeats.length === 0;
}

function clearSeatSelection() {
    // Release seats from server
    if (state.selectedSeats.length > 0 && window.currentMatchId) {
        const seatKeys = state.selectedSeats.map(s => s.key);
        fetchAPI('/tickets/release', {
            method: 'POST',
            body: JSON.stringify({
                matchId: window.currentMatchId,
                seatKeys: seatKeys,
                sessionId: state.sessionId
            })
        }).catch(console.error);
    }
    
    state.selectedSeats = [];
    
    // Reset all seat visuals
    document.querySelectorAll('.seat.selected').forEach(el => {
        el.classList.remove('selected');
        el.style.background = 'var(--success)';
        el.style.border = 'none';
    });
    
    updateSeatSelectionUI();
}

function showSection(sectionId) {
    document.querySelectorAll('.section-block').forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById(`section-${sectionId}`).style.display = 'block';
    window.currentSection = sectionId;
}

// Update page meta tags based on current view
function updateMetaTags(view, matchData = null) {
    const pageTitle = document.getElementById('page-title');
    const metaDescription = document.getElementById('meta-description');
    const metaKeywords = document.getElementById('meta-keywords');
    const ogTitle = document.getElementById('og-title');
    const ogDescription = document.getElementById('og-description');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const twitterTitle = document.getElementById('twitter-title');
    const twitterDescription = document.getElementById('twitter-description');
    
    const baseUrl = 'https://newcup.onrender.com';
    const baseTitle = 'كأس العالم 2026 | Al-Jawhara Office';
    
    // Update OG URL based on current path
    if (ogUrl) ogUrl.setAttribute('content', baseUrl + window.location.pathname);
    
    const metaTags = {
        'home': {
            title: baseTitle,
            description: 'تابع جدول مباريات كأس العالم 2026، وتفاصيل المجموعات والملاعب، واحجز تذكرتك الآن عبر Al-Jawhara Office.',
            keywords: 'كأس العالم 2026, جدول المباريات, حجز تذاكر, مباريات اليوم'
        },
        'matches': {
            title: 'جدول المباريات | كأس العالم 2026',
            description: 'جدول مباريات كأس العالم 2026 كاملة - المجموعات، المواعيد، الملاعب وجدول المباريات لحظة بلحظة.',
            keywords: 'جدول المباريات, كأس العالم 2026, مباريات اليوم, المجموعات'
        },
        'checkout': {
            title: 'إتمام الحجز | كأس العالم 2026',
            description: 'إتمام حجز تذاكر كأس العالم 2026 - أدخل بياناتك واحجز مقعدك الآن.',
            keywords: 'حجز تذاكر, إتمام الشراء, كأس العالم 2026'
        },
        'admin-login': {
            title: 'تسجيل دخول الإدارة | Al-Jawhara Office',
            description: 'تسجيل دخول لوحة تحكم موقع كأس العالم 2026.',
            keywords: 'لوحة التحكم, الإدارة'
        },
        'admin': {
            title: 'لوحة التحكم | Al-Jawhara Office',
            description: 'لوحة التحكم - إدارة المباريات والطلبات والزوار.',
            keywords: 'لوحة التحكم, الإدارة, كأس العالم'
        }
    };
    
    let tags = metaTags[view] || metaTags['home'];
    
    // If viewing a specific match
    if (view === 'seat-picker' && matchData) {
        const team1 = matchData.team1 || 'فريق';
        const team2 = matchData.team2 || 'فريق';
        tags = {
            title: `${team1} ضد ${team2} | حجز تذاكر كأس العالم 2026`,
            description: `احجز تذاكر مباراة ${team1} ضد ${team2} في كأس العالم 2026 - اختر مقعدك الآن!`,
            keywords: `تذاكر, ${team1}, ${team2}, كأس العالم 2026`
        };
    }
    
    if (pageTitle) pageTitle.textContent = tags.title;
    if (metaDescription) metaDescription.setAttribute('content', tags.description);
    if (metaKeywords) metaKeywords.setAttribute('content', tags.keywords);
    if (ogTitle) ogTitle.setAttribute('content', tags.title);
    if (ogDescription) ogDescription.setAttribute('content', tags.description);
    if (twitterTitle) twitterTitle.setAttribute('content', tags.title);
    if (twitterDescription) twitterDescription.setAttribute('content', tags.description);
}

// Navigation
function navigate(view, param = null) {
    state.currentView = view;
    
    // Don't clear selected seats when going to checkout or seat-picker
    if (view !== 'checkout' && view !== 'seat-picker') {
        state.selectedSeats = [];
    }
    
    // Update page meta tags
    updateMetaTags(view);
    
    // Update URL using History API (persists on refresh)
    let url = '/';
    if (view === 'admin-login') {
        url = '/admin-login';
    } else if (view === 'admin') {
        url = '/admin';
    } else if (view === 'admin-dashboard') {
        url = '/admin-dashboard';
    } else if (view === 'admin-matches') {
        url = '/admin-matches';
    } else if (view === 'admin-orders') {
        url = '/admin-orders';
    } else if (view === 'admin-visitors') {
        url = '/admin-visitors';
    } else if (view === 'admin-settings') {
        url = '/admin-settings';
    } else if (view === 'matches') {
        url = '/matches';
    } else if (view === 'checkout') {
        url = '/checkout';
    } else if (view === 'seat-picker' && param) {
        url = '/match/' + param;
    }
    
    history.pushState({view: view, param: param}, '', url);
    
    switch(view) {
        case 'home':
            renderHome();
            break;
        case 'matches':
            renderMatches();
            break;
        case 'match':
            renderMatch(param);
            break;
        case 'checkout':
            renderCheckout();
            break;
        case 'admin-login':
            renderAdminLogin();
            break;
        case 'admin':
            renderAdmin();
            break;
        case 'admin-dashboard':
            renderAdminDashboard();
            break;
        case 'admin-matches':
            renderAdminMatches();
            break;
        case 'admin-add-match':
            renderAdminAddMatch();
            break;
        case 'admin-orders':
            renderAdminOrders();
            break;
        case 'admin-visitors':
            renderAdminVisitors();
            break;
        case 'admin-settings':
            renderAdminSettings();
            break;
        case 'seat-picker':
            renderSeatPicker(param);
            break;
        default:
            renderHome();
    }
}


// Country code mapping
// Country flag URL mapping (using flagcdn.com)
const countryFlags = {
    // North America
    'mexico': 'https://flagcdn.com/w80/mx.png', 'mx': 'https://flagcdn.com/w80/mx.png',
    'canada': 'https://flagcdn.com/w80/ca.png', 'ca': 'https://flagcdn.com/w80/ca.png',
    'usa': 'https://flagcdn.com/w80/us.png', 'united states': 'https://flagcdn.com/w80/us.png', 'us': 'https://flagcdn.com/w80/us.png',
    
    // South America
    'brazil': 'https://flagcdn.com/w80/br.png', 'br': 'https://flagcdn.com/w80/br.png',
    'argentina': 'https://flagcdn.com/w80/ar.png', 'ar': 'https://flagcdn.com/w80/ar.png',
    'paraguay': 'https://flagcdn.com/w80/py.png', 'py': 'https://flagcdn.com/w80/py.png',
    'chile': 'https://flagcdn.com/w80/cl.png', 'cl': 'https://flagcdn.com/w80/cl.png',
    'colombia': 'https://flagcdn.com/w80/co.png', 'co': 'https://flagcdn.com/w80/co.png',
    'peru': 'https://flagcdn.com/w80/pe.png', 'pe': 'https://flagcdn.com/w80/pe.png',
    'ecuador': 'https://flagcdn.com/w80/ec.png', 'ec': 'https://flagcdn.com/w80/ec.png',
    'venezuela': 'https://flagcdn.com/w80/ve.png', 've': 'https://flagcdn.com/w80/ve.png',
    'uruguay': 'https://flagcdn.com/w80/uy.png', 'uy': 'https://flagcdn.com/w80/uy.png',
    
    // Europe
    'germany': 'https://flagcdn.com/w80/de.png', 'de': 'https://flagcdn.com/w80/de.png',
    'france': 'https://flagcdn.com/w80/fr.png', 'fr': 'https://flagcdn.com/w80/fr.png',
    'spain': 'https://flagcdn.com/w80/es.png', 'es': 'https://flagcdn.com/w80/es.png',
    'england': 'https://flagcdn.com/w80/gb.png', 'uk': 'https://flagcdn.com/w80/gb.png', 'gb': 'https://flagcdn.com/w80/gb.png',
    'italy': 'https://flagcdn.com/w80/it.png', 'it': 'https://flagcdn.com/w80/it.png',
    'portugal': 'https://flagcdn.com/w80/pt.png', 'pt': 'https://flagcdn.com/w80/pt.png',
    'netherlands': 'https://flagcdn.com/w80/nl.png', 'nl': 'https://flagcdn.com/w80/nl.png',
    'belgium': 'https://flagcdn.com/w80/be.png', 'be': 'https://flagcdn.com/w80/be.png',
    'switzerland': 'https://flagcdn.com/w80/ch.png', 'ch': 'https://flagcdn.com/w80/ch.png',
    'austria': 'https://flagcdn.com/w80/at.png', 'at': 'https://flagcdn.com/w80/at.png',
    'denmark': 'https://flagcdn.com/w80/dk.png', 'dk': 'https://flagcdn.com/w80/dk.png',
    'sweden': 'https://flagcdn.com/w80/se.png', 'se': 'https://flagcdn.com/w80/se.png',
    'norway': 'https://flagcdn.com/w80/no.png', 'no': 'https://flagcdn.com/w80/no.png',
    'poland': 'https://flagcdn.com/w80/pl.png', 'pl': 'https://flagcdn.com/w80/pl.png',
    'ukraine': 'https://flagcdn.com/w80/ua.png', 'ua': 'https://flagcdn.com/w80/ua.png',
    'russia': 'https://flagcdn.com/w80/ru.png', 'ru': 'https://flagcdn.com/w80/ru.png',
    'croatia': 'https://flagcdn.com/w80/hr.png', 'hr': 'https://flagcdn.com/w80/hr.png',
    'serbia': 'https://flagcdn.com/w80/rs.png', 'rs': 'https://flagcdn.com/w80/rs.png',
    'czech': 'https://flagcdn.com/w80/cz.png', 'czechia': 'https://flagcdn.com/w80/cz.png', 'cz': 'https://flagcdn.com/w80/cz.png',
    'scotland': 'https://flagcdn.com/w80/gb.png',
    'wales': 'https://flagcdn.com/w80/gb.png',
    'ireland': 'https://flagcdn.com/w80/ie.png', 'ie': 'https://flagcdn.com/w80/ie.png',
    'finland': 'https://flagcdn.com/w80/fi.png', 'fi': 'https://flagcdn.com/w80/fi.png',
    'iceland': 'https://flagcdn.com/w80/is.png', 'is': 'https://flagcdn.com/w80/is.png',
    'hungary': 'https://flagcdn.com/w80/hu.png', 'hu': 'https://flagcdn.com/w80/hu.png',
    'romania': 'https://flagcdn.com/w80/ro.png', 'ro': 'https://flagcdn.com/w80/ro.png',
    'slovakia': 'https://flagcdn.com/w80/sk.png', 'sk': 'https://flagcdn.com/w80/sk.png',
    'slovenia': 'https://flagcdn.com/w80/si.png', 'si': 'https://flagcdn.com/w80/si.png',
    
    // Asia
    'japan': 'https://flagcdn.com/w80/jp.png', 'jp': 'https://flagcdn.com/w80/jp.png',
    'south korea': 'https://flagcdn.com/w80/kr.png', 'korea': 'https://flagcdn.com/w80/kr.png', 'kr': 'https://flagcdn.com/w80/kr.png',
    'china': 'https://flagcdn.com/w80/cn.png', 'cn': 'https://flagcdn.com/w80/cn.png',
    'qatar': 'https://flagcdn.com/w80/qa.png', 'qa': 'https://flagcdn.com/w80/qa.png',
    'uae': 'https://flagcdn.com/w80/ae.png', 'united arab emirates': 'https://flagcdn.com/w80/ae.png', 'ae': 'https://flagcdn.com/w80/ae.png',
    'saudi': 'https://flagcdn.com/w80/sa.png', 'saudi arabia': 'https://flagcdn.com/w80/sa.png', 'sa': 'https://flagcdn.com/w80/sa.png',
    'iran': 'https://flagcdn.com/w80/ir.png', 'ir': 'https://flagcdn.com/w80/ir.png',
    'iraq': 'https://flagcdn.com/w80/iq.png', 'iq': 'https://flagcdn.com/w80/iq.png',
    'india': 'https://flagcdn.com/w80/in.png', 'in': 'https://flagcdn.com/w80/in.png',
    'indonesia': 'https://flagcdn.com/w80/id.png', 'id': 'https://flagcdn.com/w80/id.png',
    'thailand': 'https://flagcdn.com/w80/th.png', 'th': 'https://flagcdn.com/w80/th.png',
    'vietnam': 'https://flagcdn.com/w80/vn.png', 'vn': 'https://flagcdn.com/w80/vn.png',
    'malaysia': 'https://flagcdn.com/w80/my.png', 'my': 'https://flagcdn.com/w80/my.png',
    'philippines': 'https://flagcdn.com/w80/ph.png', 'ph': 'https://flagcdn.com/w80/ph.png',
    'pakistan': 'https://flagcdn.com/w80/pk.png', 'pk': 'https://flagcdn.com/w80/pk.png',
    'bangladesh': 'https://flagcdn.com/w80/bd.png', 'bd': 'https://flagcdn.com/w80/bd.png',
    
    // Africa
    'south africa': 'https://flagcdn.com/w80/za.png', 'za': 'https://flagcdn.com/w80/za.png',
    'morocco': 'https://flagcdn.com/w80/ma.png', 'ma': 'https://flagcdn.com/w80/ma.png',
    'egypt': 'https://flagcdn.com/w80/eg.png', 'eg': 'https://flagcdn.com/w80/eg.png',
    'nigeria': 'https://flagcdn.com/w80/ng.png', 'ng': 'https://flagcdn.com/w80/ng.png',
    'senegal': 'https://flagcdn.com/w80/sn.png', 'sn': 'https://flagcdn.com/w80/sn.png',
    'cameroon': 'https://flagcdn.com/w80/cm.png', 'cm': 'https://flagcdn.com/w80/cm.png',
    'ghana': 'https://flagcdn.com/w80/gh.png', 'gh': 'https://flagcdn.com/w80/gh.png',
    'algeria': 'https://flagcdn.com/w80/dz.png', 'dz': 'https://flagcdn.com/w80/dz.png',
    'tunisia': 'https://flagcdn.com/w80/tn.png', 'tn': 'https://flagcdn.com/w80/tn.png',
    'ivory coast': 'https://flagcdn.com/w80/ci.png', 'cote d\'ivoire': 'https://flagcdn.com/w80/ci.png', 'ci': 'https://flagcdn.com/w80/ci.png',
    'kenya': 'https://flagcdn.com/w80/ke.png', 'ke': 'https://flagcdn.com/w80/ke.png',
    'ethiopia': 'https://flagcdn.com/w80/et.png', 'et': 'https://flagcdn.com/w80/et.png',
    'cameroon': 'https://flagcdn.com/w80/cm.png', 'cm': 'https://flagcdn.com/w80/cm.png',
    'zambia': 'https://flagcdn.com/w80/zm.png', 'zm': 'https://flagcdn.com/w80/zm.png',
    'south sudan': 'https://flagcdn.com/w80/ss.png', 'ss': 'https://flagcdn.com/w80/ss.png',
    'congo': 'https://flagcdn.com/w80/cd.png', 'dr congo': 'https://flagcdn.com/w80/cd.png', 'cd': 'https://flagcdn.com/w80/cd.png',
    'tanzania': 'https://flagcdn.com/w80/tz.png', 'tz': 'https://flagcdn.com/w80/tz.png',
    'uganda': 'https://flagcdn.com/w80/ug.png', 'ug': 'https://flagcdn.com/w80/ug.png',
    'angola': 'https://flagcdn.com/w80/ao.png', 'ao': 'https://flagcdn.com/w80/ao.png',
    'mozambique': 'https://flagcdn.com/w80/mz.png', 'mz': 'https://flagcdn.com/w80/mz.png',
    'madagascar': 'https://flagcdn.com/w80/mg.png', 'mg': 'https://flagcdn.com/w80/mg.png',
    'namibia': 'https://flagcdn.com/w80/na.png', 'na': 'https://flagcdn.com/w80/na.png',
    'botswana': 'https://flagcdn.com/w80/bw.png', 'bw': 'https://flagcdn.com/w80/bw.png',
    'zimbabwe': 'https://flagcdn.com/w80/zw.png', 'zw': 'https://flagcdn.com/w80/zw.png',
    'libya': 'https://flagcdn.com/w80/ly.png', 'ly': 'https://flagcdn.com/w80/ly.png',
    
    // Oceania
    'australia': 'https://flagcdn.com/w80/au.png', 'au': 'https://flagcdn.com/w80/au.png',
    'new zealand': 'https://flagcdn.com/w80/nz.png', 'nz': 'https://flagcdn.com/w80/nz.png',
    
    // Caribbean & Central America
    'haiti': 'https://flagcdn.com/w80/ht.png', 'ht': 'https://flagcdn.com/w80/ht.png',
    'jamaica': 'https://flagcdn.com/w80/jm.png', 'jm': 'https://flagcdn.com/w80/jm.png',
    'costa rica': 'https://flagcdn.com/w80/cr.png', 'cr': 'https://flagcdn.com/w80/cr.png',
    'honduras': 'https://flagcdn.com/w80/hn.png', 'hn': 'https://flagcdn.com/w80/hn.png',
    'guatemala': 'https://flagcdn.com/w80/gt.png', 'gt': 'https://flagcdn.com/w80/gt.png',
    'panama': 'https://flagcdn.com/w80/pa.png', 'pa': 'https://flagcdn.com/w80/pa.png',
    
    // Other
    'turkey': 'https://flagcdn.com/w80/tr.png', 'tr': 'https://flagcdn.com/w80/tr.png',
    'greece': 'https://flagcdn.com/w80/gr.png', 'gr': 'https://flagcdn.com/w80/gr.png',
    'curacao': 'https://flagcdn.com/w80/cw.png', 'cw': 'https://flagcdn.com/w80/cw.png',
    'cape verde': 'https://flagcdn.com/w80/cv.png', 'cv': 'https://flagcdn.com/w80/cv.png',
    'iceland': 'https://flagcdn.com/w80/is.png', 'is': 'https://flagcdn.com/w80/is.png',
    
    // World Cup qualified teams
    'bosnia': 'https://flagcdn.com/w80/ba.png', 'bosnia herzegovina': 'https://flagcdn.com/w80/ba.png', 'ba': 'https://flagcdn.com/w80/ba.png',
    'palestine': 'https://flagcdn.com/w80/ps.png', 'ps': 'https://flagcdn.com/w80/ps.png',
    'oman': 'https://flagcdn.com/w80/om.png', 'om': 'https://flagcdn.com/w80/om.png',
    'jordan': 'https://flagcdn.com/w80/jo.png', 'jo': 'https://flagcdn.com/w80/jo.png',
    'bahrain': 'https://flagcdn.com/w80/bh.png', 'bh': 'https://flagcdn.com/w80/bh.png',
    'kuwait': 'https://flagcdn.com/w80/kw.png', 'kw': 'https://flagcdn.com/w80/kw.png',
    'afghanistan': 'https://flagcdn.com/w80/af.png', 'af': 'https://flagcdn.com/w80/af.png',
    'china': 'https://flagcdn.com/w80/cn.png',
};

// Get flag URL from team name
function getFlagUrl(teamName) {
    if (!teamName) return '';
    const lower = teamName.toLowerCase().trim();
    return countryFlags[lower] || '';
}

// Auto-update flag when team name changes
function autoUpdateFlag(teamInput, flagPreviewId, flagInputId) {
    const flagUrl = getFlagUrl(teamInput.value);
    const preview = document.getElementById(flagPreviewId);
    const flagInput = document.getElementById(flagInputId);
    
    if (flagUrl) {
        preview.src = flagUrl;
        preview.style.display = 'inline-block';
        if (flagInput) flagInput.value = flagUrl;
    } else {
        preview.src = '';
        preview.style.display = 'none';
        if (flagInput) flagInput.value = '';
    }
}

// Initialize flag auto-update for edit/add forms
function initFlagAutoUpdate() {
    // Home team
    const homeTeamInput = document.getElementById('home_team_input') || document.querySelector('input[name="home_team"]');
    const homePreview = document.getElementById('home_team_flag_preview');
    const homeInput = document.getElementById('home_team_flag_value');
    
    if (homeTeamInput && homePreview) {
        homeTeamInput.addEventListener('input', () => autoUpdateFlag(homeTeamInput, 'home_team_flag_preview', 'home_team_flag_value'));
        // Also trigger on page load to set initial flag
        autoUpdateFlag(homeTeamInput, 'home_team_flag_preview', 'home_team_flag_value');
    }
    
    // Away team
    const awayTeamInput = document.getElementById('away_team_input') || document.querySelector('input[name="away_team"]');
    const awayPreview = document.getElementById('away_team_flag_preview');
    const awayInput = document.getElementById('away_team_flag_value');
    
    if (awayTeamInput && awayPreview) {
        awayTeamInput.addEventListener('input', () => autoUpdateFlag(awayTeamInput, 'away_team_flag_preview', 'away_team_flag_value'));
        // Also trigger on page load to set initial flag
        autoUpdateFlag(awayTeamInput, 'away_team_flag_preview', 'away_team_flag_value');
    }
}

// Update flag status text
function updateFlagStatus(team) {
    const statusEl = document.getElementById(team + '_flag_status');
    const preview = document.getElementById(team + '_team_flag_preview');
    if (statusEl && preview) {
        statusEl.textContent = preview.src ? '✓ تم تحديد العلم تلقائياً' : 'أدخل اسم الفريق لتحديد العلم';
        statusEl.style.color = preview.src ? 'var(--success)' : 'var(--text-secondary)';
    }
}

// Auto-update flag for add match form
function autoUpdateFlagFromAdd(teamInput, flagPreviewId, flagInputId) {
    autoUpdateFlag(teamInput, flagPreviewId, flagInputId);
}

// Update flag status for add match form
function updateAddFlagStatus(team) {
    const statusEl = document.getElementById('add_' + team + '_flag_status');
    const preview = document.getElementById('add_' + team + '_team_flag_preview');
    if (statusEl && preview) {
        statusEl.textContent = preview.src ? '✓ Flag auto-detected' : 'Enter team name to auto-detect flag';
        statusEl.style.color = preview.src ? 'var(--success)' : 'var(--text-secondary)';
    }
}

// Initialize
function init() {
    try {
        console.log('Initializing app...');
        console.log('Path:', window.location.pathname);
        
        // Load saved language
        const savedLang = localStorage.getItem('language');
        if (savedLang) {
            state.language = savedLang;
            document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = savedLang;
        }
        
        // Check query param first (for SPA routing)
        const urlParams = new URLSearchParams(window.location.search);
        const viewParam = urlParams.get("view");
        if (viewParam) {
            if (viewParam === "match") {
                const id = urlParams.get("id");
                if (id) { navigate("seat-picker", id); return; }
            }
            navigate(viewParam);
            return;
        }

        // Determine view from current URL pathname
        const path = window.location.pathname.toLowerCase();
        let view = 'home';
        
        if (path === '/admin-login' || path === '/admin-login/') {
            view = 'admin-login';
        } else if (path === '/admin' || path === '/admin/') {
            view = 'admin';
        } else if (path === '/admin-dashboard') {
            view = 'admin-dashboard';
        } else if (path === '/admin-matches') {
            view = 'admin-matches';
        } else if (path === '/admin-orders') {
            view = 'admin-orders';
        } else if (path === '/admin-visitors') {
            view = 'admin-visitors';
        } else if (path === '/admin-settings') {
            view = 'admin-settings';
        } else if (path === '/matches') {
            view = 'matches';
        } else if (path === '/checkout') {
            view = 'checkout';
        } else if (path.startsWith('/match/')) {
            const matchId = path.split('/')[2];
            if (matchId) {
                view = 'seat-picker';
                console.log('Navigating to seat-picker with matchId:', matchId);
                navigate(view, matchId);
                return;
            }
        }
        
        console.log('Final view:', view);
        navigate(view);
    } catch (error) {
        console.error('Init error:', error);
        alert('Error initializing: ' + error.message);
    }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    const path = window.location.pathname.toLowerCase();
    
    if (path === '/admin-login' || path === '/admin-login/') {
        navigate('admin-login');
    } else if (path === '/admin' || path === '/admin/') {
        navigate('admin');
    } else if (path.startsWith('/match/')) {
        const matchId = path.split('/')[2];
        if (matchId) {
            navigate('seat-picker', matchId);
        }
    } else if (path === '/matches') {
        navigate('matches');
    } else if (path === '/checkout') {
        navigate('checkout');
    } else {
        navigate('home');
    }
});

// Start app
init();
