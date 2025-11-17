/* ============================================
   ECOBIRLA APP STATE
============================================ */
let state = {
    currentUser: {
        name: "Alex Green",
        avatar: "https://placehold.co/200x200?text=AG",
        points: 230,
        co2Saved: 8,
        recycled: 2.4,
        events: 2,
        checkInStreak: 0,
        lastCheckInDate: null,
    },

    leaderboard: [
        { name: "Jane Doe",   class: "FYBCOM", points: 520, initials: "JD" },
        { name: "Mike Smith", class: "SYBCOM", points: 410, initials: "MS" },
        { name: "Sarah Lee",  class: "TYBCOM", points: 395, initials: "SL" },
        { name: "Alex Green", class: "FYBCOM", points: 230, initials: "AG" },
        { name: "Tom Wilson", class: "SYBCOM", points: 180, initials: "TW" },
        { name: "Emily Chen", class: "FYBCOM", points: 150, initials: "EC" }
    ],

    demoRedeemUsedCodes: []
};

let today = new Date().toISOString().split("T")[0];


/* ============================================
   PAGE NAVIGATION
============================================ */
const pages = document.querySelectorAll(".page");
const navItems = document.querySelectorAll(".nav-item");

function showPage(id) {
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");

    navItems.forEach(btn => {
        btn.classList.remove("active");
        if (btn.getAttribute("onclick").includes(id)) {
            btn.classList.add("active");
        }
    });
}


/* ============================================
   UI REFRESH
============================================ */
function refreshUI() {
    const u = state.currentUser;
    document.getElementById("user-name-greeting").textContent = u.name.split(" ")[0];
    document.getElementById("user-points-header").textContent = `${u.points} pts`;

    document.getElementById("impact-co2").textContent = `${u.co2Saved} kg`;
    document.getElementById("impact-recycled").textContent = `${u.recycled} kg`;
    document.getElementById("impact-events").textContent = `${u.events}`;

    document.getElementById("user-avatar").src = u.avatar;
    document.getElementById("user-name-profile").textContent = u.name;
    document.getElementById("user-points-profile").textContent = `${u.points} pts`;

    document.getElementById("dashboard-streak-text").textContent =
        `${u.checkInStreak} Day Streak`;

    renderLeaderboard();
}


/* ============================================
   LEADERBOARD RENDER
============================================ */
function renderLeaderboard() {
    const list = document.getElementById("leaderboard-list");
    list.innerHTML = "";

    state.leaderboard.slice(3).forEach(item => {
        list.innerHTML += `
        <div class="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-xl border">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                    ${item.initials}
                </div>
                <div>
                    <p class="font-semibold text-gray-800 dark:text-gray-200">${item.name}</p>
                    <p class="text-xs text-green-600 dark:text-green-400">${item.class}</p>
                </div>
            </div>
            <p class="font-bold text-gray-800 dark:text-gray-100">${item.points} pts</p>
        </div>`;
    });
}


/* ============================================
   DAILY CHECK-IN
============================================ */
function openCheckinModal() {
    const modal = document.getElementById("checkin-modal");
    modal.classList.add("open");
    modal.style.visibility = "visible";

    renderCheckinModal();
}

function closeCheckinModal() {
    const modal = document.getElementById("checkin-modal");
    modal.classList.remove("open");
    setTimeout(() => modal.style.visibility = "hidden", 250);
}

function renderCheckinModal() {
    const u = state.currentUser;
    const btnContainer = document.getElementById("checkin-modal-button-container");

    if (u.lastCheckInDate === today) {
        btnContainer.innerHTML = `
            <p class="text-green-600 dark:text-green-400 text-center font-semibold">
                ✔ You've already checked in today!
            </p>`;
        document.getElementById("daily-checkin-button").classList.add("daily-checkin-completed");
        return;
    }

    btnContainer.innerHTML = `
        <button onclick="completeDailyCheckin()" 
            class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl">
            Check-in & Earn +10 Points
        </button>`;
}

function completeDailyCheckin() {
    const u = state.currentUser;
    u.points += 10;
    u.checkInStreak += 1;
    u.lastCheckInDate = today;

    refreshUI();
    renderCheckinModal();
}


/* ============================================
   REDEEM CODE (DEMO)
============================================ */
document.getElementById("redeem-code-form").addEventListener("submit", e => {
    e.preventDefault();
    redeemCode();
});

function redeemCode() {
    const input = document.getElementById("redeem-code-input");
    const status = document.getElementById("redeem-code-status");
    const code = input.value.trim().toUpperCase();

    if (!/^[A-Z0-9]{10}$/.test(code)) {
        showRedeemStatus("❌ Invalid code format!", false);
        return;
    }

    if (state.demoRedeemUsedCodes.includes(code)) {
        showRedeemStatus("⚠ Code already redeemed!", false);
        return;
    }

    state.demoRedeemUsedCodes.push(code);
    state.currentUser.points += 50;
    showRedeemStatus("🎉 Code Redeemed! +50 EcoPoints added.", true);
    input.value = "";
    refreshUI();
}

function showRedeemStatus(msg, success) {
    const status = document.getElementById("redeem-code-status");
    status.textContent = msg;
    status.className = `text-center mt-3 font-semibold ${
        success ? "redeem-status-success" : "redeem-status-error"
    }`;
    status.classList.remove("hidden");
}


/* ============================================
   CHATBOT DEMO
============================================ */
function openChatbot(){ document.getElementById("chatWindow").classList.add("open"); }
function closeChatbot(){ document.getElementById("chatWindow").classList.remove("open"); }

document.getElementById("chatForm").addEventListener("submit", e => {
    e.preventDefault();
    const input = document.getElementById("chatInput");
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    addUserMessage(text);

    setTimeout(() => {
        addBotMessage("🌿 Thanks for caring about the environment! (Demo Bot)");
    }, 500);
});

function addUserMessage(t){ addChatBubble(t, "msg-me"); }
function addBotMessage(t){ addChatBubble(t, "msg-bot"); }

function addChatBubble(text, cls) {
    const box = document.getElementById("chatMessages");
    const div = document.createElement("div");
    div.className = cls;
    div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}


/* ============================================
   INIT APP
============================================ */
refreshUI();
showPage("dashboard");
lucide.createIcons();
