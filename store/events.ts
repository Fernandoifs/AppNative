import { create } from 'zustand';
import type { Event } from '../types';

interface EventsState {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (eventId: string | number) => void;
  getEvents: () => Event[];
}

export const useEventsStore = create<EventsState>((set, get) => ({
  events: [
    {
      id: 1,
      category: 'Culto',
      date: '2021-01-01',
      time: '10:00',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      category: 'Culto',
      date: '2021-01-02',
      time: '11:00',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
  ],
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  updateEvent: (event) => set((state) => ({
    events: state.events.map((e) => (e.id === event.id ? event : e))
  })),
  deleteEvent: (eventId) => set((state) => ({
    events: state.events.filter((e) => e.id !== eventId)
  })),
  getEvents: () => get().events
}));