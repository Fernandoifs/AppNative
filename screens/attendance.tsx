import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useEventsStore } from '../store/events';
import type { Event } from '../types';
import { AttendanceListModal } from '../components/attendance/AttendanceListModal';

export default function Attendance() {
  const events = useEventsStore((state) => state.events);
  const cultoEvents = events.filter(event => event.category === 'Culto');

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAttendanceList = (event: Event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedEvent(null);
  };

  const EventCard = ({ event }: { event: Event }) => (
    <View className="mb-4 bg-white rounded-lg shadow-md p-4">
      <Text className="text-lg font-semibold text-gray-900">{event.category}</Text>
      <Text className="text-gray-600 mb-3">{event.date} • {event.time}</Text>
      <TouchableOpacity
        onPress={() => handleAttendanceList(event)}
        className="bg-blue-500 rounded-md py-2 px-4 self-start"
      >
        <Text className="text-white font-medium">Lista de Presença</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-bold text-gray-900 mb-6">Lista de Presença - Cultos</Text>
      {cultoEvents.length > 0 ? (
        cultoEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))
      ) : (
        <Text className="text-gray-600 text-center">Nenhum culto encontrado</Text>
      )}
      {selectedEvent && (
        <AttendanceListModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          event={selectedEvent}
        />
      )}
    </ScrollView>
  );
}