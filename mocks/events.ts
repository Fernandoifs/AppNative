import type { Event } from '../types';

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Culto de Domingo',
    description: 'Culto dominical com louvor e pregação',
    date: '2024-01-21',
    startTime: '10:00',
    endTime: '12:00',
    location: 'Templo Principal',
    type: 'service',
    status: 'upcoming',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Reunião de Oração',
    description: 'Momento de intercessão e busca espiritual',
    date: '2024-01-24',
    startTime: '19:30',
    endTime: '21:00',
    location: 'Sala de Oração',
    type: 'meeting',
    status: 'upcoming',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];