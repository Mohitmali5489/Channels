// =========================================
// 1. DATA & STATE MANAGEMENT
// =========================================

// Demo date helpers
const getDemoDateString = (dayOffset = 0) => {
    const date = new Date('2025-11-17T10:00:00'); // Fixed base date for consistency
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
    // Leaderboard Data (Mixed verifiable users)
    leaderboard: [
        { id: 1, name: 'Jane Doe', initials: 'JD', course: 'FYBCOM', lifetimePoints: 520, departmentId: 'd1' },
        { id: 2, name: 'Mike Smith', initials: 'MS', course: 'SYBCOM', lifetimePoints: 410, departmentId: 'd2' },
        { id: 3, name: 'Sarah Lee', initials: 'SL', course: 'TYBCOM', lifetimePoints: 395, departmentId: 'd1' },
        { id: 4, name: 'Alex Green', initials: 'AG', course: 'FYBCOM', lifetimePoints: 375, departmentId: 'd3', isCurrentUser: true },
        { id: 5, name: 'Tom Wilson', initials: 'TW', course: 'SYBCOM', lifetimePoints: 280, departmentId: 'd3' },
        { id: 6, name: 'Emily Chen', initials: 'EC', course: 'FYBCOM', lifetimePoints: 250, departmentId: 'd2' },
        { id: 7, name: 'Rohan Patel', initials: 'RP', course: 'TYBCOM', lifetimePoints: 210, departmentId: 'd4' },
        { id: 8, name: 'Kavita Prasad', initials: 'KP', course: 'FYBCOM', lifetimePoints: 190, departmentId: 'd4' },
        { id: 9, name: 'David John', initials: 'DJ', course: 'SYBCOM', lifetimePoints: 170, departmentId: 'd2' },
    ],
    departmentLeaderboard: [
        { id: 'd1', name: 'BSc IT', points: 4320 },
        { id: 'd2', name: 'BMS', points: 3980 },
        { id: 'd3', name: 'BAF', points: 3100 },
        { id: 'd4', name: 'BCom', points: 2500 },
        { id: 'd5', name: 'BA', points: 1800 },
    ],
    history: [
        { type: 'reward', description: 'Purchased Canteen Coupon', points: -25, date: '2025-11-16', icon: 'shopping-cart' },
        { type: 'challenge', description: 'Completed 7-Day Reusable Cup', points: 50, date: '2025-11-14', icon: 'award' },
        { type: 'recycle', description: 'Submitted 12 Bottles', points: 15, date: '2025-11-12', icon: 'recycle' },
    ],
    // RESTORED: Full sample data for Challenges
    dailyChallenges: [
        { id: 'c1', title: 'Selfie with a Tree', description: 'Upload a selfie with any tree on campus.', points_reward: 20, icon: 'camera', status: 'active', buttonText: 'Upload Selfie', type: 'upload' },
        { id: 'c2', title: 'Daily Eco-Quiz', description: 'Get 3/3 questions right to earn points.', points_reward: 15, icon: 'brain', status: 'active', buttonText: 'Start Quiz', type: 'quiz' },
        { id: 'c3', title: 'Spot a Reusable', description: 'Upload a photo of someone using a reusable bottle or cup.', points_reward: 10, icon: 'eye', status: 'active', buttonText: 'Upload Photo', type: 'upload' },
    ],
    // RESTORED: Full sample data for Events
    events: [
        { id: 2, title: 'Workshop: Composting Basics', date: 'Nov 20, 2025', description: 'Learn how to turn food scraps into garden gold.', points: 30, status: 'upcoming' },
        { id: 3, title: 'Green Docu-Night', date: 'Nov 22, 2025', description: 'Screening of "A Plastic Ocean" with a discussion panel.', points: 20, status: 'upcoming' },
        { id: 1, title: 'Community Park Cleanup', date: 'Oct 28, 2025', description: 'Helped clean up Kalyan Central Park.', points: 75, status: 'attended' },
        { id: 4, title: 'Tree Planting Drive', date: 'Oct 15, 2025', description: 'Campus-wide tree planting initiative.', points: 50, status: 'missed' },
    ],
    // RESTORED: Full sample data for Eco-Store to match screenshot
    stores: [
        {
            storeId: 's1',
            storeName: 'Campus Canteen',
            storeLogo: 'https://placehold.co/100x100/F9A8D4/1F2937?text=Canteen',
            products: [
                {
                    productId: 'p1',
                    name: 'Veg Thali',
                    images: ['https://placehold.co/400x300/F9A8D4/1F2937?text=Thali'],
                    description: 'Wholesome vegetarian thali with dal, rice, roti, and sabzi.',
                    originalPrice: 80, discountedPrice: 50, cost: 30, popularity: 90
                },
                {
                    productId: 'p2',
                    name: 'Samosa & Chai',
                    images: ['https://placehold.co/400x300/FBCFE8/1F2937?text=Samosa'],
                    description: 'The classic college snack combo.',
                    originalPrice: 30, discountedPrice: 15, cost: 15, popularity: 100
                },
                {
                    productId: 'p3',
                    name: 'Masala Dosa',
                    images: ['https://placehold.co/400x300/FCE7F3/1F2937?text=Dosa'],
                    description: 'Crispy crepe with potato masala and chutney.',
                    originalPrice: 60, discountedPrice: 40, cost: 20, popularity: 85
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
                    description: 'Rich and foamy large cappuccino.',
                    originalPrice: 120, discountedPrice: 80, cost: 40, popularity: 70
                },
                {
                    productId: 'p5',
                    name: 'Choco-chip Brownie',
                    images: ['https://placehold.co/400x300/C7D2FE/1F2937?text=Brownie'],
                    description: 'Fudgy brownie loaded with choco-chips.',
                    originalPrice: 70, discountedPrice: 50, cost: 20, popularity: 75
                }
            ]
        },
        {
            storeId: 's3',
            storeName: 'Merch Store',
            storeLogo: 'https://placehold.co/100x100/86EFAC/1F2937?text=Merch',
            products: [
                {
                    productId: 'p6',
                    name: 'College Hoodie',
                    images: ['https://placehold.co/400x300/86EFAC/1F2937?text=Hoodie'],
                    description: 'Premium cotton hoodie with embroidered college logo.',
                    originalPrice: 1000, discountedPrice: 800, cost: 200, popularity: 50
                },
                {
                    productId: 'p7',
                    name: 'Steel Bottle',
                    images: ['https://placehold.co/400x300/BBF7D0/1F2937?text=Bottle'],
                    description: 'Insulated eco-friendly steel bottle.',
                    originalPrice: 500, discountedPrice: 350, cost: 150, popularity: 60
                }
            ]
        }
    ],
    userRewards: [],
    nextUserRewardId: 1,
    levels: [
        { level: 1, title: 'Green Starter', minPoints: 0, nextMin: 1001 },
        { level: 2, title: 'Eco Learner', minPoints: 1001, nextMin: 2001 },
        { level: 3, title: 'Sustainability Leader', minPoints: 2001, nextMin: 4001 },
    ]
};

