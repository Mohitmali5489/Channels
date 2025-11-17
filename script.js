// =========================================
// 1. DATA & STATE MANAGEMENT
// =========================================

const getDemoDateString = (dayOffset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    return date.toISOString().split('T')[0];
};
const today = getDemoDateString(0);
const yesterday = getDemoDateString(-1);

// Application State
let state = {
    currentUser: {
        id: 4,
        name: 'Alex Green',
        initials: 'AG',
        avatarUrl: 'https://placehold.co/80x80/A3E635/FFFFFF?text=AG',
        points: 375,
        lifetimePoints: 375,
        email: 'alex.green@college.edu',
        joined: 'Sep 2025',
        studentId: '5207872',
        course: 'FYBCOM',
        departmentId: 'd3',
        mobile: '9850000000',
        checkInStreak: 15,
        isCheckedInToday: false
    },
    checkInReward: 10,
    leaderboard: [
        { id: 1, name: 'Jane Doe', initials: 'JD', course: 'FYBCOM', lifetimePoints: 520, departmentId: 'd1', avatarUrl: 'https://placehold.co/80x80/EAB308/FFFFFF?text=JD' },
        { id: 2, name: 'Mike Smith', initials: 'MS', course: 'SYBCOM', lifetimePoints: 410, departmentId: 'd2', avatarUrl: 'https://placehold.co/80x80/3B82F6/FFFFFF?text=MS' },
        { id: 3, name: 'Sarah Lee', initials: 'SL', course: 'TYBCOM', lifetimePoints: 395, departmentId: 'd1', avatarUrl: 'https://placehold.co/80x80/EC4899/FFFFFF?text=SL' },
        { id: 4, name: 'Alex Green', initials: 'AG', course: 'FYBCOM', lifetimePoints: 375, departmentId: 'd3', isCurrentUser: true, avatarUrl: 'https://placehold.co/80x80/A3E635/FFFFFF?text=AG' },
        { id: 5, name: 'Tom Wilson', initials: 'TW', course: 'SYBCOM', lifetimePoints: 280, departmentId: 'd3', avatarUrl: 'https://placehold.co/80x80/F97316/FFFFFF?text=TW' },
        { id: 6, name: 'Emily Chen', initials: 'EC', course: 'FYBCOM', lifetimePoints: 250, departmentId: 'd2', avatarUrl: 'https://placehold.co/80x80/8B5CF6/FFFFFF?text=EC' }
    ],
    departmentLeaderboard: [
        { id: 'd1', name: 'BSc IT', points: 4320 },
        { id: 'd2', name: 'BMS', points: 3980 },
        { id: 'd3', name: 'BAF', points: 3100 },
        { id: 'd4', name: 'BCom', points: 2500 },
        { id: 'd5', name: 'BA', points: 1800 },
    ],
    // ADOPTED FROM 4.html
    history: [
        { type: 'reward', description: 'Purchased Canteen Coupon', points: -25, date: '2025-10-24', icon: 'shopping-cart', kg: 0 },
        { type: 'challenge', description: 'Completed 7-Day Reusable Cup', points: 50, date: '2025-10-22', icon: 'award', kg: 0 },
        { type: 'recycle', description: 'Submitted 12 Bottles', points: 15, date: '2025-10-20', icon: 'recycle', kg: 0.5 },
        { type: 'event', description: 'Attended Park Cleanup', points: 75, date: '2025-10-18', icon: 'calendar-check', kg: 0 },
        { type: 'challenge', description: 'Completed Digital Notes Only', points: 15, date: '2025-10-15', icon: 'file-text', kg: 0 },
        { type: 'recycle', description: 'Submitted 30 Bottles', points: 30, date: '2025-10-10', icon: 'recycle', kg: 1.2 },
    ],
    dailyChallenges: [
        { id: 'c1', title: 'Selfie with a Tree', description: 'Upload a selfie with any tree on campus.', points_reward: 20, icon: 'camera', status: 'active', buttonText: 'Upload Selfie', type: 'upload' },
        { id: 'c2', title: 'Daily Eco-Quiz', description: 'Get 3/3 questions right to earn points.', points_reward: 15, icon: 'brain', status: 'active', buttonText: 'Start Quiz', type: 'quiz' },
        { id: 'c3', title: 'Spot a Reusable', description: 'Upload a photo of someone using a reusable bottle or cup.', points_reward: 10, icon: 'eye', status: 'active', buttonText: 'Upload Photo', type: 'upload' },
    ],
    events: [
        { id: 2, title: 'Workshop: Composting Basics', date: 'Nov 20, 2025', description: 'Learn how to turn food scraps into garden gold.', points: 30, status: 'upcoming' },
        { id: 3, title: 'Green Docu-Night', date: 'Nov 22, 2025', description: 'Screening of "A Plastic Ocean" with a discussion panel.', points: 20, status: 'upcoming' },
        { id: 1, title: 'Community Park Cleanup', date: 'Oct 28, 2025', description: 'Helped clean up Kalyan Central Park.', points: 75, status: 'attended' },
        { id: 4, title: 'Tree Planting Drive', date: 'Oct 15, 2025', description: 'Campus-wide tree planting initiative.', points: 50, status: 'missed' },
    ],
    // ADOPTED FROM 4.html (Full Structure)
    stores: [
        {
            storeId: 's1',
            storeName: 'Campus Canteen',
            storeLogo: 'https://placehold.co/100x100/F9A8D4/1F2937?text=Canteen',
            products: [
                {
                    productId: 'p1',
                    name: 'Veg Thali',
                    images: [
                        'https://placehold.co/400x300/F9A8D4/1F2937?text=Thali+1',
                        'https://placehold.co/400x300/FBCFE8/1F2937?text=Thali+2',
                        'https://placehold.co/400x300/FCE7F3/1F2937?text=Thali+3'
                    ],
                    description: 'A wholesome and delicious vegetarian thali, complete with dal, two vegetables, rice, roti, and a sweet dish. Perfect for a hearty lunch.',
                    features: ['100% Vegetarian', 'Daily changing menu', 'Freshly prepared'],
                    specifications: [
                        { key: 'Includes', value: 'Dal, 2 Sabzi, Roti, Rice, Sweet' },
                        { key: 'Availability', value: '11:00 AM - 2:00 PM' }
                    ],
                    originalPrice: 80, discountedPrice: 50, cost: 30,
                    popularity: 25,
                    instructions: 'Show this QR code at the canteen cashier (Counter 1) to get your discounted thali.'
                },
                {
                    productId: 'p2',
                    name: 'Samosa & Chai',
                    images: ['https://placehold.co/400x300/FBCFE8/1F2937?text=Chai'],
                    description: 'The classic college combo. One crispy, spicy samosa served with a hot cup of masala chai. Ideal for a quick snack.',
                    features: ['Freshly fried samosa', 'Strong masala chai'],
                    specifications: [
                        { key: 'Includes', value: '1 Samosa, 1 Cup Chai' },
                        { key: 'Availability', value: '8:00 AM - 5:00 PM' }
                    ],
                    originalPrice: 30, discountedPrice: 15, cost: 15,
                    popularity: 50,
                    instructions: 'Show this QR code at the canteen cashier (Counter 2).'
                },
                {
                    productId: 'p3',
                    name: 'Masala Dosa',
                    images: ['https://placehold.co/400x300/FCE7F3/1F2937?text=Dosa'],
                    description: 'A crispy rice crepe filled with a savory potato masala, served with sambar and coconut chutney. Made fresh to order.',
                    features: ['Crispy and golden', 'Spicy potato filling', 'Served with Sambar & Chutney'],
                    specifications: [
                        { key: 'Includes', value: '1 Dosa, Sambar, Chutney' },
                        { key: 'Availability', value: '8:00 AM - 11:00 AM' }
                    ],
                    originalPrice: 60, discountedPrice: 40, cost: 20,
                    popularity: 30,
                    instructions: 'Show this QR code at the canteen cashier (Counter 1).'
                }
            ]
        },
        {
            storeId: 's2',
            storeName: 'The Beanery',
            storeLogo: 'https://placehold.co/100x100/A5B4FC/1F2937?text=Bean',
            products: [
                {
                    productId: 'p4',
                    name: 'Large Cappuccino',
                    images: ['https://placehold.co/400x300/A5B4FC/1F2937?text=Coffee'],
                    description: 'A rich and foamy large cappuccino made with premium espresso beans. Customize with your choice of milk (dairy/non-dairy).',
                    features: ['Premium Arabica beans', 'Choice of milk', 'Topped with cocoa powder'],
                    specifications: [
                        { key: 'Size', value: 'Large (16 oz)' },
                        { key: 'Options', value: 'Soy, Almond, Oat milk available' }
                    ],
                    originalPrice: 120, discountedPrice: 80, cost: 40,
                    popularity: 40,
                    instructions: 'Show this QR code to the barista to redeem your discount.'
                },
                {
                    productId: 'p5',
                    name: 'Choco-chip Brownie',
                    images: ['https://placehold.co/400x300/C7D2FE/1F2937?text=Brownie'],
                    description: 'A fudgy, gooey chocolate brownie loaded with choco-chips. Served warm. Best paired with a coffee!',
                    features: ['Extra fudgy', 'Loaded with chocolate chips', 'Can be served warm'],
                    specifications: [
                        { key: 'Allergens', value: 'Contains Gluten, Dairy, Egg' },
                        { key: 'Serving', value: '1 Piece' }
                    ],
                    originalPrice: 70, discountedPrice: 50, cost: 20,
                    popularity: 28,
                    instructions: 'Show this QR code to the barista to redeem your discount.'
                }
            ]
        },
        {
            storeId: 's3',
            storeName: 'College Merch Store',
            storeLogo: 'https://placehold.co/100x100/86EFAC/1F2937?text=Merch',
            products: [
                {
                    productId: 'p6',
                    name: 'College Hoodie',
                    images: [
                        'https://placehold.co/400x300/86EFAC/1F2937?text=Hoodie+Front',
                        'https://placehold.co/400x300/BBF7D0/1F2937?text=Hoodie+Back',
                        'https://placehold.co/400x300/D1FAE5/1F2937?text=Hoodie+Logo'
                    ],
                    description: 'Show your college spirit with this comfortable and stylish hoodie. Features an embroidered college logo. Made from 100% cotton fleece.',
                    features: ['Embroidered logo', 'Soft cotton fleece', 'Kangaroo pocket'],
                    specifications: [
                        { key: 'Material', value: '100% Cotton' },
                        { key: 'Sizes', value: 'S, M, L, XL, XXL' },
                        { key: 'Color', value: 'Navy Blue, Grey' }
                    ],
                    originalPrice: 1000, discountedPrice: 800, cost: 200,
                    popularity: 15,
                    instructions: 'Show this QR at the merch store counter. Discount applicable on one hoodie.'
                },
                {
                    productId: 'p7',
                    name: 'Reusable Steel Bottle',
                    images: ['https://placehold.co/400x300/BBF7D0/1F2937?text=Bottle'],
                    description: 'A durable, insulated steel bottle to keep your drinks hot or cold. Eco-friendly and stylish, with a laser-etched college logo.',
                    features: ['Insulated (Hot/Cold)', 'Leak-proof lid', 'BPA-Free'],
                    specifications: [
                        { key: 'Capacity', value: '750ml' },
                        { key: 'Material', value: 'Stainless Steel' }
                    ],
                    originalPrice: 500, discountedPrice: 350, cost: 150,
                    popularity: 45,
                    instructions: 'Show this QR at the merch store counter. Discount applicable on one bottle.'
                }
            ]
        }
    ],
    userRewards: [
        { userRewardId: 'ur1', storeId: 's2', productId: 'p4', purchaseDate: '2025-10-26', status: 'active' },
        { userRewardId: 'ur2', storeId: 's1', productId: 'p2', purchaseDate: '2025-10-24', status: 'used', usedDate: '2025-10-25' },
        { userRewardId: 'ur3', storeId: 's1', productId: 'p1', purchaseDate: '2025-10-22', status: 'active' },
    ],
    nextUserRewardId: 4,
    levels: [
        { level: 1, title: 'Green Starter', minPoints: 0, nextMin: 1001 },
        { level: 2, title: 'Eco Learner', minPoints: 1001, nextMin: 2001 },
        { level: 3, title: 'Sustainability Leader', minPoints: 2001, nextMin: 4001 },
    ]
};

