import { startOfWeek, addDays, setHours, setMinutes, isBefore, format } from 'date-fns';

/**
 * Calculates the current "Rugby Week" ID.
 * The week switches every Thursday at 20:00.
 * 
 * Logic:
 * - If today is Thursday before 20:00, or Mon-Wed, we are in the "upcoming" Thursday's week (or previous? let's define).
 * - Let's define the "Target Date" as the *next* Thursday 20:00 if we are before it, or *this* Thursday 20:00 if we are after it?
 * 
 * Actually, the user said: "l'entrainement a lieu le jeudi à 20h donc à partir de ça on peut revoit la prochaine course et voir une course différente"
 * This implies:
 * - Before Thursday 20:00: We see the race for *this* Thursday (who brings chips tonight).
 * - After Thursday 20:00: We see the race for *next* Thursday (who brings chips next week).
 * 
 * So the ID should be the date string of the relevant Thursday.
 */
export const getRugbyWeekId = (date: Date = new Date()): string => {
    // Get this week's Thursday
    const currentThursday = setMinutes(setHours(addDays(startOfWeek(date, { weekStartsOn: 1 }), 3), 20), 0);

    // If we are past this week's Thursday 20:00, the target is next week's Thursday
    if (isBefore(currentThursday, date)) {
        const nextThursday = addDays(currentThursday, 7);
        return format(nextThursday, 'yyyy-MM-dd');
    }

    // Otherwise, it's this week's Thursday
    return format(currentThursday, 'yyyy-MM-dd');
};

export const getNextRaceDate = (date: Date = new Date()): Date => {
    const currentThursday = setMinutes(setHours(addDays(startOfWeek(date, { weekStartsOn: 1 }), 3), 20), 0);

    if (isBefore(currentThursday, date)) {
        return addDays(currentThursday, 7);
    }

    return currentThursday;
}