// =========================================
// 2. CORE FUNCTIONS & NAVIGATION
// =========================================

// Helper: Get user level
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

// DOM Elements Cache
const els = {
    pages: document.querySelectorAll('.page'),
    sidebar: document.getElementById('sidebar'),
    sidebarOverlay: document.getElementById('sidebar-overlay'),
    userPointsHeader: document.getElementById('user-points-header'),
    userNameGreeting: document.getElementById('user-name-greeting'),
    dailyCheckinBtn: document.getElementById('daily-checkin-button'),
    dashboardStreakText: document.getElementById('dashboard-streak-text'),
    checkinSubtext: document.getElementById('checkin-subtext'),
    lbPodium: document.getElementById('lb-podium-container'),
    lbList: document.getElementById('lb-list-container'),
    lbLeafLayer: document.getElementById('lb-leaf-layer'),
    redeemForm: document.getElementById('redeem-code-form'),
    redeemInput: document.getElementById('redeem-input'),
    redeemMessage: document.getElementById('redeem-message'),
    redeemBtn: document.getElementById('redeem-submit-btn'),
    productGrid: document.getElementById('product-grid'),
    storeSearch: document.getElementById('store-search-input'),
    storeSearchClear: document.getElementById('store-search-clear'),
    sortBy: document.getElementById('sort-by-select'),
    challengesList: document.getElementById('challenges-page-list'),
    eventsList: document.getElementById('event-list')
};

