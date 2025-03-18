export type Member = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  baptismDate?: string;
  role?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: 'service' | 'meeting' | 'celebration' | 'other';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
};

export type Attendance = {
  id: string;
  eventId: string;
  memberId: string;
  status: 'present' | 'absent' | 'late';
  createdAt: string;
};

export type UserProfile = {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'leader' | 'member';
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
  createdAt: string;
  updatedAt: string;
};