import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Bible() {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-8 bg-blue-500">
        <Text className="text-2xl font-bold text-white text-center mb-2">Bíblia</Text>
        <Text className="text-white text-center opacity-80">
          Explore as escrituras sagradas
        </Text>
      </View>

      <View className="p-4">
        <Text className="text-xl font-semibold text-gray-900 mb-4">Versículo do Dia</Text>
        <View className="bg-white p-4 rounded-lg shadow-md mb-6">
          <Text className="text-gray-600 italic mb-2">"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna."</Text>
          <Text className="text-gray-900 font-medium">João 3:16</Text>
        </View>

        <Text className="text-xl font-semibold text-gray-900 mb-4">Livros</Text>
        <View className="flex-row flex-wrap justify-between">
          <TouchableOpacity className="bg-white p-4 rounded-lg shadow-md w-[48%] mb-4">
            <Ionicons name="book-outline" size={24} color="#4F46E5" />
            <Text className="mt-2 font-medium text-gray-900">Antigo Testamento</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white p-4 rounded-lg shadow-md w-[48%] mb-4">
            <Ionicons name="book-outline" size={24} color="#4F46E5" />
            <Text className="mt-2 font-medium text-gray-900">Novo Testamento</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-xl font-semibold text-gray-900 mb-4">Recursos</Text>
        <View className="bg-white rounded-lg shadow-md overflow-hidden">
          <TouchableOpacity className="p-4 border-b border-gray-200 flex-row items-center">
            <Ionicons name="search-outline" size={24} color="#4F46E5" className="mr-3" />
            <Text className="text-gray-900 ml-3">Pesquisar na Bíblia</Text>
          </TouchableOpacity>
          <TouchableOpacity className="p-4 border-b border-gray-200 flex-row items-center">
            <Ionicons name="bookmark-outline" size={24} color="#4F46E5" className="mr-3" />
            <Text className="text-gray-900 ml-3">Marcadores</Text>
          </TouchableOpacity>
          <TouchableOpacity className="p-4 flex-row items-center">
            <Ionicons name="heart-outline" size={24} color="#4F46E5" className="mr-3" />
            <Text className="text-gray-900 ml-3">Versículos Favoritos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}