// Navigation Logic
const showPage = (pageId) => {
    // Hide all pages
    els.pages.forEach(p => p.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');

    // Update Nav/Sidebar active states
    document.querySelectorAll('.nav-item, .sidebar-nav-item').forEach(btn => {
        const onclickVal = btn.getAttribute('onclick');
        if (onclickVal && onclickVal.includes(`'${pageId}'`)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Reset scroll
    document.querySelector('.main-content').scrollTop = 0;

    // Specific Page Renders
    if (pageId === 'dashboard') {
        renderDashboard();
        if(els.lbLeafLayer) els.lbLeafLayer.classList.add('hidden');
    } else if (pageId === 'leaderboard') {
        showLeaderboardTab(currentLeaderboardTab);
    } else if (pageId === 'redeem-code') {
        resetRedeemForm();
        if(els.lbLeafLayer) els.lbLeafLayer.classList.add('hidden');
    } else if (pageId === 'rewards') {
        renderRewards();
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

    // Close sidebar on mobile
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

// Points Animation
const animatePointsUpdate = (newPoints) => {
    state.currentUser.points = newPoints;
    els.userPointsHeader.classList.add('points-pulse');
    els.userPointsHeader.textContent = newPoints;
    
    const sidebarPoints = document.getElementById('user-points-sidebar');
    if(sidebarPoints) sidebarPoints.textContent = newPoints;

    setTimeout(() => {
        els.userPointsHeader.classList.remove('points-pulse');
    }, 400);
};


// =========================================
// 3. DASHBOARD & CHECK-IN LOGIC
// =========================================

const renderDashboard = () => {
    const user = state.currentUser;
    els.userPointsHeader.textContent = user.points;
    els.userNameGreeting.textContent = user.name.split(' ')[0];
    
    // Update Sidebar info
    document.getElementById('user-name-sidebar').textContent = user.name;
    document.getElementById('user-points-sidebar').textContent = user.points;
    const level = getUserLevel(user.lifetimePoints);
    document.getElementById('user-level-sidebar').textContent = level.title;
    document.getElementById('user-avatar-sidebar').src = user.avatarUrl;

    renderCheckinButtonState();
};

const renderCheckinButtonState = () => {
    els.dashboardStreakText.textContent = `${state.currentUser.checkInStreak} Day Streak`;
    
    if (state.currentUser.isCheckedInToday) {
        els.dailyCheckinBtn.classList.add('checkin-completed');
        els.dailyCheckinBtn.querySelector('h3').textContent = "Checked In!";
        if (els.checkinSubtext) els.checkinSubtext.style.display = 'none';
        els.dailyCheckinBtn.onclick = null; 
    } else {
        els.dailyCheckinBtn.classList.remove('checkin-completed');
        els.dailyCheckinBtn.querySelector('h3').textContent = "Daily Check-in";
        if (els.checkinSubtext) els.checkinSubtext.style.display = 'block';
        els.dailyCheckinBtn.onclick = openCheckinModal;
    }
};

// Modal Logic
const checkinModal = document.getElementById('checkin-modal');

const openCheckinModal = () => {
    if (state.currentUser.isCheckedInToday) return;
    
    checkinModal.classList.add('open');
    checkinModal.classList.remove('invisible');
    
    const calendarContainer = document.getElementById('checkin-modal-calendar');
    calendarContainer.innerHTML = '';
    for (let i = -3; i <= 3; i++) {
        const d = new Date(today);
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
// 4. LEADERBOARD LOGIC (NEW DESIGN)
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
        if(els.lbLeafLayer) els.lbLeafLayer.classList.remove('hidden'); // Show leaves
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
                        <span class="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center mr-3 text-xs font-bold text-emerald-700 dark:text-emerald-200">
                            #${index + 1}
                        </span>
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
    
    const rank1 = sorted[0];
    const rank2 = sorted[1];
    const rank3 = sorted[2];
    const rest = sorted.slice(3);

    els.lbPodium.innerHTML = `
        <div class="podium">
            <div class="champ">
                <div class="badge silver">${rank2 ? rank2.initials : 'N/A'}</div>
                <div class="champ-name">${rank2 ? rank2.name : '-'}</div>
                <div class="champ-class">${rank2 ? rank2.course : '-'}</div>
                <div class="champ-points">${rank2 ? rank2.lifetimePoints : 0} pts</div>
                <div class="rank">2nd</div>
            </div>

            <div class="champ">
                <div class="badge gold">${rank1 ? rank1.initials : 'N/A'}</div>
                <div class="champ-name">${rank1 ? rank1.name : '-'}</div>
                <div class="champ-class">${rank1 ? rank1.course : '-'}</div>
                <div class="champ-points">${rank1 ? rank1.lifetimePoints : 0} pts</div>
                <div class="rank">1st</div>
            </div>

            <div class="champ">
                <div class="badge bronze">${rank3 ? rank3.initials : 'N/A'}</div>
                <div class="champ-name">${rank3 ? rank3.name : '-'}</div>
                <div class="champ-class">${rank3 ? rank3.course : '-'}</div>
                <div class="champ-points">${rank3 ? rank3.lifetimePoints : 0} pts</div>
                <div class="rank">3rd</div>
            </div>
        </div>
    `;

    els.lbList.innerHTML = '';
    rest.forEach((user) => {
        const isMeClass = user.isCurrentUser ? 'is-me' : '';
        
        els.lbList.innerHTML += `
            <div class="item ${isMeClass}">
                <div class="user">
                    <div class="circle">${user.initials}</div>
                    <div class="user-info">
                        <strong>${user.name} ${user.isCurrentUser ? '(You)' : ''}</strong>
                        <span class="sub-class">${user.course}</span>
                    </div>
                </div>
                <div class="points-display">${user.lifetimePoints} pts</div>
            </div>
        `;
    });
};


// =========================================
// 5. REDEEM CODE LOGIC
// =========================================

const resetRedeemForm = () => {
    els.redeemForm.reset();
    els.redeemMessage.textContent = '';
    els.redeemBtn.disabled = false;
    els.redeemBtn.textContent = 'Redeem Points';
};

els.redeemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = els.redeemInput.value.trim();
    const regex = /^[a-zA-Z0-9]{10}$/;

    if (!regex.test(code)) {
        els.redeemMessage.className = 'text-sm text-center text-red-500 font-bold';
        els.redeemMessage.textContent = 'Invalid Code. Must be 10 alphanumeric characters.';
        return;
    }

    els.redeemBtn.disabled = true;
    els.redeemBtn.textContent = 'Verifying...';

    setTimeout(() => {
        const bonusPoints = 50;
        const newTotal = state.currentUser.points + bonusPoints;
        state.currentUser.lifetimePoints += bonusPoints;
        
        state.history.unshift({
            type: 'ticket',
            description: 'Redeemed Code: ' + code.toUpperCase(),
            points: bonusPoints,
            date: today,
            icon: 'ticket'
        });

        animatePointsUpdate(newTotal);

        els.redeemMessage.className = 'text-sm text-center text-green-600 font-bold';
        els.redeemMessage.textContent = `Success! +${bonusPoints} EcoPoints added.`;
        els.redeemBtn.textContent = 'Redeemed';
        els.redeemInput.value = '';

        setTimeout(() => {
            els.redeemBtn.disabled = false;
            els.redeemBtn.textContent = 'Redeem Points';
            els.redeemMessage.textContent = '';
        }, 3000);
    }, 1500);
});


// =========================================
// 6. STORE, CHALLENGES & EVENTS
// =========================================

const renderRewards = () => {
    els.productGrid.innerHTML = '';
    let products = [];
    state.stores.forEach(s => s.products.forEach(p => products.push({...p, storeName: s.storeName, storeLogo: s.storeLogo})));

    const criteria = els.sortBy.value;
    if(criteria === 'popularity') products.sort((a,b) => b.popularity - a.popularity);
    if(criteria === 'points-lh') products.sort((a,b) => a.cost - b.cost);
    if(criteria === 'points-hl') products.sort((a,b) => b.cost - a.cost);

    const term = els.storeSearch.value.toLowerCase();
    if(term) products = products.filter(p => p.name.toLowerCase().includes(term));

    els.storeSearchClear.classList.toggle('hidden', !term);

    products.forEach(p => {
        els.productGrid.innerHTML += `
            <div class="w-full flex-shrink-0 glass-card border border-gray-200/60 dark:border-gray-700/80 rounded-2xl overflow-hidden flex flex-col cursor-pointer">
                <img src="${p.images[0]}" class="w-full h-40 object-cover">
                <div class="p-3 flex flex-col flex-grow">
                    <div class="flex items-center mb-1">
                        <img src="${p.storeLogo}" class="w-5 h-5 rounded-full mr-2 border dark:border-gray-600">
                        <p class="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">${p.storeName}</p>
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

const renderChallengesPage = () => {
    els.challengesList.innerHTML = '';
    state.dailyChallenges.forEach(c => {
        let buttonHTML = '';
        if (c.status === 'active') {
            const onclick = c.type === 'quiz' ? `alert('Quiz logic here')` : `document.getElementById('challenge-file-input').click()`;
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
        let opacity = '';
        if (e.status === 'upcoming') {
            statusButton = `
                <button class="w-full bg-green-600 text-white text-sm font-semibold py-2 rounded-lg flex items-center justify-center space-x-2">
                    <i data-lucide="ticket" class="w-4 h-4"></i><span>RSVP +${e.points} pts</span>
                </button>`;
        } else if (e.status === 'attended') {
            statusButton = `
                <div class="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-200 font-bold py-2 px-4 rounded-lg text-sm w-full flex items-center justify-center space-x-2">
                    <i data-lucide="check-circle" class="w-4 h-4"></i><span>Attended (+${e.points} pts)</span>
                </div>`;
            opacity = 'opacity-90';
        } else if (e.status === 'missed') {
            statusButton = `
                <div class="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-bold py-2 px-4 rounded-lg text-sm w-full flex items-center justify-center space-x-2">
                    <i data-lucide="x-circle" class="w-4 h-4"></i><span>Missed</span>
                </div>`;
            opacity = 'opacity-60';
        }

        els.eventsList.innerHTML += `
            <div class="glass-card p-4 rounded-2xl ${opacity}">
                <div class="flex items-start">
                    <div class="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg mr-4">
                        <i data-lucide="calendar" class="w-6 h-6 text-purple-600 dark:text-purple-400"></i>
                    </div>
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

els.storeSearch.addEventListener('input', renderRewards);
els.storeSearchClear.addEventListener('click', () => {
    els.storeSearch.value = '';
    renderRewards();
});
els.sortBy.addEventListener('change', renderRewards);

// =========================================
// 7. CHATBOT & UTILS
// =========================================

const chatbotModal = document.getElementById('chatbot-modal');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');

const openChatbotModal = () => {
    chatbotModal.classList.add('open');
    chatbotModal.classList.remove('invisible');
};

const closeChatbotModal = () => {
    chatbotModal.classList.remove('open');
    setTimeout(() => chatbotModal.classList.add('invisible'), 300);
};

chatbotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = chatbotInput.value.trim();
    if(!msg) return;

    chatbotMessages.innerHTML += `
        <div class="flex justify-end">
            <div class="bg-green-600 text-white p-3 rounded-lg rounded-br-none max-w-xs">
                <p class="text-sm">${msg}</p>
            </div>
        </div>`;
    chatbotInput.value = '';
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    setTimeout(() => {
        let reply = "I'm EcoBot. I can help with recycling tips or app navigation.";
        if(msg.toLowerCase().includes('code') || msg.toLowerCase().includes('redeem')) {
            reply = "You can redeem codes in the 'Redeem Code' section found in the sidebar menu.";
        } else if (msg.toLowerCase().includes('point')) {
            reply = "Earn points by attending events, completing daily challenges, or recycling bottles.";
        }

        chatbotMessages.innerHTML += `
            <div class="flex justify-start">
                <div class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-3 rounded-lg rounded-bl-none max-w-xs">
                    <p class="text-sm">${reply}</p>
                </div>
            </div>`;
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, 1000);
});

// =========================================
// 8. INITIALIZATION
// =========================================

document.getElementById('sidebar-toggle-btn').addEventListener('click', () => toggleSidebar());

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
    state.history.slice(0,5).forEach(h => {
        actContainer.innerHTML += `
            <div class="flex items-center justify-between text-sm">
                <div class="flex items-center">
                    <span class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                        <i data-lucide="${h.icon}" class="w-4 h-4 text-gray-600 dark:text-gray-300"></i>
                    </span>
                    <div>
                        <p class="font-semibold text-gray-800 dark:text-gray-100">${h.description}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">${h.date}</p>
                    </div>
                </div>
                <span class="font-bold ${h.points >= 0 ? 'text-green-600' : 'text-red-500'}">
                    ${h.points > 0 ? '+' : ''}${h.points}
                </span>
            </div>`;
    });
    
    const levelsContainer = document.getElementById('all-levels-list');
    levelsContainer.innerHTML = '';
    state.levels.forEach(lvl => {
         levelsContainer.innerHTML += `
            <div class="flex items-center">
                <span class="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mr-3 text-sm font-bold text-green-600 dark:text-green-300">${lvl.level}</span>
                <div>
                    <p class="text-sm font-bold text-gray-800 dark:text-gray-100">${lvl.title}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">${lvl.minPoints} pts required</p>
                </div>
            </div>`;
    });
};

window.addEventListener('load', () => {
    const saved = localStorage.getItem('eco-theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
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

    renderDashboard();
    renderProfile();
    
    setTimeout(() => {
        document.getElementById('app-loading').classList.add('loaded');
    }, 800);
    
    lucide.createIcons();
});
