import seedrandom from 'seedrandom';

export interface Racer {
    id: string;
    name: string;
    avatar?: string; // URL or emoji
    color: string;
}

export interface RaceResult {
    winnerId: string;
    positions: Record<string, number>; // Final positions (0 to 1, where 1 is finish line)
    seed: string;
}

/**
 * Generates a deterministic race result based on the week ID and participants.
 */
export const simulateRace = (weekId: string, participants: Racer[]): RaceResult => {
    // Add a salt to the seed to avoid similar strings producing similar results
    const rng = seedrandom(`chips-rugby-race-${weekId}`);

    // Fisher-Yates shuffle for unbiased random permutation
    const shuffled = [...participants];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const winner = shuffled[0];

    return {
        winnerId: winner.id,
        positions: {},
        seed: weekId,
    };
};
