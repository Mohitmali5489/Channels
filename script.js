// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderStudentLeaderboard();
    renderRegistrationCards();
    renderSchedule();
    renderAthleteSchedule();
    renderHistory();
});

// --- DATA ---
const studentLeaderboard = [
    { name: "Rohan Das", class: "TY CS", gold: 3, silver: 1, bronze: 0, avatar: "RD", rank: 1 },
    { name: "Priya Sharma", class: "SY BMS", gold: 2, silver: 2, bronze: 1, avatar: "PS", rank: 2 },
    { name: "Amit Kumar", class: "FY BCOM", gold: 2, silver: 0, bronze: 2, avatar: "AK", rank: 3 },
    { name: "Sneha Patel", class: "TY BAF", gold: 1, silver: 3, bronze: 1, avatar: "SP", rank: 4 },
    { name: "Vedant Patil", class: "FY BA", gold: 1, silver: 2, bronze: 0, avatar: "VP", rank: 5 },
];

const sportsData = [
    { id: 1, name: "100m Sprint", icon: "timer", type: "Solo", teamSize: 1, status: "Open" },
    { id: 2, name: "Chess", icon: "crown", type: "Solo", teamSize: 1, status: "Open" },
    { id: 3, name: "Box Cricket", icon: "trophy", type: "Team", teamSize: 8, status: "Closed" }, 
    { id: 4, name: "Football", icon: "aperture", type: "Team", teamSize: 7, status: "Open" },
    { id: 5, name: "Badminton", icon: "wind", type: "Solo", teamSize: 1, status: "Closed" }, 
    { id: 6, name: "Kabaddi", icon: "swords", type: "Team", teamSize: 7, status: "Open" },
];

// Enhanced Schedule Data with Deep Stats for "Professional View"
const scheduleData = [
    { 
        id: 101, sport: "Cricket", type: "Semi Final", team1: "CS", team2: "BCOM", 
        status: "Live", time: "Now", loc: "Gymkhana",
        details: {
            score1: "88/2", overs1: "8.4", team1Batting: true,
            score2: "Yet to Bat",
            batter1: { name: "Rohan", runs: 42, balls: 24 },
            batter2: { name: "Suresh", runs: 14, balls: 10 },
            bowler: { name: "Rahul", fig: "1/12 (1.4)" },
            balls: ["4", "0", "1", "6", "W", "1"] 
        }
    },
    { 
        id: 102, sport: "Football", type: "Finals", team1: "BMS", team2: "BAF", 
        status: "Finished", result: "2 - 1", winner: "BMS",
        details: {
            score1: 2, score2: 1,
            time: "Full Time",
            timeline: [
                { min: 12, team: "BMS", player: "Sahil", event: "goal" },
                { min: 34, team: "BAF", player: "Raj", event: "card-yellow" },
                { min: 45, team: "BAF", player: "Vikram", event: "goal" },
                { min: 88, team: "BMS", player: "Arjun", event: "goal" }
            ],
            stats: { poss1: "55%", poss2: "45%", shots1: 8, shots2: 5 }
        }
    },
    {
        id: 103, sport: "Badminton", type: "Singles", team1: "Rahul (CS)", team2: "Amit (BFM)",
        status: "Live", time: "Set 2", loc: "Court 1",
        details: {
            sets: [
                { s1: 21, s2: 19 }, // Set 1
                { s1: 15, s2: 12 }  // Set 2 (Live)
            ],
            server: "Rahul"
        }
    }
];

// --- RENDERERS ---

function renderStudentLeaderboard() {
    const container = document.getElementById('tally-student');
    container.innerHTML = studentLeaderboard.map((s, i) => `
        <div class="flex items-center gap-3 p-3 border-b border-gray-100 dark:border-white/5 last:border-0">
            <div class="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-xs font-bold text-brand-primary border border-brand-primary/20">${s.avatar}</div>
            <div class="flex-1">
                <div class="flex justify-between">
                    <h4 class="font-bold text-sm dark:text-gray-200">${s.name}</h4>
                    <span class="text-[10px] font-bold text-gray-400 bg-gray-100 dark:bg-white/10 px-1.5 rounded">${s.class}</span>
                </div>
                <div class="flex gap-2 mt-0.5 text-[10px] font-bold">
                    <span class="text-yellow-500">🥇 ${s.gold}</span>
                    <span class="text-gray-400">🥈 ${s.silver}</span>
                    <span class="text-orange-400">🥉 ${s.bronze}</span>
                </div>
            </div>
            <span class="font-black text-xl text-gray-300">#${s.rank}</span>
        </div>
    `).join('');
}

