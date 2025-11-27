import type { Racer } from './raceLogic';

// Hardcoded list for MVP
// In a real app, this could come from a database or local storage
export const INITIAL_PARTICIPANTS: Racer[] = [
    { id: '1', name: 'Guillaume', color: '#FF5733', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guillaume' },
    { id: '2', name: 'Frédéric', color: '#33FF57', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Frederic' },
    { id: '3', name: 'Xavier', color: '#F333FF', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Xavier' },
    { id: '4', name: 'Vince', color: '#FF1493', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vince' },
    { id: '5', name: 'Ronan', color: '#00CED1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ronan' },
    { id: '6', name: 'Yohan', color: '#FFD700', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yohan' },
    { id: '7', name: 'P-A', color: '#FFD700', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre-Antoine' },
    { id: '8', name: 'Arnaud', color: '#FFD700', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arnaud' },
    { id: '9', name: 'Vincent', color: '#FFD700', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vincent' },
    { id: '10', name: 'François', color: '#FFD700', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=François' },
    { id: '11', name: 'Clément', color: '#FFD700', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Clément' }
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
