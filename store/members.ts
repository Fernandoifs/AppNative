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
  members: [ 
    {  
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '(11) 77777-7777',
      address: 'Rua Nova, 789',
      birthDate: '1995-08-21',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: '',
      phone: '(11) 99999-9999',
      address: 'Rua Antiga, 123',
      birthDate: '1980-03-15',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
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