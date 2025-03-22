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
import { useMembersStore } from '../store/members';
import { WelcomeBanner } from 'components/home/WelcomeBanner';

type HomeScreenProps = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList>,
  StackScreenProps<RootStackParamList>
>;

export default function Home() {
  const navigation = useNavigation<HomeScreenProps['navigation']>();
  const { events, getEvents } = useEventsStore();
  const { members } = useMembersStore();

  // Carrega os eventos ao abrir a tela
  useEffect(() => {
      getEvents();
  }, [getEvents]);

  // Log dos eventos carregados
  useEffect(() => {
  }, [events]);

  // Define a data atual e a referência de 30 dias atrás
  const currentDate = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Filtra eventos criados nos últimos 30 dias
  const newEvents = events
    .filter((event) => new Date(event.date) >= thirtyDaysAgo)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


  // Filtra membros criados nos últimos 30 dias
  const newMembers = members
    .filter((member) => new Date(member.createdAt) >= thirtyDaysAgo)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Obtém o mês e o ano atuais
  const currentMonth = new Date().getMonth() + 1; // Meses são base 0, então soma 1
  const currentYear = new Date().getFullYear();

  // Filtra os membros que fazem aniversário neste mês
  const birthdayMembers = members.filter((member) => {
    const birthDate = new Date(member.birthDate);
    return birthDate.getMonth() + 1 === currentMonth;
  }).sort((a, b) => new Date(a.birthDate).getDate() - new Date(b.birthDate).getDate());


  return (
    <ScrollView className="flex-1 bg-white">
      <View className="max-w-screen-2xl mx-auto w-full px-4 md:px-8">
        <WelcomeBanner />

        {/* 📌 Seção de Acesso Rápido */}
        <View className="mt-6">
          <Text className="text-2xl font-semibold text-gray-800 mb-4">Acesso Rápido</Text>
          <View className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickAccessItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(item.screenName)}
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
          {newEvents.length > 0 ? (
            newEvents.map((event) => (
              <View key={event.id} className="mb-6 bg-blue-50 rounded-lg shadow-lg p-6">
                <Text className="text-xl font-semibold text-gray-800">{event.category}</Text>
                <Text className="text-gray-600">{event.date} • {event.time}</Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-600 text-center">Não há eventos programados para o próximo mês.</Text>
          )}
        </View>

        {/* 🆕 Novos Membros */}
        <View className="mt-8">
          <Text className="text-2xl font-semibold text-gray-800 mb-4">Novos Membros</Text>
          {newMembers.length > 0 ? (
            newMembers.map((member) => (
              <View key={member.id} className="mb-6 bg-blue-50 rounded-lg shadow-lg p-6">
                <Text className="text-gray-800 font-semibold">{member.name}</Text>
                <Text className="text-gray-600 text-sm">
                  {new Date(member.createdAt).toLocaleDateString('pt-BR')}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-600 text-center">Não há novos membros neste mês.</Text>
          )}
        </View>
        {/* 🎂 Aniversariantes do Mês */}
        <View className="mt-8">
          <Text className="text-2xl font-semibold text-gray-800 mb-4">Aniversariantes do Mês</Text>
          {birthdayMembers.length > 0 ? (
            birthdayMembers.map((member) => (
              <View key={member.id} className="mb-6 bg-blue-50 rounded-lg shadow-lg p-6">
                <Text className="text-gray-800 font-semibold">{member.name}</Text>
                <Text className="text-gray-600 text-sm">
                  {new Date(member.createdAt).toLocaleDateString('pt-BR')}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-600 text-center">Não há novos membros neste mês.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
