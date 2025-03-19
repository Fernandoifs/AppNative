import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type QuickAccessCardProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color: string;
};

export const QuickAccessCard = ({ title, icon, onPress, color }: QuickAccessCardProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="items-center justify-center p-4 m-2 bg-white rounded-lg shadow-md w-40 h-28"
  >
    <Ionicons name={icon} size={32} color={color} />
    <Text className="mt-2 text-gray-900 font-medium text-center">{title}</Text>
  </TouchableOpacity>
);