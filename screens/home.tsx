import React, { useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { Event } from '../types';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList, RootTabParamList, DrawerParamList } from '../navigation/types';
import { quickAccessItems } from '../constants/navigation';
import { QuickAccessCard } from '../components/QuickAccessCard';
import { useEventsStore } from '../store/events';

type HomeScreenProps = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList>,
  StackScreenProps<RootStackParamList>
>;

const EventCard = ({ event }: { event: Event }) => (
  <View className="mb-4 bg-white rounded-lg shadow-md">
    <View className="p-4">
      <View className="self-start px-2 py-1 mb-2 bg-blue-100 rounded-full">
        <Text className="text-xs font-medium text-blue-700">Evento</Text>
      </View>
      <Text className="text-lg font-semibold text-gray-900">{event.title}</Text>
      <Text className="text-gray-600">{event.date} • {event.startTime} - {event.endTime}</Text>
    </View>
  </View>
);

export default function Home() {
  const navigation = useNavigation<HomeScreenProps['navigation']>();
  const { events, getEvents } = useEventsStore();

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  const mappedQuickAccessItems = quickAccessItems.map(item => ({
    ...item,
    onPress: () => navigation.navigate('TabNavigator', { screen: item.screenName })
  }));

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= currentDate;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const monthlyEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-8 bg-blue-500">
        <Text className="text-2xl font-bold text-white text-center mb-2">Comunidade</Text>
        <Text className="text-white text-center opacity-80">
          Bem-vindo à nossa comunidade de fé, esperança e amor
        </Text>
      </View>

      <View className="p-4">
        <View className="flex-row flex-wrap gap-4 justify-center">
          {mappedQuickAccessItems.map((item, index) => (
            <QuickAccessCard 
              key={index} 
              title={item.title}
              icon={item.icon as keyof typeof Ionicons.glyphMap}
              color={item.color}
              onPress={item.onPress}
            />
          ))}
        </View>
      </View>

      <View className="p-4">
        <Text className="text-xl font-semibold text-gray-900 mb-4">Eventos deste Mês</Text>
        {monthlyEvents.length > 0 ? (
          monthlyEvents.map((event) => (
            <View key={event.id} className="mb-4 bg-white rounded-lg shadow-md p-4">
              <View className="self-start px-2 py-1 mb-2 bg-blue-100 rounded-full">
                <Text className="text-xs font-medium text-blue-700">{event.category}</Text>
              </View>
              <Text className="text-lg font-semibold text-gray-900">{event.title || event.category}</Text>
              <Text className="text-gray-600">{event.date} • {event.time}</Text>
            </View>
          ))
        ) : (
          <Text className="text-gray-600 text-center">Nenhum evento encontrado este mês</Text>
        )}
      </View>
    </ScrollView>
  );
}
