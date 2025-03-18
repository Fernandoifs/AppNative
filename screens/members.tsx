import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import type { Member } from '../types';

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

export default function Members() {
  const [members] = useState<Member[]>(MOCK_MEMBERS);

  const renderMemberItem = ({ item }: { item: Member }) => (
    <View className="bg-white p-4 mb-2 rounded-lg shadow-sm">
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-medium text-gray-800">{item.name}</Text>
        <View className="flex-row gap-2">
          <Button
            onPress={() => {}}
            className="bg-blue-500 p-2 rounded-full">
            <Ionicons name="pencil" size={16} color="white" />
          </Button>
          <Button
            onPress={() => {}}
            className="bg-red-500 p-2 rounded-full">
            <Ionicons name="trash" size={16} color="white" />
          </Button>
        </View>
      </View>
      <Text className="text-gray-600">{item.email}</Text>
      <Text className="text-gray-600">{item.phone}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold text-gray-800">Membros</Text>
        <Button
          onPress={() => {}}
          className="bg-indigo-500 p-3 rounded-full">
          <Ionicons name="add" size={24} color="white" />
        </Button>
      </View>
      <FlatList
        data={members}
        renderItem={renderMemberItem}
        keyExtractor={(item) => item.id}
        className="flex-1"
      />
    </View>
  );
}