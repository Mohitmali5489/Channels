// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderMedalTally(); // Renders ONLY students now
    renderRegistrationCards();
    renderSchedule();
    renderAthleteSchedule();
});

// --- DATA: LEADERBOARD (Students Only) ---
const studentData = [
    { name: "Rohan Das", dept: "CS", gold: 3, silver: 1, bronze: 0, avatar: "RD" },
    { name: "Priya Sharma", dept: "BMS", gold: 2, silver: 2, bronze: 1, avatar: "PS" },
    { name: "Amit Kumar", dept: "BCOM", gold: 2, silver: 0, bronze: 2, avatar: "AK" },
    { name: "Sneha Patel", dept: "BAF", gold: 1, silver: 3, bronze: 1, avatar: "SP" },
    { name: "Vedant Patil", dept: "BA", gold: 1, silver: 2, bronze: 0, avatar: "VP" },
];

// --- DATA: REGISTRATION GAMES ---
const sportsData = [
    { id: 1, name: "100m Sprint", icon: "timer", type: "Solo", teamSize: 1, status: "Open" },
    { id: 2, name: "Chess", icon: "crown", type: "Solo", teamSize: 1, status: "Open" },
    { id: 3, name: "Box Cricket", icon: "trophy", type: "Team", teamSize: 8, status: "Closed" }, 
    { id: 4, name: "Kabaddi", icon: "swords", type: "Team", teamSize: 7, status: "Open" },
    { id: 5, name: "Badminton", icon: "wind", type: "Solo", teamSize: 1, status: "Closed" }, 
    { id: 6, name: "Relay Race", icon: "users", type: "Team", teamSize: 4, status: "Open" },
    { id: 7, name: "Volleyball", icon: "volleyball", type: "Team", teamSize: 6, status: "Open" },
    { id: 8, name: "Carrom", icon: "crosshair", type: "Solo", teamSize: 1, status: "Open" },
    { id: 9, name: "Table Tennis", icon: "circle-dot", type: "Solo", teamSize: 1, status: "Open" },
    { id: 10, name: "Tug of War", icon: "users", type: "Team", teamSize: 10, status: "Open" }
];

// --- DATA: SCHEDULE ---
// Enhanced with detailed data for "Professional" views
const scheduleData = [
    { 
        id: 101, sport: "Cricket", type: "Semi Final", team1: "CS", team2: "BCOM", score1: "88/2", score2: "Yet to Bat", 
        status: "Live", time: "Now", loc: "Gymkhana", live: true,
        details: { overs: "8.4", bat: "Rohan (42*)", bowl: "Rahul (1/12)", crr: "10.15", project: "118" }
    },
    { 
        id: 105, sport: "Football", type: "Finals", team1: "BMS", team2: "BAF", status: "Finished", 
        winner: "BMS", result: "2 - 1", live: false,
        details: { scorers: [{name: "Sahil (BMS)", time: "12'"}, {name: "Raj (BAF)", time: "44'"}, {name: "Amit (BMS)", time: "88'"}], cards: "2 Yellow" }
    },
    { 
        id: 102, sport: "Badminton", type: "Singles", team1: "Rahul (CS)", team2: "Amit (BFM)", status: "Upcoming", 
        time: "4:00 PM", loc: "Court 2", live: false,
        details: { sets: "Best of 3" }
    },
    { 
        id: 103, sport: "Kabaddi", type: "Qualifier", team1: "BMS", team2: "BAF", status: "Upcoming", 
        time: "5:30 PM", loc: "Ground A", live: false,
        details: {}
    },
    { 
        id: 104, sport: "Chess", type: "Finals", team1: "Aditya P", team2: "Neha S", status: "Finished", 
        winner: "Aditya P", result: "Checkmate", live: false,
        details: { moves: 42 }
    },
    { 
        id: 106, sport: "Volleyball", type: "Round 1", team1: "CS", team2: "BMS", status: "Upcoming", 
        time: "Tomorrow", loc: "Court 1", live: false,
        details: {}
    }
];

// --- RENDER FUNCTIONS ---

