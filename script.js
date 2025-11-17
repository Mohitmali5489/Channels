/**
 * EcoBirla - Main Application Script
 * Handles state, navigation, and business logic.
 */

// =========================================
// 1. Helper Functions & Constants
// =========================================

// Date helpers for demo purposes
const getDemoDateString = (dayOffset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
};

const today = getDemoDateString(0);
const yesterday = getDemoDateString(-1);

// Formatting currency/points
const formatPoints = (pts) => pts.toLocaleString();

// =========================================
// 2. Initial State
// =========================================

let state = {
    currentUser: {
        id: 'u1',
        name: 'Alex Green',
        avatarUrl: 'https://ui-avatars.com/api/?name=Alex+Green&background=e8f5e9&color=1e8f4b&bold=true',
        points: 375,
        lifetimePoints: 375,
        email: 'alex.green@college.edu',
        joined: 'Sep 2025',
        studentId: '5207872',
        course: 'FYBCOM',
        mobile: '9850751835',
        checkInStreak: 4,
        lastCheckInDate: yesterday // Set to yesterday so check-in is available
    },
    checkInReward: 20,
    
    // Matching the names/ranks from the provided visual design
    leaderboard: [
        { id: 'u2', name: 'Jane Doe', class: 'FYBCOM', points: 520, initials: 'JD', rank: 1 },
        { id: 'u3', name: 'Mike Smith', class: 'SYBCOM', points: 410, initials: 'MS', rank: 2 },
        { id: 'u4', name: 'Sarah Lee', class: 'TYBCOM', points: 395, initials: 'SL', rank: 3 },
        // Users below podium (Alex is here)
        { id: 'u1', name: 'Alex Green', class: 'FYBCOM', points: 375, initials: 'AG', rank: 4, isMe: true },
        { id: 'u5', name: 'Tom Wilson', class: 'SYBCOM', points: 280, initials: 'TW', rank: 5 },
        { id: 'u6', name: 'Emily Chen', class: 'FYBCOM', points: 250, initials: 'EC', rank: 6 },
        { id: 'u7', name: 'Rohan Patel', class: 'TYBCOM', points: 210, initials: 'RP', rank: 7 },
        { id: 'u8', name: 'Kavita Prasad', class: 'FYBCOM', points: 190, initials: 'KP', rank: 8 },
        { id: 'u9', name: 'David John', class: 'SYBCOM', points: 170, initials: 'DJ', rank: 9 },
    ],

    dailyChallenges: [
        { id: 'c1', title: 'Selfie with a Tree', description: 'Upload a selfie with any tree on campus.', points_reward: 20, icon: 'camera', status: 'active', buttonText: 'Upload Selfie', type: 'upload' },
        { id: 'c2', title: 'Daily Eco-Quiz', description: 'Get the question right to earn points.', points_reward: 15, icon: 'brain', status: 'active', buttonText: 'Start Quiz', type: 'quiz' },
        { id: 'c3', title: 'No Plastic Day', description: 'Don\'t buy any plastic items today.', points_reward: 10, icon: 'ban', status: 'active', buttonText: 'Pledge', type: 'action' },
    ],

    events: [
        { id: 2, title: 'Workshop: Composting Basics', date: 'Nov 20, 2025', description: 'Learn how to turn food scraps into garden gold.', points: 30, status: 'upcoming' },
        { id: 3, title: 'Green Docu-Night', date: 'Nov 25, 2025', description: 'Screening of "A Plastic Ocean" with a discussion panel.', points: 20, status: 'upcoming' },
        { id: 1, title: 'Community Park Cleanup', date: 'Oct 28, 2025', description: 'Helped clean up Kalyan Central Park.', points: 75, status: 'attended' },
    ],

    stores: [
        {
            storeId: 's1',
            storeName: 'Campus Canteen',
            products: [
                {
                    productId: 'p1',
                    name: 'Veg Thali',
                    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80',
                    description: 'Wholesome vegetarian meal with rice, roti, dal, and sabzi.',
                    originalPrice: 80, discountedPrice: 50, cost: 30,
                    features: ['Freshly made', 'Balanced diet'],
                    specifications: [{ key: 'Calories', value: '450 kcal' }]
                },
                {
                    productId: 'p2',
                    name: 'Masala Chai',
                    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=300&q=80',
                    description: 'Hot spiced tea to energize your day.',
                    originalPrice: 20, discountedPrice: 10, cost: 10,
                    features: ['Hot beverage', 'Spiced'],
                    specifications: [{ key: 'Size', value: '150ml' }]
                }
            ]
        },
        {
            storeId: 's2',
            storeName: 'Merch Store',
            products: [
                {
                    productId: 'p3',
                    name: 'Eco Hoodie',
                    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=300&q=80',
                    description: 'Sustainable cotton hoodie with college logo.',
                    originalPrice: 800, discountedPrice: 600, cost: 200,
                    features: ['100% Cotton', 'Unisex'],
                    specifications: [{ key: 'Size', value: 'S, M, L, XL' }]
                }
            ]
        }
    ],

    userRewards: [], // Populated when user buys something
    nextUserRewardId: 101,
    
    history: [
        { type: 'recycle', description: 'Recycled Plastic Bottles', points: 10, date: yesterday, icon: 'recycle' },
        { type: 'login', description: 'Daily Login Bonus', points: 10, date: yesterday, icon: 'log-in' }
    ]
};

