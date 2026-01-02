// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderLeaderboard(); 
    renderRegistrationCards();
    renderSchedule();
    renderAthleteSchedule();
});

// --- DATA: LEADERBOARD ---
const studentData = [
    { name: "Rohan Das", dept: "CS", gold: 5, silver: 1, bronze: 0, points: 250, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan" },
    { name: "Priya Sharma", dept: "BMS", gold: 3, silver: 4, bronze: 1, points: 210, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
    { name: "Amit Kumar", dept: "BCOM", gold: 3, silver: 2, bronze: 2, points: 190, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit" },
    { name: "Sneha Patel", dept: "BAF", gold: 1, silver: 3, bronze: 1, points: 140, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha" },
    { name: "Vedant Patil", dept: "BA", gold: 1, silver: 2, bronze: 0, points: 110, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vedant" },
    { name: "Rahul Singh", dept: "CS", gold: 0, silver: 2, bronze: 2, points: 90, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" },
    { name: "Anjali Gupta", dept: "BFM", gold: 2, silver: 0, bronze: 0, points: 100, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali" }
];

// --- DATA: SCHEDULE (DEEP DATA FOR PROTOTYPE) ---
const scheduleData = [
    // 1. CRICKET - UPGRADED DEEP DATA
    { 
        id: 101, sport: "Cricket", type: "Semi Final (T10)", team1: "CS Dept", team2: "BCOM Dept", 
        score1: "88/2", score2: "Yet to Bat", overs: "8.4", status: "Live", live: true,
        loc: "Main Gymkhana Ground",
        details: { 
            toss: "CS Dept won the toss and elected to bat",
            batters: [
                { name: "Rohan Das", status: "not out", r: 42, b: 24, fours: 4, sixes: 2, sr: 175.0 },
                { name: "Suresh Raina", status: "not out", r: 14, b: 10, fours: 1, sixes: 0, sr: 140.0 },
                { name: "Amit K", status: "c Rahul b Vivek", r: 12, b: 8, fours: 1, sixes: 0, sr: 150.0 },
                { name: "Sahil", status: "run out (Jayesh)", r: 5, b: 6, fours: 0, sixes: 0, sr: 83.3 }
            ],
            dnb: ["Vikram", "Tanmay", "Kunal", "Raj", "Dev", "Om", "Yash"],
            extras_detail: "15 (b 4, lb 2, w 8, nb 1)",
            fow: [
                { score: "32-1", name: "Amit K", over: "3.2" },
                { score: "62-2", name: "Sahil", over: "6.1" }
            ],
            bowlers: [
                { name: "Rahul S", o: 2.0, m: 0, r: 24, w: 0, eco: 12.00 },
                { name: "Vivek M", o: 3.0, m: 0, r: 18, w: 1, eco: 6.00 },
                { name: "Jayesh", o: 2.0, m: 0, r: 32, w: 0, eco: 16.0 },
                { name: "Karan", o: 1.4, m: 0, r: 14, w: 0, eco: 8.4 }
            ],
            current_partnership: { runs: 26, balls: 15, b1: 14, b2: 12 }, // b1=Rohan, b2=Suresh
            recent_balls: ["4", "1", "0", "6", "1nb", "W", "2", "4", "1", "0", "1", "6"], // Newest last
            commentary: [
                { over: "8.4", text: "FOUR! Smashed down the ground by Rohan. Pure class." },
                { over: "8.3", text: "Single taken towards long on." },
                { over: "8.2", text: "No run, good length delivery outside off." },
                { over: "8.1", text: "SIX! Massive hit over deep mid-wicket! That's gone into the parking lot." },
                { over: "8.0", text: "End of Over. CS Dept looking strong for a 100+ finish." }
            ],
            squads: {
                team1: ["Rohan (C)", "Suresh", "Amit", "Sahil", "Vikram", "Tanmay", "Kunal", "Raj", "Dev", "Om", "Yash"],
                team2: ["Rahul (C)", "Vivek", "Jayesh", "Mayank", "Pratik", "Nikhil", "Sanket", "Piyush", "Arjun", "Karan", "Sameer"]
            },
            crr: "10.15", project: "118"
        }
    },
    // 2. FOOTBALL
    { 
        id: 105, sport: "Football", type: "Finals", team1: "BMS", team2: "BAF", status: "Finished", 
        winner: "BMS", result: "2 - 1", live: false, time: "Ended", loc: "Turf A",
        score1: "2", score2: "1",
        details: { 
            scorers: [
                {name: "Sahil (BMS)", time: "12'", type: "Goal"}, 
                {name: "Raj (BAF)", time: "44'", type: "Goal"}, 
                {name: "Amit (BMS)", time: "88'", type: "Penalty"}
            ], 
            stats: { possession: "55% - 45%", shots: "12 - 8", onTarget: "5 - 3", corners: "6 - 4", fouls: "8 - 10", offsides: "2 - 1" },
            timeline: [
                { time: "90+2'", text: "Full Time Whistle", icon: "whistle" },
                { time: "88'", text: "GOAL! Amit scores from the spot.", icon: "goal" },
                { time: "75'", text: "Yellow Card for Raj (BAF)", icon: "card" },
                { time: "44'", text: "GOAL! Raj equalizes for BAF.", icon: "goal" }
            ],
            squads: {
                team1: ["Sahil (GK)", "Karan", "Arjun", "Vikram", "Sameer", "Amit", "Rohan", "Siddharth", "Yash", "Pranav", "Dev"],
                team2: ["Raj (GK)", "Vivek", "Suresh", "Manoj", "Kunal", "Tanmay", "Omkar", "Nikhil", "Pratik", "Jay", "Aman"]
            }
        }
    },
    // 3. KABADDI
    {
        id: 106, sport: "Kabaddi", type: "League", team1: "CS", team2: "BA", status: "Live", live: true,
        score1: "24", score2: "19", loc: "Mat 1",
        details: {
            raid_history: [
                { raider: "Rohan (CS)", result: "Success +2", type: "raid" },
                { raider: "Vivek (BA)", result: "Empty Raid", type: "empty" },
                { raider: "Amit (CS)", result: "Tackled", type: "tackle" }
            ],
            stats: {
                team1: { raid_points: 14, tackle_points: 8, all_out: 1, extra: 2 },
                team2: { raid_points: 10, tackle_points: 7, all_out: 0, extra: 2 }
            },
            current_raider: "Rohan Das",
            last_raid_status: "Super Raid! (+3)",
            squads: {
                team1: ["Rohan (C)", "Amit", "Suresh", "Vikram", "Kunal", "Raj", "Dev"],
                team2: ["Vivek (C)", "Jayesh", "Mayank", "Pratik", "Nikhil", "Sanket", "Piyush"]
            }
        }
    },
    // 4. CHESS
    {
        id: 107, sport: "Chess", type: "Final", team1: "Rohan (CS)", team2: "Anjali (BFM)", status: "Live", live: true,
        score1: "1", score2: "0", loc: "Library Hall",
        details: {
            current_turn: "White (Rohan)",
            timers: { white: "10:45", black: "08:20" },
            moves: [
                "1. e4 e5", "2. Nf3 Nc6", "3. Bb5 a6", "4. Ba4 Nf6", "5. O-O Be7", "6. Re1 b5"
            ],
            captured: {
                white: ["pawn", "pawn"],
                black: ["pawn"]
            },
            status_text: "White to move. Sicilian Defense variation."
        }
    },
    // 5. BADMINTON
    {
        id: 108, sport: "Badminton", type: "Quarter Final", team1: "Priya (BMS)", team2: "Sneha (BAF)", status: "Live", live: true,
        score1: "1", score2: "1", loc: "Court 2",
        details: {
            sets: [
                { s1: 21, s2: 19, winner: "Priya" },
                { s1: 15, s2: 21, winner: "Sneha" },
                { s1: 8, s2: 4, status: "Live" } // Set 3
            ],
            current_set: 3,
            current_server: "Priya",
            rally_history: ["Point Priya", "Point Sneha", "Service Fault Sneha", "Smash Winner Priya"]
        }
    },
    // 6. RELAY / ATHLETICS
    {
        id: 109, sport: "Relay Race", type: "4x100m Final", team1: "CS Dept", team2: "BCOM Dept", status: "Live", live: true,
        score1: "-", score2: "-", loc: "Track",
        details: {
            current_leg: "Leg 3/4",
            positions: [
                { rank: 1, team: "CS Dept", runner: "Rohan", split: "10.2s" },
                { rank: 2, team: "BMS Dept", runner: "Sahil", split: "10.4s" },
                { rank: 3, team: "BCOM Dept", runner: "Amit", split: "10.8s" }
            ],
            splits: {
                cs: ["10.5s", "10.2s", "Running...", "-"],
                bcom: ["11.0s", "10.8s", "Running...", "-"]
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
    const sortedData = [...studentData].sort((a, b) => b.points - a.points);

    let html = `<div class="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden mx-1">`;
    html += sortedData.map((s) => {
        let rowClass = "hover:bg-gray-50 dark:hover:bg-white/5 transition border-b border-gray-100 dark:border-white/5 last:border-0";
        return `
            <div class="flex items-center gap-4 p-4 ${rowClass}">
                <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden shadow-sm">
                    <img src="${s.avatar}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                    <h4 class="font-bold text-sm dark:text-white">${s.name}</h4>
                    <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider">${s.dept}</p>
                </div>
                <div class="text-right">
                    <div class="flex gap-2 justify-end text-[10px] font-bold mb-0.5">
                        <span class="text-yellow-500">${s.gold}G</span>
                        <span class="text-gray-400">${s.silver}S</span>
                        <span class="text-orange-500">${s.bronze}B</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    html += `</div>`;
    container.innerHTML = html;
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

    const renderCard = (m) => `
        <div onclick="openMatchDetails(${m.id})" class="glass p-4 rounded-2xl bg-white dark:bg-dark-card border-l-4 ${m.live ? 'border-brand-primary' : 'border-gray-300'} cursor-pointer active:scale-95 transition-transform shadow-sm">
            <div class="flex justify-between mb-2">
                ${m.live ? `<span class="px-2 py-0.5 bg-brand-primary/10 text-brand-primary text-[10px] font-bold rounded animate-pulse">LIVE NOW</span>` : `<span class="text-xs font-bold text-gray-500">${m.time}</span>`}
                <span class="text-xs text-gray-500">${m.loc || m.type}</span>
            </div>
            <div class="flex justify-between items-center">
                <div class="text-center w-1/3"><h4 class="font-black text-lg truncate">${m.team1.split(' ')[0]}</h4></div>
                <div class="flex flex-col items-center w-1/3">
                    <span class="text-xs font-bold text-gray-300">VS</span>
                    <div class="mt-1 px-2 py-0.5 bg-gray-100 dark:bg-white/10 rounded text-[10px] font-mono">${m.sport}</div>
                </div>
                <div class="text-center w-1/3"><h4 class="font-black text-lg text-gray-500 truncate">${m.team2.split(' ')[0]}</h4></div>
            </div>
            ${m.live ? `<div class="mt-3 pt-3 border-t border-gray-100 dark:border-white/5 text-center flex justify-between items-center"><p class="text-xs font-mono">Score: <span class="text-brand-primary font-bold">${m.score1 || '0'} - ${m.score2 || '0'}</span></p><i data-lucide="chevron-right" class="w-4 h-4 text-gray-400"></i></div>` : ''}
        </div>
    `;

    upcomingContainer.innerHTML = upcoming.map(renderCard).join('');
    
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

// --- DEEP MATCH MODAL LOGIC (ALL SPORTS) ---
function openMatchDetails(id) {
    const match = scheduleData.find(m => m.id === id);
    if (!match) return;

    const modal = document.getElementById('match-modal');
    const content = document.getElementById('match-content');
    const matchBody = document.getElementById('match-modal-body');
    const subtitle = document.getElementById('match-modal-subtitle');

    if (subtitle) subtitle.innerText = match.sport + " • " + match.type;

    // --- TAB GENERATION LOGIC ---
    let buttons = [];
    if (match.sport === 'Cricket') buttons = ['Summary', 'Scorecard', 'Commentary', 'Squads'];
    else if (match.sport === 'Football') buttons = ['Summary', 'Stats', 'Timeline', 'Squads'];
    else if (match.sport === 'Kabaddi') buttons = ['Summary', 'Raid-Log', 'Squads'];
    else if (match.sport === 'Chess') buttons = ['Board', 'Moves'];
    else if (match.sport === 'Badminton' || match.sport === 'Volleyball') buttons = ['Scoreboard', 'Rally-Log'];
    else buttons = ['Summary', 'Squads'];

    let tabsHTML = `<div class="flex border-b border-gray-100 dark:border-white/5 bg-white dark:bg-[#151522] sticky top-0 z-20 overflow-x-auto no-scrollbar">`;
    buttons.forEach((btn, index) => {
        const id = btn.toLowerCase();
        const activeClass = index === 0 ? "text-brand-primary border-b-2 border-brand-primary" : "text-gray-500";
        tabsHTML += `<button onclick="switchMatchTab('${id}')" id="tab-${id}" class="flex-1 py-3 text-xs font-bold whitespace-nowrap px-4 transition-colors ${activeClass}">${btn}</button>`;
    });
    tabsHTML += `</div>`;

    // --- CONTENT GENERATION LOGIC ---
    let contentHTML = '';

    // 1. CRICKET LOGIC (ESPN Style)
    if (match.sport === 'Cricket') {
        // --- HELPERS FOR CRICKET ---
        const renderBall = (b) => {
            const cls = b === '4' ? 'b-4' : (b === '6' ? 'b-6' : (b === 'W' ? 'b-w' : (b === '0' ? 'b-0' : 'b-1')));
            return `<div class="cric-ball ${cls}">${b}</div>`;
        };

        const activeBatters = match.details.batters.filter(b => b.status === 'not out');
        const activeBowler = match.details.bowlers[match.details.bowlers.length - 1];
        
        // SUMMARY TAB
        contentHTML += `
            <div id="mtab-summary" class="match-tab-view animate-fade-in pb-10">
                <div class="cricket-score-card px-4 pt-4 pb-2">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <div class="flex items-end gap-2">
                                <h1 class="text-4xl font-black">${match.score1}</h1>
                                <span class="text-sm font-bold opacity-80 mb-1">(${match.overs})</span>
                            </div>
                            <p class="text-xs font-medium text-gray-300">${match.team1}</p>
                        </div>
                        <div class="text-right">
                             <div class="flex items-center gap-1 justify-end">
                                <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                <span class="text-[10px] font-bold uppercase tracking-wider">Live</span>
                             </div>
                             <p class="text-[10px] mt-1 text-gray-400">CRR: ${match.details.crr}</p>
                        </div>
                    </div>
                    <p class="text-[10px] text-gray-400 border-t border-white/10 pt-2 mt-2">${match.details.toss}</p>
                </div>

                <div class="match-info-grid p-3">
                    <div class="info-box shadow-sm">
                         <div class="flex justify-between text-[10px] uppercase font-bold text-gray-400 mb-2"><span>Batter</span><span>R (B)</span></div>
                         ${activeBatters.map(b => `
                            <div class="flex justify-between text-xs font-bold border-b border-gray-100 dark:border-white/5 py-1 last:border-0">
                                <span class="flex items-center gap-1">${b.name} <span class="text-brand-primary">*</span></span>
                                <span>${b.r} <span class="text-gray-400 font-medium">(${b.b})</span></span>
                            </div>
                         `).join('')}
                    </div>
                    <div class="info-box shadow-sm">
                         <div class="flex justify-between text-[10px] uppercase font-bold text-gray-400 mb-2"><span>Bowler</span><span>Fig</span></div>
                         <div class="flex justify-between text-xs font-bold py-1">
                                <span>${activeBowler.name}</span>
                                <span>${activeBowler.w}/${activeBowler.r} <span class="text-gray-400 font-medium">(${activeBowler.o})</span></span>
                         </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-white/5 py-3 border-y border-gray-100 dark:border-white/5 mb-2">
                    <div class="flex items-center gap-3 px-4 overflow-x-auto no-scrollbar">
                        <span class="text-[10px] font-bold uppercase text-gray-500 whitespace-nowrap">Recent Balls</span>
                        <div class="flex">${match.details.recent_balls.slice().reverse().map(renderBall).join('')}</div>
                    </div>
                </div>

                <div class="p-4 bg-white dark:bg-white/5 mx-3 rounded-lg border border-gray-100 dark:border-white/5 shadow-sm">
                    <h5 class="text-[10px] font-bold uppercase text-gray-400 mb-2">Current Partnership</h5>
                    <div class="flex justify-between items-end mb-1">
                        <div class="text-left">
                            <span class="block text-xs font-bold">${match.details.current_partnership.b1_name || 'Rohan'}</span>
                            <span class="text-brand-primary font-black">${match.details.current_partnership.b1}</span>
                        </div>
                        <div class="text-center pb-1">
                            <span class="text-xl font-black">${match.details.current_partnership.runs}</span>
                            <span class="text-[10px] text-gray-400 block">runs (${match.details.current_partnership.balls} balls)</span>
                        </div>
                        <div class="text-right">
                            <span class="block text-xs font-bold">${match.details.current_partnership.b2_name || 'Suresh'}</span>
                            <span class="text-brand-secondary font-black">${match.details.current_partnership.b2}</span>
                        </div>
                    </div>
                    <div class="partnership-container">
                        <div class="p-bar-1" style="width: ${(match.details.current_partnership.b1 / match.details.current_partnership.runs) * 100}%"></div>
                        <div class="p-bar-2" style="width: ${(match.details.current_partnership.b2 / match.details.current_partnership.runs) * 100}%"></div>
                    </div>
                </div>
            </div>

            <div id="mtab-scorecard" class="match-tab-view hidden animate-fade-in p-3 space-y-4 pb-10">
                <div class="bg-white dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm">
                    <div class="bg-brand-primary/5 px-3 py-2 border-b border-brand-primary/10 flex justify-between">
                        <span class="text-xs font-bold uppercase text-brand-primary">${match.team1} Innings</span>
                        <span class="text-xs font-bold text-gray-500">${match.score1} (${match.overs})</span>
                    </div>
                    <div class="cric-table-container">
                        <table class="cric-table">
                            <thead><tr><th>Batter</th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr></thead>
                            <tbody>
                                ${match.details.batters.map(b => `
                                    <tr>
                                        <td>${b.name} <span class="dismissal">${b.status}</span></td>
                                        <td class="font-bold">${b.r}</td>
                                        <td>${b.b}</td>
                                        <td>${b.fours}</td>
                                        <td>${b.sixes}</td>
                                        <td>${b.sr}</td>
                                    </tr>
                                `).join('')}
                                <tr>
                                    <td colspan="6" class="text-left py-2 px-2 bg-gray-50 dark:bg-white/5">
                                        <div class="flex justify-between text-xs">
                                            <span class="font-bold">Extras</span>
                                            <span>${match.details.extras_detail}</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="p-2 text-[10px] text-gray-500 border-t border-gray-100 dark:border-white/5">
                        <span class="font-bold">Did not bat:</span> ${match.details.dnb.join(', ')}
                    </div>
                </div>

                <div class="bg-white dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 p-3 shadow-sm">
                    <h5 class="text-[10px] font-bold uppercase text-gray-400 mb-2">Fall of Wickets</h5>
                    <div class="flex flex-wrap gap-2">
                        ${match.details.fow.map(f => `
                            <span class="px-2 py-1 bg-gray-100 dark:bg-white/10 rounded text-[10px]">
                                <span class="font-bold text-brand-secondary">${f.score}</span> 
                                <span class="text-gray-500">(${f.name}, ${f.over} ov)</span>
                            </span>
                        `).join('')}
                    </div>
                </div>

                <div class="bg-white dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm">
                     <div class="bg-gray-50 dark:bg-white/10 px-3 py-2 border-b border-gray-100 dark:border-white/5">
                        <span class="text-xs font-bold uppercase text-gray-500">Bowling</span>
                    </div>
                    <div class="cric-table-container">
                        <table class="cric-table">
                            <thead><tr><th>Bowler</th><th>O</th><th>M</th><th>R</th><th>W</th><th>ECO</th></tr></thead>
                            <tbody>
                                ${match.details.bowlers.map(bo => `
                                    <tr>
                                        <td>${bo.name}</td>
                                        <td>${bo.o}</td>
                                        <td>${bo.m}</td>
                                        <td>${bo.r}</td>
                                        <td class="font-bold text-brand-primary">${bo.w}</td>
                                        <td>${bo.eco}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id="mtab-commentary" class="match-tab-view hidden animate-fade-in p-4 space-y-3 pb-10">
                ${match.details.commentary.map(c => `
                    <div class="flex gap-3">
                        <div class="w-10 pt-1 flex flex-col items-center">
                            <span class="text-xs font-black text-gray-900 dark:text-white">${c.over}</span>
                        </div>
                        <div class="flex-1 pb-3 border-b border-gray-100 dark:border-white/5">
                            <p class="text-xs leading-relaxed text-gray-600 dark:text-gray-300">${c.text}</p>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div id="mtab-squads" class="match-tab-view hidden animate-fade-in p-4 text-xs pb-10">
                 <div class="mb-4">
                    <h5 class="font-bold uppercase text-brand-primary mb-2">${match.team1} XI</h5>
                    <p class="text-gray-500 leading-6">${match.details.squads.team1.join(', ')}</p>
                 </div>
                 <div>
                    <h5 class="font-bold uppercase text-gray-500 mb-2">${match.team2} XI</h5>
                    <p class="text-gray-500 leading-6">${match.details.squads.team2.join(', ')}</p>
                 </div>
            </div>
        `;
    }

    // 2. KABADDI LOGIC
    else if (match.sport === 'Kabaddi') {
        const raidHTML = match.details.raid_history.map(r => {
            const color = r.type === 'raid' ? 'text-green-500' : (r.type === 'tackle' ? 'text-red-500' : 'text-gray-500');
            return `<div class="flex justify-between border-b border-gray-100 dark:border-white/5 py-2 text-xs"><span>${r.raider}</span><span class="font-bold ${color}">${r.result}</span></div>`
        }).join('');

        contentHTML += `
            <div id="mtab-summary" class="match-tab-view animate-fade-in">
                <div class="bg-gradient-to-br from-orange-500 to-red-600 p-6 text-white text-center shadow-lg">
                    <h2 class="text-sm font-bold opacity-90 uppercase tracking-widest mb-2">Live Score</h2>
                    <div class="flex justify-center items-center gap-6">
                         <div class="text-center"><span class="text-5xl font-black">${match.score1}</span><p class="text-xs mt-1 font-bold">${match.team1}</p></div>
                         <div class="text-2xl font-black opacity-50">:</div>
                         <div class="text-center"><span class="text-5xl font-black">${match.score2}</span><p class="text-xs mt-1 font-bold">${match.team2}</p></div>
                    </div>
                    <div class="mt-4 inline-block px-3 py-1 bg-black/20 rounded-full text-[10px] font-bold uppercase tracking-wider">Raiding: ${match.details.current_raider}</div>
                </div>
                <div class="grid grid-cols-2 gap-4 p-4">
                    <div class="bg-white dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5 text-center">
                        <p class="text-[10px] text-gray-500 uppercase">Raid Pts</p>
                        <p class="text-xl font-black text-brand-primary">${match.details.stats.team1.raid_points}</p>
                    </div>
                    <div class="bg-white dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5 text-center">
                        <p class="text-[10px] text-gray-500 uppercase">Tackle Pts</p>
                        <p class="text-xl font-black text-brand-secondary">${match.details.stats.team1.tackle_points}</p>
                    </div>
                </div>
            </div>
            <div id="mtab-raid-log" class="match-tab-view hidden animate-fade-in p-4">${raidHTML}</div>
            <div id="mtab-squads" class="match-tab-view hidden animate-fade-in p-4 text-xs">${match.details.squads.team1.join(', ')}</div>
        `;
    }

    // 3. FOOTBALL LOGIC
    else if (match.sport === 'Football') {
        const timelineHTML = match.details.timeline.map(t => `
            <div class="flex gap-3 mb-4">
                <div class="w-10 text-right font-mono font-bold text-xs text-brand-primary pt-0.5">${t.time}</div>
                <div class="w-px bg-gray-200 dark:bg-white/10 relative"><div class="absolute top-1 -left-1 w-2 h-2 rounded-full bg-brand-primary"></div></div>
                <div class="flex-1 pb-4 border-b border-gray-50 dark:border-white/5">
                    <p class="text-xs font-bold dark:text-white">${t.text}</p>
                </div>
            </div>
        `).join('');

        contentHTML += `
            <div id="mtab-summary" class="match-tab-view animate-fade-in">
                <div class="football-field h-48 w-full relative bg-green-600 flex items-center justify-center shadow-inner">
                    <div class="absolute inset-0 bg-black/20"></div>
                    <div class="z-10 text-center text-white">
                        <div class="flex items-center gap-8">
                            <span class="text-4xl font-black">${match.score1}</span>
                            <span class="text-sm font-bold px-2 py-1 bg-white/20 rounded backdrop-blur">${match.time}</span>
                            <span class="text-4xl font-black">${match.score2}</span>
                        </div>
                        <p class="mt-2 text-xs opacity-80">${match.team1} vs ${match.team2}</p>
                    </div>
                </div>
                <div class="p-4 space-y-2">
                    ${generateStatBar('Possession', match.details.stats.possession)}
                    ${generateStatBar('Shots on Target', match.details.stats.onTarget)}
                </div>
            </div>
            <div id="mtab-stats" class="match-tab-view hidden animate-fade-in p-4 space-y-4">
                 <div class="grid grid-cols-2 gap-4">
                    ${Object.entries(match.details.stats).map(([k,v]) => `<div class="bg-gray-50 dark:bg-white/5 p-3 rounded-lg"><p class="text-[10px] uppercase text-gray-500">${k}</p><p class="font-bold text-sm">${v}</p></div>`).join('')}
                 </div>
            </div>
            <div id="mtab-timeline" class="match-tab-view hidden animate-fade-in p-4">${timelineHTML}</div>
            <div id="mtab-squads" class="match-tab-view hidden animate-fade-in p-4 text-xs">${match.details.squads.team1.join(', ')}</div>
        `;
    }

    // 4. CHESS LOGIC
    else if (match.sport === 'Chess') {
        const movesHTML = match.details.moves.map(m => `<span class="inline-block bg-gray-100 dark:bg-white/10 px-2 py-1 rounded text-xs font-mono m-1">${m}</span>`).join('');
        
        contentHTML += `
            <div id="mtab-board" class="match-tab-view animate-fade-in">
                <div class="bg-[#2E2E2E] p-6 text-center shadow-lg">
                    <div class="flex justify-between text-white text-xs font-mono mb-4">
                        <div class="flex items-center gap-2"><div class="w-3 h-3 bg-white rounded-full"></div> ${match.details.timers.white}</div>
                        <div class="flex items-center gap-2 text-gray-400">${match.details.timers.black} <div class="w-3 h-3 bg-black border border-white rounded-full"></div></div>
                    </div>
                    <div class="aspect-square bg-white rounded-lg mx-auto max-w-[280px] grid grid-cols-8 grid-rows-8 border-4 border-[#4B4B4B]">
                         ${Array(64).fill(0).map((_, i) => {
                             const row = Math.floor(i / 8);
                             const col = i % 8;
                             const isBlack = (row + col) % 2 === 1;
                             return `<div class="${isBlack ? 'bg-[#769656]' : 'bg-[#EEEED2]'}"></div>`
                         }).join('')}
                    </div>
                    <p class="mt-4 text-white text-xs font-medium">${match.details.status_text}</p>
                </div>
                <div class="p-4">
                    <h4 class="text-xs font-bold mb-2">Captured Pieces</h4>
                    <div class="flex gap-2 mb-2"><span class="text-xs font-bold w-12">White:</span> ${match.details.captured.white.map(p => '♟').join(' ')}</div>
                    <div class="flex gap-2"><span class="text-xs font-bold w-12">Black:</span> ${match.details.captured.black.map(p => '♟').join(' ')}</div>
                </div>
            </div>
            <div id="mtab-moves" class="match-tab-view hidden animate-fade-in p-4">
                <div class="flex flex-wrap">${movesHTML}</div>
            </div>
        `;
    }

    // 5. BADMINTON / VOLLEYBALL LOGIC
    else if (match.sport === 'Badminton' || match.sport === 'Volleyball') {
        const setsHTML = match.details.sets.map((s, i) => `
            <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 rounded-lg mb-2 ${match.details.current_set === i+1 ? 'border border-brand-primary' : ''}">
                <span class="text-xs font-bold text-gray-500">Set ${i+1}</span>
                <div class="font-mono font-bold text-sm">${s.s1} - ${s.s2}</div>
                <span class="text-[10px] font-bold ${s.winner === match.team1.split(' ')[0] ? 'text-green-500' : 'text-gray-400'}">${s.winner || 'Live'}</span>
            </div>
        `).join('');

        contentHTML += `
            <div id="mtab-scoreboard" class="match-tab-view animate-fade-in">
                 <div class="bg-blue-600 p-6 text-white text-center shadow-lg relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <h2 class="text-4xl font-black mb-1">${match.score1} - ${match.score2}</h2>
                    <p class="text-xs opacity-80 uppercase tracking-widest">Sets Score</p>
                    <div class="mt-4 flex justify-center items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        <span class="text-xs font-bold">Serving: ${match.details.current_server}</span>
                    </div>
                 </div>
                 <div class="p-4">
                    <h4 class="text-xs font-bold uppercase text-gray-400 mb-3">Set History</h4>
                    ${setsHTML}
                 </div>
            </div>
            <div id="mtab-rally-log" class="match-tab-view hidden animate-fade-in p-4 space-y-2">
                ${match.details.rally_history.map(r => `<p class="text-xs border-b border-gray-100 dark:border-white/5 py-2">${r}</p>`).join('')}
            </div>
        `;
    }

     // 6. RELAY / GENERIC
    else {
        contentHTML += `
            <div id="mtab-summary" class="match-tab-view animate-fade-in p-4">
                <div class="bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                    <h3 class="font-bold mb-4">Live Positions</h3>
                    ${match.details?.positions ? match.details.positions.map(p => `
                        <div class="flex items-center justify-between mb-3 last:mb-0">
                            <div class="flex items-center gap-3">
                                <span class="w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-white/10 rounded-full text-xs font-bold">${p.rank}</span>
                                <span class="text-sm font-bold">${p.team}</span>
                            </div>
                            <span class="font-mono text-xs font-bold text-brand-primary">${p.split}</span>
                        </div>
                    `).join('') : '<p>No live data</p>'}
                </div>
            </div>
            <div id="mtab-squads" class="match-tab-view hidden animate-fade-in p-4">Squad list...</div>
        `;
    }

    matchBody.innerHTML = tabsHTML + contentHTML;
    modal.classList.remove('hidden');
    setTimeout(() => {
        if(window.innerWidth >= 768) {
             content.classList.remove('md:scale-95', 'md:opacity-0');
             content.classList.add('md:scale-100', 'md:opacity-100');
        }
        content.classList.remove('translate-y-full');
        content.classList.add('translate-y-0');
    }, 10);
}

// --- UTILITIES FOR HTML GENERATION ---
function generateTable(data, headers, keys) {
    if(!data) return '';
    return `
        <div class="overflow-hidden rounded-xl border border-gray-100 dark:border-white/5">
            <table class="w-full text-left text-xs">
                <thead class="bg-gray-50 dark:bg-white/5 text-gray-400 uppercase font-bold">
                    <tr>${headers.map(h => `<th class="p-3">${h}</th>`).join('')}</tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-white/5">
                    ${data.map(row => `<tr>${keys.map((k, i) => `<td class="p-3 ${i===0?'font-bold':''}">${row[k]}</td>`).join('')}</tr>`).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function generateStatBar(label, valueString) {
    // Expects valueString like "55% - 45%" or "12 - 8"
    const parts = valueString.includes('%') ? valueString.replace(/%/g,'').split('-') : valueString.split('-');
    const v1 = parseFloat(parts[0]);
    const v2 = parseFloat(parts[1]);
    const total = v1 + v2;
    const p1 = (v1 / total) * 100;
    
    return `
        <div class="mb-3">
            <div class="flex justify-between text-[10px] font-bold uppercase mb-1 text-gray-500">
                <span>${parts[0].trim()}</span>
                <span>${label}</span>
                <span>${parts[1].trim()}</span>
            </div>
            <div class="h-1.5 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden flex">
                <div class="h-full bg-brand-primary" style="width: ${p1}%"></div>
                <div class="h-full bg-brand-secondary flex-1"></div>
            </div>
        </div>
    `;
}

// --- TAB SWITCHING & MODAL CONTROL ---
window.switchMatchTab = function(tabName) {
    document.querySelectorAll('.match-tab-view').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById('mtab-' + tabName);
    if(target) target.classList.remove('hidden');

    document.querySelectorAll('[id^="tab-"]').forEach(btn => {
        btn.classList.remove('text-brand-primary', 'border-b-2', 'border-brand-primary');
        btn.classList.add('text-gray-500');
    });
    const activeBtn = document.getElementById('tab-' + tabName);
    if(activeBtn) {
        activeBtn.classList.add('text-brand-primary', 'border-b-2', 'border-brand-primary');
        activeBtn.classList.remove('text-gray-500');
    }
}

function closeMatchModal() {
    const modal = document.getElementById('match-modal');
    const content = document.getElementById('match-content');
    content.classList.remove('translate-y-0');
    content.classList.add('translate-y-full');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

// --- STANDARD NAV & REGISTRATION ---
function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById('tab-' + id);
    if(target) target.classList.remove('hidden');
    
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('active', 'text-brand-primary');
        btn.classList.add('text-gray-500', 'dark:text-gray-400');
    });
    
    const activeBtn = document.getElementById('btn-' + id);
    if(activeBtn) {
        activeBtn.classList.add('active', 'text-brand-primary');
        activeBtn.classList.remove('text-gray-500', 'dark:text-gray-400');
    }
    window.scrollTo(0, 0);
}

function openReg(id) {
    const sport = sportsData.find(s => s.id === id);
    if(!sport) return;

    const modal = document.getElementById('reg-modal');
    const content = document.getElementById('reg-content');
    const container = document.getElementById('reg-form-container');

    document.getElementById('modal-sport-title').textContent = sport.name;
    document.getElementById('modal-sport-type').textContent = sport.type;

    if (sport.status === "Closed") {
        container.innerHTML = `<div class="flex flex-col items-center justify-center h-64 text-center"><h4 class="text-xl font-bold dark:text-white">Registration Closed</h4><p class="text-sm text-gray-500 mt-2">Deadline passed.</p><button onclick="closeRegModal()" class="mt-6 px-6 py-2 bg-gray-200 rounded-full text-sm font-bold">Close</button></div>`;
    } else {
        let formHTML = `<form onsubmit="submitReg(event)" class="space-y-4 pt-2">
            <div class="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5">
                <h4 class="text-xs font-bold uppercase text-brand-primary mb-3">${sport.type === 'Team' ? 'Captain Details' : 'Participant Details'}</h4>
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
            formHTML += `<div class="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5">
                    <h4 class="text-xs font-bold uppercase text-brand-secondary mb-3">Team Information</h4>
                    <input type="text" required placeholder="Team Name" class="input-field mb-4 font-bold">
                    <h5 class="text-xs font-bold text-gray-400 mb-2">Team Members (${sport.teamSize})</h5>
                    <div class="space-y-3">`;
            for(let i=2; i <= sport.teamSize; i++) {
                formHTML += `<div class="flex gap-2"><span class="w-6 py-3 text-center text-xs font-bold text-gray-400 pt-3">${i}.</span><input type="text" placeholder="Player Name" class="input-field w-2/3"><input type="text" placeholder="Role" class="input-field w-1/3"></div>`;
            }
            formHTML += `</div></div>`;
        }

        formHTML += `<div class="flex items-start gap-2 mt-4"><input type="checkbox" required class="mt-1 accent-brand-primary"><p class="text-xs text-gray-500">I agree to pay the fees within 24 hours.</p></div><button type="submit" class="w-full py-4 mt-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform">Confirm Registration</button></form>`;
        
        const inputClass = "w-full bg-white dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm focus:border-brand-primary outline-none dark:text-white";
        container.innerHTML = formHTML.replace(/input-field/g, inputClass);
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
        setTimeout(() => { btn.innerHTML = originalText; btn.classList.remove('bg-green-500'); }, 300);
    }, 1500);
}

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

const themeBtn = document.getElementById('theme-toggle');
const html = document.documentElement;
if (window.matchMedia('(prefers-color-scheme: dark)').matches) html.classList.add('dark');
themeBtn.addEventListener('click', () => html.classList.toggle('dark'));