function renderMedalTally() {
    // Only Student Tally
    const studHTML = studentData.map((s, i) => `
        <div class="flex items-center gap-3 p-3 border-b border-gray-100 dark:border-white/5 last:border-0">
            <div class="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-xs font-bold text-brand-primary">${s.avatar}</div>
            <div class="flex-1">
                <h4 class="font-bold text-sm dark:text-gray-200">${s.name}</h4>
                <p class="text-[10px] text-gray-500 uppercase font-bold">${s.dept} • <span class="text-yellow-500">${s.gold}G</span> <span class="text-gray-400">${s.silver}S</span> <span class="text-orange-400">${s.bronze}B</span></p>
            </div>
            <span class="font-black text-xl text-gray-300">#${i + 1}</span>
        </div>
    `).join('');
    document.getElementById('tally-student').innerHTML = studHTML;
}

function renderRegistrationCards() {
    const grid = document.getElementById('registration-grid');
    grid.innerHTML = sportsData.map(sport => {
        const isClosed = sport.status === "Closed";
        const cardClass = isClosed 
            ? "glass p-4 rounded-2xl border border-gray-200 dark:border-white/5 opacity-60 grayscale cursor-not-allowed bg-gray-100 dark:bg-white/5" 
            : "glass p-4 rounded-2xl border border-transparent hover:border-brand-primary/30 transition-all cursor-pointer bg-white dark:bg-white/5 shadow-sm";
        
        const badgeClass = isClosed 
            ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" 
            : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";

        return `
            <div class="${cardClass}" onclick="openReg(${sport.id})">
                <div class="flex justify-between items-start mb-2">
                    <div class="p-2 ${isClosed ? 'bg-gray-200 dark:bg-white/10' : 'bg-brand-primary/10'} rounded-lg">
                        <i data-lucide="${sport.icon}" class="w-5 h-5 ${isClosed ? 'text-gray-500' : 'text-brand-primary'}"></i>
                    </div>
                    <span class="text-[10px] font-bold uppercase px-2 py-1 rounded ${badgeClass}">${sport.status}</span>
                </div>
                <h4 class="font-bold text-sm dark:text-gray-200">${sport.name}</h4>
                <div class="mt-1 text-xs text-gray-500">${sport.type === 'Team' ? `Team of ${sport.teamSize}` : 'Individual'}</div>
            </div>
        `;
    }).join('');
    lucide.createIcons();
}

