const { startOfWeek, addDays, setHours, setMinutes, isBefore, format } = require('date-fns');
const { fr } = require('date-fns/locale');
const seedrandom = require('seedrandom');

// Participants list for testing
const participants = [
    { id: '1', name: 'Antoine' },
    { id: '2', name: 'Pierre' },
    { id: '3', name: 'Lucas' },
    { id: '4', name: 'Thomas' },
    { id: '5', name: 'Julien' },
    { id: '6', name: 'Maxime' },
    { id: '7', name: 'Nicolas' },
    { id: '8', name: 'Alexandre' },
];

// Logic copied from src/utils/timeUtils.ts
const getRugbyWeekId = (date) => {
    const currentThursday = setMinutes(setHours(addDays(startOfWeek(date, { weekStartsOn: 1 }), 3), 20), 0);
    if (isBefore(currentThursday, date)) {
        const nextThursday = addDays(currentThursday, 7);
        return format(nextThursday, 'yyyy-MM-dd');
    }
    return format(currentThursday, 'yyyy-MM-dd');
};

// Logic copied from src/utils/raceLogic.ts
const simulateRace = (weekId, participants) => {
    const rng = seedrandom(`chips-rugby-race-${weekId}`);
    const shuffled = [...participants];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled[0];
};

// Start from a Monday to have a clean start
const startDate = new Date('2025-11-17T00:00:00'); // Monday Nov 17 2025
const daysToTest = 32; // ~1 month

console.log("Test sur 1 mois (départ Lundi 17 Nov 2025)\n");
console.log("Format: [Jour Date Heure] -> Semaine du (WeekID) | Gagnant");
console.log("-----------------------------------------------------------");

for (let i = 0; i < daysToTest; i++) {
    const dayBase = addDays(startDate, i);

    // Test times: 10:00, 19:59, 20:01, 23:00
    const times = [
        { h: 10, m: 0 },
        { h: 19, m: 59 },
        { h: 20, m: 1 },
        { h: 23, m: 0 }
    ];

    times.forEach(t => {
        const testDate = setMinutes(setHours(dayBase, t.h), t.m);
        const weekId = getRugbyWeekId(testDate);
        const winner = simulateRace(weekId, participants);

        const dayName = format(testDate, 'EEEE dd/MM', { locale: fr });
        const timeStr = format(testDate, 'HH:mm');

        // Highlight Thursday 20:01 changes
        const isThursday = testDate.getDay() === 4;
        const isSwitch = isThursday && t.h === 20 && t.m === 1;
        const marker = isSwitch ? " <--- CHANGEMENT SEMAINE" : "";

        console.log(`[${dayName} ${timeStr}] -> ${weekId} | 🏆 ${winner.name}${marker}`);
    });
    console.log(""); // Empty line between days
}