function renderRegistrationCards() {
    const grid = document.getElementById('registration-grid');
    grid.innerHTML = sportsData.map(sport => {
        const isClosed = sport.status === "Closed";
        return `
            <div class="glass p-4 rounded-2xl border border-transparent hover:border-brand-primary/30 transition-all cursor-pointer bg-white dark:bg-white/5 shadow-sm ${isClosed ? 'opacity-60 grayscale' : ''}" onclick="openReg(${sport.id})">
                <div class="flex justify-between items-start mb-2">
                    <div class="p-2 ${isClosed ? 'bg-gray-200 dark:bg-white/10' : 'bg-brand-primary/10'} rounded-lg">
                        <i data-lucide="${sport.icon}" class="w-5 h-5 ${isClosed ? 'text-gray-500' : 'text-brand-primary'}"></i>
                    </div>
                    <span class="text-[10px] font-bold uppercase px-2 py-1 rounded ${isClosed ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}">${sport.status}</span>
                </div>
                <h4 class="font-bold text-sm dark:text-gray-200">${sport.name}</h4>
                <div class="mt-1 text-xs text-gray-500">${sport.type === 'Team' ? `Team of ${sport.teamSize}` : 'Individual'}</div>
            </div>
        `;
    }).join('');
    lucide.createIcons();
}

function renderHistory() {
    const container = document.getElementById('history-container');
    // Mock History Data
    const history = [
        { name: "Football League", date: "12 Jan", status: "Winner", statusColor: "text-brand-accent bg-brand-accent/10", detail: "Score: 2-0" },
        { name: "Chess Open", date: "14 Jan", status: "Participated", statusColor: "text-blue-500 bg-blue-500/10", detail: "Rank 12" },
        { name: "Carrom Doubles", date: "10 Jan", status: "Withdrawn", statusColor: "text-red-500 bg-red-500/10", detail: "Personal" }
    ];

    container.innerHTML = history.map(h => `
        <div class="bg-white dark:bg-white/5 rounded-2xl p-4 border border-gray-200 dark:border-white/5 shadow-sm">
            <div class="flex justify-between items-start mb-2">
                <div>
                    <h4 class="font-bold text-sm">${h.name}</h4>
                    <p class="text-[10px] text-gray-500">${h.date}</p>
                </div>
                <span class="text-[10px] font-bold px-2 py-1 rounded ${h.statusColor}">${h.status}</span>
            </div>
            <div class="border-t border-gray-100 dark:border-white/5 pt-2 mt-2">
                <p class="text-xs text-gray-500">${h.detail}</p>
            </div>
        </div>
    `).join('');
}

function renderSchedule() {
    const upcomingContainer = document.getElementById('view-upcoming');
    const resultsContainer = document.getElementById('view-results');
    
    // Simple Schedule cards for list view
    const renderCard = (m) => `
        <div onclick="openMatchDetails(${m.id})" class="glass p-4 rounded-2xl bg-white dark:bg-dark-card border-l-4 ${m.status==='Live'?'border-brand-primary':'border-gray-300'} cursor-pointer">
            <div class="flex justify-between mb-2">
                <span class="text-[10px] font-bold ${m.status==='Live'?'text-red-500 animate-pulse':'text-gray-500'}">${m.status === 'Live' ? '● LIVE' : m.time}</span>
                <span class="text-xs text-gray-500">${m.sport}</span>
            </div>
            <div class="flex justify-between items-center">
                <h4 class="font-black text-lg">${m.team1.split(' ')[0]}</h4>
                <span class="text-xs text-gray-400 font-bold">VS</span>
                <h4 class="font-black text-lg text-gray-500">${m.team2.split(' ')[0]}</h4>
            </div>
            ${m.status==='Live' ? `<p class="text-center text-xs font-mono mt-2 text-brand-primary font-bold">${m.details.score1}</p>` : ''}
             ${m.status==='Finished' ? `<p class="text-center text-xs font-mono mt-2 text-green-500 font-bold">${m.result}</p>` : ''}
        </div>
    `;

    upcomingContainer.innerHTML = scheduleData.filter(m => m.status !== 'Finished').map(renderCard).join('');
    resultsContainer.innerHTML = scheduleData.filter(m => m.status === 'Finished').map(renderCard).join('');
}

