import type { Member } from '../types';

export const MOCK_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    address: 'Rua A, 123',
    birthDate: '1990-01-01',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];