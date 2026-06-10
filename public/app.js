// App State
const state = {
    currentView: 'home',
    language: 'en',
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

// Translations
const translations = {
    en: {
        title: 'FIFA World Cup 2026',
        subtitle: 'Ticket Sales Platform',
        home: 'Home',
        matches: 'Matches',
        admin: 'Admin',
        login: 'Login',
        logout: 'Logout',
        viewMatches: 'View Matches',
        featuredMatches: 'Featured Matches',
        selectSeats: 'Select Seats',
        checkout: 'Checkout',
        customerInfo: 'Customer Information',
        name: 'Full Name',
        whatsapp: 'WhatsApp Number',
        email: 'Email Address',
        country: 'Country',
        notes: 'Additional Notes',
        submitOrder: 'Proceed to Payment',
        orderSuccess: 'Order submitted successfully!',
        loading: 'Loading...',
        error: 'An error occurred',
        stadium: 'Stadium',
        city: 'City',
        price: 'Price',
        available: 'Available',
        reserved: 'Reserved',
        sold: 'Sold',
        selected: 'Selected',
        adminPanel: 'Admin Panel',
        dashboard: 'Dashboard',
        manageMatches: 'Manage Matches',
        manageOrders: 'Manage Orders',
        manageVisitors: 'Manage Visitors',
        manageSettings: 'Manage Settings',
        stats: 'Statistics',
        totalMatches: 'Total Matches',
        totalOrders: 'Total Orders',
        totalRevenue: 'Total Revenue',
        recentOrders: 'Recent Orders',
        addMatch: 'Add Match',
        edit: 'Edit',
        delete: 'Delete',
        duplicate: 'Duplicate',
        save: 'Save',
        cancel: 'Cancel',
        homeTeam: 'Home Team',
        awayTeam: 'Away Team',
        matchDate: 'Match Date',
        stage: 'Stage',
        minPrice: 'Minimum Price',
        isActive: 'Active',
        availablePercentage: 'Available Percentage',
        category: 'Category',
        seatNumber: 'Seat Number',
        section: 'Section',
        row: 'Row',
        ticketPrice: 'Ticket Price',
        paymentStatus: 'Payment Status',
        pending: 'Pending',
        confirmed: 'Confirmed',
        cancelled: 'Cancelled',
        paymentLink: 'Payment Link',
        visitors: 'Visitors',
        completedOrder: 'Completed Order',
        payNow: 'Pay Now',
        paymentSummary: 'Payment Summary',
        selectedSeatsCount: 'Selected Seats',
        totalAmount: 'Total Amount',
        // Seat picker
        seat: 'Seat',
        yourSelection: 'Your Selection',
        continue: 'Continue',
        clearSelection: 'Clear Selection',
        noSeatsSelected: 'No seats selected',
        seatDetails: 'Seat Details',
        // Admin
        moveUp: 'Move Up',
        moveDown: 'Move Down',
        addNewMatch: 'Add New Match',
        editMatch: 'Edit Match',
        deleteMatch: 'Delete Match',
        confirmDelete: 'Are you sure you want to delete this match?',
        matchOrder: 'Match Order',
        stadiumSelection: 'Stadium Selection',
        selectStadium: 'Select Stadium',
        seats: 'Seats',
        backToMatches: 'Back to Matches'
    },
    ar: {
        title: 'كأس العالم 2026',
        subtitle: 'منصة بيع التذاكر',
        home: 'الرئيسية',
        matches: 'المباريات',
        admin: 'الإدارة',
        login: 'تسجيل الدخول',
        logout: 'تسجيل الخروج',
        viewMatches: 'عرض المباريات',
        featuredMatches: 'المباريات المميزة',
        selectSeats: 'اختر المقاعد',
        checkout: 'إتمام الشراء',
        customerInfo: 'معلومات العميل',
        name: 'الاسم الكامل',
        whatsapp: 'رقم الواتساب',
        email: 'البريد الإلكتروني',
        country: 'الدولة',
        notes: 'ملاحظات إضافية',
        submitOrder: 'المتابعة للدفع',
        orderSuccess: 'تم إرسال الطلب بنجاح!',
        loading: 'جاري التحميل...',
        error: 'حدث خطأ',
        stadium: 'الملعب',
        city: 'المدينة',
        price: 'السعر',
        available: 'متاح',
        reserved: 'محجوز',
        sold: 'تم البيع',
        selected: 'محدد',
        adminPanel: 'لوحة الإدارة',
        dashboard: 'لوحة التحكم',
        manageMatches: 'إدارة المباريات',
        manageOrders: 'إدارة الطلبات',
        manageVisitors: 'إدارة الزوار',
        manageSettings: 'إدارة الإعدادات',
        stats: 'الإحصائيات',
        totalMatches: 'إجمالي المباريات',
        totalOrders: 'إجمالي الطلبات',
        totalRevenue: 'إجمالي الإيرادات',
        recentOrders: 'الطلبات الأخيرة',
        addMatch: 'إضافة مباراة',
        edit: 'تعديل',
        delete: 'حذف',
        duplicate: 'تكرار',
        save: 'حفظ',
        cancel: 'إلغاء',
        homeTeam: 'الفريق المضيف',
        awayTeam: 'الفريق الضيف',
        matchDate: 'تاريخ المباراة',
        stage: 'المرحلة',
        minPrice: 'الحد الأدنى للسعر',
        isActive: 'نشط',
        availablePercentage: 'نسبة المقاعد المتاحة',
        category: 'الفئة',
        seatNumber: 'رقم المقعد',
        section: 'القسم',
        row: 'الصف',
        ticketPrice: 'سعر التذكرة',
        paymentStatus: 'حالة الدفع',
        pending: 'قيد الانتظار',
        confirmed: 'مؤكد',
        cancelled: 'ملغي',
        paymentLink: 'رابط الدفع',
        visitors: 'الزوار',
        completedOrder: 'أكمل الطلب',
        payNow: 'ادفع الآن',
        paymentSummary: 'ملخص الدفع',
        selectedSeatsCount: 'المقاعد المحددة',
        totalAmount: 'المبلغ الإجمالي',
        // Seat picker
        seat: 'المقعد',
        yourSelection: 'اختيارك',
        continue: 'متابعة',
        clearSelection: 'مسح الاختيار',
        noSeatsSelected: 'لم يتم اختيار مقاعد',
        seatDetails: 'تفاصيل المقعد',
        // Admin
        moveUp: 'رفع للأعلى',
        moveDown: 'تنزيل للأسفل',
        addNewMatch: 'إضافة مباراة جديدة',
        editMatch: 'تعديل المباراة',
        deleteMatch: 'حذف المباراة',
        confirmDelete: 'هل أنت متأكد من حذف هذه المباراة؟',
        matchOrder: 'ترتيب المباراة',
        stadiumSelection: 'اختيار الملعب',
        selectStadium: 'اختر الملعب',
        seats: 'المقاعد',
        backToMatches: 'العودة للمباريات'
    }
};

// Helper Functions
function t(key) {
    return translations[state.language][key] || key;
}

function setLanguage(lang) {
    state.language = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
    render();
}

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
    return `
        <header>
            <div class="container header-content">
                <a href="#" class="logo" onclick="navigate('home'); return false;">⚽ ${t('title')}</a>
                <nav class="nav-links">
                    <a href="#" onclick="navigate('home'); return false;">${t('home')}</a>
                    <a href="#" onclick="navigate('matches'); return false;">${t('matches')}</a>
                    <button onclick="setLanguage('${state.language === 'en' ? 'ar' : 'en'}')" style="background: var(--primary); color: var(--bg-dark); border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                        ${state.language === 'en' ? 'العربية' : 'English'}
                    </button>
                </nav>
            </div>
        </header>
    `;
}

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
                    <div class="team-flag">${match.home_team_flag || '🏠'}</div>
                    <div class="team-name">${homeTeam}</div>
                </div>
                <div class="vs">VS</div>
                <div class="team">
                    <div class="team-flag">${match.away_team_flag || '✈️'}</div>
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
                        <div class="team-flag">${match.home_team_flag || '🏠'}</div>
                        <div class="team-name">${homeTeam}</div>
                    </div>
                    <div class="vs">VS</div>
                    <div class="team">
                        <div class="team-flag">${match.away_team_flag || '✈️'}</div>
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
                <button id="checkout-btn" class="cta-button" onclick="navigate('checkout')" style="margin-top: 15px;" disabled>${t('checkout')}</button>
            </div>
        `;
    } catch (error) {
        document.getElementById('match-detail').innerHTML = `<div class="error">${t('error')}</div>`;
    }
}

function toggleSeat(seatId, status, price) {
    if (status !== 'available') return;
    
    const seatEl = document.querySelector(`[data-seat-id="${seatId}"]`);
    const index = state.selectedSeats.findIndex(s => s.id === seatId);
    
    if (index > -1) {
        state.selectedSeats.splice(index, 1);
        seatEl.classList.remove('selected');
    } else {
        state.selectedSeats.push({ id: seatId, price });
        seatEl.classList.add('selected');
    }
    
    // Update summary
    const countEl = document.getElementById('selected-count');
    const priceEl = document.getElementById('selected-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (countEl) {
        countEl.textContent = state.selectedSeats.length;
    }
    
    if (priceEl) {
        priceEl.textContent = formatPrice(state.selectedSeats.reduce((sum, s) => sum + s.price, 0));
    }
    
    if (checkoutBtn) {
        checkoutBtn.disabled = state.selectedSeats.length === 0;
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
                            <td style="padding: 15px;">${match.home_team_flag || ''} ${match.home_team}</td>
                            <td style="padding: 15px;">${match.away_team_flag || ''} ${match.away_team}</td>
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
            <section class="matches-section">
                <div class="container">
                    <button onclick="navigate('admin-matches')" style="background: none; border: none; color: var(--primary); cursor: pointer; margin-bottom: 20px;">← ${t('manageMatches')}</button>
                    <h2 class="section-title">${t('addMatch')}</h2>
                    <div id="stadium-selector-loading" style="text-align: center; padding: 20px;">
                        <div class="loading-spinner"></div>
                    </div>
                    <form id="add-match-form" style="max-width: 800px; display: none;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div class="form-group">
                                <label>${t('homeTeam')} (EN)</label>
                                <input type="text" name="homeTeam" required>
                            </div>
                            <div class="form-group">
                                <label>${t('homeTeam')} (AR)</label>
                                <input type="text" name="homeTeamAr" required>
                            </div>
                            <div class="form-group">
                                <label>${t('awayTeam')} (EN)</label>
                                <input type="text" name="awayTeam" required>
                            </div>
                            <div class="form-group">
                                <label>${t('awayTeam')} (AR)</label>
                                <input type="text" name="awayTeamAr" required>
                            </div>
                            <div class="form-group">
                                <label>Home Team Flag (Emoji)</label>
                                <input type="text" name="homeTeamFlag" placeholder="🇧🇷">
                            </div>
                            <div class="form-group">
                                <label>Away Team Flag (Emoji)</label>
                                <input type="text" name="awayTeamFlag" placeholder="🇦🇷">
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
        
        const matchData = {
            homeTeam: formData.get('homeTeam'),
            homeTeamAr: formData.get('homeTeamAr'),
            awayTeam: formData.get('awayTeam'),
            awayTeamAr: formData.get('awayTeamAr'),
            homeTeamFlag: formData.get('homeTeamFlag') || '',
            awayTeamFlag: formData.get('awayTeamFlag') || '',
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
            <section class="matches-section">
                <div class="container">
                    <button onclick="navigate('admin-matches')" style="background: none; border: none; color: var(--primary); cursor: pointer; margin-bottom: 20px;">← ${t('manageMatches')}</button>
                    <h2 class="section-title">${t('editMatch')}</h2>
                    <div id="edit-match-form">
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
                    <input type="text" name="home_team" value="${match.home_team || ''}" required>
                </div>
                <div class="form-group">
                    <label>الفريق (عربي)</label>
                    <input type="text" name="home_team_ar" value="${match.home_team_ar || ''}" required>
                </div>
                <div class="form-group">
                    <label>علم الفريق</label>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img id="home_team_flag_preview" src="${match.home_team_flag || ''}" style="width: 40px; height: 30px; object-fit: contain; border: 1px solid #ddd; border-radius: 4px; ${!match.home_team_flag ? 'display:none' : ''}">
                        <select name="home_team_flag" onchange="updateFlagPreview(this, 'home_team_flag_preview')" style="flex: 1;">
                            <option value="">اختر العلم...</option>
                        </select>
                    </div>
                    <input type="hidden" id="home_team_flag_value" value="${match.home_team_flag || ''}">
                </div>
                
                <h3 style="margin-top: 20px; color: var(--primary);">الفريق الثاني</h3>
                <div class="form-group">
                    <label>الفريق (إنجليزي)</label>
                    <input type="text" name="away_team" value="${match.away_team || ''}" required>
                </div>
                <div class="form-group">
                    <label>الفريق (عربي)</label>
                    <input type="text" name="away_team_ar" value="${match.away_team_ar || ''}" required>
                </div>
                <div class="form-group">
                    <label>رابط علم الفريق</label>
                    <input type="text" name="away_team_flag" value="${match.away_team_flag || ''}" placeholder="https://flagcdn.com/w80/xx.png">
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
    
    // Initialize flag selects
    setTimeout(initFlagSelects, 100);
}

async function updateMatch(event, matchId) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
        await fetchAPI(`/matches/${matchId}`, {
            method: 'PUT',
            body: JSON.stringify({
                home_team: formData.get('home_team'),
                home_team_ar: formData.get('home_team_ar'),
                home_team_flag: formData.get('home_team_flag'),
                away_team: formData.get('away_team'),
                away_team_ar: formData.get('away_team_ar'),
                away_team_flag: formData.get('away_team_flag'),
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
                    <h2 class="section-title">${t('manageVisitors')}</h2>
                    <div id="visitors-list">
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
        const visitors = await fetchAPI('/visitors');
        const container = document.getElementById('visitors-list');
        container.innerHTML = `
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: var(--bg-card-hover);">
                        <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--border);">Session ID</th>
                        <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--border);">${t('matches')}</th>
                        <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--border);">Visited At</th>
                        <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--border);">${t('completedOrder')}</th>
                    </tr>
                </thead>
                <tbody>
                    ${visitors.map(visitor => `
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 15px;">${visitor.session_id}</td>
                            <td style="padding: 15px;">${visitor.match_name || 'N/A'}</td>
                            <td style="padding: 15px;">${new Date(visitor.visited_at).toLocaleString()}</td>
                            <td style="padding: 15px;">${visitor.completed_order ? '✅' : '❌'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        document.getElementById('visitors-list').innerHTML = `<div class="error">${t('error')}</div>`;
    }
}

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
            const remainingAvailable = availableCount - selectedFromRow;
            
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
                        <button class="add-btn ${hasSelection ? 'added' : ''}" onclick="selectRowSeats('${sectionId}', '${rowId}')" ${remainingAvailable === 0 ? 'disabled' : ''}>+</button>
                    </div>
                </div>
            `;
        }
        
        html += '</div>';
    }
    
    return html;
}

