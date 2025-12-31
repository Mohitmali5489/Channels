// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderLeaderboard(); 
    renderRegistrationCards();
    renderSchedule();
    renderAthleteSchedule();
});

// --- DATA: LEADERBOARD ---
// Raw data - will be sorted by the render function
const studentData = [
    { name: "Rohan Das", dept: "CS", gold: 4, silver: 1, bronze: 0, points: 220, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan" },
    { name: "Priya Sharma", dept: "BMS", gold: 3, silver: 2, bronze: 1, points: 195, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
    { name: "Amit Kumar", dept: "BCOM", gold: 2, silver: 3, bronze: 2, points: 170, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit" },
    { name: "Sneha Patel", dept: "BAF", gold: 1, silver: 3, bronze: 1, points: 140, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha" },
    { name: "Vedant Patil", dept: "BA", gold: 1, silver: 2, bronze: 0, points: 110, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vedant" },
    { name: "Rahul Singh", dept: "CS", gold: 0, silver: 2, bronze: 2, points: 90, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" },
    { name: "Anjali Gupta", dept: "BFM", gold: 2, silver: 0, bronze: 0, points: 100, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali" }
];

// --- DATA: SCHEDULE (REALISTIC DEEP DATA) ---
const scheduleData = [
    { 
        id: 101, sport: "Cricket", type: "Semi Final", team1: "CS", team2: "BCOM", score1: "88/2", score2: "Yet to Bat", 
        status: "Live", time: "Now", loc: "Gymkhana", live: true,
        details: { 
            overs: "8.4", 
            bat: { name: "Rohan Das", runs: 42, balls: 24, fours: 4, sixes: 2 },
            non_striker: { name: "Suresh", runs: 14, balls: 10 },
            bowl: { name: "Rahul", figures: "1/12 (1.4)" },
            crr: "10.15", 
            project: "118",
            balls: ["4", "1", "0", "6", "1", "W"], // Recent balls
            partnership: "56 runs (32 balls)",
            fall_of_wickets: "1-12 (Raj, 2.1 ov), 2-32 (Amit, 4.3 ov)",
            squads: {
                team1: ["Rohan (C)", "Suresh", "Raj", "Amit", "Vikram", "Sahil", "Tanmay", "Kunal"],
                team2: ["Rahul (C)", "Vivek", "Jayesh", "Mayank", "Omkar", "Pratik", "Yash", "Nikhil"]
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
            cards: "2 Yellow",
            stats: { 
                possession: 55, shots: 12, onTarget: 5, corners: 6, fouls: 8, offsides: 2 
            },
            lineups: {
                team1: ["Sahil (GK)", "Karan", "Arjun", "Vikram", "Sameer", "Amit", "Rohan", "Siddharth", "Yash", "Pranav", "Dev"],
                team2: ["Raj (GK)", "Vivek", "Suresh", "Manoj", "Kunal", "Tanmay", "Omkar", "Nikhil", "Pratik", "Jay", "Aman"]
            },
            subs: {
                team1: ["Rahul", "Varun"],
                team2: ["Sanket", "Piyush"]
            }
        }
    },
    { 
        id: 102, sport: "Badminton", type: "Singles", team1: "Rahul (CS)", team2: "Amit (BFM)", status: "Upcoming", 
        time: "4:00 PM", loc: "Court 2", live: false,
        details: { sets: "Best of 3", head_to_head: "Rahul leads 2-1" }
    },
    { 
        id: 104, sport: "Chess", type: "Finals", team1: "Aditya P", team2: "Neha S", status: "Finished", 
        winner: "Aditya P", result: "1 - 0", live: false,
        details: { moves: 42, opening: "Queen's Gambit", duration: "45 mins" }
    },
    { 
        id: 103, sport: "Kabaddi", type: "Qualifier", team1: "BMS", team2: "BAF", status: "Upcoming", 
        time: "5:30 PM", loc: "Ground A", live: false,
        details: { prev_meeting: "BMS won by 12 points" }
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
    
    // SORT LOGIC: Gold > Silver > Bronze > Points
    const sortedData = [...studentData].sort((a, b) => {
        if (b.gold !== a.gold) return b.gold - a.gold;
        if (b.silver !== a.silver) return b.silver - a.silver;
        if (b.bronze !== a.bronze) return b.bronze - a.bronze;
        return b.points - a.points;
    });

    const top3 = sortedData.slice(0, 3);
    const rest = sortedData.slice(3);

    // Podium HTML
    let podiumHTML = `
        <div class="flex justify-center items-end gap-4 mb-8 pt-4">
            <div class="podium-card podium-2">
                <div class="relative w-16 h-16 rounded-full border-4 border-gray-100 dark:border-white/10 overflow-hidden mb-2">
                    <img src="${top3[1].avatar}" class="w-full h-full bg-gray-200">
                    <div class="rank-badge rank-2-bg">2</div>
                </div>
                <div class="text-center">
                    <p class="text-xs font-bold truncate w-20 dark:text-gray-200">${top3[1].name}</p>
                    <div class="flex gap-1 justify-center mt-1 text-[8px] font-bold">
                        <span class="text-yellow-500">${top3[1].gold}G</span>
                        <span class="text-gray-400">${top3[1].silver}S</span>
                        <span class="text-orange-400">${top3[1].bronze}B</span>
                    </div>
                </div>
            </div>
            <div class="podium-card podium-1">
                <div class="relative w-20 h-20 rounded-full border-4 border-yellow-100 dark:border-yellow-500/30 overflow-hidden mb-2 shadow-xl shadow-brand-gold/20">
                    <img src="${top3[0].avatar}" class="w-full h-full bg-gray-200">
                    <div class="absolute inset-0 border-4 border-yellow-400 rounded-full opacity-50"></div>
                    <div class="rank-badge rank-1-bg w-8 h-8 text-sm bottom-[-12px]">1</div>
                </div>
                <div class="text-center">
                    <p class="text-sm font-black truncate w-24 dark:text-white">${top3[0].name}</p>
                    <div class="flex gap-1 justify-center mt-1 text-[10px] font-bold">
                        <span class="text-yellow-500">${top3[0].gold}G</span>
                        <span class="text-gray-400">${top3[0].silver}S</span>
                        <span class="text-orange-400">${top3[0].bronze}B</span>
                    </div>
                </div>
            </div>
            <div class="podium-card podium-3">
                <div class="relative w-16 h-16 rounded-full border-4 border-gray-100 dark:border-white/10 overflow-hidden mb-2">
                    <img src="${top3[2].avatar}" class="w-full h-full bg-gray-200">
                    <div class="rank-badge rank-3-bg">3</div>
                </div>
                <div class="text-center">
                    <p class="text-xs font-bold truncate w-20 dark:text-gray-200">${top3[2].name}</p>
                    <div class="flex gap-1 justify-center mt-1 text-[8px] font-bold">
                        <span class="text-yellow-500">${top3[2].gold}G</span>
                        <span class="text-gray-400">${top3[2].silver}S</span>
                        <span class="text-orange-400">${top3[2].bronze}B</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // List HTML
    let listHTML = `<div class="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden">`;
    listHTML += rest.map((s, i) => `
        <div class="flex items-center gap-3 p-3 border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition">
            <span class="font-bold text-gray-400 w-6 text-center text-sm">#${i + 4}</span>
            <div class="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
                <img src="${s.avatar}" class="w-full h-full bg-gray-200">
            </div>
            <div class="flex-1">
                <h4 class="font-bold text-sm dark:text-gray-200">${s.name}</h4>
                <p class="text-[10px] text-gray-500 uppercase font-bold">${s.dept}</p>
            </div>
            <div class="text-right">
                <div class="flex gap-1 justify-end text-[10px] font-bold">
                    <span class="text-yellow-500">${s.gold}</span>
                    <span class="text-gray-400">${s.silver}</span>
                    <span class="text-orange-400">${s.bronze}</span>
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
            <div class="glass p-4 rounded-2xl border ${isClosed ? 'border-gray-200 opacity-60' : 'border-transparent hover:border-brand-primary/30'} cursor-pointer bg-white dark:bg-white/5 shadow-sm" onclick="openReg(${sport.id})">
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
        <div onclick="openMatchDetails(${m.id})" class="glass p-4 rounded-2xl bg-white dark:bg-dark-card border-l-4 ${m.live ? 'border-brand-primary' : 'border-gray-300'} cursor-pointer active:scale-95 transition-transform">
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
        <div onclick="openMatchDetails(${m.id})" class="glass p-0 rounded-2xl overflow-hidden bg-white dark:bg-dark-card border border-gray-100 dark:border-white/5 cursor-pointer active:scale-95 transition-transform">
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
        <div onclick="openMatchDetails(${m.id})" class="bg-white dark:bg-white/5 border border-brand-primary/30 p-4 rounded-2xl relative overflow-hidden cursor-pointer active:scale-95 transition-transform">
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

// --- PROFESSIONAL MATCH MODAL LOGIC ---
const matchModal = document.getElementById('match-modal');
const matchContent = document.getElementById('match-content');
const matchBody = document.getElementById('match-modal-body');

function openMatchDetails(id) {
    const match = scheduleData.find(m => m.id === id);
    if (!match) return;

    document.getElementById('match-modal-subtitle').innerText = match.sport + " • " + match.type;

    let content = "";

    if (match.sport === "Cricket") {
        const wormBars = match.details.balls.map(b => `<div class="worm-bar ${['4','6'].includes(b) ? 'active' : ''}" style="height: ${Math.random() * 80 + 20}%"></div>`).join('');
        
        content = `
            <div class="cricket-score-card p-6 pb-8 rounded-b-3xl relative overflow-hidden shadow-2xl">
                <div class="flex justify-between items-start mb-6 z-10 relative">
                    <div class="text-center">
                         <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl font-black mb-2 mx-auto border border-white/20">${match.team1}</div>
                         <p class="text-3xl font-black">${match.score1}</p>
                         <p class="text-[10px] opacity-70">Batting (8.4 ov)</p>
                    </div>
                    <div class="text-center pt-2">
                        <div class="inline-block bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full animate-pulse mb-1">LIVE</div>
                        <p class="text-[10px] opacity-70">P'ship: ${match.details.partnership}</p>
                    </div>
                     <div class="text-center">
                         <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl font-black mb-2 mx-auto border border-white/20 text-gray-400">${match.team2}</div>
                         <p class="text-3xl font-black text-gray-400">0/0</p>
                         <p class="text-[10px] opacity-70">Yet to Bat</p>
                    </div>
                </div>
                <div class="flex justify-between bg-black/20 p-3 rounded-xl backdrop-blur-sm z-10 relative text-xs">
                     <div class="text-center flex-1 border-r border-white/10">
                        <p class="opacity-60 text-[9px] uppercase">CRR</p>
                        <p class="font-bold text-base">${match.details.crr}</p>
                     </div>
                     <div class="text-center flex-1 border-r border-white/10">
                        <p class="opacity-60 text-[9px] uppercase">Proj</p>
                        <p class="font-bold text-base text-brand-primary">${match.details.project}</p>
                     </div>
                     <div class="text-center flex-1">
                        <p class="opacity-60 text-[9px] uppercase">Target</p>
                        <p class="font-bold text-base">-</p>
                     </div>
                </div>
            </div>

            <div class="p-4 space-y-4">
                <div class="bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden">
                    <table class="w-full text-left text-sm">
                        <thead class="bg-gray-50 dark:bg-white/5 text-[10px] text-gray-500 uppercase">
                            <tr><th class="p-3">Batter</th><th class="p-3 text-right">R</th><th class="p-3 text-right">B</th><th class="p-3 text-right">4s/6s</th></tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 dark:divide-white/5">
                            <tr class="bg-brand-primary/5">
                                <td class="p-3 font-bold text-brand-primary">${match.details.bat.name}*</td>
                                <td class="p-3 text-right font-black">${match.details.bat.runs}</td>
                                <td class="p-3 text-right text-gray-500">${match.details.bat.balls}</td>
                                <td class="p-3 text-right text-xs">${match.details.bat.fours}/${match.details.bat.sixes}</td>
                            </tr>
                            <tr>
                                <td class="p-3 font-medium">${match.details.non_striker.name}</td>
                                <td class="p-3 text-right font-bold">${match.details.non_striker.runs}</td>
                                <td class="p-3 text-right text-gray-500">${match.details.non_striker.balls}</td>
                                <td class="p-3 text-right text-xs">1/0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                     <p class="text-[10px] font-bold text-gray-400 uppercase mb-2">Recent Balls</p>
                     <div class="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                        ${match.details.balls.map(b => {
                            let color = 'bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-300';
                            if(b === '4') color = 'bg-blue-500 text-white';
                            if(b === '6') color = 'bg-purple-500 text-white';
                            if(b === 'W') color = 'bg-red-500 text-white';
                            return `<div class="w-8 h-8 rounded-full ${color} flex-shrink-0 flex items-center justify-center font-bold text-xs shadow-sm">${b}</div>`;
                        }).join('')}
                     </div>
                </div>
                
                <div class="glass p-4 rounded-xl border border-gray-100 dark:border-white/5">
                    <h5 class="text-xs font-bold text-gray-500 uppercase mb-2">Fall of Wickets</h5>
                    <p class="text-xs text-gray-800 dark:text-gray-300 leading-relaxed">${match.details.fall_of_wickets}</p>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div class="bg-gray-50 dark:bg-white/5 p-3 rounded-xl">
                        <h5 class="text-[10px] font-bold text-gray-400 uppercase mb-2">CS Squad</h5>
                        <ul class="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                            ${match.details.squads.team1.slice(0,5).map(p => `<li>${p}</li>`).join('')}
                            <li class="italic text-[9px]">+3 others</li>
                        </ul>
                    </div>
                    <div class="bg-gray-50 dark:bg-white/5 p-3 rounded-xl">
                        <h5 class="text-[10px] font-bold text-gray-400 uppercase mb-2">BCOM Squad</h5>
                        <ul class="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                            ${match.details.squads.team2.slice(0,5).map(p => `<li>${p}</li>`).join('')}
                            <li class="italic text-[9px]">+3 others</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    } else if (match.sport === "Football") {
        content = `
            <div class="football-field h-56 relative flex flex-col justify-center text-white shadow-xl rounded-b-3xl">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
                <div class="relative z-10 flex w-full justify-around items-center px-4 mt-4">
                     <div class="text-center">
                         <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black font-black text-2xl mb-2 mx-auto border-4 border-white/20">${match.team1}</div>
                     </div>
                     <div class="text-center">
                         <div class="text-6xl font-black mb-1 drop-shadow-lg">${match.result}</div>
                         <div class="text-xs font-bold bg-white text-black px-3 py-1 rounded-full inline-block">FULL TIME</div>
                     </div>
                     <div class="text-center">
                         <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white font-black text-2xl mb-2 mx-auto border-4 border-white/20">${match.team2}</div>
                     </div>
                </div>
            </div>

            <div class="p-5 space-y-6">
                <div>
                    <h4 class="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-3 text-center">Possession</h4>
                    <div class="flex items-center gap-3">
                        <span class="text-xs font-bold text-brand-primary">${match.details.stats.possession}%</span>
                        <div class="flex-1 h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden flex">
                            <div class="h-full bg-brand-primary" style="width: ${match.details.stats.possession}%"></div>
                            <div class="h-full bg-brand-secondary" style="width: ${100 - match.details.stats.possession}%"></div>
                        </div>
                        <span class="text-xs font-bold text-brand-secondary">${100 - match.details.stats.possession}%</span>
                    </div>
                </div>

                <div class="grid grid-cols-3 gap-2 text-center text-xs">
                    <div class="glass p-2 rounded-lg">
                        <p class="font-black text-lg">${match.details.stats.shots}</p>
                        <p class="text-gray-400 text-[9px] uppercase">Shots</p>
                    </div>
                    <div class="glass p-2 rounded-lg">
                        <p class="font-black text-lg">${match.details.stats.corners}</p>
                        <p class="text-gray-400 text-[9px] uppercase">Corners</p>
                    </div>
                    <div class="glass p-2 rounded-lg">
                        <p class="font-black text-lg text-yellow-500">${match.details.stats.fouls}</p>
                        <p class="text-gray-400 text-[9px] uppercase">Fouls</p>
                    </div>
                </div>

                <div>
                    <h4 class="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-3">Timeline</h4>
                    <div class="space-y-3 relative pl-4 border-l-2 border-dashed border-gray-200 dark:border-white/10">
                        ${match.details.scorers.map(g => `
                            <div class="relative pl-4">
                                <div class="absolute -left-[23px] top-0 w-5 h-5 bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/20 rounded-full flex items-center justify-center text-[10px]">${g.type === 'Goal' ? '⚽' : '🥅'}</div>
                                <div class="flex justify-between items-center bg-white dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
                                    <span class="text-sm font-bold text-gray-800 dark:text-white">${g.name}</span>
                                    <span class="font-mono text-xs font-bold text-brand-primary bg-brand-primary/10 px-2 py-1 rounded">${g.time}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div>
                    <h4 class="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-3">Starting XI</h4>
                    <div class="flex gap-4 text-xs text-gray-600 dark:text-gray-300">
                        <div class="flex-1">
                            <p class="font-bold mb-2 underline">${match.team1}</p>
                            <ul class="space-y-1">${match.details.lineups.team1.slice(0,6).map(p => `<li>${p}</li>`).join('')}<li class="italic">+5 more</li></ul>
                        </div>
                        <div class="flex-1">
                            <p class="font-bold mb-2 underline">${match.team2}</p>
                            <ul class="space-y-1">${match.details.lineups.team2.slice(0,6).map(p => `<li>${p}</li>`).join('')}<li class="italic">+5 more</li></ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Generic Layout
        content = `
            <div class="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/5 dark:to-white/10 h-40 flex items-center justify-center rounded-b-3xl relative overflow-hidden">
                 <div class="absolute inset-0 opacity-10" style="background-image: url('https://www.transparenttextures.com/patterns/carbon-fibre.png');"></div>
                 <div class="flex items-center gap-8 relative z-10">
                      <div class="text-center">
                           <h2 class="text-3xl font-black text-gray-800 dark:text-white">${match.team1.split(' ')[0]}</h2>
                      </div>
                      <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-sm shadow-lg text-black">VS</div>
                      <div class="text-center">
                           <h2 class="text-3xl font-black text-gray-800 dark:text-white">${match.team2.split(' ')[0]}</h2>
                      </div>
                 </div>
            </div>
            <div class="p-6 space-y-6 text-center">
                <span class="inline-block px-4 py-2 rounded-full bg-brand-primary text-white font-bold text-sm shadow-lg shadow-brand-primary/30">${match.status}</span>
                <p class="text-gray-500 text-sm">
                    ${match.status === 'Upcoming' ? `Scheduled for <span class="text-gray-900 dark:text-white font-bold">${match.time}</span>` : `Winner: <span class="text-brand-success font-bold">${match.winner}</span>`}
                </p>
                <div class="bg-brand-primary/5 border border-brand-primary/20 p-4 rounded-xl">
                    <p class="text-xs text-gray-600 dark:text-gray-300">${match.details.sets ? `Set Scores: <span class="font-bold">${match.details.sets}</span>` : 'Additional details unavailable.'}</p>
                </div>
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

// Logic: Tabs, Filters, Reg Modals (Kept same)
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
    document.getElementById('btn-' + id).classList.add('active', 'text-brand-primary');
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
function openReg(id) {
    const sport = sportsData.find(s => s.id === id);
    if(!sport) return;
    document.getElementById('modal-sport-title').textContent = sport.name;
    document.getElementById('modal-sport-type').textContent = sport.type;
    if (sport.status === "Closed") {
        regContainer.innerHTML = `<div class="flex flex-col items-center justify-center h-64 text-center"><div class="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4"><i data-lucide="lock" class="w-10 h-10 text-red-500"></i></div><h4 class="text-xl font-bold dark:text-white">Registration Closed</h4><p class="text-sm text-gray-500 mt-2 px-6">The deadline has passed.</p><button onclick="closeRegModal()" class="mt-6 px-6 py-2 bg-gray-200 dark:bg-white/10 rounded-full text-sm font-bold dark:text-white">Go Back</button></div>`;
    } else {
        let formHTML = `<form onsubmit="submitReg(event)" class="space-y-4 pt-2"><div class="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5"><h4 class="text-xs font-bold uppercase text-brand-primary mb-3">${sport.type === 'Team' ? 'Captain Details' : 'Participant Details'}</h4><div class="space-y-3"><input type="text" required placeholder="Full Name" class="input-field"><input type="tel" required placeholder="WhatsApp Number" class="input-field"><div class="grid grid-cols-2 gap-3"><select class="input-field"><option>FY</option><option>SY</option><option>TY</option></select><input type="text" placeholder="Roll No" class="input-field"></div></div></div>`;
        if (sport.type === "Team") {
            formHTML += `<div class="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5"><h4 class="text-xs font-bold uppercase text-brand-secondary mb-3">Team Information</h4><input type="text" required placeholder="Team Name" class="input-field mb-4 font-bold"><h5 class="text-xs font-bold text-gray-400 mb-2">Team Members (${sport.teamSize})</h5><div class="space-y-3">`;
            for(let i=2; i <= sport.teamSize; i++) formHTML += `<div class="flex gap-2"><span class="w-6 py-3 text-center text-xs font-bold text-gray-400 pt-3">${i}.</span><input type="text" placeholder="Player Name" class="input-field w-2/3"><input type="text" placeholder="Role" class="input-field w-1/3"></div>`;
            formHTML += `</div></div>`;
        }
        formHTML += `<div class="flex items-start gap-2 mt-4"><input type="checkbox" required class="mt-1 accent-brand-primary"><p class="text-xs text-gray-500">I agree to pay the fees within 24 hours.</p></div><button type="submit" class="w-full py-4 mt-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform">Confirm Registration</button></form>`;
        const inputClass = "w-full bg-white dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm focus:border-brand-primary outline-none dark:text-white";
        regContainer.innerHTML = formHTML.replace(/input-field/g, inputClass);
    }
    regModal.classList.remove('hidden');
    lucide.createIcons();
    setTimeout(() => regContent.classList.remove('translate-y-full'), 10);
}
function closeRegModal() { regContent.classList.add('translate-y-full'); setTimeout(() => regModal.classList.add('hidden'), 300); }
function submitReg(e) { e.preventDefault(); const btn = e.target.querySelector('button[type="submit"]'); const originalText = btn.innerHTML; btn.innerHTML = 'Success!'; btn.classList.add('bg-green-500'); confetti({ particleCount: 150, spread: 60, origin: { y: 0.7 } }); setTimeout(() => { closeRegModal(); setTimeout(() => { btn.innerHTML = originalText; btn.classList.remove('bg-green-500'); }, 300); }, 1500); }
const themeBtn = document.getElementById('theme-toggle');
const html = document.documentElement;
if (window.matchMedia('(prefers-color-scheme: dark)').matches) html.classList.add('dark');
themeBtn.addEventListener('click', () => html.classList.toggle('dark'));
