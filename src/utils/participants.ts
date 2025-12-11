import type { Racer } from './raceLogic';

// Hardcoded list for MVP
// In a real app, this could come from a database or local storage
export const INITIAL_PARTICIPANTS: Racer[] = [
    { id: '1', name: 'Guillaume N', color: '#FF5733', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GuillaumeN' },
    { id: '2', name: 'Frédéric', color: '#33FF57', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Frederic' },
    { id: '3', name: 'Ronan', color: '#3357FF', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ronan' },
    { id: '4', name: 'Xavier', color: '#F333FF', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Xavier' },
    { id: '5', name: 'Yohan', color: '#FFD700', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yohan' },
    { id: '6', name: 'Antoine', color: '#FF8C00', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Antoine' },
    { id: '7', name: 'Simon', color: '#00CED1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Simon' },
    { id: '8', name: 'PA', color: '#FF1493', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PA' },
    { id: '9', name: 'Vince', color: '#32CD32', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vince' },
    { id: '10', name: 'Vincent', color: '#9370DB', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vincent' },
    { id: '11', name: 'François', color: '#FF6347', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=François' },
    { id: '12', name: 'Jesus', color: '#4169E1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jesus' },
    { id: '13', name: 'Guillaume B', color: '#FF4500', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GuillaumeB' },
    { id: '14', name: 'Clément', color: '#20B2AA', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Clément' },
    { id: '15', name: 'Alexandre', color: '#DC143C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandre' },
    { id: '16', name: 'Yann', color: '#FFB6C1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yann' }
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