// Show specific section on mobile
function showMobileSection(sectionId, btn) {
    window.currentSection = sectionId;
    
    // Update tab buttons
    document.querySelectorAll('.section-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Show/hide sections
    document.querySelectorAll('.section-group-mobile').forEach(g => g.classList.add('hidden'));
    document.getElementById(`mobile-section-${sectionId}`).classList.remove('hidden');
}

// Select one seat from a row
function selectRowSeats(sectionId, rowId, availableCount, price) {
    const section = window.currentSeatsData[sectionId];
    const seats = section.rows[rowId];
    const availableSeats = seats.filter(s => s.status === 'available');
    
    // Find first available seat that's not already selected
    for (const seat of availableSeats) {
        const key = `${seat.section}-${seat.row}-${seat.seat_number}`;
        if (!state.selectedSeats.some(s => s.key === key)) {
            state.selectedSeats.push({
                key: key,
                id: seat.id,
                price: seat.price,
                sectionId: seat.section,
                rowId: seat.row,
                seatNumber: seat.seat_number
            });
            break; // Only add 1 seat
        }
    }
    
    updateMobileSelectionUI();
}

// Remove one seat from a row
function removeRowSeats(sectionId, rowId) {
    const section = window.currentSeatsData[sectionId];
    const seats = section.rows[rowId];
    
    // Find the last selected seat from this row and remove only 1
    for (let i = state.selectedSeats.length - 1; i >= 0; i--) {
        const selected = state.selectedSeats[i];
        if (selected.sectionId === sectionId && selected.rowId === rowId) {
            state.selectedSeats.splice(i, 1);
            break; // Only remove 1 seat
        }
    }
    
    updateMobileSelectionUI();
}

// Update mobile selection UI
function updateMobileSelectionUI() {
    // Update count and total
    document.getElementById('mobile-seat-count').textContent = state.selectedSeats.length;
    document.getElementById('mobile-seat-total').textContent = '$' + state.selectedSeats.reduce((sum, s) => sum + s.price, 0).toFixed(2);
    
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
const countryCodes = {
    'mexico': 'mx', 'mx': 'mx',
    'south africa': 'za', 'za': 'za',
    'south korea': 'kr', 'korea': 'kr', 'kr': 'kr',
    'czech': 'cz', 'czechia': 'cz', 'cz': 'cz',
    'canada': 'ca', 'ca': 'ca',
    'bosnia': 'ba', 'bosnia herzegovina': 'ba', 'ba': 'ba',
    'usa': 'us', 'united states': 'us', 'us': 'us',
    'paraguay': 'py', 'py': 'py',
    'brazil': 'br', 'br': 'br',
    'argentina': 'ar', 'ar': 'ar',
    'germany': 'de', 'de': 'de',
    'france': 'fr', 'fr': 'fr',
    'spain': 'es', 'es': 'es',
    'england': 'gb', 'gb': 'gb', 'uk': 'gb',
    'italy': 'it', 'it': 'it',
    'portugal': 'pt', 'pt': 'pt',
    'netherlands': 'nl', 'nl': 'nl',
    'belgium': 'be', 'be': 'be',
    'japan': 'jp', 'jp': 'jp',
    'australia': 'au', 'au': 'au',
    'morocco': 'ma', 'ma': 'ma',
    'senegal': 'sn', 'sn': 'sn',
    'egypt': 'eg', 'eg': 'eg',
    'nigeria': 'ng', 'ng': 'ng',
    'cameroon': 'cm', 'cm': 'cm',
    'ghana': 'gh', 'gh': 'gh',
    'algeria': 'dz', 'dz': 'dz',
    'tunisia': 'tn', 'tn': 'tn',
    'qatar': 'qa', 'qa': 'qa',
    'saudi': 'sa', 'saudi arabia': 'sa',
    'uae': 'ae', 'united arab emirates': 'ae', 'ae': 'ae',
    'switzerland': 'ch', 'ch': 'ch',
    'austria': 'at', 'at': 'at',
    'denmark': 'dk', 'dk': 'dk',
    'sweden': 'se', 'se': 'se',
    'norway': 'no', 'no': 'no',
    'poland': 'pl', 'pl': 'pl',
    'ukraine': 'ua', 'ua': 'ua',
    'russia': 'ru', 'ru': 'ru',
    'croatia': 'hr', 'hr': 'hr',
    'serbia': 'rs', 'rs': 'rs',
    'colombia': 'co', 'co': 'co',
    'peru': 'pe', 'pe': 'pe',
    'chile': 'cl', 'cl': 'cl',
    'ecuador': 'ec', 'ec': 'ec',
    'uruguay': 'uy', 'uy': 'uy',
    'venezuela': 've', 've': 've'
};

function getCountryCode(teamName) {
    if (!teamName) return '';
    const lower = teamName.toLowerCase();
    return countryCodes[lower] || '';
}

function updateFlagFromSelect(select, previewId) {
    const preview = document.getElementById(previewId);
    if (select.value) {
        preview.src = select.value;
        preview.style.display = 'block';
    } else {
        preview.style.display = 'none';
    }
}

function autoDetectFlag(team) {
    const teamInput = document.querySelector('input[name="' + team + '_team"]');
    const select = document.getElementById(team + '_team_flag_select');
    const preview = document.getElementById(team + '_flag_preview');
    
    if (!teamInput || !select) return;
    
    const code = getCountryCode(teamInput.value);
    if (code) {
        const url = 'https://flagcdn.com/w80/' + code + '.png';
        // Find in select
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value.includes(code)) {
                select.selectedIndex = i;
                preview.src = url;
                preview.style.display = 'block';
                break;
            }
        }
    }
}