function renderAthleteSchedule() {
    // Show Rohan's matches (Assuming Rohan is in CS)
    const container = document.getElementById('athlete-schedule-container');
    const myMatches = scheduleData.filter(m => (m.team1.includes('CS') || m.team2.includes('CS')) && m.status !== 'Finished');

    container.innerHTML = myMatches.map(m => `
        <div onclick="openMatchDetails(${m.id})" class="bg-white dark:bg-white/5 border border-brand-primary/30 p-4 rounded-2xl relative overflow-hidden cursor-pointer">
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary"></div>
            <div class="flex justify-between items-center">
                <div>
                    <h4 class="font-bold text-sm">${m.sport} (${m.type})</h4>
                    <p class="text-xs text-gray-500">vs ${m.team1.includes('CS') ? m.team2 : m.team1}</p>
                </div>
                <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400"></i>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

// --- PROFESSIONAL MATCH DETAILS LOGIC ---

function openMatchDetails(id) {
    const match = scheduleData.find(m => m.id === id);
    if (!match) return;

    const modal = document.getElementById('match-modal');
    const container = document.getElementById('match-dynamic-content');
    modal.classList.remove('hidden');

    let content = '';

    // 1. Generic Header
    content += `
        <div class="p-5 border-b border-gray-100 dark:border-white/5 flex justify-between items-start bg-gray-50 dark:bg-white/5">
            <div>
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-[10px] font-bold uppercase tracking-widest text-gray-500">${match.sport} • ${match.type}</span>
                    ${match.status === 'Live' ? '<span class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>' : ''}
                </div>
                <h3 class="font-black text-2xl dark:text-white leading-none">${match.team1.split(' ')[0]} <span class="text-gray-400 text-lg font-normal">vs</span> ${match.team2.split(' ')[0]}</h3>
            </div>
            <button onclick="closeMatchModal()" class="p-2 bg-white dark:bg-black/20 rounded-full hover:bg-gray-100">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>
        <div class="overflow-y-auto flex-1 p-5 pb-20 space-y-6">
    `;

    // 2. Specific Sport Layouts
    if (match.sport === 'Cricket') {
        content += `
            <div class="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-6 rounded-2xl shadow-lg text-center relative overflow-hidden">
                <div class="relative z-10">
                    <p class="text-xs text-blue-200 mb-2">${match.team1} Batting</p>
                    <div class="text-5xl font-black tracking-tighter mb-1">${match.details.score1}</div>
                    <p class="text-sm font-mono opacity-80">Overs: ${match.details.overs1}</p>
                    <div class="mt-4 flex justify-center gap-2">
                         ${match.details.balls.map(b => `<span class="w-6 h-6 flex items-center justify-center rounded-full bg-white/20 text-xs font-bold ${b==='W'?'bg-red-500':''} ${b==='4'?'bg-green-500':''} ${b==='6'?'bg-brand-primary':''}">${b}</span>`).join('')}
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
                    <p class="text-[10px] uppercase text-gray-500 font-bold mb-2">Batting</p>
                    <div class="flex justify-between text-sm mb-1">
                        <span class="font-bold">${match.details.batter1.name}*</span>
                        <span class="font-mono text-brand-primary font-bold">${match.details.batter1.runs}(${match.details.batter1.balls})</span>
                    </div>
                    <div class="flex justify-between text-sm text-gray-500">
                        <span>${match.details.batter2.name}</span>
                        <span class="font-mono">${match.details.batter2.runs}(${match.details.batter2.balls})</span>
                    </div>
                </div>
                <div class="bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
                    <p class="text-[10px] uppercase text-gray-500 font-bold mb-2">Bowling</p>
                    <div class="flex justify-between text-sm">
                        <span class="font-bold">${match.details.bowler.name}</span>
                        <span class="font-mono text-brand-primary font-bold">${match.details.bowler.fig}</span>
                    </div>
                </div>
            </div>
        `;
    } 
    
    else if (match.sport === 'Football') {
        content += `
            <div class="bg-green-900 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center relative overflow-hidden">
                <div class="text-center z-10">
                    <h4 class="font-black text-2xl">${match.details.score1}</h4>
                    <p class="text-xs opacity-75">${match.team1}</p>
                </div>
                <div class="text-center z-10">
                    <div class="px-3 py-1 bg-black/30 rounded-full text-xs font-mono font-bold mb-1">${match.details.time}</div>
                    <span class="text-xs opacity-50">VS</span>
                </div>
                <div class="text-center z-10">
                    <h4 class="font-black text-2xl">${match.details.score2}</h4>
                    <p class="text-xs opacity-75">${match.team2}</p>
                </div>
            </div>

            <div class="flex justify-between text-xs text-gray-500 px-2">
                <span>Possession: <b class="text-gray-900 dark:text-white">${match.details.stats.poss1}</b></span>
                <span>Possession: <b class="text-gray-900 dark:text-white">${match.details.stats.poss2}</b></span>
            </div>

            <div class="relative py-4 pl-4">
                <div class="timeline-line"></div>
                <div class="space-y-6">
                    ${match.details.timeline.map(event => `
                        <div class="relative flex items-center justify-between">
                            <div class="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-dark-bg border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-[10px] font-bold z-10">
                                ${event.min}'
                            </div>
                            <div class="w-[45%] ${event.team === match.team1.split(' ')[0] ? 'text-right pr-4' : 'order-last text-left pl-4'}">
                                ${event.team === match.team1.split(' ')[0] || event.team === match.team2.split(' ')[0] ? `
                                    <p class="font-bold text-sm">${event.player}</p>
                                    <p class="text-[10px] text-gray-500 uppercase">${event.event}</p>
                                ` : ''}
                            </div>
                            <div class="w-[45%]"></div> 
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    else if (match.sport === 'Badminton') {
        content += `
            <div class="bg-purple-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                <table class="w-full text-center">
                    <thead>
                        <tr class="text-xs text-purple-200 uppercase">
                            <th class="text-left">Player</th>
                            <th>Set 1</th>
                            <th>Set 2</th>
                            <th>Set 3</th>
                        </tr>
                    </thead>
                    <tbody class="text-lg font-bold">
                        <tr class="border-b border-white/10">
                            <td class="text-left py-2">${match.team1.split(' ')[0]} ${match.details.server === match.team1.split(' ')[0] ? '🏸' : ''}</td>
                            <td>${match.details.sets[0]?.s1 || '-'}</td>
                            <td class="text-yellow-400">${match.details.sets[1]?.s1 || '-'}</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td class="text-left py-2">${match.team2.split(' ')[0]}</td>
                            <td>${match.details.sets[0]?.s2 || '-'}</td>
                            <td class="text-yellow-400">${match.details.sets[1]?.s2 || '-'}</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }

    content += `</div>`; // Close container
    container.innerHTML = content;
    
    // Animation
    setTimeout(() => {
        const modalContent = document.getElementById('match-content');
        if(window.innerWidth >= 768) {
             modalContent.classList.remove('md:scale-95', 'md:opacity-0');
             modalContent.classList.add('md:scale-100', 'md:opacity-100');
        }
        modalContent.classList.remove('translate-y-full');
        modalContent.classList.add('translate-y-0');
    }, 10);
    lucide.createIcons();
}

function closeMatchModal() {
    const modalContent = document.getElementById('match-content');
    const modal = document.getElementById('match-modal');
    
    if(window.innerWidth >= 768) {
         modalContent.classList.remove('md:scale-100', 'md:opacity-100');
         modalContent.classList.add('md:scale-95', 'md:opacity-0');
    }
    modalContent.classList.remove('translate-y-0');
    modalContent.classList.add('translate-y-full');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

// --- STANDARD NAVIGATION & REGISTRATION ---
function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('tab-' + id).classList.remove('hidden');
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active', 'text-brand-primary'));
    document.getElementById('btn-' + id).classList.add('active', 'text-brand-primary');
    window.scrollTo(0, 0);
}

function filterSports() {
    const input = document.getElementById('sport-search').value.toLowerCase();
    const cards = document.getElementById('registration-grid').children;
    Array.from(cards).forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        card.style.display = title.includes(input) ? "block" : "none";
    });
}