// =========================================
// 2. HELPERS & CORE
// =========================================

const getUserLevel = (points) => {
    let current = state.levels[0];
    for (let i = state.levels.length - 1; i >= 0; i--) {
        if (points >= state.levels[i].minPoints) {
            current = state.levels[i];
            break;
        }
    }
    const nextMin = current.nextMin || Infinity;
    let progress = 0;
    let progressText = "Max Level";
    if (nextMin !== Infinity) {
        const pointsInLevel = points - current.minPoints;
        const range = nextMin - current.minPoints;
        progress = Math.max(0, Math.min(100, (pointsInLevel / range) * 100));
        progressText = `${points} / ${nextMin} Pts`;
    }
    return { ...current, progress, progressText };
};

const getAllProducts = () => {
    let all = [];
    state.stores.forEach(store => {
        store.products.forEach(p => {
            all.push({ ...p, storeId: store.storeId, storeName: store.storeName, storeLogo: store.storeLogo });
        });
    });
    return all;
};

const getProduct = (storeId, productId) => {
    const store = state.stores.find(s => s.storeId === storeId);
    if (!store) return { store: null, product: null };
    const product = store.products.find(p => p.productId === productId);
    return { store, product };
};

// DOM Cache
const els = {
    pages: document.querySelectorAll('.page'),
    sidebar: document.getElementById('sidebar'),
    sidebarOverlay: document.getElementById('sidebar-overlay'),
    userPointsHeader: document.getElementById('user-points-header'),
    userNameGreeting: document.getElementById('user-name-greeting'),
    dailyCheckinBtn: document.getElementById('daily-checkin-button'),
    lbPodium: document.getElementById('lb-podium-container'),
    lbList: document.getElementById('lb-list-container'),
    lbLeafLayer: document.getElementById('lb-leaf-layer'),
    productGrid: document.getElementById('product-grid'),
    storeSearch: document.getElementById('store-search-input'),
    storeSearchClear: document.getElementById('store-search-clear'),
    sortBy: document.getElementById('sort-by-select'),
    challengesList: document.getElementById('challenges-page-list'),
    eventsList: document.getElementById('event-list'),
    allRewardsList: document.getElementById('all-rewards-list'),
    historyList: document.getElementById('history-list'),
    storeDetailPage: document.getElementById('store-detail-page'),
    productDetailPage: document.getElementById('product-detail-page'),
    purchaseModalOverlay: document.getElementById('purchase-modal-overlay'),
    purchaseModal: document.getElementById('purchase-modal'),
    qrModalOverlay: document.getElementById('qr-modal-overlay'),
    qrModal: document.getElementById('qr-modal')
};

