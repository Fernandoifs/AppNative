import React from 'react';
import { View, Text } from 'react-native';

export const WelcomeBanner = () => (
    <View className="p-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg mt-4">
    <Text className="text-2xl md:text-3xl font-bold text-white">Bem-vindo à Comunidade</Text>
    <Text className="text-white mt-2 text-sm md:text-base">
      Conectando pessoas, fortalecendo comunidades e compartilhando a fé através da tecnologia.
    </Text>
  </View>
);