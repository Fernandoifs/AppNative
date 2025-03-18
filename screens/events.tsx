import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import type { Event } from '../types';

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Culto de Domingo',
    description: 'Culto dominical com louvor e pregação',
    date: '2024-01-21',
    startTime: '10:00',
    endTime: '12:00',
    location: 'Templo Principal',
    type: 'service',
    status: 'upcoming',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function Events() {
  const [events] = useState<Event[]>(MOCK_EVENTS);

  const renderEventItem = ({ item }: { item: Event }) => (
    <View className="bg-white p-4 mb-2 rounded-lg shadow-sm">
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-medium text-gray-800">{item.title}</Text>
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
      <Text className="text-gray-600">{item.description}</Text>
      <View className="flex-row mt-2">
        <View className="flex-row items-center mr-4">
          <Ionicons name="calendar" size={16} color="#4F46E5" />
          <Text className="text-gray-600 ml-1">{item.date}</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="time" size={16} color="#4F46E5" />
          <Text className="text-gray-600 ml-1">{item.startTime} - {item.endTime}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold text-gray-800">Eventos</Text>
        <Button
          onPress={() => {}}
          className="bg-indigo-500 p-3 rounded-full">
          <Ionicons name="add" size={24} color="white" />
        </Button>
      </View>
      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        className="flex-1"
      />
    </View>
  );
}