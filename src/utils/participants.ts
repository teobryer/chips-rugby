import type { Racer } from './raceLogic';

// Hardcoded list for MVP
// In a real app, this could come from a database or local storage
export const INITIAL_PARTICIPANTS: Racer[] = [
    { id: '1', name: 'Frédéric', color: '#FF5733', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Frederic' },
    { id: '2', name: 'Ronan', color: '#33FF57', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ronan' },
    { id: '3', name: 'Téo', color: '#3357FF', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vince' },
    { id: '4', name: 'Xavier', color: '#F333FF', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Xavier' },
    { id: '5', name: 'Vincent R', color: '#FF33A8', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VincentR' },
    { id: '6', name: 'Arnaud', color: '#33FFF5', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arnaud' },
    { id: '7', name: 'Pierre-Antoine', color: '#F5FF33', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PierreAntoine' },
    { id: '8', name: 'Bruno', color: '#FF8C33', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bruno' },
    { id: '9', name: 'Vince', color: '#FF1493', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Teo' },
    { id: '10', name: 'Julien', color: '#00CED1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julien' },
    { id: '11', name: 'Clément', color: '#9370DB', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Clement' },
];

export const getParticipants = (): Racer[] => {
    const stored = localStorage.getItem('chips-rugby-participants');
    if (stored) {
        return JSON.parse(stored);
    }
    return INITIAL_PARTICIPANTS;
};

export const saveParticipants = (participants: Racer[]) => {
    localStorage.setItem('chips-rugby-participants', JSON.stringify(participants));
};
