import { useState } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import type { Member } from '../types';
import { useMembersStore } from '../store/members';
import { AddMemberModal } from './members/AddMemberModal';

export default function Members() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const members = useMembersStore((state) => state.members);

  const renderMemberItem = ({ item }: { item: Member }) => (
    <View className="bg-white p-5 mb-4 rounded-xl shadow-md border border-gray-200">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-xl font-semibold text-gray-900">{item.name}</Text>
        <View className="flex-row gap-2">
          <TouchableOpacity className="bg-blue-500 p-2 rounded-full" onPress={() => {}}>
            <Ionicons name="pencil" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-red-500 p-2 rounded-full" onPress={() => {}}>
            <Ionicons name="trash" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <Text className="text-gray-600 text-base">{item.email}</Text>
      <Text className="text-gray-600 text-base">{item.phone}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 px-5 pt-6">
      {/* Cabeçalho */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-3xl font-bold text-gray-900">Membros</Text>
        <TouchableOpacity className="bg-indigo-600 p-4 rounded-full shadow-lg" onPress={() => setIsAddModalVisible(true)}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Lista de Membros */}
      <FlatList
        data={members}
        renderItem={renderMemberItem}
        keyExtractor={(item) => item.id}
        className="flex-1"
      />

      <AddMemberModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
      />
    </View>
  );
}