function openReg(id) {
    const sport = sportsData.find(s => s.id === id);
    if(!sport) return;
    document.getElementById('modal-sport-title').textContent = sport.name;
    document.getElementById('modal-sport-type').textContent = sport.type;
    const regModal = document.getElementById('reg-modal');
    const regContent = document.getElementById('reg-content');
    const container = document.getElementById('reg-form-container');

    // Build Form
    let html = '';
    if (sport.status === "Closed") {
        html = `<div class="text-center py-10"><h4 class="font-bold text-lg text-gray-500">Registration Closed</h4></div>`;
    } else {
        html = `<form onsubmit="event.preventDefault(); closeRegModal();" class="space-y-4 pt-2">
            <div class="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5">
                <h4 class="text-xs font-bold uppercase text-brand-primary mb-3">${sport.type === 'Team' ? 'Captain Details' : 'Participant Details'}</h4>
                <div class="space-y-3">
                    <input type="text" placeholder="Full Name" class="w-full bg-white dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm">
                    <input type="text" placeholder="Class/Roll No" class="w-full bg-white dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm">
                </div>
            </div>`;
        if(sport.type === 'Team') {
            html += `<div class="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5">
                <h4 class="text-xs font-bold uppercase text-brand-secondary mb-3">Team Information</h4>
                <input type="text" placeholder="Team Name" class="w-full bg-white dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm mb-3">
                <p class="text-xs text-gray-500">Please enter names for ${sport.teamSize - 1} other players.</p>
            </div>`;
        }
        html += `<button class="w-full py-4 bg-brand-primary text-white font-bold rounded-xl shadow-lg mt-4">Confirm</button></form>`;
    }
    
    container.innerHTML = html;
    regModal.classList.remove('hidden');
    setTimeout(() => regContent.classList.remove('translate-y-full'), 10);
}

function closeRegModal() {
    const regModal = document.getElementById('reg-modal');
    const regContent = document.getElementById('reg-content');
    regContent.classList.add('translate-y-full');
    setTimeout(() => regModal.classList.add('hidden'), 300);
}

// --- SCHEDULE TOGGLES ---
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