// Navigation
const showPage = (pageId) => {
    els.pages.forEach(p => p.classList.remove('active'));
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');

    // Clear detail pages when navigating away
    if (pageId !== 'store-detail-page' && pageId !== 'product-detail-page') {
        els.storeDetailPage.innerHTML = '';
        els.productDetailPage.innerHTML = '';
    }

    document.querySelectorAll('.nav-item, .sidebar-nav-item').forEach(btn => {
        const onclickVal = btn.getAttribute('onclick');
        btn.classList.toggle('active', onclickVal && onclickVal.includes(`'${pageId}'`));
    });

    document.querySelector('.main-content').scrollTop = 0;

    if (pageId === 'dashboard') {
        renderDashboard();
        if(els.lbLeafLayer) els.lbLeafLayer.classList.add('hidden');
    } else if (pageId === 'leaderboard') {
        showLeaderboardTab(currentLeaderboardTab);
    } else if (pageId === 'rewards') {
        renderRewards();
        if(els.lbLeafLayer) els.lbLeafLayer.classList.add('hidden');
    } else if (pageId === 'my-rewards') {
        renderMyRewardsPage();
        if(els.lbLeafLayer) els.lbLeafLayer.classList.add('hidden');
    } else if (pageId === 'history') {
        renderHistory();
        if(els.lbLeafLayer) els.lbLeafLayer.classList.add('hidden');
    } else if (pageId === 'ecopoints') {
        renderEcoPointsPage();
        if(els.lbLeafLayer) els.lbLeafLayer.classList.add('hidden');
    } else if (pageId === 'challenges') {
        renderChallengesPage();
        if(els.lbLeafLayer) els.lbLeafLayer.classList.add('hidden');
    } else if (pageId === 'events') {
        renderEventsPage();
        if(els.lbLeafLayer) els.lbLeafLayer.classList.add('hidden');
    } else {
        if(els.lbLeafLayer) els.lbLeafLayer.classList.add('hidden');
    }

    toggleSidebar(true);
    lucide.createIcons();
};

const toggleSidebar = (forceClose = false) => {
    if (forceClose) {
        els.sidebar.classList.add('-translate-x-full');
        els.sidebarOverlay.classList.add('opacity-0');
        els.sidebarOverlay.classList.add('hidden');
    } else {
        els.sidebar.classList.toggle('-translate-x-full');
        els.sidebarOverlay.classList.toggle('hidden');
        els.sidebarOverlay.classList.toggle('opacity-0');
    }
};