// =========================================
// 3. DOM Elements
// =========================================

const pages = document.querySelectorAll('.page');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const appLoading = document.getElementById('app-loading');

// Header elements
const userPointsHeader = document.getElementById('user-points-header');
const userNameGreeting = document.getElementById('user-name-greeting');
const userAvatarSidebar = document.getElementById('user-avatar-sidebar');
const userNameSidebar = document.getElementById('user-name-sidebar');
const userPointsSidebar = document.getElementById('user-points-sidebar');
const userLevelSidebar = document.getElementById('user-level-sidebar');

// Dashboard specific
const impactRecycled = document.getElementById('impact-recycled');
const impactCo2 = document.getElementById('impact-co2');
const impactEvents = document.getElementById('impact-events');
const dailyCheckinContainer = document.getElementById('daily-checkin-container');

// Modals
const checkinModal = document.getElementById('checkin-modal');
const purchaseModal = document.getElementById('purchase-modal');
const purchaseModalOverlay = document.getElementById('purchase-modal-overlay');
const qrModal = document.getElementById('qr-modal');
const qrModalOverlay = document.getElementById('qr-modal-overlay');
const chatbotModal = document.getElementById('chatbot-modal');
const ecoQuizModal = document.getElementById('eco-quiz-modal');

// =========================================
// 4. Core Logic & Navigation
// =========================================

const initApp = () => {
    // Theme Check
    const savedTheme = localStorage.getItem('eco-theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        updateThemeIcon(true);
    }

    // Simulate Loading
    setTimeout(() => {
        appLoading.classList.add('loaded');
    }, 800);

    // Initial Renders
    renderHeaderAndSidebar();
    renderDashboard();
    lucide.createIcons();
};

