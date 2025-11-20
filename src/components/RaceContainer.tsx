import React, { useState, useMemo, useEffect } from 'react';
import { RugbyField } from './RugbyField';
import { ChipsRacer } from './ChipsRacer';
import { getRugbyWeekId, getNextRaceDate } from '../utils/timeUtils';
import { getParticipants } from '../utils/participants';
import { simulateRace } from '../utils/raceLogic';
import seedrandom from 'seedrandom';
import { format, parseISO, differenceInSeconds } from 'date-fns';
import { fr } from 'date-fns/locale';

export const RaceContainer: React.FC = () => {
    const [weekId] = useState(getRugbyWeekId());
    const [raceState, setRaceState] = useState<'idle' | 'racing' | 'finished'>('idle');
    const [progress, setProgress] = useState<Record<string, number>>({});
    const [countdown, setCountdown] = useState<string>('');

    const participants = useMemo(() => getParticipants(), []);

    // Deterministic result
    const result = useMemo(() => simulateRace(weekId, participants), [weekId, participants]);

    // Calculate durations for each racer based on the seed
    const racerConfigs = useMemo(() => {
        const rng = seedrandom(weekId + '-durations');
        const configs: Record<string, { duration: number, delay: number }> = {};

        participants.forEach(p => {
            const isWinner = p.id === result.winnerId;
            // Winner takes around 5-6 seconds
            // Losers take 6-8 seconds
            const baseDuration = 5;
            const randomOffset = rng() * 2; // 0 to 2s

            if (isWinner) {
                configs[p.id] = { duration: baseDuration, delay: 0 };
            } else {
                // Ensure losers are always slower than the winner
                // We add a small buffer to ensure they don't accidentally win due to easing
                configs[p.id] = { duration: baseDuration + 0.5 + randomOffset, delay: 0 };
            }
        });
        return configs;
    }, [weekId, participants, result]);

    const startRace = () => {
        if (raceState === 'racing') return;
        setRaceState('racing');
        setProgress({});

        // Start the race loop
        const startTime = Date.now();

        const interval = setInterval(() => {
            const now = Date.now();
            const elapsed = (now - startTime) / 1000; // seconds

            const newProgress: Record<string, number> = {};
            let allFinished = true;

            participants.forEach(p => {
                const config = racerConfigs[p.id];
                const pProgress = Math.min(1, elapsed / config.duration);
                newProgress[p.id] = pProgress;

                if (pProgress < 1) allFinished = false;
            });

            setProgress(newProgress);

            if (allFinished) {
                clearInterval(interval);
                setRaceState('finished');
            }
        }, 16); // ~60fps
    };

    const winner = participants.find(p => p.id === result.winnerId);
    const nextRaceDate = useMemo(() => getNextRaceDate(), []);

    // Countdown timer logic
    useEffect(() => {
        if (raceState !== 'finished') return;

        const updateCountdown = () => {
            const now = new Date();
            const diff = differenceInSeconds(nextRaceDate, now);

            if (diff <= 0) {
                setCountdown("C'est l'heure !");
                return;
            }

            const days = Math.floor(diff / (3600 * 24));
            const hours = Math.floor((diff % (3600 * 24)) / 3600);
            const minutes = Math.floor((diff % 3600) / 60);
            const seconds = diff % 60;

            const parts = [];
            if (days > 0) parts.push(`${days}j`);
            if (hours > 0) parts.push(`${hours}h`);
            if (minutes > 0) parts.push(`${minutes}m`);
            parts.push(`${seconds}s`);

            setCountdown(parts.join(' '));
        };

        updateCountdown(); // Initial call
        const timer = setInterval(updateCountdown, 1000);

        return () => clearInterval(timer);
    }, [raceState, nextRaceDate]);

    // Format header date
    const headerDate = useMemo(() => {
        try {
            const date = parseISO(weekId);
            return format(date, "EEEE d MMMM", { locale: fr });
        } catch (e) {
            return weekId;
        }
    }, [weekId]);

    return (
        <div className="flex flex-col h-screen bg-slate-900 text-white">
            {/* Header */}
            <div className="p-4 text-center z-20 bg-slate-800 shadow-md">
                <h1 className="text-2xl font-bold text-yellow-400">🏉 Chips Rugby Race 🏉</h1>
                <p className="text-sm text-slate-400 capitalize">
                    Entraînement du {headerDate}
                </p>
            </div>

            {/* Main Race Area */}
            <div className="flex-1 relative overflow-hidden">
                <RugbyField>
                    {participants.map((p, index) => (
                        <ChipsRacer
                            key={p.id}
                            racer={p}
                            progress={progress[p.id] || 0}
                            laneIndex={index}
                            totalLanes={participants.length}
                        />
                    ))}
                </RugbyField>

                {/* Overlay Controls */}
                {raceState === 'idle' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-30">
                        <button
                            onClick={startRace}
                            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-full text-xl shadow-lg transform transition hover:scale-105 active:scale-95"
                        >
                            Lancer la course ! 🏁
                        </button>
                    </div>
                )}

                {raceState === 'finished' && winner && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-40 p-4 text-center">
                        <h2 className="text-4xl font-bold text-white mb-4">🏆 Vainqueur 🏆</h2>
                        <div className="w-32 h-32 rounded-full border-4 border-yellow-400 overflow-hidden mb-4 bg-white">
                            <img src={winner.avatar} alt={winner.name} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-3xl font-bold text-yellow-400 mb-8">{winner.name} ramène les chips !</p>

                        <button
                            onClick={startRace}
                            className="bg-white text-slate-900 font-bold py-2 px-6 rounded-full shadow-lg hover:bg-gray-200 transition"
                        >
                            Revoir la course 🔄
                        </button>

                        <div className="mt-8 text-gray-400">
                            <p className="text-sm mb-1">Prochaine course dans :</p>
                            <p className="text-xl font-mono text-yellow-400 font-bold">
                                {countdown}
                            </p>
                            <p className="text-xs mt-1 opacity-75">
                                (pour l'entraînement de la semaine prochaine)
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