const animatePointsUpdate = (newPoints) => {
    state.currentUser.points = newPoints;
    els.userPointsHeader.classList.add('points-pulse');
    els.userPointsHeader.textContent = newPoints;
    document.getElementById('user-points-sidebar').textContent = newPoints;
    setTimeout(() => els.userPointsHeader.classList.remove('points-pulse'), 400);
};

// =========================================
// 3. DASHBOARD & CHECK-IN (Updated for Modern Grey)
// =========================================

const renderDashboard = () => {
    const user = state.currentUser;
    els.userPointsHeader.textContent = user.points;
    els.userNameGreeting.textContent = user.name.split(' ')[0];
    
    document.getElementById('user-name-sidebar').textContent = user.name;
    document.getElementById('user-points-sidebar').textContent = user.points;
    const level = getUserLevel(user.lifetimePoints);
    document.getElementById('user-level-sidebar').textContent = level.title;
    document.getElementById('user-avatar-sidebar').src = user.avatarUrl;

    // Impact stats (Calculated from history)
    const recycledHistory = state.history.filter(h => h.type === 'recycle');
    const totalKg = recycledHistory.reduce((sum, h) => sum + (h.kg || 0), 0);
    document.getElementById('impact-recycled').textContent = `${totalKg.toFixed(1)} kg`;
    document.getElementById('impact-co2').textContent = `${(totalKg * 2).toFixed(1)} kg`;
    document.getElementById('impact-events').textContent = state.history.filter(h => h.type === 'event').length;

    renderCheckinButtonState();
};

const renderCheckinButtonState = () => {
    document.getElementById('dashboard-streak-text').textContent = `${state.currentUser.checkInStreak} Day Streak`;
    const btn = els.dailyCheckinBtn;
    const checkIcon = document.getElementById('checkin-check-icon');
    const subtext = document.getElementById('checkin-subtext');
    const doneText = document.getElementById('checkin-done-text');

    if (state.currentUser.isCheckedInToday) {
        btn.classList.add('checkin-completed'); // New Grey style
        btn.classList.remove('from-yellow-400', 'to-orange-400', 'dark:from-yellow-500', 'dark:to-orange-500', 'bg-gradient-to-r');
        
        btn.querySelector('h3').textContent = "Check-in Complete";
        subtext.style.display = 'none';
        doneText.classList.remove('hidden');
        checkIcon.classList.remove('hidden');
        
        btn.onclick = null; 
    } else {
        btn.classList.remove('checkin-completed');
        btn.classList.add('from-yellow-400', 'to-orange-400', 'dark:from-yellow-500', 'dark:to-orange-500', 'bg-gradient-to-r');
        
        btn.querySelector('h3').textContent = "Daily Check-in";
        subtext.style.display = 'block';
        doneText.classList.add('hidden');
        checkIcon.classList.add('hidden');
        
        btn.onclick = openCheckinModal;
    }
};

const checkinModal = document.getElementById('checkin-modal');
const openCheckinModal = () => {
    if (state.currentUser.isCheckedInToday) return;
    checkinModal.classList.add('open');
    checkinModal.classList.remove('invisible');
    
    const calendarContainer = document.getElementById('checkin-modal-calendar');
    calendarContainer.innerHTML = '';
    for (let i = -3; i <= 3; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        const isToday = i === 0;
        calendarContainer.innerHTML += `
            <div class="flex flex-col items-center text-xs ${isToday ? 'font-bold text-yellow-600 dark:text-yellow-400' : 'text-gray-500 dark:text-gray-400'}">
                <span class="mb-1">${['S','M','T','W','T','F','S'][d.getDay()]}</span>
                <span class="w-8 h-8 flex items-center justify-center rounded-full ${isToday ? 'bg-yellow-100 dark:bg-yellow-900' : ''}">${d.getDate()}</span>
            </div>
        `;
    }
    document.getElementById('checkin-modal-streak').textContent = `${state.currentUser.checkInStreak} Days`;
    document.getElementById('checkin-modal-button-container').innerHTML = `
        <button onclick="handleDailyCheckin()" class="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-green-700 shadow-lg transition-transform active:scale-95">
            Check-in &amp; Earn ${state.checkInReward} Points
        </button>
    `;
};

const closeCheckinModal = () => {
    checkinModal.classList.remove('open');
    setTimeout(() => checkinModal.classList.add('invisible'), 300);
};

const handleDailyCheckin = () => {
    state.currentUser.isCheckedInToday = true;
    state.currentUser.checkInStreak++;
    const newTotal = state.currentUser.points + state.checkInReward;
    state.history.unshift({
        type: 'checkin',
        description: 'Daily Check-in',
        points: state.checkInReward,
        date: today,
        icon: 'calendar-check'
    });
    animatePointsUpdate(newTotal);
    closeCheckinModal();
    renderDashboard();
};

// =========================================
// 4. NEW: CAMERA LOGIC (Challenges)
// =========================================

let currentCameraStream = null;
let currentChallengeIdForCamera = null;

const startCamera = async (challengeId) => {
    currentChallengeIdForCamera = challengeId;
    const modal = document.getElementById('camera-modal');
    const video = document.getElementById('camera-feed');
    
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('open'), 10);

    try {
        currentCameraStream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'user' } 
        });
        video.srcObject = currentCameraStream;
    } catch (err) {
        console.error("Camera error:", err);
        alert("Unable to access camera. Please check permissions.");
        closeCameraModal();
    }
};

const closeCameraModal = () => {
    const modal = document.getElementById('camera-modal');
    const video = document.getElementById('camera-feed');
    
    if (currentCameraStream) {
        currentCameraStream.getTracks().forEach(track => track.stop());
    }
    video.srcObject = null;
    modal.classList.remove('open');
    setTimeout(() => modal.classList.add('hidden'), 300);
};