function renderSchedule() {
    const upcomingContainer = document.getElementById('view-upcoming');
    const resultsContainer = document.getElementById('view-results');
    
    // Filter Data
    const upcoming = scheduleData.filter(m => m.status === 'Upcoming' || m.status === 'Live');
    const results = scheduleData.filter(m => m.status === 'Finished');

    // Render Upcoming
    upcomingContainer.innerHTML = upcoming.map(m => {
        const isLive = m.status === 'Live';
        return `
            <div onclick="openMatchDetails(${m.id})" class="glass p-4 rounded-2xl bg-white dark:bg-dark-card border-l-4 ${isLive ? 'border-brand-primary' : 'border-gray-300 dark:border-gray-700'} cursor-pointer active:scale-95 transition-transform">
                <div class="flex justify-between mb-2">
                    ${isLive ? `<span class="px-2 py-0.5 bg-brand-primary/10 text-brand-primary text-[10px] font-bold rounded animate-pulse">LIVE NOW</span>` 
                             : `<span class="text-xs font-bold text-gray-500">${m.time}</span>`}
                    <span class="text-xs text-gray-500">${m.loc || m.type}</span>
                </div>
                <div class="flex justify-between items-center">
                    <div class="text-center">
                        <h4 class="font-black text-lg">${m.team1.split(' ')[0]}</h4>
                    </div>
                    <div class="flex flex-col items-center">
                        <span class="text-xs font-bold text-gray-300">VS</span>
                        <div class="mt-1 px-2 py-0.5 bg-gray-100 dark:bg-white/10 rounded text-[10px] font-mono">${m.sport}</div>
                    </div>
                    <div class="text-center">
                        <h4 class="font-black text-lg text-gray-500">${m.team2.split(' ')[0]}</h4>
                    </div>
                </div>
                ${isLive ? `
                    <div class="mt-3 pt-3 border-t border-gray-100 dark:border-white/5 text-center flex justify-between items-center">
                        <p class="text-xs font-mono">Score: <span class="text-brand-primary font-bold">${m.score1}</span></p>
                        <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400"></i>
                    </div>` : ''}
            </div>
        `;
    }).join('');

    // Render Results
    resultsContainer.innerHTML = results.map(m => `
        <div onclick="openMatchDetails(${m.id})" class="glass p-0 rounded-2xl overflow-hidden bg-white dark:bg-dark-card border border-gray-100 dark:border-white/5 cursor-pointer active:scale-95 transition-transform">
            <div class="p-4 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5">
                <div class="flex justify-between items-center mb-1">
                    <span class="text-[10px] font-bold text-gray-400 uppercase">${m.sport} • ${m.type}</span>
                    <span class="text-[10px] font-bold text-green-500">FINISHED</span>
                </div>
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-2">
                        <span class="font-black text-xl">${m.team1.split(' ')[0]}</span>
                        ${m.winner.includes(m.team1.split(' ')[0]) ? '<span class="text-xs text-gray-500">(Winner)</span>' : ''}
                    </div>
                    <div class="font-black text-xl text-brand-secondary">${m.result}</div>
                    <div class="flex items-center gap-2">
                        <span class="font-black text-xl text-gray-400">${m.team2.split(' ')[0]}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function renderAthleteSchedule() {
    const myMatches = scheduleData.filter(m => (m.team1.includes('CS') || m.team2.includes('CS')) && m.status !== 'Finished');
    
    const container = document.getElementById('athlete-schedule-container');
    if(myMatches.length === 0) {
        container.innerHTML = `<p class="text-sm text-gray-500">No upcoming matches scheduled.</p>`;
        return;
    }

    container.innerHTML = myMatches.map(m => `
        <div onclick="openMatchDetails(${m.id})" class="bg-white dark:bg-white/5 border border-brand-primary/30 p-4 rounded-2xl relative overflow-hidden cursor-pointer active:scale-95 transition-transform">
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary"></div>
            <div class="flex justify-between items-start mb-2">
                <div>
                    <h4 class="font-bold text-sm">${m.sport} (${m.type})</h4>
                    <p class="text-xs text-gray-500">vs ${m.team1.includes('CS') ? m.team2 : m.team1}</p>
                </div>
                ${m.status === 'Live' ? '<span class="text-[10px] font-bold bg-red-500 text-white px-2 py-1 rounded animate-pulse">LIVE</span>' 
                                      : `<span class="text-[10px] font-bold bg-gray-200 dark:bg-white/10 text-gray-500 px-2 py-1 rounded">${m.time}</span>`}
            </div>
            <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span class="flex items-center gap-1"><i data-lucide="map-pin" class="w-3 h-3"></i> ${m.loc || 'Gymkhana'}</span>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

// --- LOGIC: TABS & FILTER ---
function filterSports() {
    const input = document.getElementById('sport-search').value.toLowerCase();
    const cards = document.getElementById('registration-grid').children;
    Array.from(cards).forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        card.style.display = title.includes(input) ? "block" : "none";
    });
}

function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('tab-' + id).classList.remove('hidden');
    
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('active', 'text-brand-primary');
        btn.classList.add('text-gray-500', 'dark:text-gray-400');
    });
    const active = document.getElementById('btn-' + id);
    active.classList.add('active', 'text-brand-primary');
    active.classList.remove('text-gray-500', 'dark:text-gray-400');
    window.scrollTo(0, 0);
}

