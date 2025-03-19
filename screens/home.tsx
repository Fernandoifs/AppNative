import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { Event } from '../types';
import { MOCK_EVENTS } from '../mocks/events';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList, RootTabParamList, DrawerParamList } from '../navigation/types';
import { quickAccessItems } from '../constants/navigation';
import { QuickAccessCard } from '../components/QuickAccessCard';

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

  const mappedQuickAccessItems = quickAccessItems.map(item => ({
    ...item,
    onPress: () => navigation.navigate('Tabs', { screen: item.screenName })
  }));

  return (
    <>
      <ScrollView className="flex-1 bg-gray-100">
        <View className="p-8 bg-blue-500">
          <Text className="text-2xl font-bold text-white text-center mb-2">Igreja Cristã</Text>
          <Text className="text-white text-center opacity-80">
            Bem-vindo à nossa comunidade de fé, esperança e amor
          </Text>
        </View>

        <View className="p-4">
          <Text className="text-xl font-semibold text-gray-900 mb-4">Acesso Rápido</Text>
          <View className="flex-row flex-wrap justify-between">
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
          <Text className="text-xl font-semibold text-gray-900 mb-4">Próximos Eventos</Text>
          {MOCK_EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </View>
      </ScrollView>

      <View className="bg-white border-t border-gray-200 py-2 px-4 flex-row justify-around items-center">
        <TouchableOpacity 
          onPress={() => navigation.navigate('Home')} 
          className="items-center">
          <Ionicons name="home-outline" size={24} color="#4F46E5" />
          <Text className="text-xs text-gray-600 mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Tabs', { screen: 'Events' })} 
          className="items-center">
          <Ionicons name="calendar-outline" size={24} color="#6B7280" />
          <Text className="text-xs text-gray-600 mt-1">Eventos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Tabs', { screen: 'Members' })} 
          className="items-center">
          <Ionicons name="people-outline" size={24} color="#6B7280" />
          <Text className="text-xs text-gray-600 mt-1">Membros</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Tabs', { screen: 'Bible' })} 
          className="items-center">
          <Ionicons name="book-outline" size={24} color="#6B7280" />
          <Text className="text-xs text-gray-600 mt-1">Bíblia</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