const showPage = (pageId) => {
    // Hide all pages
    pages.forEach(p => p.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.scrollTop = 0; // Reset scroll
    }

    // Update Navigation styling
    document.querySelectorAll('.sidebar-nav-item, .nav-item').forEach(btn => {
        // Simple check if the onclick attribute contains the pageId
        if (btn.getAttribute('onclick').includes(`'${pageId}'`)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Specific Page Logic
    if (pageId === 'dashboard') renderDashboard();
    if (pageId === 'leaderboard') renderLeaderboardList();
    if (pageId === 'rewards') renderStore();
    if (pageId === 'my-rewards') renderMyRewards();
    if (pageId === 'ecopoints') renderEcoPoints();
    if (pageId === 'history') renderHistory();
    if (pageId === 'challenges') renderChallenges();
    if (pageId === 'events') renderEvents();
    if (pageId === 'profile') renderProfile();
    if (pageId === 'redeem-code') resetRedeemForm();

    // Close sidebar on mobile if open
    toggleSidebar(true);
    lucide.createIcons();
};

const toggleSidebar = (forceClose = false) => {
    if (forceClose) {
        sidebar.classList.add('-translate-x-full');
        sidebarOverlay.classList.add('opacity-0', 'hidden');
    } else {
        sidebar.classList.toggle('-translate-x-full');
        sidebarOverlay.classList.toggle('hidden');
        sidebarOverlay.classList.toggle('opacity-0');
    }
};

// =========================================
// 5. Rendering Functions
// =========================================

// --- Header & Sidebar ---
const renderHeaderAndSidebar = () => {
    const u = state.currentUser;
    
    // Header
    userPointsHeader.textContent = formatPoints(u.points);
    userNameGreeting.textContent = u.name.split(' ')[0];

    // Sidebar
    userAvatarSidebar.src = u.avatarUrl;
    userNameSidebar.textContent = u.name;
    userPointsSidebar.textContent = formatPoints(u.points);
    
    // Simple level logic: 1 level per 1000 points
    const level = Math.floor(u.lifetimePoints / 1000) + 1;
    userLevelSidebar.textContent = `Green Starter • Lv. ${level}`;
};

const animatePoints = (newPoints) => {
    state.currentUser.points = newPoints;
    state.currentUser.lifetimePoints = Math.max(state.currentUser.lifetimePoints, newPoints);
    
    // Update leaderboard data for currentUser
    const meInLb = state.leaderboard.find(u => u.isMe);
    if (meInLb) meInLb.points = newPoints;

    userPointsHeader.classList.add('points-pulse');
    setTimeout(() => {
        userPointsHeader.textContent = formatPoints(newPoints);
        userPointsHeader.classList.remove('points-pulse');
        userPointsSidebar.textContent = formatPoints(newPoints);
    }, 200);
};

// --- Dashboard ---
const renderDashboard = () => {
    // Check-in Card Logic
    const isCheckedIn = state.currentUser.lastCheckInDate === today;

    if (isCheckedIn) {
        dailyCheckinContainer.innerHTML = `
            <div class="w-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-5 rounded-2xl mb-6 flex items-center justify-between animate-fade-in">
                <div>
                    <h3 class="text-lg font-bold text-green-800 dark:text-green-100">Check-in Completed!</h3>
                    <p class="text-sm text-green-600 dark:text-green-300">Great job! Come back tomorrow.</p>
                </div>
                <div class="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm">
                    <i data-lucide="check" class="w-6 h-6 text-green-600"></i>
                </div>
            </div>
        `;
    } else {
        dailyCheckinContainer.innerHTML = `
            <button onclick="openCheckinModal()" class="w-full bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-yellow-500 dark:to-orange-500 p-5 rounded-2xl mb-6 flex items-center justify-between shadow-lg shadow-orange-200 dark:shadow-none transition transform active:scale-[0.98]">
                <div>
                    <h3 class="text-lg font-bold text-white dark:text-gray-900">Daily Check-in</h3>
                    <p class="text-sm text-white/90 dark:text-gray-800">Tap to collect +${state.checkInReward} Points</p>
                </div>
                <div class="flex items-center space-x-2 bg-white/25 dark:bg-black/20 text-white dark:text-gray-900 py-2 px-3 rounded-full">
                    <i data-lucide="flame" class="w-5 h-5 fill-current"></i>
                    <span class="text-sm font-bold">${state.currentUser.checkInStreak} Day Streak</span>
                </div>
            </button>
        `;
    }

    // Stats
    // Calculated roughly from history for demo
    const recycledCount = state.history.filter(h => h.type === 'recycle').length * 0.5; // 0.5kg per entry demo
    impactRecycled.textContent = recycledCount + ' kg';
    impactCo2.textContent = (recycledCount * 2.5).toFixed(1) + ' kg';
    impactEvents.textContent = state.events.filter(e => e.status === 'attended').length;
    
    lucide.createIcons();
};

// --- Leaderboard ---
const renderLeaderboardList = () => {
    const container = document.getElementById('leaderboard-list-container');
    container.innerHTML = '';

    // Filter out top 3 (who are on podium) and sort remaining
    // Note: In a real app, we would sort everyone, put top 3 in podium, rest in list.
    // Here, we stick to the visual design's ranks.
    const listUsers = state.leaderboard
        .filter(u => u.rank > 3)
        .sort((a, b) => a.rank - b.rank);

    listUsers.forEach(u => {
        // Check if this user is the logged in user to highlight
        const isMeClass = u.isMe ? 'border-2 border-green-500 bg-green-50 dark:bg-green-900/20' : '';
        
        container.innerHTML += `
            <div class="item ${isMeClass}">
                <div class="user">
                    <div class="circle dark:bg-gray-700 dark:text-white">${u.initials}</div>
                    <div class="user-info">
                        <strong class="dark:text-gray-200">${u.name} ${u.isMe ? '(You)' : ''}</strong>
                        <span class="sub-class">${u.class}</span> 
                    </div>
                </div>
                <div class="points-display dark:text-gray-200">${formatPoints(u.points)} pts</div>
            </div>
        `;
    });
};

// --- Store ---
const renderStore = () => {
    const grid = document.getElementById('product-grid');
    const searchInput = document.getElementById('store-search-input');
    const filter = searchInput.value.toLowerCase();
    const clearBtn = document.getElementById('store-search-clear');

    clearBtn.classList.toggle('hidden', !filter);

    grid.innerHTML = '';

    // Flatten products
    let allProducts = [];
    state.stores.forEach(store => {
        store.products.forEach(prod => {
            allProducts.push({ ...prod, storeName: store.storeName, storeId: store.storeId });
        });
    });

    const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(filter) || 
        p.storeName.toLowerCase().includes(filter)
    );

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-2 text-center text-gray-500 py-8">No items found.</div>`;
        return;
    }

    filtered.forEach(p => {
        grid.innerHTML += `
            <div class="w-full flex-shrink-0 glass-card rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition"
                 onclick="openProductDetail('${p.storeId}', '${p.productId}')">
                <img src="${p.image}" alt="${p.name}" class="w-full h-36 object-cover">
                <div class="p-3 flex flex-col flex-grow">
                    <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">${p.storeName}</p>
                    <p class="font-bold text-gray-800 dark:text-gray-100 text-sm truncate">${p.name}</p>
                    <div class="mt-auto pt-2 flex items-end justify-between">
                        <div>
                            <p class="text-xs text-gray-400 line-through">₹${p.originalPrice}</p>
                            <p class="font-bold text-green-700 dark:text-green-400">₹${p.discountedPrice}</p>
                        </div>
                        <div class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-bold px-2 py-1 rounded-lg">
                            ${p.cost} Pts
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
};

// Product Detail Page (Sub-page)
const openProductDetail = (storeId, productId) => {
    const store = state.stores.find(s => s.storeId === storeId);
    const product = store.products.find(p => p.productId === productId);
    const detailPage = document.getElementById('product-detail-page');
    
    const canAfford = state.currentUser.points >= product.cost;

    detailPage.innerHTML = `
        <div class="relative">
            <img src="${product.image}" class="w-full h-72 object-cover">
            <button onclick="showPage('rewards')" class="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur rounded-full shadow-md text-gray-800">
                <i data-lucide="arrow-left" class="w-5 h-5"></i>
            </button>
            <div class="absolute -bottom-6 left-0 right-0 h-12 bg-gray-50 dark:bg-gray-900 rounded-t-[2rem]"></div>
        </div>
        <div class="px-6 pb-24">
            <div class="flex justify-between items-start">
                <div>
                    <h2 class="text-2xl font-extrabold text-gray-900 dark:text-white">${product.name}</h2>
                    <p class="text-gray-500 dark:text-gray-400 text-sm">${store.storeName}</p>
                </div>
                <div class="text-right">
                     <div class="text-2xl font-bold text-green-600 dark:text-green-400">${product.cost} <span class="text-sm text-gray-500">Pts</span></div>
                </div>
            </div>

            <div class="mt-6 space-y-4">
                <div class="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                    <h3 class="font-bold text-gray-800 dark:text-gray-200 mb-2">Description</h3>
                    <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">${product.description}</p>
                </div>

                <div class="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                    <h3 class="font-bold text-gray-800 dark:text-gray-200 mb-2">Offer Details</h3>
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-gray-500">Original Price</span>
                        <span class="line-through text-gray-400">₹${product.originalPrice}</span>
                    </div>
                    <div class="flex justify-between items-center text-sm mt-1">
                        <span class="text-gray-500">You Pay</span>
                        <span class="font-bold text-gray-900 dark:text-white">₹${product.discountedPrice}</span>
                    </div>
                </div>
            </div>

            <div class="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-950 border-t dark:border-gray-800">
                <div class="max-w-md mx-auto">
                    <button onclick="openPurchaseModal('${storeId}', '${productId}')" 
                        class="w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition transform active:scale-[0.98] ${canAfford ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}" 
                        ${!canAfford ? 'disabled' : ''}>
                        ${canAfford ? 'Redeem Now' : 'Not Enough Points'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    pages.forEach(p => p.classList.remove('active'));
    detailPage.classList.add('active');
    detailPage.scrollTop = 0;
    lucide.createIcons();
};

// --- Redeem Code Logic ---
const resetRedeemForm = () => {
    document.getElementById('redeem-input').value = '';
    document.getElementById('redeem-message').textContent = '';
};

document.getElementById('redeem-code-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('redeem-input');
    const messageEl = document.getElementById('redeem-message');
    const code = input.value.trim().toUpperCase();

    if (code.length !== 10) {
        messageEl.textContent = 'Code must be exactly 10 characters.';
        messageEl.className = 'text-center text-sm h-5 text-red-500';
        return;
    }

    // Simulate API Call / Validation
    messageEl.textContent = 'Validating...';
    messageEl.className = 'text-center text-sm h-5 text-gray-500';

    setTimeout(() => {
        // Mock success
        const earnedPoints = 50;
        const newPoints = state.currentUser.points + earnedPoints;
        animatePoints(newPoints);
        
        // Add to history
        state.history.unshift({
            type: 'code', 
            description: 'Redeemed Code: ' + code, 
            points: earnedPoints, 
            date: today, 
            icon: 'qr-code' 
        });

        messageEl.textContent = `Success! You earned ${earnedPoints} EcoPoints.`;
        messageEl.className = 'text-center text-sm h-5 text-green-600 font-bold';
        input.value = '';
    }, 1500);
});

// --- Purchase Flow ---
const openPurchaseModal = (storeId, productId) => {
    const store = state.stores.find(s => s.storeId === storeId);
    const product = store.products.find(p => p.productId === productId);
    
    const modal = document.getElementById('purchase-modal');
    modal.innerHTML = `
        <div class="text-center">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Confirm Redemption</h3>
            <p class="text-gray-500 text-sm mb-6">
                Spend <strong>${product.cost} Points</strong> to get <br> 
                <strong>${product.name}</strong> at <strong>₹${product.discountedPrice}</strong>?
            </p>
            <div class="flex space-x-3">
                <button onclick="closePurchaseModal()" class="flex-1 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold">Cancel</button>
                <button onclick="completePurchase('${storeId}', '${productId}')" class="flex-1 py-3 rounded-xl bg-green-600 text-white font-bold shadow-lg">Confirm</button>
            </div>
        </div>
    `;
    
    purchaseModalOverlay.classList.remove('hidden');
    setTimeout(() => { modal.classList.remove('translate-y-full'); }, 10);
};

const closePurchaseModal = () => {
    document.getElementById('purchase-modal').classList.add('translate-y-full');
    setTimeout(() => { purchaseModalOverlay.classList.add('hidden'); }, 300);
};

const completePurchase = (storeId, productId) => {
    const store = state.stores.find(s => s.storeId === storeId);
    const product = store.products.find(p => p.productId === productId);
    
    // Deduct points
    const newPoints = state.currentUser.points - product.cost;
    animatePoints(newPoints);
    
    // Create Reward
    const rewardId = 'RWD-' + state.nextUserRewardId++;
    state.userRewards.unshift({
        id: rewardId,
        productName: product.name,
        storeName: store.storeName,
        date: today,
        image: product.image,
        status: 'active'
    });
    
    // Add to history
    state.history.unshift({
        type: 'purchase',
        description: `Bought ${product.name}`,
        points: -product.cost,
        date: today,
        icon: 'shopping-bag'
    });

    closePurchaseModal();
    showPage('my-rewards'); // Redirect to rewards to show new item
};

// --- My Rewards ---
const renderMyRewards = () => {
    const container = document.getElementById('all-rewards-list');
    container.innerHTML = '';

    if (state.userRewards.length === 0) {
        container.innerHTML = `<p class="text-center text-gray-500 py-10">No rewards yet. Visit the store!</p>`;
        return;
    }

    state.userRewards.forEach(r => {
        container.innerHTML += `
            <div class="glass-card p-4 rounded-xl flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <img src="${r.image}" class="w-12 h-12 rounded-lg object-cover">
                    <div>
                        <h4 class="font-bold text-gray-800 dark:text-gray-200">${r.productName}</h4>
                        <p class="text-xs text-gray-500">${r.storeName} • ${r.date}</p>
                    </div>
                </div>
                <button onclick="openQrModal('${r.id}')" class="px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold rounded-lg">
                    View QR
                </button>
            </div>
        `;
    });
};

// --- QR Modal ---
const openQrModal = (id) => {
    const modal = document.getElementById('qr-modal');
    modal.innerHTML = `
        <div class="text-center">
            <h3 class="text-lg font-bold mb-4 dark:text-white">Scan to Redeem</h3>
            <div class="bg-white p-4 rounded-xl inline-block mx-auto shadow-inner border">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}" class="w-40 h-40">
            </div>
            <p class="text-xs text-gray-500 mt-4 font-mono tracking-widest">${id}</p>
            <button onclick="closeQrModal()" class="mt-6 w-full py-3 text-gray-600 dark:text-gray-300 font-semibold">Close</button>
        </div>
    `;
    qrModalOverlay.classList.remove('hidden');
    setTimeout(() => { modal.classList.remove('translate-y-full'); }, 10);
};

const closeQrModal = () => {
    document.getElementById('qr-modal').classList.add('translate-y-full');
    setTimeout(() => { qrModalOverlay.classList.add('hidden'); }, 300);
};

// --- Other Pages (Profile, EcoPoints, History, etc.) ---
const renderProfile = () => {
    const u = state.currentUser;
    document.getElementById('profile-avatar').src = u.avatarUrl;
    document.getElementById('profile-name').textContent = u.name;
    document.getElementById('profile-email').textContent = u.email;
    document.getElementById('profile-joined').textContent = 'Joined ' + u.joined;
    document.getElementById('profile-student-id').textContent = u.studentId;
    document.getElementById('profile-course').textContent = u.course;
    document.getElementById('profile-mobile').textContent = u.mobile;
    
    const level = Math.floor(u.lifetimePoints / 1000) + 1;
    const progress = (u.lifetimePoints % 1000) / 10; // % of 1000
    
    document.getElementById('profile-level-title').textContent = 'Green Starter';
    document.getElementById('profile-level-number').textContent = level;
    document.getElementById('profile-level-progress').style.width = progress + '%';
    document.getElementById('profile-level-next').textContent = `${u.lifetimePoints % 1000} / 1000 pts`;
};

const renderEcoPoints = () => {
    document.getElementById('ecopoints-balance').textContent = formatPoints(state.currentUser.points);
    const u = state.currentUser;
    const level = Math.floor(u.lifetimePoints / 1000) + 1;
    const progress = (u.lifetimePoints % 1000) / 10;

    document.getElementById('ecopoints-level-title').textContent = 'Green Starter';
    document.getElementById('ecopoints-level-number').textContent = level;
    document.getElementById('ecopoints-level-progress').style.width = progress + '%';
    document.getElementById('ecopoints-level-next').textContent = `${u.lifetimePoints % 1000} / 1000 pts`;

    const activityContainer = document.getElementById('ecopoints-recent-activity');
    activityContainer.innerHTML = '';
    state.history.slice(0, 3).forEach(h => {
        activityContainer.innerHTML += `
            <div class="flex items-center justify-between text-sm">
                <div class="flex items-center">
                    <div class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3">
                        <i data-lucide="${h.icon}" class="w-4 h-4 text-gray-600 dark:text-gray-300"></i>
                    </div>
                    <div>
                        <p class="font-medium text-gray-800 dark:text-gray-100">${h.description}</p>
                        <p class="text-xs text-gray-500">${h.date}</p>
                    </div>
                </div>
                <span class="font-bold ${h.points > 0 ? 'text-green-600' : 'text-red-500'}">
                    ${h.points > 0 ? '+' : ''}${h.points}
                </span>
            </div>
        `;
    });
    lucide.createIcons();
};

const renderChallenges = () => {
    const container = document.getElementById('challenges-page-list');
    container.innerHTML = '';
    state.dailyChallenges.forEach(c => {
        let action = ``;
        if (c.status === 'active') {
            let onclick = `handleChallenge('${c.id}')`;
            if (c.type === 'upload') onclick = "document.getElementById('challenge-file-input').click()";
            if (c.type === 'quiz') onclick = "openEcoQuizModal()";
            action = `<button onclick="${onclick}" class="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-full">${c.buttonText}</button>`;
        } else {
            action = `<span class="text-xs font-bold text-gray-400">Completed</span>`;
        }
        
        container.innerHTML += `
            <div class="glass-card p-4 rounded-2xl flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600">
                    <i data-lucide="${c.icon}" class="w-6 h-6"></i>
                </div>
                <div class="flex-1">
                    <h4 class="font-bold text-gray-900 dark:text-white">${c.title}</h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">${c.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-xs font-bold text-green-600">+${c.points_reward} pts</span>
                        ${action}
                    </div>
                </div>
            </div>
        `;
    });
    lucide.createIcons();
};

const renderEvents = () => {
    const list = document.getElementById('event-list');
    list.innerHTML = '';
    state.events.forEach(e => {
        list.innerHTML += `
            <div class="glass-card p-4 rounded-2xl mb-3 relative overflow-hidden">
                <div class="flex justify-between items-start relative z-10">
                    <div>
                        <p class="text-xs font-bold text-green-600 dark:text-green-400 mb-1 uppercase tracking-wider">${e.date}</p>
                        <h3 class="font-bold text-lg text-gray-800 dark:text-white">${e.title}</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${e.description}</p>
                    </div>
                </div>
                <div class="mt-4 flex items-center gap-2">
                    <span class="px-2 py-1 rounded bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-bold">
                        +${e.points} Pts
                    </span>
                    <span class="text-xs text-gray-400 capitalize">• ${e.status}</span>
                </div>
            </div>
        `;
    });
};

const renderHistory = () => {
    const list = document.getElementById('history-list');
    list.innerHTML = '';
    state.history.forEach(h => {
        list.innerHTML += `
            <div class="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <div class="bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
                        <i data-lucide="${h.icon}" class="w-4 h-4 text-gray-600 dark:text-gray-300"></i>
                    </div>
                    <div>
                        <p class="font-medium text-gray-800 dark:text-gray-100 text-sm">${h.description}</p>
                        <p class="text-xs text-gray-400">${h.date}</p>
                    </div>
                </div>
                <span class="font-bold ${h.points > 0 ? 'text-green-600' : 'text-red-500'} text-sm">
                    ${h.points > 0 ? '+' : ''}${h.points}
                </span>
            </div>
        `;
    });
    lucide.createIcons();
};

// =========================================
// 6. Modals & Interactions
// =========================================

// Daily Check-in
const openCheckinModal = () => {
    const modal = document.getElementById('checkin-modal');
    const streakEl = document.getElementById('checkin-modal-streak');
    const calEl = document.getElementById('checkin-modal-calendar');
    const btnContainer = document.getElementById('checkin-modal-button-container');

    streakEl.textContent = `${state.currentUser.checkInStreak} Days`;
    
    // Generate mini calendar
    calEl.innerHTML = '';
    for (let i = -3; i <= 3; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        const isToday = i === 0;
        calEl.innerHTML += `
            <div class="flex flex-col items-center justify-center w-8 h-10 rounded ${isToday ? 'bg-green-100 text-green-700 font-bold' : 'text-gray-400'}">
                <span class="text-[10px]">${['S','M','T','W','T','F','S'][d.getDay()]}</span>
                <span class="text-xs">${d.getDate()}</span>
            </div>
        `;
    }

    btnContainer.innerHTML = `
        <button onclick="handleDailyCheckin()" class="w-full bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-green-700 transition">
            Claim +${state.checkInReward} Points
        </button>
    `;

    modal.classList.remove('invisible');
    setTimeout(() => { modal.classList.add('open'); }, 10);
};

const closeCheckinModal = () => {
    const modal = document.getElementById('checkin-modal');
    modal.classList.remove('open');
    setTimeout(() => { modal.classList.add('invisible'); }, 300);
};

const handleDailyCheckin = () => {
    // Update state
    state.currentUser.checkInStreak++;
    state.currentUser.lastCheckInDate = today;
    state.currentUser.points += state.checkInReward;
    
    state.history.unshift({
        type: 'checkin',
        description: 'Daily Check-in',
        points: state.checkInReward,
        date: today,
        icon: 'flame'
    });

    animatePoints(state.currentUser.points);
    renderDashboard(); // Re-renders the card to "Completed"
    closeCheckinModal();
};

// Eco Quiz
const openEcoQuizModal = () => {
    const modal = document.getElementById('eco-quiz-modal');
    document.getElementById('eco-quiz-modal-question').textContent = "Which plastic is easiest to recycle?";
    document.getElementById('eco-quiz-modal-options').innerHTML = `
        <button onclick="answerQuiz(true)" class="w-full text-left p-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-600">PET (Type 1)</button>
        <button onclick="answerQuiz(false)" class="w-full text-left p-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-600">PVC (Type 3)</button>
        <button onclick="answerQuiz(false)" class="w-full text-left p-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-600">PS (Type 6)</button>
    `;
    document.getElementById('eco-quiz-modal-result').classList.add('hidden');
    
    modal.classList.remove('invisible');
    setTimeout(() => { modal.classList.add('open'); }, 10);
};

const answerQuiz = (isCorrect) => {
    const resultDiv = document.getElementById('eco-quiz-modal-result');
    const optionsDiv = document.getElementById('eco-quiz-modal-options');
    
    optionsDiv.classList.add('hidden');
    resultDiv.classList.remove('hidden');

    if (isCorrect) {
        resultDiv.innerHTML = `<p class="text-green-600 font-bold text-xl">Correct! +15 Points</p>`;
        animatePoints(state.currentUser.points + 15);
        // Mark quiz as done in state (simplified)
        state.dailyChallenges[1].status = 'completed';
        renderChallenges();
    } else {
        resultDiv.innerHTML = `<p class="text-red-500 font-bold">Wrong answer. Try again!</p>`;
    }

    setTimeout(closeEcoQuizModal, 1500);
};

const closeEcoQuizModal = () => {
    const modal = document.getElementById('eco-quiz-modal');
    modal.classList.remove('open');
    setTimeout(() => { modal.classList.add('invisible'); }, 300);
};

// Chatbot
const openChatbotModal = () => {
    const modal = document.getElementById('chatbot-modal');
    const msgs = document.getElementById('chatbot-messages');
    
    if (msgs.children.length === 0) {
        msgs.innerHTML = `
            <div class="flex justify-start">
                <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-bl-none max-w-[80%]">
                    <p class="text-sm text-gray-800 dark:text-gray-100">Hi! I'm EcoBot. Ask me about recycling or points.</p>
                </div>
            </div>
        `;
    }

    modal.classList.remove('invisible');
    setTimeout(() => { modal.classList.add('open'); }, 10);
};

const closeChatbotModal = () => {
    const modal = document.getElementById('chatbot-modal');
    modal.classList.remove('open');
    setTimeout(() => { modal.classList.add('invisible'); }, 300);
};

document.getElementById('chatbot-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('chatbot-input');
    const text = input.value.trim();
    if(!text) return;

    const msgs = document.getElementById('chatbot-messages');
    
    // User Msg
    msgs.innerHTML += `
        <div class="flex justify-end animate-slide-in">
            <div class="bg-green-600 text-white p-3 rounded-lg rounded-br-none max-w-[80%]">
                <p class="text-sm">${text}</p>
            </div>
        </div>
    `;
    input.value = '';
    msgs.scrollTop = msgs.scrollHeight;

    // Bot Reply (Simple Mock)
    setTimeout(() => {
        let reply = "I can help you find recycling spots!";
        if(text.includes('point')) reply = "You earn points by recycling, attending events, and daily check-ins.";
        if(text.includes('code')) reply = "You can redeem codes in the sidebar menu.";
        
        msgs.innerHTML += `
            <div class="flex justify-start animate-slide-in">
                <div class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-3 rounded-lg rounded-bl-none max-w-[80%]">
                    <p class="text-sm">${reply}</p>
                </div>
            </div>
        `;
        msgs.scrollTop = msgs.scrollHeight;
    }, 800);
});

// Theme Toggle Logic
const updateThemeIcon = (isDark) => {
    const icon = document.getElementById('theme-icon');
    const text = document.getElementById('theme-text');
    if (isDark) {
        icon.setAttribute('data-lucide', 'moon');
        text.textContent = 'Dark Mode';
    } else {
        icon.setAttribute('data-lucide', 'sun');
        text.textContent = 'Light Mode';
    }
    lucide.createIcons();
};

document.getElementById('theme-toggle-btn').addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('eco-theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
});

// Search handling
document.getElementById('store-search-input').addEventListener('input', renderStore);
document.getElementById('store-search-clear').addEventListener('click', () => {
    document.getElementById('store-search-input').value = '';
    renderStore();
});

// File Upload Simulation
document.getElementById('challenge-file-input').addEventListener('change', () => {
    alert("Photo uploaded successfully! Pending verification.");
    state.dailyChallenges[0].status = 'pending';
    state.dailyChallenges[0].buttonText = 'Pending';
    renderChallenges();
});

// =========================================
// 7. Init
// =========================================
window.addEventListener('DOMContentLoaded', initApp);