function toggleSchedule(type) {
    if(type === 'upcoming') {
        document.getElementById('view-upcoming').classList.remove('hidden');
        document.getElementById('view-results').classList.add('hidden');
        document.getElementById('sch-upcoming-btn').className = "px-4 py-1.5 rounded-md bg-white dark:bg-gray-700 shadow text-brand-primary transition-all";
        document.getElementById('sch-results-btn').className = "px-4 py-1.5 rounded-md text-gray-500 dark:text-gray-400 transition-all";
    } else {
        document.getElementById('view-upcoming').classList.add('hidden');
        document.getElementById('view-results').classList.remove('hidden');
        document.getElementById('sch-results-btn').className = "px-4 py-1.5 rounded-md bg-white dark:bg-gray-700 shadow text-brand-primary transition-all";
        document.getElementById('sch-upcoming-btn').className = "px-4 py-1.5 rounded-md text-gray-500 dark:text-gray-400 transition-all";
    }
}

// --- MODALS: REGISTRATION ---
const regModal = document.getElementById('reg-modal');
const regContent = document.getElementById('reg-content');
const regContainer = document.getElementById('reg-form-container');

function openReg(id) {
    const sport = sportsData.find(s => s.id === id);
    if(!sport) return;

    document.getElementById('modal-sport-title').textContent = sport.name;
    document.getElementById('modal-sport-type').textContent = sport.type;
    
    if (sport.status === "Closed") {
        regContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center h-64 text-center">
                <div class="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                    <i data-lucide="lock" class="w-10 h-10 text-red-500"></i>
                </div>
                <h4 class="text-xl font-bold dark:text-white">Registration Closed</h4>
                <p class="text-sm text-gray-500 mt-2 px-6">The deadline has passed.</p>
                <button onclick="closeRegModal()" class="mt-6 px-6 py-2 bg-gray-200 dark:bg-white/10 rounded-full text-sm font-bold dark:text-white">Go Back</button>
            </div>`;
    } else {
        let formHTML = `<form onsubmit="submitReg(event)" class="space-y-4 pt-2">
            <div class="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5">
                <h4 class="text-xs font-bold uppercase text-brand-primary mb-3">
                    ${sport.type === 'Team' ? 'Captain Details' : 'Participant Details'}
                </h4>
                <div class="space-y-3">
                    <input type="text" required placeholder="Full Name" class="input-field">
                    <input type="tel" required placeholder="WhatsApp Number" class="input-field">
                    <div class="grid grid-cols-2 gap-3">
                        <select class="input-field"><option>FY</option><option>SY</option><option>TY</option></select>
                        <input type="text" placeholder="Roll No" class="input-field">
                    </div>
                </div>
            </div>`;

        if (sport.type === "Team") {
            formHTML += `
                <div class="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5">
                    <h4 class="text-xs font-bold uppercase text-brand-secondary mb-3">Team Information</h4>
                    <input type="text" required placeholder="Team Name" class="input-field mb-4 font-bold">
                    <h5 class="text-xs font-bold text-gray-400 mb-2">Team Members (${sport.teamSize})</h5>
                    <div class="space-y-3">`;
            for(let i=2; i <= sport.teamSize; i++) {
                formHTML += `
                    <div class="flex gap-2">
                        <span class="w-6 py-3 text-center text-xs font-bold text-gray-400 pt-3">${i}.</span>
                        <input type="text" placeholder="Player Name" class="input-field w-2/3">
                        <input type="text" placeholder="Role" class="input-field w-1/3">
                    </div>`;
            }
            formHTML += `</div></div>`;
        }

        formHTML += `
            <div class="flex items-start gap-2 mt-4">
                <input type="checkbox" required class="mt-1 accent-brand-primary">
                <p class="text-xs text-gray-500">I agree to pay the fees within 24 hours.</p>
            </div>
            <button type="submit" class="w-full py-4 mt-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform">
                Confirm Registration
            </button>
            </form>`;
        
        const inputClass = "w-full bg-white dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm focus:border-brand-primary outline-none dark:text-white";
        regContainer.innerHTML = formHTML.replace(/input-field/g, inputClass);
    }

    regModal.classList.remove('hidden');
    lucide.createIcons();
    setTimeout(() => regContent.classList.remove('translate-y-full'), 10);
}

function closeRegModal() {
    regContent.classList.add('translate-y-full');
    setTimeout(() => regModal.classList.add('hidden'), 300);
}

function submitReg(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Success!';
    btn.classList.add('bg-green-500');
    confetti({ particleCount: 150, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => {
        closeRegModal();
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('bg-green-500');
        }, 300);
    }, 1500);
}

// --- MODALS: PROFESSIONAL MATCH DETAILS ---
const matchModal = document.getElementById('match-modal');
const matchContent = document.getElementById('match-content');
const matchBody = document.getElementById('match-modal-body');

function openMatchDetails(id) {
    const match = scheduleData.find(m => m.id === id);
    if (!match) return;

    // Update Header
    document.getElementById('match-modal-subtitle').innerText = match.sport + " • " + match.type;

    // Generate Sport-Specific HTML
    let content = "";

    if (match.sport === "Cricket") {
        content = `
            <div class="cricket-score-card p-6 pb-8 rounded-b-3xl relative overflow-hidden shadow-2xl">
                <div class="flex justify-between items-start mb-6 z-10 relative">
                    <div class="text-center">
                         <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl font-black mb-2 mx-auto border border-white/20">${match.team1}</div>
                         <p class="text-2xl font-black">${match.score1}</p>
                         <p class="text-[10px] opacity-70">Batting</p>
                    </div>
                    <div class="text-center pt-2">
                        <p class="text-xs font-bold bg-red-500 px-3 py-1 rounded-full mb-1">LIVE</p>
                        <p class="text-[10px] opacity-70">Over ${match.details.overs}</p>
                    </div>
                     <div class="text-center">
                         <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl font-black mb-2 mx-auto border border-white/20 text-gray-400">${match.team2}</div>
                         <p class="text-2xl font-black text-gray-400">-/-</p>
                         <p class="text-[10px] opacity-70">Yet to Bat</p>
                    </div>
                </div>
                <div class="flex justify-around bg-black/20 p-3 rounded-xl backdrop-blur-sm z-10 relative text-xs">
                     <div>
                        <p class="opacity-60 text-[9px] uppercase">Current Run Rate</p>
                        <p class="font-bold text-base">${match.details.crr}</p>
                     </div>
                     <div class="w-px bg-white/10"></div>
                     <div>
                        <p class="opacity-60 text-[9px] uppercase">Projected</p>
                        <p class="font-bold text-base text-brand-primary">${match.details.project}</p>
                     </div>
                </div>
            </div>
            <div class="p-4 space-y-4">
                <h4 class="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">Current Action</h4>
                <div class="glass p-4 rounded-xl flex justify-between items-center bg-white dark:bg-white/5">
                    <div>
                        <p class="text-[10px] text-gray-400 uppercase">Striker</p>
                        <p class="font-bold text-lg text-brand-primary">${match.details.bat}</p>
                    </div>
                     <div class="text-right">
                        <p class="text-[10px] text-gray-400 uppercase">Bowler</p>
                        <p class="font-bold text-lg">${match.details.bowl}</p>
                    </div>
                </div>
                <div class="glass p-0 rounded-xl overflow-hidden bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <div class="p-3 bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
                        <span class="text-xs font-bold">Commentary</span>
                    </div>
                    <div class="p-4 space-y-3">
                         <div class="flex gap-3">
                            <span class="font-mono text-xs font-bold text-gray-400">8.4</span>
                            <p class="text-sm">FOUR! Smashed down the ground.</p>
                         </div>
                         <div class="flex gap-3">
                            <span class="font-mono text-xs font-bold text-gray-400">8.3</span>
                            <p class="text-sm">No run, defended nicely.</p>
                         </div>
                    </div>
                </div>
            </div>
        `;
    } else if (match.sport === "Football") {
        content = `
            <div class="football-field h-48 relative flex items-center justify-center text-white shadow-xl rounded-b-3xl">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="relative z-10 flex w-full justify-around items-center px-4">
                     <div class="text-center">
                         <div class="text-3xl font-black mb-1">${match.team1}</div>
                         ${match.winner === match.team1 ? '<span class="text-[9px] bg-white text-green-700 font-bold px-2 py-0.5 rounded">WINNER</span>' : ''}
                     </div>
                     <div class="text-center">
                         <div class="text-5xl font-black mb-2">${match.result}</div>
                         <div class="text-xs font-bold bg-black/40 px-3 py-1 rounded-full">FT</div>
                     </div>
                     <div class="text-center">
                         <div class="text-3xl font-black mb-1">${match.team2}</div>
                     </div>
                </div>
            </div>
            <div class="p-4">
                <h4 class="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-3">Match Timeline</h4>
                <div class="relative pl-4 border-l-2 border-gray-200 dark:border-gray-800 space-y-4">
                    ${match.details.scorers ? match.details.scorers.map(g => `
                        <div class="relative">
                            <div class="absolute -left-[21px] top-0 w-4 h-4 bg-brand-primary rounded-full border-2 border-white dark:border-dark-bg flex items-center justify-center text-[8px] text-white">⚽</div>
                            <div class="flex justify-between items-center bg-white dark:bg-white/5 p-2 rounded-lg border border-gray-100 dark:border-white/5">
                                <span class="text-sm font-bold">${g.name}</span>
                                <span class="font-mono text-xs text-gray-500">${g.time}</span>
                            </div>
                        </div>
                    `).join('') : ''}
                     <div class="relative">
                            <div class="absolute -left-[21px] top-0 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white dark:border-dark-bg flex items-center justify-center text-[8px] text-white">!</div>
                            <div class="flex justify-between items-center bg-white dark:bg-white/5 p-2 rounded-lg border border-gray-100 dark:border-white/5">
                                <span class="text-sm font-bold">Total Cards</span>
                                <span class="font-mono text-xs text-gray-500">${match.details.cards || '0'}</span>
                            </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Generic / Badminton
        content = `
            <div class="bg-gray-100 dark:bg-white/5 h-32 flex items-center justify-center rounded-b-3xl">
                 <div class="flex items-center gap-8">
                      <div class="text-center">
                           <h2 class="text-2xl font-black">${match.team1.split(' ')[0]}</h2>
                      </div>
                      <div class="text-sm font-bold text-gray-400">VS</div>
                      <div class="text-center">
                           <h2 class="text-2xl font-black">${match.team2.split(' ')[0]}</h2>
                      </div>
                 </div>
            </div>
            <div class="p-6 text-center space-y-4">
                <div class="inline-block px-4 py-2 rounded-xl bg-brand-primary/10 text-brand-primary font-bold">
                    ${match.status}
                </div>
                ${match.status === 'Upcoming' ? `
                    <p class="text-gray-500 text-sm">Scheduled for <span class="font-bold text-gray-900 dark:text-white">${match.time}</span> at ${match.loc}</p>
                    <button class="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl">Set Reminder</button>
                ` : `
                    <p class="text-2xl font-black">${match.result}</p>
                    <p class="text-sm text-green-500 font-bold">Winner: ${match.winner}</p>
                `}
            </div>
        `;
    }

    matchBody.innerHTML = content;
    matchModal.classList.remove('hidden');
    
    setTimeout(() => {
        if(window.innerWidth >= 768) {
             matchContent.classList.remove('md:scale-95', 'md:opacity-0');
             matchContent.classList.add('md:scale-100', 'md:opacity-100');
        }
        matchContent.classList.remove('translate-y-full');
        matchContent.classList.add('translate-y-0');
    }, 10);
}

function closeMatchModal() {
    if(window.innerWidth >= 768) {
         matchContent.classList.remove('md:scale-100', 'md:opacity-100');
         matchContent.classList.add('md:scale-95', 'md:opacity-0');
    }
    matchContent.classList.remove('translate-y-0');
    matchContent.classList.add('translate-y-full');
    setTimeout(() => matchModal.classList.add('hidden'), 300);
}

// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const html = document.documentElement;
if (window.matchMedia('(prefers-color-scheme: dark)').matches) html.classList.add('dark');
themeBtn.addEventListener('click', () => html.classList.toggle('dark'));
