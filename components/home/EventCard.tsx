import React from 'react';
import { View, Text } from 'react-native';
import type { Event } from '../../types';

type EventCardProps = {
  event: Event;
};

export const EventCard = ({ event }: EventCardProps) => (
  <View className="mb-4 bg-white rounded-lg shadow-md">
    <View className="p-4">
      <View className="self-start px-2 py-1 mb-2 bg-blue-100 rounded-full">
        <Text className="text-xs font-medium text-blue-700">Evento</Text>
      </View>
      <Text className="text-lg font-semibold text-gray-900">{event.category}</Text>
      <Text className="text-gray-600">{event.date} • {event.time} </Text>
    </View>
  </View>
);