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
  events: [],
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  updateEvent: (event) => set((state) => ({
    events: state.events.map((e) => (e.id === event.id ? event : e))
  })),
  deleteEvent: (eventId) => set((state) => ({
    events: state.events.filter((e) => e.id !== eventId)
  })),
  getEvents: () => get().events
}));