import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMembersStore } from '../store/members';

type Member = {
  id: string;
  name: string;
  birthDate: string;
  phone: string;
  role: string;
  createdAt: string;
};

type MembersContextType = {
  members: Member[];
  addMember: (member: Omit<Member, 'id' | 'createdAt'>) => void;
  updateMember: (id: string, member: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  getMemberById: (id: string) => Member | undefined;
};

const MembersContext = createContext<MembersContextType | undefined>(undefined);

export function MembersProvider({ children }: { children: React.ReactNode }) {
  const membersStore = useMembersStore();
  const [members, setMembers] = useState<Member[]>(() => membersStore.members.map(member => ({
    ...member,
    role: member.role || '' // Ensure role is never undefined
  })));

  useEffect(() => {
    setMembers(membersStore.members.map(member => ({
      ...member,
      role: member.role || '' // Ensure role is never undefined
    })));
  }, [membersStore.members]);

  const addMember = (memberData: Omit<Member, 'id' | 'createdAt'>) => {
    membersStore.addMember({
      ...memberData,
      email: '',
      address: '',
      status: 'active' as const
    });
  };

  const updateMember = (id: string, memberData: Partial<Member>) => {
    membersStore.updateMember(id, memberData);
  };

  const deleteMember = (id: string) => {
    membersStore.deleteMember(id);
  };

  const getMemberById = (id: string) => {
    return members.find(member => member.id === id);
  };

  return (
    <MembersContext.Provider
      value={{
        members,
        addMember,
        updateMember,
        deleteMember,
        getMemberById,
      }}
    >
      {children}
    </MembersContext.Provider>
  );
}

export function useMembers() {
  const context = useContext(MembersContext);
  if (context === undefined) {
    throw new Error('useMembers must be used within a MembersProvider');
  }
  return context;
}