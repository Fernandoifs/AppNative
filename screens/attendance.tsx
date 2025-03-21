import { useState } from 'react';
import { FlatList, Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import type { Event, Member, Attendance as AttendanceType } from '../types';

const MOCK_MEMBERS: Member[] = [
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

const MOCK_EVENT: Event = {
  id: '1',
  date: '2024-01-21',
  time: '10:00',
  category: 'service',
  status: 'upcoming',
};

const MOCK_ATTENDANCE: Record<string, AttendanceType> = {
  '1': {
    id: '1',
    eventId: '1',
    memberId: '1',
    status: 'present',
    createdAt: new Date().toISOString(),
  },
};

export default function Attendance() {
  const [members] = useState<Member[]>(MOCK_MEMBERS);
  const [attendance, setAttendance] = useState<Record<string, AttendanceType>>(MOCK_ATTENDANCE);

  const toggleAttendance = (memberId: string) => {
    setAttendance((prev) => {
      const current = prev[memberId];
      if (current) {
        const newStatus = current.status === 'present' ? 'absent' : 'present';
        return {
          ...prev,
          [memberId]: { ...current, status: newStatus },
        };
      }
      return {
        ...prev,
        [memberId]: {
          id: memberId,
          eventId: MOCK_EVENT.id,
          memberId,
          status: 'present',
          createdAt: new Date().toISOString(),
        },
      };
    });
  };

  const renderMemberItem = ({ item }: { item: Member }) => {
    const memberAttendance = attendance[item.id];
    const isPresent = memberAttendance?.status === 'present';

    return (
      <View className="bg-white p-4 mb-2 rounded-lg shadow-sm">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-medium text-gray-800">{item.name}</Text>
          <Button title=""
            onPress={() => toggleAttendance(item.id)}
            className={`p-2 rounded-full ${isPresent ? 'bg-green-500' : 'bg-gray-300'}`}>
            <Ionicons
              name={isPresent ? 'checkmark-circle' : 'ellipse-outline'}
              size={24}
              color="white"
            />
          </Button>
        </View>
      </View>
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="max-w-screen-2xl mx-auto w-full px-4 md:px-8">
        <View className="mb-4">
          <Text className="text-2xl font-bold text-gray-800 mb-2">{MOCK_EVENT.title}</Text>
          <Text className="text-gray-600">
            {MOCK_EVENT.date} • {MOCK_EVENT.startTime} - {MOCK_EVENT.endTime}
          </Text>
        </View>
        <FlatList
          data={members}
          renderItem={renderMemberItem}
          keyExtractor={(item) => item.id}
          className="flex-1"
        />
      </View>
    </ScrollView>
  );
}