function autoSetFlag(teamInput, team) {
    const code = getCountryCode(teamInput.value);
    if (code) {
        autoDetectFlag(team);
    }
}

function initFlagSelects() {
    const teams = ['home', 'away'];
    teams.forEach(team => {
        const select = document.getElementById(team + '_team_flag_select');
        if (select) {
            const allCodes = [...new Set(Object.values(countryCodes))].sort();
            select.innerHTML = '<option value="">اختر...</option>';
            allCodes.forEach(code => {
                const opt = document.createElement('option');
                opt.value = 'https://flagcdn.com/w80/' + code + '.png';
                opt.textContent = code.toUpperCase();
                select.appendChild(opt);
            });
            
            // Set current value
            const preview = document.getElementById(team + '_flag_preview');
            if (preview && preview.src && preview.style.display !== 'none') {
                for (let i = 0; i < select.options.length; i++) {
                    if (select.options[i].value === preview.src) {
                        select.selectedIndex = i;
                        break;
                    }
                }
            }
        }
    });
}

function initFlagSelects() {
    // Auto-populate flag selects based on team names
    const homeSelect = document.querySelector('select[name="home_team_flag"]');
    const awaySelect = document.querySelector('select[name="away_team_flag"]');
    const homeTeam = document.querySelector('input[name="home_team"]')?.value || '';
    const awayTeam = document.querySelector('input[name="away_team"]')?.value || '';
    
    // Build options
    const allCodes = [...new Set(Object.values(countryCodes))].sort();
    
    [homeSelect, awaySelect].forEach((select, idx) => {
        if (!select) return;
        select.innerHTML = '<option value="">اختر العلم...</option>';
        allCodes.forEach(code => {
            const opt = document.createElement('option');
            opt.value = 'https://flagcdn.com/w80/' + code + '.png';
            opt.textContent = code.toUpperCase();
            select.appendChild(opt);
        });
    });
    
    // Set current values
    const homeVal = document.getElementById('home_team_flag_value')?.value || '';
    const awayVal = document.getElementById('away_team_flag_value')?.value || '';
    if (homeSelect && homeVal) homeSelect.value = homeVal;
    if (awaySelect && awayVal) awayVal && (awaySelect.value = awayVal);
}

// Initialize
function init() {
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
            navigate(view, matchId);
            return;
        }
    }
    
    navigate(view);
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