const capturePhoto = () => {
    const video = document.getElementById('camera-feed');
    const canvas = document.getElementById('camera-canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Logic to "upload" and set pending
    const challenge = state.dailyChallenges.find(c => c.id === currentChallengeIdForCamera);
    if (challenge) {
        challenge.status = 'pending';
        challenge.buttonText = 'Pending Review';
        renderChallengesPage();
    }
    
    closeCameraModal();
    showPage('challenges');
};

const switchCamera = () => {
    // Basic implementation - usually requires stopping stream and restarting with different constraint
    alert("Switch camera functionality simulated.");
};


// =========================================
// 5. ECO-STORE (Logic from 4.html)
// =========================================

const renderRewards = () => {
    els.productGrid.innerHTML = '';
    let products = getAllProducts();

    const searchTerm = els.storeSearch.value.toLowerCase();
    if(searchTerm.length > 0) {
        products = products.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.storeName.toLowerCase().includes(searchTerm)
        );
    }
    els.storeSearchClear.classList.toggle('hidden', !searchTerm);

    const criteria = els.sortBy.value;
    products.sort((a, b) => {
        switch (criteria) {
            case 'points-lh': return a.cost - b.cost;
            case 'points-hl': return b.cost - a.cost;
            case 'price-lh': return a.discountedPrice - b.discountedPrice;
            case 'price-hl': return b.discountedPrice - a.discountedPrice;
            case 'popularity': default: return b.popularity - a.popularity;
        }
    });

    products.forEach(p => {
        els.productGrid.innerHTML += `
            <div class="w-full flex-shrink-0 glass-card border border-gray-200/60 dark:border-gray-700/80 rounded-2xl overflow-hidden flex flex-col cursor-pointer"
                 onclick="showProductDetailPage('${p.storeId}', '${p.productId}')">
                <img src="${p.images[0].replace('400x300', '300x225')}" class="w-full h-40 object-cover">
                <div class="p-3 flex flex-col flex-grow">
                    <div class="flex items-center mb-1">
                        <img src="${p.storeLogo.replace('100x100', '40x40')}" class="w-5 h-5 rounded-full mr-2 border dark:border-gray-600">
                        <p class="text-xs font-medium text-gray-600 dark:text-gray-400">${p.storeName}</p>
                    </div>
                    <p class="font-bold text-gray-800 dark:text-gray-100 text-sm truncate mt-1">${p.name}</p>
                    <div class="mt-auto pt-2">
                        <p class="text-xs text-gray-400 dark:text-gray-500 line-through">₹${p.originalPrice}</p>
                        <div class="flex items-center font-bold text-gray-800 dark:text-gray-100 my-1">
                            <span class="text-md text-green-700 dark:text-green-400">₹${p.discountedPrice}</span>
                            <span class="mx-1 text-gray-400 dark:text-gray-500 text-xs">+</span>
                            <i data-lucide="leaf" class="w-3 h-3 text-green-500 mr-1"></i>
                            <span class="text-sm text-green-700 dark:text-green-400">${p.cost}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    lucide.createIcons();
};

const showProductDetailPage = (storeId, productId) => {
    const { store, product } = getProduct(storeId, productId);
    if (!product) return;

    const images = product.images || [product.images[0]];
    let sliderImagesHTML = '';
    let sliderDotsHTML = '';

    images.forEach((img, index) => {
        sliderImagesHTML += `
            <img src="${img.replace('400x300', '600x400')}" class="slider-item w-full h-80 object-cover flex-shrink-0 rounded-3xl" data-index="${index}">
        `;
        sliderDotsHTML += `<button class="slider-dot w-2.5 h-2.5 rounded-full bg-white/60 dark:bg-gray-700/80 ${index === 0 ? 'active' : ''}"></button>`;
    });

    const featuresHTML = (product.features || []).map(f => `
        <li class="flex items-start space-x-2">
            <span class="mt-1 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center flex-shrink-0">
                <i data-lucide="check" class="w-3 h-3 text-emerald-600 dark:text-emerald-300"></i>
            </span>
            <span class="text-sm text-gray-700 dark:text-gray-300">${f}</span>
        </li>
    `).join('');

    const canAfford = state.currentUser.points >= product.cost;

    els.productDetailPage.innerHTML = `
        <div class="pb-8">
            <div class="relative">
                <div class="slider-container flex w-full overflow-x-auto snap-x snap-mandatory gap-4 px-4 pt-4 pb-10">
                    ${sliderImagesHTML}
                </div>
                <button onclick="showPage('rewards')" class="absolute top-6 left-6 p-2 glass-card rounded-full text-gray-700 dark:text-gray-200 !px-2 !py-2">
                    <i data-lucide="arrow-left" class="w-5 h-5"></i>
                </button>
                <div class="absolute bottom-5 left-0 right-0 flex justify-center items-center space-x-2 z-10">${sliderDotsHTML}</div>
            </div>
            <div class="px-4 -mt-6">
                <div class="glass-card p-6 rounded-3xl">
                    <div class="flex items-start justify-between gap-3 mb-2">
                        <div>
                            <h2 class="text-2xl font-extrabold text-gray-900 dark:text-gray-50">${product.name}</h2>
                            <div class="flex items-center mt-2">
                                <img src="${store.storeLogo.replace('100x100', '40x40')}" class="w-7 h-7 rounded-full mr-2 border">
                                <p class="text-xs font-medium text-gray-500 dark:text-gray-400">${store.storeName}</p>
                            </div>
                        </div>
                        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200">
                            ${product.cost} EcoPts
                        </span>
                    </div>
                    <div class="mt-4 space-y-5">
                        <div>
                            <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2"><i data-lucide="file-text" class="w-4 h-4"></i> Description</h3>
                            <p class="mt-1 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">${product.description}</p>
                        </div>
                        ${featuresHTML ? `<div><h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2"><i data-lucide="sparkles" class="w-4 h-4"></i> Highlights</h3><ul class="mt-2 space-y-2">${featuresHTML}</ul></div>` : ''}
                        <div class="pt-4 mt-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between gap-3">
                            <div>
                                <p class="text-xs text-gray-500 line-through">₹${product.originalPrice}</p>
                                <div class="flex items-center font-bold text-gray-800 dark:text-gray-100">
                                    <span class="text-xl text-emerald-700 dark:text-emerald-400">₹${product.discountedPrice}</span>
                                    <span class="mx-2 text-gray-400 text-sm">+</span>
                                    <i data-lucide="leaf" class="w-4 h-4 text-emerald-500 mr-1"></i>
                                    <span class="text-xl text-emerald-700">${product.cost}</span>
                                </div>
                            </div>
                            <button onclick="openPurchaseModal('${store.storeId}', '${product.productId}')" class="btn-eco-gradient text-white text-sm font-semibold py-3 px-5 rounded-xl flex-shrink-0 ${canAfford ? '' : 'opacity-60 cursor-not-allowed'}">
                                ${canAfford ? 'Redeem Offer' : 'Not enough points'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    els.pages.forEach(p => p.classList.remove('active'));
    els.productDetailPage.classList.add('active');
    document.querySelector('.main-content').scrollTop = 0;
    lucide.createIcons();
};

const openPurchaseModal = (storeId, productId) => {
    const { store, product } = getProduct(storeId, productId);
    if (!product) return;

    els.purchaseModal.innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100">Purchase Reward</h3>
            <button onclick="closePurchaseModal()" class="text-gray-400"><i data-lucide="x" class="w-6 h-6"></i></button>
        </div>
        <div class="flex items-center mb-4">
            <img src="${product.images[0].replace('400x300', '100x100')}" class="w-20 h-20 object-cover rounded-lg mr-4">
            <div>
                <h4 class="text-lg font-bold text-gray-800 dark:text-gray-100">${product.name}</h4>
                <p class="text-sm text-gray-500 mb-2">From ${store.storeName}</p>
                <div class="flex items-center font-bold text-gray-800 dark:text-gray-100">
                    <span class="text-lg text-green-700 dark:text-green-400">₹${product.discountedPrice}</span>
                    <span class="mx-1 text-gray-400">+</span>
                    <i data-lucide="leaf" class="w-4 h-4 text-green-500 mr-1"></i>
                    <span class="text-lg text-green-700">${product.cost}</span>
                </div>
            </div>
        </div>
        <button onclick="confirmPurchase('${store.storeId}', '${product.productId}')" class="w-full btn-eco-gradient text-white font-bold py-3 px-4 rounded-lg mb-2">Confirm Purchase</button>
        <button onclick="closePurchaseModal()" class="w-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold py-3 px-4 rounded-lg">Cancel</button>
    `;
    
    els.purchaseModalOverlay.classList.remove('hidden');
    setTimeout(() => els.purchaseModal.classList.remove('translate-y-full'), 10);
    lucide.createIcons();
};

const closePurchaseModal = () => {
    els.purchaseModal.classList.add('translate-y-full');
    setTimeout(() => els.purchaseModalOverlay.classList.add('hidden'), 300);
};

const confirmPurchase = (storeId, productId) => {
    const { store, product } = getProduct(storeId, productId);
    if (!product || state.currentUser.points < product.cost) return;

    const newPoints = state.currentUser.points - product.cost;
    state.history.unshift({
        type: 'reward',
        description: `Purchased ${product.name}`,
        points: -product.cost,
        date: today.replaceAll('-', '/'),
        icon: 'shopping-cart',
        kg: 0
    });
    
    state.userRewards.unshift({
        userRewardId: 'ur' + state.nextUserRewardId++,
        storeId: store.storeId,
        productId: product.productId,
        purchaseDate: today.replaceAll('-', '/'),
        status: 'active'
    });

    animatePointsUpdate(newPoints);
    renderRewards();
    closePurchaseModal();
    showPage('my-rewards');
};

// =========================================
// 6. MY ORDERS & HISTORY (Logic from 4.html)
// =========================================

const renderMyRewardsPage = () => {
    els.allRewardsList.innerHTML = '';
    if (!state.userRewards.length) {
        els.allRewardsList.innerHTML = `<p class="text-sm text-center text-gray-500">No orders yet.</p>`;
        return;
    }
    state.userRewards.forEach(ur => {
        const { store, product } = getProduct(ur.storeId, ur.productId);
        if (!product) return;
        els.allRewardsList.innerHTML += `
            <div class="glass-card p-4 rounded-2xl flex items-center justify-between">
                <div class="flex items-center">
                    <img src="${product.images[0].replace('400x300', '100x100')}" class="w-14 h-14 rounded-lg object-cover mr-3">
                    <div>
                        <p class="text-sm font-bold text-gray-900 dark:text-gray-100">${product.name}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">From ${store.storeName}</p>
                        <p class="text-xs text-gray-400 mt-1">${ur.purchaseDate}</p>
                    </div>
                </div>
                <button onclick="openRewardQrModal('${ur.userRewardId}')" class="text-xs font-semibold px-3 py-2 rounded-full bg-emerald-600 text-white">View QR</button>
            </div>
        `;
    });
};

const openRewardQrModal = (userRewardId) => {
    const ur = state.userRewards.find(r => r.userRewardId === userRewardId);
    if (!ur) return;
    const { store, product } = getProduct(ur.storeId, ur.productId);
    
    els.qrModal.innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100">Reward QR</h3>
            <button onclick="closeQrModal()" class="text-gray-400"><i data-lucide="x" class="w-6 h-6"></i></button>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">Show this QR at <strong>${store.storeName}</strong> to redeem <strong>${product.name}</strong>.</p>
        <div class="flex justify-center mb-4">
            <img src="https://placehold.co/180x180/10B981/FFFFFF?text=QR+${userRewardId}" class="rounded-lg border">
        </div>
        <button onclick="closeQrModal()" class="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg">Close</button>
    `;
    els.qrModalOverlay.classList.remove('hidden');
    setTimeout(() => els.qrModal.classList.remove('translate-y-full'), 10);
    lucide.createIcons();
};

const closeQrModal = () => {
    els.qrModal.classList.add('translate-y-full');
    setTimeout(() => els.qrModalOverlay.classList.add('hidden'), 300);
};

const renderHistory = () => {
    els.historyList.innerHTML = '';
    state.history.forEach(h => {
        els.historyList.innerHTML += `
            <div class="glass-card p-3 rounded-xl flex items-center justify-between">
                <div class="flex items-center">
                    <span class="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                        <i data-lucide="${h.icon}" class="w-5 h-5 text-gray-700 dark:text-gray-200"></i>
                    </span>
                    <div>
                        <p class="text-sm font-semibold text-gray-800 dark:text-gray-100">${h.description}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">${h.date}</p>
                    </div>
                </div>
                <span class="text-sm font-bold ${h.points >= 0 ? 'text-green-600' : 'text-red-500'}">
                    ${h.points > 0 ? '+' : ''}${h.points}
                </span>
            </div>
        `;
    });
    lucide.createIcons();
};

// =========================================
// 7. CHALLENGES & EVENTS
// =========================================

const renderChallengesPage = () => {
    els.challengesList.innerHTML = '';
    state.dailyChallenges.forEach(c => {
        let buttonHTML = '';
        if (c.status === 'active') {
            const onclick = c.type === 'quiz' ? `openEcoQuizModal('${c.id}')` : `startCamera('${c.id}')`;
            buttonHTML = `<button onclick="${onclick}" class="text-xs font-semibold px-3 py-2 rounded-full bg-green-600 text-white">${c.buttonText}</button>`;
        } else if (c.status === 'pending') {
            buttonHTML = `<button class="text-xs font-semibold px-3 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 cursor-not-allowed">Pending Review</button>`;
        }
        els.challengesList.innerHTML += `
            <div class="glass-card p-4 rounded-2xl flex items-start">
                <div class="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center mr-3">
                    <i data-lucide="${c.icon}" class="w-5 h-5 text-green-600 dark:text-green-300"></i>
                </div>
                <div class="flex-1">
                    <h3 class="font-bold text-gray-900 dark:text-gray-100">${c.title}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${c.description}</p>
                    <div class="flex items-center justify-between mt-3">
                        <span class="text-xs font-semibold text-green-700 dark:text-green-300">+${c.points_reward} pts</span>
                        ${buttonHTML}
                    </div>
                </div>
            </div>
        `;
    });
    lucide.createIcons();
};

const renderEventsPage = () => {
    els.eventsList.innerHTML = '';
    state.events.forEach(e => {
        let statusButton = '';
        if (e.status === 'upcoming') {
            statusButton = `<button class="w-full bg-green-600 text-white text-sm font-semibold py-2 rounded-lg flex items-center justify-center space-x-2"><i data-lucide="ticket" class="w-4 h-4"></i><span>RSVP +${e.points} pts</span></button>`;
        } else if (e.status === 'attended') {
            statusButton = `<div class="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-200 font-bold py-2 px-4 rounded-lg text-sm w-full flex items-center justify-center space-x-2"><i data-lucide="check-circle" class="w-4 h-4"></i><span>Attended (+${e.points} pts)</span></div>`;
        } else {
             statusButton = `<div class="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-bold py-2 px-4 rounded-lg text-sm w-full flex items-center justify-center space-x-2"><i data-lucide="x-circle" class="w-4 h-4"></i><span>Missed</span></div>`;
        }
        els.eventsList.innerHTML += `
            <div class="glass-card p-4 rounded-2xl ${e.status === 'missed' ? 'opacity-60' : ''}">
                <div class="flex items-start">
                    <div class="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg mr-4"><i data-lucide="calendar" class="w-6 h-6 text-purple-600 dark:text-purple-400"></i></div>
                    <div class="flex-grow">
                        <p class="text-xs font-semibold text-purple-600 dark:text-purple-400">${e.date}</p>
                        <h3 class="font-bold text-gray-800 dark:text-gray-100 text-lg">${e.title}</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">${e.description}</p>
                        ${statusButton}
                    </div>
                </div>
            </div>
        `;
    });
    lucide.createIcons();
};

// =========================================
// 8. LEADERBOARD (Modern)
// =========================================
let currentLeaderboardTab = 'student';

const showLeaderboardTab = (tab) => {
    currentLeaderboardTab = tab;
    const btnStudent = document.getElementById('leaderboard-tab-student');
    const btnDept = document.getElementById('leaderboard-tab-dept');
    const contentStudent = document.getElementById('leaderboard-content-student');
    const contentDept = document.getElementById('leaderboard-content-department');

    if (tab === 'department') {
        btnDept.classList.add('active');
        btnStudent.classList.remove('active');
        contentDept.classList.remove('hidden');
        contentStudent.classList.add('hidden');
        if(els.lbLeafLayer) els.lbLeafLayer.classList.add('hidden');
        renderDepartmentLeaderboard();
    } else {
        btnStudent.classList.add('active');
        btnDept.classList.remove('active');
        contentStudent.classList.remove('hidden');
        contentDept.classList.add('hidden');
        if(els.lbLeafLayer) els.lbLeafLayer.classList.remove('hidden');
        renderStudentLeaderboard();
    }
};

const renderDepartmentLeaderboard = () => {
    const container = document.getElementById('eco-wars-page-list');
    container.innerHTML = '';
    state.departmentLeaderboard
        .sort((a, b) => b.points - a.points)
        .forEach((dept, index) => {
            container.innerHTML += `
                <div class="glass-card p-3 rounded-2xl flex items-center justify-between">
                    <div class="flex items-center">
                        <span class="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center mr-3 text-xs font-bold text-emerald-700 dark:text-emerald-200">#${index + 1}</span>
                        <div>
                            <p class="font-semibold text-gray-800 dark:text-gray-100">${dept.name}</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">${dept.points.toLocaleString()} pts</p>
                        </div>
                    </div>
                </div>
            `;
        });
};

const renderStudentLeaderboard = () => {
    const sorted = [...state.leaderboard].sort((a, b) => b.lifetimePoints - a.lifetimePoints);
    const rank1 = sorted[0], rank2 = sorted[1], rank3 = sorted[2];
    const rest = sorted.slice(3);

    els.lbPodium.innerHTML = `
        <div class="podium">
            <div class="champ"><div class="badge silver">${rank2 ? rank2.initials : 'N/A'}</div><div class="champ-name">${rank2 ? rank2.name : '-'}</div><div class="champ-points">${rank2 ? rank2.lifetimePoints : 0} pts</div><div class="rank">2nd</div></div>
            <div class="champ"><div class="badge gold">${rank1 ? rank1.initials : 'N/A'}</div><div class="champ-name">${rank1 ? rank1.name : '-'}</div><div class="champ-points">${rank1 ? rank1.lifetimePoints : 0} pts</div><div class="rank">1st</div></div>
            <div class="champ"><div class="badge bronze">${rank3 ? rank3.initials : 'N/A'}</div><div class="champ-name">${rank3 ? rank3.name : '-'}</div><div class="champ-points">${rank3 ? rank3.lifetimePoints : 0} pts</div><div class="rank">3rd</div></div>
        </div>
    `;

    els.lbList.innerHTML = '';
    rest.forEach((user) => {
        els.lbList.innerHTML += `
            <div class="item ${user.isCurrentUser ? 'is-me' : ''}">
                <div class="user"><div class="circle">${user.initials}</div><div class="user-info"><strong>${user.name} ${user.isCurrentUser ? '(You)' : ''}</strong><span class="sub-class">${user.course}</span></div></div>
                <div class="points-display">${user.lifetimePoints} pts</div>
            </div>
        `;
    });
};

// =========================================
// 9. INIT & LISTENERS
// =========================================

// Profile & Ecopoints Page Renders (Basic implementation for navigation completeness)
const renderProfile = () => {
    const u = state.currentUser;
    const l = getUserLevel(u.lifetimePoints);
    document.getElementById('profile-name').textContent = u.name;
    document.getElementById('profile-email').textContent = u.email;
    document.getElementById('profile-avatar').src = u.avatarUrl;
    document.getElementById('profile-joined').textContent = 'Joined ' + u.joined;
    document.getElementById('profile-level-title').textContent = l.title;
    document.getElementById('profile-level-number').textContent = l.level;
    document.getElementById('profile-level-progress').style.width = l.progress + '%';
    document.getElementById('profile-level-next').textContent = l.progressText;
    document.getElementById('profile-student-id').textContent = u.studentId;
    document.getElementById('profile-course').textContent = u.course;
    document.getElementById('profile-mobile').textContent = u.mobile;
    document.getElementById('profile-email-personal').textContent = u.email;
};

const renderEcoPointsPage = () => {
    const u = state.currentUser;
    const l = getUserLevel(u.lifetimePoints);
    document.getElementById('ecopoints-balance').textContent = u.points;
    document.getElementById('ecopoints-level-title').textContent = l.title;
    document.getElementById('ecopoints-level-number').textContent = l.level;
    document.getElementById('ecopoints-level-progress').style.width = l.progress + '%';
    document.getElementById('ecopoints-level-next').textContent = l.progressText;
    
    const actContainer = document.getElementById('ecopoints-recent-activity');
    actContainer.innerHTML = '';
    state.history.slice(0,4).forEach(h => {
        actContainer.innerHTML += `<div class="flex items-center justify-between text-sm"><div class="flex items-center"><span class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3"><i data-lucide="${h.icon}" class="w-4 h-4 text-gray-600 dark:text-gray-300"></i></span><div><p class="font-semibold text-gray-800 dark:text-gray-100">${h.description}</p><p class="text-xs text-gray-500 dark:text-gray-400">${h.date}</p></div></div><span class="font-bold ${h.points >= 0 ? 'text-green-600' : 'text-red-500'}">${h.points > 0 ? '+' : ''}${h.points}</span></div>`;
    });
    
    const levelsContainer = document.getElementById('all-levels-list');
    levelsContainer.innerHTML = '';
    state.levels.forEach(lvl => {
         levelsContainer.innerHTML += `<div class="flex items-center"><span class="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mr-3 text-sm font-bold text-green-600 dark:text-green-300">${lvl.level}</span><div><p class="text-sm font-bold text-gray-800 dark:text-gray-100">${lvl.title}</p><p class="text-xs text-gray-500 dark:text-gray-400">${lvl.minPoints} pts required</p></div></div>`;
    });
};

els.storeSearch.addEventListener('input', renderRewards);
els.storeSearchClear.addEventListener('click', () => { els.storeSearch.value = ''; renderRewards(); });
els.sortBy.addEventListener('change', renderRewards);
document.getElementById('sidebar-toggle-btn').addEventListener('click', () => toggleSidebar());

// Theme Init
if (localStorage.getItem('eco-theme') === 'dark' || (!localStorage.getItem('eco-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    document.getElementById('theme-text').textContent = 'Dark Mode';
    document.getElementById('theme-icon').setAttribute('data-lucide', 'moon');
}
document.getElementById('theme-toggle-btn').addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('eco-theme', isDark ? 'dark' : 'light');
    document.getElementById('theme-text').textContent = isDark ? 'Dark Mode' : 'Light Mode';
    document.getElementById('theme-icon').setAttribute('data-lucide', isDark ? 'moon' : 'sun');
    lucide.createIcons();
});

// Startup
window.addEventListener('load', () => {
    renderDashboard();
    renderProfile();
    setTimeout(() => document.getElementById('app-loading').classList.add('loaded'), 800);
    lucide.createIcons();
});
