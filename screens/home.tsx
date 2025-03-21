import React, { useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList, DrawerParamList } from '../navigation/types';
import { quickAccessItems } from '../constants/navigation';
import { useEventsStore } from '../store/events';
import { WelcomeBanner } from 'components/home/WelcomeBanner';

type HomeScreenProps = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList>,
  StackScreenProps<RootStackParamList>
>;

export default function Home() {
  const navigation = useNavigation<HomeScreenProps['navigation']>();
  const { events, getEvents } = useEventsStore();

  // Carrega os eventos ao abrir a tela
  useEffect(() => {
    getEvents();
  }, [getEvents]);

  // Mapeia os itens de acesso rápido com navegação
  const mappedQuickAccessItems = quickAccessItems.map((item) => ({
    ...item,
    onPress: () => navigation.navigate('TabNavigator', { screen: item.screenName }),
  }));

  // Filtra os eventos futuros
  const currentDate = new Date();
  const upcomingEvents = events
    .filter((event) => {
      const eventDate = new Date(`${event.date}T${event.time}`);
      return eventDate >= currentDate;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="max-w-screen-2xl mx-auto w-full px-4 md:px-8">
        {/* 🏠 Banner de boas-vindas */}
        <WelcomeBanner />

        {/* 📌 Seção de Acesso Rápido */}
        <View className="mt-6">
          <Text className="text-2xl font-semibold text-gray-800 mb-4">Acesso Rápido</Text>
          <View className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mappedQuickAccessItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={item.onPress}
                className="bg-blue-100 rounded-xl p-6 items-center justify-center shadow-xl transform hover:scale-105 transition duration-300"
              >
                <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={36} color="#1D4ED8" />
                <Text className="text-gray-800 mt-3 text-sm md:text-base">{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 📅 Próximos Eventos */}
        <View className="mt-8">
          <Text className="text-2xl font-semibold text-gray-800 mb-4">Próximos Eventos</Text>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <View key={event.id} className="mb-6 bg-blue-50 rounded-lg shadow-lg p-6">
                <View className="self-start px-2 py-1 mb-2 bg-blue-100 rounded-full">
                  <Text className="text-xs font-medium text-blue-700">{event.category}</Text>
                </View>
                <Text className="text-xl font-semibold text-gray-800">{event.category}</Text>
                <Text className="text-gray-600">{event.date} • {event.time}</Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-600 text-center">Não há eventos programados para o próximo mês.</Text>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate('Events')}
            className="mt-4 bg-blue-600 py-3 rounded-xl items-center self-center px-10 shadow-lg"
          >
            <Text className="text-white font-semibold">Adicionar evento</Text>
          </TouchableOpacity>
        </View>

        {/* 🆕 Novos Membros */}
        <View className="mt-8">
          <Text className="text-2xl font-semibold text-gray-800 mb-4">Novos Membros</Text>
          <Text className="text-gray-600 text-center">Não há novos membros neste mês.</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Members')}
            className="mt-4 bg-green-600 py-3 rounded-xl items-center self-center px-10 shadow-lg"
          >
            <Text className="text-white font-semibold">Adicionar membro</Text>
          </TouchableOpacity>
        </View>

        {/* 🎂 Aniversariantes do Mês */}
        <View className="mt-8">
          <Text className="text-2xl font-semibold text-gray-800 mb-4">Aniversariantes do Mês</Text>
          <View className="bg-blue-50 p-6 rounded-lg flex-row items-center mb-4 shadow-lg">
            <Image
              source={{ uri: 'https://via.placeholder.com/60' }}
              className="w-16 h-16 rounded-full"
            />
            <View className="ml-4">
              <Text className="text-gray-800 font-semibold">Lucas Mendes</Text>
              <Text className="text-gray-600">25 de março</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
