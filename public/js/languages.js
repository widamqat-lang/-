/**
 * Multi-language Support System
 * Languages: Spanish (es), English (en), Arabic (ar)
 */

// Global translations object
const translations = {
    es: {
        // Navigation & Header
        title: 'Copa Mundial de la FIFA 2026',
        subtitle: 'Plataforma de Venta de Entradas',
        home: 'Inicio',
        matches: 'Partidos',
        admin: 'Admin',
        login: 'Iniciar Sesión',
        logout: 'Cerrar Sesión',
        language: 'Idioma',
        settings: 'Configuración',

        // Home Page
        viewMatches: 'Ver Partidos',
        featuredMatches: 'Partidos Destacados',
        allMatches: 'Todos los Partidos',
        bookNow: 'Reservar Ahora',
        learnMore: 'Más Información',
        groupStage: 'Fase de Grupos',
        knockoutStage: 'Fase Eliminatoria',
        final: 'Final',

        // Match Details
        selectSeats: 'Seleccionar Asientos',
        checkout: 'Finalizar Compra',
        stadium: 'Estadio',
        city: 'Ciudad',
        matchDate: 'Fecha del Partido',
        stage: 'Etapa',
        minPrice: 'Precio Mínimo',
        homeTeam: 'Equipo Local',
        awayTeam: 'Equipo Visitante',
        vs: 'vs',

        // Seat Picker
        available: 'Disponible',
        reserved: 'Reservado',
        sold: 'Vendido',
        selected: 'Seleccionado',
        seat: 'Asiento',
        seats: 'Asientos',
        section: 'Sección',
        row: 'Fila',
        yourSelection: 'Tu Selección',
        continue: 'Continuar',
        clearSelection: 'Limpiar Selección',
        noSeatsSelected: 'No hay asientos seleccionados',
        seatDetails: 'Detalles del Asiento',
        ticketPrice: 'Precio de la Entrada',
        totalPrice: 'Precio Total',

        // Checkout Form
        customerInfo: 'Información del Cliente',
        name: 'Nombre Completo',
        whatsapp: 'Número de WhatsApp',
        email: 'Correo Electrónico',
        country: 'País',
        notes: 'Notas Adicionales',
        submitOrder: 'Proceder al Pago',
        orderSuccess: '¡Pedido enviado exitosamente!',

        // Payment
        paymentSummary: 'Resumen de Pago',
        selectedSeatsCount: 'Asientos Seleccionados',
        totalAmount: 'Monto Total',
        payNow: 'Pagar Ahora',
        paymentLink: 'Enlace de Pago',
        paymentStatus: 'Estado del Pago',
        pending: 'Pendiente',
        confirmed: 'Confirmado',
        cancelled: 'Cancelado',
        completedOrder: 'Pedido Completado',

        // Order Details
        orderId: 'ID del Pedido',
        orderDate: 'Fecha del Pedido',
        customerName: 'Nombre del Cliente',
        phone: 'Teléfono',
        quantity: 'Cantidad',

        // Loading & Errors
        loading: 'Cargando...',
        error: 'Ocurrió un error',
        tryAgain: 'Intentar de Nuevo',
        noResults: 'No se encontraron resultados',

        // Admin Panel
        adminPanel: 'Panel de Administración',
        dashboard: 'Panel de Control',
        manageMatches: 'Gestionar Partidos',
        manageOrders: 'Gestionar Pedidos',
        manageVisitors: 'Gestionar Visitantes',
        manageSettings: 'Configuración',
        stats: 'Estadísticas',
        totalMatches: 'Total de Partidos',
        totalOrders: 'Total de Pedidos',
        totalRevenue: 'Ingresos Totales',
        recentOrders: 'Pedidos Recientes',

        // Admin Actions
        addMatch: 'Agregar Partido',
        edit: 'Editar',
        delete: 'Eliminar',
        duplicate: 'Duplicar',
        save: 'Guardar',
        cancel: 'Cancelar',
        addNewMatch: 'Agregar Nuevo Partido',
        editMatch: 'Editar Partido',
        deleteMatch: 'Eliminar Partido',
        confirmDelete: '¿Estás seguro de que deseas eliminar este partido?',
        matchOrder: 'Orden del Partido',
        stadiumSelection: 'Selección del Estadio',
        selectStadium: 'Seleccionar Estadio',
        isActive: 'Activo',
        availablePercentage: 'Porcentaje Disponible',
        moveUp: 'Subir',
        moveDown: 'Bajar',
        backToMatches: 'Volver a Partidos',

        // Visitor Tracking
        visitors: 'Visitantes',
        activeVisitors: 'Visitantes Activos',
        trackActivity: 'Seguimiento de Actividad',

        // Form Labels
        fullName: 'Nombre Completo',
        emailAddress: 'Dirección de Correo',
        phoneNumber: 'Número de Telefóno',
        additionalNotes: 'Notas Adicionales',
        selectCountry: 'Seleccionar País',

        // Buttons
        proceed: 'Proceder',
        back: 'Atrás',
        close: 'Cerrar',
        submit: 'Enviar',
        confirm: 'Confirmar',
        reset: 'Restablecer',

        // Messages
        success: 'Éxito',
        warning: 'Advertencia',
        info: 'Información',
        required: 'Requerido',
        optional: 'Opcional',

        // Insurance Form
        insuranceTitle: 'Información del Seguro de Viaje',
        insuranceCompany: 'Compañía de Seguros',
        policyNumber: 'Número de Póliza',
        coverageStart: 'Inicio de Cobertura',
        coverageEnd: 'Fin de Cobertura',
        selectInsurance: 'Seleccionar Seguro',
        noInsurance: 'Sin Seguro de Viaje',

        // OTP Verification
        otpTitle: 'Verificación de Código',
        otpSent: 'Se ha enviado un código a tu WhatsApp',
        enterOtp: 'Ingresa el código de verificación',
        verify: 'Verificar',
        resendCode: 'Reenviar Código',
        invalidOtp: 'Código inválido',
        otpVerified: 'Código verificado exitosamente',

        // Payment Page
        paymentTitle: 'Procesar Pago',
        cardNumber: 'Número de Tarjeta',
        cardHolder: 'Titular de la Tarjeta',
        expiryDate: 'Fecha de Vencimiento',
        cvv: 'CVV',
        cardProgress: 'Progreso de Pago',

        // Footer
        copyright: 'Derechos Reservados',
        privacyPolicy: 'Política de Privacidad',
        termsOfService: 'Términos de Servicio',
        contactUs: 'Contáctenos',
        aboutUs: 'Acerca de Nosotros',

        // Misc
        seats_selected: 'asientos seleccionados',
        price_from: 'desde',
        match_time: 'Hora del Partido',
        stadium_map: 'Mapa del Estadio'
    },

    en: {
        // Navigation & Header
        title: 'FIFA World Cup 2026',
        subtitle: 'Ticket Sales Platform',
        home: 'Home',
        matches: 'Matches',
        admin: 'Admin',
        login: 'Login',
        logout: 'Logout',
        language: 'Language',
        settings: 'Settings',

        // Home Page
        viewMatches: 'View Matches',
        featuredMatches: 'Featured Matches',
        allMatches: 'All Matches',
        bookNow: 'Book Now',
        learnMore: 'Learn More',
        groupStage: 'Group Stage',
        knockoutStage: 'Knockout Stage',
        final: 'Final',

        // Match Details
        selectSeats: 'Select Seats',
        checkout: 'Checkout',
        stadium: 'Stadium',
        city: 'City',
        matchDate: 'Match Date',
        stage: 'Stage',
        minPrice: 'Minimum Price',
        homeTeam: 'Home Team',
        awayTeam: 'Away Team',
        vs: 'vs',

        // Seat Picker
        available: 'Available',
        reserved: 'Reserved',
        sold: 'Sold',
        selected: 'Selected',
        seat: 'Seat',
        seats: 'Seats',
        section: 'Section',
        row: 'Row',
        yourSelection: 'Your Selection',
        continue: 'Continue',
        clearSelection: 'Clear Selection',
        noSeatsSelected: 'No seats selected',
        seatDetails: 'Seat Details',
        ticketPrice: 'Ticket Price',
        totalPrice: 'Total Price',

        // Checkout Form
        customerInfo: 'Customer Information',
        name: 'Full Name',
        whatsapp: 'WhatsApp Number',
        email: 'Email Address',
        country: 'Country',
        notes: 'Additional Notes',
        submitOrder: 'Proceed to Payment',
        orderSuccess: 'Order submitted successfully!',

        // Payment
        paymentSummary: 'Payment Summary',
        selectedSeatsCount: 'Selected Seats',
        totalAmount: 'Total Amount',
        payNow: 'Pay Now',
        paymentLink: 'Payment Link',
        paymentStatus: 'Payment Status',
        pending: 'Pending',
        confirmed: 'Confirmed',
        cancelled: 'Cancelled',
        completedOrder: 'Completed Order',

        // Order Details
        orderId: 'Order ID',
        orderDate: 'Order Date',
        customerName: 'Customer Name',
        phone: 'Phone',
        quantity: 'Quantity',

        // Loading & Errors
        loading: 'Loading...',
        error: 'An error occurred',
        tryAgain: 'Try Again',
        noResults: 'No results found',

        // Admin Panel
        adminPanel: 'Admin Panel',
        dashboard: 'Dashboard',
        manageMatches: 'Manage Matches',
        manageOrders: 'Manage Orders',
        manageVisitors: 'Manage Visitors',
        manageSettings: 'Settings',
        stats: 'Statistics',
        totalMatches: 'Total Matches',
        totalOrders: 'Total Orders',
        totalRevenue: 'Total Revenue',
        recentOrders: 'Recent Orders',

        // Admin Actions
        addMatch: 'Add Match',
        edit: 'Edit',
        delete: 'Delete',
        duplicate: 'Duplicate',
        save: 'Save',
        cancel: 'Cancel',
        addNewMatch: 'Add New Match',
        editMatch: 'Edit Match',
        deleteMatch: 'Delete Match',
        confirmDelete: 'Are you sure you want to delete this match?',
        matchOrder: 'Match Order',
        stadiumSelection: 'Stadium Selection',
        selectStadium: 'Select Stadium',
        isActive: 'Active',
        availablePercentage: 'Available Percentage',
        moveUp: 'Move Up',
        moveDown: 'Move Down',
        backToMatches: 'Back to Matches',

        // Visitor Tracking
        visitors: 'Visitors',
        activeVisitors: 'Active Visitors',
        trackActivity: 'Track Activity',

        // Form Labels
        fullName: 'Full Name',
        emailAddress: 'Email Address',
        phoneNumber: 'Phone Number',
        additionalNotes: 'Additional Notes',
        selectCountry: 'Select Country',

        // Buttons
        proceed: 'Proceed',
        back: 'Back',
        close: 'Close',
        submit: 'Submit',
        confirm: 'Confirm',
        reset: 'Reset',

        // Messages
        success: 'Success',
        warning: 'Warning',
        info: 'Information',
        required: 'Required',
        optional: 'Optional',

        // Insurance Form
        insuranceTitle: 'Travel Insurance Information',
        insuranceCompany: 'Insurance Company',
        policyNumber: 'Policy Number',
        coverageStart: 'Coverage Start',
        coverageEnd: 'Coverage End',
        selectInsurance: 'Select Insurance',
        noInsurance: 'No Travel Insurance',

        // OTP Verification
        otpTitle: 'Code Verification',
        otpSent: 'A code has been sent to your WhatsApp',
        enterOtp: 'Enter verification code',
        verify: 'Verify',
        resendCode: 'Resend Code',
        invalidOtp: 'Invalid code',
        otpVerified: 'Code verified successfully',

        // Payment Page
        paymentTitle: 'Process Payment',
        cardNumber: 'Card Number',
        cardHolder: 'Card Holder',
        expiryDate: 'Expiry Date',
        cvv: 'CVV',
        cardProgress: 'Payment Progress',

        // Footer
        copyright: 'All Rights Reserved',
        privacyPolicy: 'Privacy Policy',
        termsOfService: 'Terms of Service',
        contactUs: 'Contact Us',
        aboutUs: 'About Us',

        // Misc
        seats_selected: 'seats selected',
        price_from: 'from',
        match_time: 'Match Time',
        stadium_map: 'Stadium Map'
    },

    ar: {
        // Navigation & Header
        title: 'كأس العالم 2026',
        subtitle: 'منصة بيع التذاكر',
        home: 'الرئيسية',
        matches: 'المباريات',
        admin: 'الإدارة',
        login: 'تسجيل الدخول',
        logout: 'تسجيل الخروج',
        language: 'اللغة',
        settings: 'الإعدادات',

        // Home Page
        viewMatches: 'عرض المباريات',
        featuredMatches: 'المباريات المميزة',
        allMatches: 'جميع المباريات',
        bookNow: 'احجز الآن',
        learnMore: 'اعرف المزيد',
        groupStage: 'دور المجموعات',
        knockoutStage: 'دور الإقصاء',
        final: 'النهائي',

        // Match Details
        selectSeats: 'اختر المقاعد',
        checkout: 'إتمام الشراء',
        stadium: 'الملعب',
        city: 'المدينة',
        matchDate: 'تاريخ المباراة',
        stage: 'المرحلة',
        minPrice: 'الحد الأدنى للسعر',
        homeTeam: 'الفريق المضيف',
        awayTeam: 'الفريق الضيف',
        vs: 'ضد',

        // Seat Picker
        available: 'متاح',
        reserved: 'محجوز',
        sold: 'تم البيع',
        selected: 'محدد',
        seat: 'المقعد',
        seats: 'المقاعد',
        section: 'القسم',
        row: 'الصف',
        yourSelection: 'اختيارك',
        continue: 'متابعة',
        clearSelection: 'مسح الاختيار',
        noSeatsSelected: 'لم يتم اختيار مقاعد',
        seatDetails: 'تفاصيل المقعد',
        ticketPrice: 'سعر التذكرة',
        totalPrice: 'السعر الإجمالي',

        // Checkout Form
        customerInfo: 'معلومات العميل',
        name: 'الاسم الكامل',
        whatsapp: 'رقم الواتساب',
        email: 'البريد الإلكتروني',
        country: 'الدولة',
        notes: 'ملاحظات إضافية',
        submitOrder: 'المتابعة للدفع',
        orderSuccess: 'تم إرسال الطلب بنجاح!',

        // Payment
        paymentSummary: 'ملخص الدفع',
        selectedSeatsCount: 'المقاعد المحددة',
        totalAmount: 'المبلغ الإجمالي',
        payNow: 'ادفع الآن',
        paymentLink: 'رابط الدفع',
        paymentStatus: 'حالة الدفع',
        pending: 'قيد الانتظار',
        confirmed: 'مؤكد',
        cancelled: 'ملغي',
        completedOrder: 'أكمل الطلب',

        // Order Details
        orderId: 'رقم الطلب',
        orderDate: 'تاريخ الطلب',
        customerName: 'اسم العميل',
        phone: 'الهاتف',
        quantity: 'الكمية',

        // Loading & Errors
        loading: 'جاري التحميل...',
        error: 'حدث خطأ',
        tryAgain: 'حاول مرة أخرى',
        noResults: 'لم يتم العثور على نتائج',

        // Admin Panel
        adminPanel: 'لوحة الإدارة',
        dashboard: 'لوحة التحكم',
        manageMatches: 'إدارة المباريات',
        manageOrders: 'إدارة الطلبات',
        manageVisitors: 'إدارة الزوار',
        manageSettings: 'الإعدادات',
        stats: 'الإحصائيات',
        totalMatches: 'إجمالي المباريات',
        totalOrders: 'إجمالي الطلبات',
        totalRevenue: 'إجمالي الإيرادات',
        recentOrders: 'الطلبات الأخيرة',

        // Admin Actions
        addMatch: 'إضافة مباراة',
        edit: 'تعديل',
        delete: 'حذف',
        duplicate: 'تكرار',
        save: 'حفظ',
        cancel: 'إلغاء',
        addNewMatch: 'إضافة مباراة جديدة',
        editMatch: 'تعديل المباراة',
        deleteMatch: 'حذف المباراة',
        confirmDelete: 'هل أنت متأكد من حذف هذه المباراة؟',
        matchOrder: 'ترتيب المباراة',
        stadiumSelection: 'اختيار الملعب',
        selectStadium: 'اختر الملعب',
        isActive: 'نشط',
        availablePercentage: 'نسبة المقاعد المتاحة',
        moveUp: 'رفع للأعلى',
        moveDown: 'تنزيل للأسفل',
        backToMatches: 'العودة للمباريات',

        // Visitor Tracking
        visitors: 'الزوار',
        activeVisitors: 'الزوار النشطون',
        trackActivity: 'تتبع النشاط',

        // Form Labels
        fullName: 'الاسم الكامل',
        emailAddress: 'عنوان البريد الإلكتروني',
        phoneNumber: 'رقم الهاتف',
        additionalNotes: 'ملاحظات إضافية',
        selectCountry: 'اختر الدولة',

        // Buttons
        proceed: 'متابعة',
        back: 'رجوع',
        close: 'إغلاق',
        submit: 'إرسال',
        confirm: 'تأكيد',
        reset: 'إعادة تعيين',

        // Messages
        success: 'نجاح',
        warning: 'تحذير',
        info: 'معلومات',
        required: 'مطلوب',
        optional: 'اختياري',

        // Insurance Form
        insuranceTitle: 'معلومات تأمين السفر',
        insuranceCompany: 'شركة التأمين',
        policyNumber: 'رقم البوليصة',
        coverageStart: 'بداية التغطية',
        coverageEnd: 'نهاية التغطية',
        selectInsurance: 'اختر التأمين',
        noInsurance: 'بدون تأمين سفر',

        // OTP Verification
        otpTitle: 'التحقق من الرمز',
        otpSent: 'تم إرسال رمز إلى واتساب الخاص بك',
        enterOtp: 'أدخل رمز التحقق',
        verify: 'تحقق',
        resendCode: 'إعادة إرسال الرمز',
        invalidOtp: 'رمز غير صالح',
        otpVerified: 'تم التحقق من الرمز بنجاح',

        // Payment Page
        paymentTitle: 'معالجة الدفع',
        cardNumber: 'رقم البطاقة',
        cardHolder: 'حامل البطاقة',
        expiryDate: 'تاريخ الانتهاء',
        cvv: 'CVV',
        cardProgress: 'تقدم الدفع',

        // Footer
        copyright: 'جميع الحقوق محفوظة',
        privacyPolicy: 'سياسة الخصوصية',
        termsOfService: 'شروط الخدمة',
        contactUs: 'اتصل بنا',
        aboutUs: 'من نحن',

        // Misc
        seats_selected: 'مقاعد محددة',
        price_from: 'يبدأ من',
        match_time: 'وقت المباراة',
        stadium_map: 'خريطة الملعب'
    }
};

