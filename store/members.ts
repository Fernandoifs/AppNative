import { create } from 'zustand';
import type { Member } from '../types';

interface MembersState {
  members: Member[];
  addMember: (member: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateMember: (id: string, member: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  getMember: (id: string) => Member | undefined;
}

export const useMembersStore = create<MembersState>((set, get) => ({
  members: [],
  addMember: (memberData) => {
    const newMember: Member = {
      ...memberData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({ members: [...state.members, newMember] }));
  },
  updateMember: (id, memberData) => {
    set((state) => ({
      members: state.members.map((member) =>
        member.id === id
          ? { ...member, ...memberData, updatedAt: new Date().toISOString() }
          : member
      ),
    }));
  },
  deleteMember: (id) => {
    set((state) => ({
      members: state.members.filter((member) => member.id !== id),
    }));
  },
  getMember: (id) => {
    return get().members.find((member) => member.id === id);
  },
}));