// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderLeaderboard(); 
    renderRegistrationCards();
    renderSchedule();
    renderAthleteSchedule();
});

// --- GLOBAL VARS ---
// Moved modal elements to global scope but initialized securely
let matchModalElement = null;
let matchContentElement = null;

// --- DATA: LEADERBOARD ---
const studentData = [
    { name: "Rohan Das", dept: "CS", gold: 5, silver: 1, bronze: 0, points: 250, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan" },
    { name: "Priya Sharma", dept: "BMS", gold: 3, silver: 4, bronze: 1, points: 210, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
    { name: "Amit Kumar", dept: "BCOM", gold: 3, silver: 2, bronze: 2, points: 190, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit" },
    { name: "Sneha Patel", dept: "BAF", gold: 1, silver: 3, bronze: 1, points: 140, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha" },
    { name: "Vedant Patil", dept: "BA", gold: 1, silver: 2, bronze: 0, points: 110, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vedant" },
    { name: "Rahul Singh", dept: "CS", gold: 0, silver: 2, bronze: 2, points: 90, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" },
];

// --- DATA: SCHEDULE (FULL DETAILS) ---
const scheduleData = [
    { 
        id: 101, 
        sport: "Cricket", 
        type: "Semi Final", 
        team1: "CS", 
        team2: "BCOM", 
        score1: "88/2", 
        score2: "Yet to Bat", 
        overs: "8.4",
        status: "Live", 
        live: true,
        details: { 
            batters: [
                { name: "Rohan Das*", status: "not out", r: 42, b: 24, fours: 4, sixes: 2, sr: 175.0 },
                { name: "Amit K", status: "c Rahul b Vivek", r: 12, b: 8, fours: 1, sixes: 0, sr: 150.0 },
                { name: "Sahil", status: "run out", r: 5, b: 6, fours: 0, sixes: 0, sr: 83.3 },
                { name: "Suresh*", status: "not out", r: 14, b: 10, fours: 1, sixes: 0, sr: 140.0 }
            ],
            extras: 15,
            did_not_bat: "7 players",
            bowlers: [
                { name: "Rahul S", o: 3.0, m: 0, r: 24, w: 1, eco: 8.00 },
                { name: "Vivek M", o: 2.4, m: 0, r: 18, w: 0, eco: 6.75 },
                { name: "Jayesh", o: 3.0, m: 0, r: 32, w: 0, eco: 10.6 }
            ],
            recent_balls: ["4", "1", "0", "6", "1", "W"],
            commentary: [
                { over: "8.4", text: "FOUR! Smashed down the ground by Rohan." },
                { over: "8.3", text: "Single taken towards long on." },
                { over: "8.2", text: "No run, good length delivery." },
                { over: "8.1", text: "SIX! Massive hit over deep mid-wicket!" }
            ],
            squads: {
                team1: ["Rohan (C)", "Suresh", "Amit", "Sahil", "Vikram", "Tanmay", "Kunal", "Raj", "Dev", "Om", "Yash"],
                team2: ["Rahul (C)", "Vivek", "Jayesh", "Mayank", "Pratik", "Nikhil", "Sanket", "Piyush", "Arjun", "Karan", "Sameer"]
            }
        }
    },
    { 
        id: 105, sport: "Football", type: "Finals", team1: "BMS", team2: "BAF", status: "Finished", 
        winner: "BMS", result: "2 - 1", live: false,
        details: { 
            scorers: [
                {name: "Sahil (BMS)", time: "12'", type: "Goal"}, 
                {name: "Raj (BAF)", time: "44'", type: "Goal"}, 
                {name: "Amit (BMS)", time: "88'", type: "Penalty"}
            ], 
            stats: { possession: 55, shots: 12, onTarget: 5, corners: 6, fouls: 8, offsides: 2 },
            lineups: {
                team1: ["Sahil (GK)", "Karan", "Arjun", "Vikram", "Sameer", "Amit", "Rohan", "Siddharth", "Yash", "Pranav", "Dev"],
                team2: ["Raj (GK)", "Vivek", "Suresh", "Manoj", "Kunal", "Tanmay", "Omkar", "Nikhil", "Pratik", "Jay", "Aman"]
            }
        }
    }
];

const sportsData = [
    { id: 1, name: "100m Sprint", icon: "timer", type: "Solo", teamSize: 1, status: "Open" },
    { id: 2, name: "Chess", icon: "crown", type: "Solo", teamSize: 1, status: "Open" },
    { id: 3, name: "Box Cricket", icon: "trophy", type: "Team", teamSize: 8, status: "Closed" }, 
    { id: 4, name: "Kabaddi", icon: "swords", type: "Team", teamSize: 7, status: "Open" },
    { id: 5, name: "Badminton", icon: "wind", type: "Solo", teamSize: 1, status: "Closed" }, 
    { id: 6, name: "Relay Race", icon: "users", type: "Team", teamSize: 4, status: "Open" },
    { id: 7, name: "Volleyball", icon: "volleyball", type: "Team", teamSize: 6, status: "Open" },
    { id: 8, name: "Carrom", icon: "crosshair", type: "Solo", teamSize: 1, status: "Open" },
];

// --- RENDER FUNCTIONS ---

function renderLeaderboard() {
    const container = document.getElementById('leaderboard-container');
    
    // Auto-Sort: Gold > Silver > Bronze
    const sortedData = [...studentData].sort((a, b) => {
        if (b.gold !== a.gold) return b.gold - a.gold;
        if (b.silver !== a.silver) return b.silver - a.silver;
        if (b.bronze !== a.bronze) return b.bronze - a.bronze;
        return b.points - a.points;
    });

    const top3 = sortedData.slice(0, 3);
    const rest = sortedData.slice(3);

    // Hero Podium Layout
    let podiumHTML = `
        <div class="flex justify-center items-end gap-3 mb-8 pt-6">
            <div class="podium-card podium-2 w-1/3 flex flex-col items-center">
                <div class="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-gray-200 dark:border-white/10 overflow-hidden mb-2 shadow-lg">
                    <img src="${top3[1].avatar}" class="w-full h-full bg-gray-100">
                    <div class="rank-badge rank-2-bg">2</div>
                </div>
                <div class="text-center w-full">
                    <p class="text-xs font-bold truncate dark:text-white">${top3[1].name}</p>
                    <p class="text-[10px] text-gray-500 font-bold">${top3[1].gold} Gold</p>
                </div>
                <div class="h-16 w-full bg-gradient-to-t from-gray-200/50 to-transparent rounded-t-lg mt-2"></div>
            </div>
            
            <div class="podium-card podium-1 w-1/3 flex flex-col items-center -mt-6">
                <div class="relative w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-yellow-300 overflow-hidden mb-2 shadow-2xl shadow-yellow-500/20">
                    <img src="${top3[0].avatar}" class="w-full h-full bg-gray-100">
                    <div class="absolute inset-0 border-4 border-white/20 rounded-full"></div>
                    <div class="rank-badge rank-1-bg w-8 h-8 text-sm bottom-[-10px]">1</div>
                </div>
                <div class="text-center w-full">
                    <p class="text-sm font-black truncate dark:text-white">${top3[0].name}</p>
                    <p class="text-xs font-bold text-yellow-500">${top3[0].gold} Gold</p>
                </div>
                <div class="h-24 w-full bg-gradient-to-t from-yellow-500/20 to-transparent rounded-t-lg mt-2 relative overflow-hidden">
                    <div class="absolute inset-0 bg-yellow-400/10 animate-pulse"></div>
                </div>
            </div>

            <div class="podium-card podium-3 w-1/3 flex flex-col items-center">
                <div class="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-orange-200 dark:border-white/10 overflow-hidden mb-2 shadow-lg">
                    <img src="${top3[2].avatar}" class="w-full h-full bg-gray-100">
                    <div class="rank-badge rank-3-bg">3</div>
                </div>
                <div class="text-center w-full">
                    <p class="text-xs font-bold truncate dark:text-white">${top3[2].name}</p>
                    <p class="text-[10px] text-gray-500 font-bold">${top3[2].gold} Gold</p>
                </div>
                <div class="h-12 w-full bg-gradient-to-t from-orange-200/30 to-transparent rounded-t-lg mt-2"></div>
            </div>
        </div>
    `;

    // Remaining List
    let listHTML = `<div class="bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden mx-1">`;
    listHTML += rest.map((s, i) => `
        <div class="flex items-center gap-4 p-4 border-b border-gray-100 dark:border-white/5 last:border-0">
            <span class="font-bold text-gray-400 w-4 text-center text-sm">#${i + 4}</span>
            <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
                <img src="${s.avatar}" class="w-full h-full">
            </div>
            <div class="flex-1">
                <h4 class="font-bold text-sm dark:text-white">${s.name}</h4>
                <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider">${s.dept}</p>
            </div>
            <div class="flex gap-2">
                <div class="flex flex-col items-center">
                    <span class="text-[9px] text-gray-400 font-bold">G</span>
                    <span class="text-xs font-bold text-yellow-500">${s.gold}</span>
                </div>
                <div class="flex flex-col items-center">
                    <span class="text-[9px] text-gray-400 font-bold">S</span>
                    <span class="text-xs font-bold text-gray-400">${s.silver}</span>
                </div>
                <div class="flex flex-col items-center">
                    <span class="text-[9px] text-gray-400 font-bold">B</span>
                    <span class="text-xs font-bold text-orange-500">${s.bronze}</span>
                </div>
            </div>
        </div>
    `).join('');
    listHTML += `</div>`;

    container.innerHTML = podiumHTML + listHTML;
}

function renderRegistrationCards() {
    const grid = document.getElementById('registration-grid');
    grid.innerHTML = sportsData.map(sport => {
        const isClosed = sport.status === "Closed";
        return `
            <div class="glass p-4 rounded-2xl border ${isClosed ? 'border-gray-200 opacity-60' : 'border-transparent hover:border-brand-primary/30'} cursor-pointer bg-white dark:bg-white/5 shadow-sm transition-all active:scale-95" onclick="openReg(${sport.id})">
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

function renderSchedule() {
    const upcomingContainer = document.getElementById('view-upcoming');
    const resultsContainer = document.getElementById('view-results');
    
    const upcoming = scheduleData.filter(m => m.status === 'Upcoming' || m.status === 'Live');
    const results = scheduleData.filter(m => m.status === 'Finished');

    upcomingContainer.innerHTML = upcoming.map(m => `
        <div onclick="openMatchDetails(${m.id})" class="glass p-4 rounded-2xl bg-white dark:bg-dark-card border-l-4 ${m.live ? 'border-brand-primary' : 'border-gray-300'} cursor-pointer active:scale-95 transition-transform shadow-sm">
            <div class="flex justify-between mb-2">
                ${m.live ? `<span class="px-2 py-0.5 bg-brand-primary/10 text-brand-primary text-[10px] font-bold rounded animate-pulse">LIVE NOW</span>` : `<span class="text-xs font-bold text-gray-500">${m.time}</span>`}
                <span class="text-xs text-gray-500">${m.loc || m.type}</span>
            </div>
            <div class="flex justify-between items-center">
                <div class="text-center"><h4 class="font-black text-lg">${m.team1.split(' ')[0]}</h4></div>
                <div class="flex flex-col items-center">
                    <span class="text-xs font-bold text-gray-300">VS</span>
                    <div class="mt-1 px-2 py-0.5 bg-gray-100 dark:bg-white/10 rounded text-[10px] font-mono">${m.sport}</div>
                </div>
                <div class="text-center"><h4 class="font-black text-lg text-gray-500">${m.team2.split(' ')[0]}</h4></div>
            </div>
            ${m.live ? `<div class="mt-3 pt-3 border-t border-gray-100 dark:border-white/5 text-center flex justify-between items-center"><p class="text-xs font-mono">Score: <span class="text-brand-primary font-bold">${m.score1}</span></p><i data-lucide="chevron-right" class="w-4 h-4 text-gray-400"></i></div>` : ''}
        </div>
    `).join('');

    resultsContainer.innerHTML = results.map(m => `
        <div onclick="openMatchDetails(${m.id})" class="glass p-0 rounded-2xl overflow-hidden bg-white dark:bg-dark-card border border-gray-100 dark:border-white/5 cursor-pointer active:scale-95 transition-transform shadow-sm">
            <div class="p-4 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5">
                <div class="flex justify-between items-center mb-1">
                    <span class="text-[10px] font-bold text-gray-400 uppercase">${m.sport} • ${m.type}</span>
                    <span class="text-[10px] font-bold text-green-500">FINISHED</span>
                </div>
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-2"><span class="font-black text-xl">${m.team1.split(' ')[0]}</span></div>
                    <div class="font-black text-xl text-brand-secondary">${m.result}</div>
                    <div class="flex items-center gap-2"><span class="font-black text-xl text-gray-400">${m.team2.split(' ')[0]}</span></div>
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
        <div onclick="openMatchDetails(${m.id})" class="bg-white dark:bg-white/5 border border-brand-primary/30 p-4 rounded-2xl relative overflow-hidden cursor-pointer active:scale-95 transition-transform shadow-sm">
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary"></div>
            <div class="flex justify-between items-start mb-2">
                <div>
                    <h4 class="font-bold text-sm">${m.sport} (${m.type})</h4>
                    <p class="text-xs text-gray-500">vs ${m.team1.includes('CS') ? m.team2 : m.team1}</p>
                </div>
                ${m.status === 'Live' ? '<span class="text-[10px] font-bold bg-red-500 text-white px-2 py-1 rounded animate-pulse">LIVE</span>' : `<span class="text-[10px] font-bold bg-gray-200 dark:bg-white/10 text-gray-500 px-2 py-1 rounded">${m.time}</span>`}
            </div>
            <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span class="flex items-center gap-1"><i data-lucide="map-pin" class="w-3 h-3"></i> ${m.loc || 'Gymkhana'}</span>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

// --- PROFESSIONAL MATCH MODAL LOGIC (TABS SYSTEM) ---
function openMatchDetails(id) {
    const match = scheduleData.find(m => m.id === id);
    if (!match) return;

    matchModalElement = document.getElementById('match-modal');
    matchContentElement = document.getElementById('match-content');
    const matchBody = document.getElementById('match-modal-body');

    // Generate Tabs Navigation
    let tabsHTML = `
        <div class="flex border-b border-gray-100 dark:border-white/5 bg-white dark:bg-[#151522] sticky top-0 z-20 overflow-x-auto no-scrollbar">
            <button onclick="switchMatchTab('summary')" id="tab-summary" class="flex-1 py-3 text-xs font-bold text-brand-primary border-b-2 border-brand-primary transition-colors">Summary</button>
            <button onclick="switchMatchTab('scorecard')" id="tab-scorecard" class="flex-1 py-3 text-xs font-bold text-gray-500 transition-colors">Scorecard</button>
            <button onclick="switchMatchTab('commentary')" id="tab-commentary" class="flex-1 py-3 text-xs font-bold text-gray-500 transition-colors">Commentary</button>
            <button onclick="switchMatchTab('squads')" id="tab-squads" class="flex-1 py-3 text-xs font-bold text-gray-500 transition-colors">Squads</button>
        </div>
    `;

    // 1. SUMMARY TAB CONTENT
    let summaryContent = '';
    if (match.sport === 'Cricket') {
        summaryContent = `
            <div class="cricket-score-card p-6 pb-8 text-white relative overflow-hidden shadow-lg">
                <div class="flex justify-between items-start mb-6 z-10 relative">
                    <div class="text-center">
                         <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl font-black mb-2 mx-auto border border-white/20">${match.team1}</div>
                         <p class="text-3xl font-black">${match.score1}</p>
                         <p class="text-[10px] opacity-70">(${match.overs} ov)</p>
                    </div>
                    <div class="text-center pt-2">
                        <div class="inline-block bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full animate-pulse mb-1">LIVE</div>
                        <p class="text-[10px] opacity-70">Target: -</p>
                    </div>
                     <div class="text-center">
                         <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl font-black mb-2 mx-auto border border-white/20 text-gray-400">${match.team2}</div>
                         <p class="text-3xl font-black text-gray-400">0/0</p>
                         <p class="text-[10px] opacity-70">Yet to Bat</p>
                    </div>
                </div>
            </div>
            <div class="p-4 space-y-4">
                <div class="bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 p-4">
                    <h5 class="text-xs font-bold text-gray-500 uppercase mb-3">Recent Overs</h5>
                    <div class="flex gap-2 overflow-x-auto no-scrollbar">
                        ${match.details.recent_balls.map(b => {
                            let color = 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300';
                            if(b === '4') color = 'bg-blue-500 text-white';
                            if(b === '6') color = 'bg-purple-500 text-white';
                            if(b === 'W') color = 'bg-red-500 text-white';
                            return `<div class="w-8 h-8 rounded-full ${color} flex-shrink-0 flex items-center justify-center font-bold text-xs shadow-sm">${b}</div>`;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // 2. SCORECARD TAB CONTENT
    let scorecardContent = '';
    if (match.sport === 'Cricket') {
        scorecardContent = `
            <div class="p-4 space-y-6">
                <div class="bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 overflow-hidden">
                    <div class="bg-brand-primary/5 p-3 border-b border-gray-100 dark:border-white/5">
                        <h4 class="text-xs font-bold text-brand-primary uppercase">${match.team1} Batting</h4>
                    </div>
                    <table class="w-full text-left text-xs">
                        <thead class="bg-gray-50 dark:bg-white/5 text-gray-400 uppercase font-bold">
                            <tr><th class="p-3">Batter</th><th class="p-3 text-right">R</th><th class="p-3 text-right">B</th><th class="p-3 text-right">4s</th><th class="p-3 text-right">6s</th><th class="p-3 text-right">SR</th></tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 dark:divide-white/5">
                            ${match.details.batters.map(b => `
                                <tr>
                                    <td class="p-3">
                                        <p class="font-bold text-gray-900 dark:text-white">${b.name}</p>
                                        <p class="text-[9px] text-gray-500">${b.status}</p>
                                    </td>
                                    <td class="p-3 text-right font-bold text-gray-900 dark:text-white">${b.r}</td>
                                    <td class="p-3 text-right text-gray-500">${b.b}</td>
                                    <td class="p-3 text-right text-gray-500">${b.fours}</td>
                                    <td class="p-3 text-right text-gray-500">${b.sixes}</td>
                                    <td class="p-3 text-right text-gray-500">${b.sr}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="p-3 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 flex justify-between text-xs text-gray-500">
                        <span>Extras: ${match.details.extras}</span>
                        <span>Did Not Bat: ${match.details.did_not_bat}</span>
                    </div>
                </div>

                <div class="bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 overflow-hidden">
                    <div class="bg-brand-secondary/5 p-3 border-b border-gray-100 dark:border-white/5">
                        <h4 class="text-xs font-bold text-brand-secondary uppercase">${match.team2} Bowling</h4>
                    </div>
                    <table class="w-full text-left text-xs">
                        <thead class="bg-gray-50 dark:bg-white/5 text-gray-400 uppercase font-bold">
                            <tr><th class="p-3">Bowler</th><th class="p-3 text-right">O</th><th class="p-3 text-right">M</th><th class="p-3 text-right">R</th><th class="p-3 text-right">W</th><th class="p-3 text-right">ECO</th></tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 dark:divide-white/5">
                            ${match.details.bowlers.map(b => `
                                <tr>
                                    <td class="p-3 font-bold text-gray-900 dark:text-white">${b.name}</td>
                                    <td class="p-3 text-right text-gray-500">${b.o}</td>
                                    <td class="p-3 text-right text-gray-500">${b.m}</td>
                                    <td class="p-3 text-right text-gray-500">${b.r}</td>
                                    <td class="p-3 text-right font-bold text-brand-primary">${b.w}</td>
                                    <td class="p-3 text-right text-gray-500">${b.eco}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // 3. COMMENTARY TAB
    let commentaryContent = '';
    if (match.sport === 'Cricket') {
        commentaryContent = `
            <div class="p-4 space-y-4">
                ${match.details.commentary.map(c => `
                    <div class="flex gap-3 pb-4 border-b border-gray-100 dark:border-white/5 last:border-0">
                        <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center font-bold text-xs text-gray-600 dark:text-white flex-shrink-0">
                            ${c.over}
                        </div>
                        <div class="flex-1 pt-1">
                            <p class="text-xs font-medium text-gray-800 dark:text-gray-200 leading-relaxed">${c.text}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // 4. SQUADS TAB
    let squadsContent = '';
    if (match.details?.squads) {
        squadsContent = `
            <div class="p-4 grid grid-cols-2 gap-4">
                <div class="bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
                    <h5 class="text-xs font-bold text-brand-primary uppercase mb-3 text-center border-b border-gray-200 dark:border-white/10 pb-2">${match.team1}</h5>
                    <ul class="text-xs space-y-2 text-gray-600 dark:text-gray-300">
                        ${match.details.squads.team1.map(p => `<li>${p}</li>`).join('')}
                    </ul>
                </div>
                <div class="bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
                    <h5 class="text-xs font-bold text-brand-secondary uppercase mb-3 text-center border-b border-gray-200 dark:border-white/10 pb-2">${match.team2}</h5>
                    <ul class="text-xs space-y-2 text-gray-600 dark:text-gray-300">
                        ${match.details.squads.team2.map(p => `<li>${p}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    // Default Fallback
    if (match.sport !== 'Cricket') {
        summaryContent = `<div class="p-10 text-center text-gray-500 text-sm">Full details available for Cricket matches in this demo.</div>`;
    }

    // Inject into Modal
    matchBody.innerHTML = `
        ${tabsHTML}
        <div id="mtab-summary" class="match-tab-view animate-fade-in">${summaryContent}</div>
        <div id="mtab-scorecard" class="match-tab-view hidden animate-fade-in">${scorecardContent}</div>
        <div id="mtab-commentary" class="match-tab-view hidden animate-fade-in">${commentaryContent}</div>
        <div id="mtab-squads" class="match-tab-view hidden animate-fade-in">${squadsContent}</div>
    `;

    matchModalElement.classList.remove('hidden');
    setTimeout(() => {
        if(window.innerWidth >= 768) {
             matchContentElement.classList.remove('md:scale-95', 'md:opacity-0');
             matchContentElement.classList.add('md:scale-100', 'md:opacity-100');
        }
        matchContentElement.classList.remove('translate-y-full');
        matchContentElement.classList.add('translate-y-0');
    }, 10);
}

// Tab Switching inside Match Modal
window.switchMatchTab = function(tabName) {
    // Hide all contents
    document.querySelectorAll('.match-tab-view').forEach(el => el.classList.add('hidden'));
    document.getElementById('mtab-' + tabName).classList.remove('hidden');

    // Reset button styles
    const buttons = ['summary', 'scorecard', 'commentary', 'squads'];
    buttons.forEach(btn => {
        const el = document.getElementById('tab-' + btn);
        if (el) {
            if (btn === tabName) {
                el.classList.add('text-brand-primary', 'border-b-2', 'border-brand-primary');
                el.classList.remove('text-gray-500');
            } else {
                el.classList.remove('text-brand-primary', 'border-b-2', 'border-brand-primary');
                el.classList.add('text-gray-500');
            }
        }
    });
}

function closeMatchModal() {
    matchContentElement.classList.remove('translate-y-0');
    matchContentElement.classList.add('translate-y-full');
    setTimeout(() => matchModalElement.classList.add('hidden'), 300);
}

// --- STANDARD TAB SWITCHING ---
function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('tab-' + id).classList.remove('hidden');
    
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('active', 'text-brand-primary');
        btn.classList.add('text-gray-500', 'dark:text-gray-400');
    });
    document.getElementById('btn-' + id).classList.add('active', 'text-brand-primary');
    document.getElementById('btn-' + id).classList.remove('text-gray-500', 'dark:text-gray-400');
    window.scrollTo(0, 0);
}

// --- REGISTRATION LOGIC ---
function openReg(id) {
    const sport = sportsData.find(s => s.id === id);
    if(!sport) return;

    // Secure DOM elements inside the function
    const modal = document.getElementById('reg-modal');
    const content = document.getElementById('reg-content');
    const container = document.getElementById('reg-form-container');

    document.getElementById('modal-sport-title').textContent = sport.name;
    document.getElementById('modal-sport-type').textContent = sport.type;

    if (sport.status === "Closed") {
        container.innerHTML = `<div class="flex flex-col items-center justify-center h-64 text-center"><h4 class="text-xl font-bold dark:text-white">Registration Closed</h4><p class="text-sm text-gray-500 mt-2">Deadline passed.</p><button onclick="closeRegModal()" class="mt-6 px-6 py-2 bg-gray-200 rounded-full text-sm font-bold">Close</button></div>`;
    } else {
        container.innerHTML = `
            <form onsubmit="submitReg(event)" class="space-y-4 pt-2">
                <div class="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5">
                    <h4 class="text-xs font-bold uppercase text-brand-primary mb-3">Participant Details</h4>
                    <input type="text" required placeholder="Full Name" class="w-full bg-white dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm mb-3">
                    <input type="tel" required placeholder="WhatsApp" class="w-full bg-white dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm">
                </div>
                <button type="submit" class="w-full py-4 bg-brand-primary text-white font-bold rounded-xl shadow-lg">Confirm Registration</button>
            </form>
        `;
    }

    modal.classList.remove('hidden');
    setTimeout(() => content.classList.remove('translate-y-full'), 10);
}

function closeRegModal() {
    const modal = document.getElementById('reg-modal');
    const content = document.getElementById('reg-content');
    content.classList.add('translate-y-full');
    setTimeout(() => modal.classList.add('hidden'), 300);
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

// Logic: Filters
function filterSports() {
    const input = document.getElementById('sport-search').value.toLowerCase();
    const cards = document.getElementById('registration-grid').children;
    Array.from(cards).forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        card.style.display = title.includes(input) ? "block" : "none";
    });
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

// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const html = document.documentElement;
if (window.matchMedia('(prefers-color-scheme: dark)').matches) html.classList.add('dark');
themeBtn.addEventListener('click', () => html.classList.toggle('dark'));