// Language detection and initialization
function initLanguage() {
    // Get browser language
    const browserLang = navigator.language || navigator.userLanguage || 'en';
    
    // Determine default language based on browser
    let defaultLang = 'en';
    if (browserLang.startsWith('es')) {
        defaultLang = 'es';
    } else if (browserLang.startsWith('ar')) {
        defaultLang = 'ar';
    }
    
    // Check if user has manually selected a language before
    const savedLang = localStorage.getItem('selectedLanguage');
    
    // Use saved language if exists, otherwise use detected browser language
    return savedLang || defaultLang;
}

// Get translation for a key
function t(key) {
    if (!state) return key;
    const lang = state.language || 'en';
    return translations[lang]?.[key] || translations['en']?.[key] || key;
}

// Set language and persist (delegates to app.js implementation)
function setLanguage(lang) {
    if (state) {
        state.language = lang;
        localStorage.setItem('selectedLanguage', lang);
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    }
}

// Update language indicator in header
function updateLanguageIndicator() {
    const indicator = document.getElementById('lang-indicator');
    if (indicator) {
        const labels = { es: 'ES', en: 'EN', ar: 'عربي' };
        indicator.textContent = labels[state.language] || 'EN';
    }
}

// Get current language display name
function getCurrentLangDisplay() {
    const labels = {
        es: 'Español',
        en: 'English', 
        ar: 'العربية'
    };
    return labels[state.language] || 'English';
}

// Get available languages for selector
function getAvailableLanguages() {
    return [
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦' }
    ];
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.translations = translations;
    window.initLanguage = initLanguage;
    window.t = t;
    window.setLanguage = setLanguage;
    window.updateLanguageIndicator = updateLanguageIndicator;
    window.getCurrentLangDisplay = getCurrentLangDisplay;
    window.getAvailableLanguages = getAvailableLanguages;
}