import { useState } from 'react';
import { FlatList, Text, View, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import type { Event } from '../types';
import { MOCK_EVENTS } from '../mocks/events';
import { Calendar } from 'react-native-calendars';

type NewEventType = {
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  readings?: {
    book: string;
    chapter: number;
    verses: number[];
    description: string;
  }[];
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [selectedDate, setSelectedDate] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [newEvent, setNewEvent] = useState<NewEventType>({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    location: '',
  });

  const categories = ['Culto', 'Estudo', 'Juventude', 'Celebração', 'Outro'];

  const markedDates = events.reduce((acc, event) => ({
    ...acc,
    [event.date]: {
      selected: true,
      selectedColor: '#4F46E5',
      marked: true,
      dots: [{ color: '#4F46E5' }],
    },
  }), {});

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setNewEvent(prev => ({ ...prev, date: day.dateString }));
    setIsModalVisible(true);
  };

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.category || !newEvent.date || !newEvent.time) {
      // Add proper validation feedback here
      return;
    }

    const newEventData: Event = {
      id: String(events.length + 1),
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      startTime: newEvent.time,
      endTime: newEvent.time, // Add proper end time handling
      location: newEvent.location || 'TBD',
      type: newEvent.category.toLowerCase() as Event['type'],
      status: 'upcoming',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setEvents(prev => [...prev, newEventData]);
    setIsModalVisible(false);
    setNewEvent({
      title: '',
      description: '',
      category: '',
      date: '',
      time: '',
      location: '',
    });
  };

  const renderEventItem = ({ item }: { item: Event }) => (
    <View className="bg-white p-4 mb-2 rounded-lg shadow-sm">
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-medium text-gray-800">{item.title}</Text>
        <View className="bg-blue-100 px-2 py-1 rounded-full">
          <Text className="text-xs text-blue-700">{item.type}</Text>
        </View>
      </View>
      {item.description && (
        <Text className="text-gray-600 mt-1">{item.description}</Text>
      )}
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
      </View>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={{
          todayTextColor: '#4F46E5',
          selectedDayBackgroundColor: '#4F46E5',
          textDayFontFamily: 'System',
          textMonthFontFamily: 'System',
          textDayHeaderFontFamily: 'System',
          dotColor: '#4F46E5',
          selectedDotColor: '#ffffff',
        }}
        className="mb-4"
      />
      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        className="flex-1"
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <Text className="text-xl font-bold mb-4">Criar Novo Evento</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-2 mb-4"
              placeholder="Título do evento"
              value={newEvent.title}
              onChangeText={(text) => setNewEvent(prev => ({ ...prev, title: text }))}
            />
            <TextInput
              className="border border-gray-300 rounded-lg p-2 mb-4"
              placeholder="Descrição"
              multiline
              numberOfLines={3}
              value={newEvent.description}
              onChangeText={(text) => setNewEvent(prev => ({ ...prev, description: text }))}
            />
            <View className="border border-gray-300 rounded-lg p-2 mb-4">
              <Picker
                selectedValue={newEvent.category}
                onValueChange={(value) => setNewEvent(prev => ({ ...prev, category: value }))}
              >
                <Picker.Item label="Selecione uma categoria" value="" />
                {categories.map((category) => (
                  <Picker.Item key={category} label={category} value={category} />
                ))}
              </Picker>
            </View>
            <TextInput
              className="border border-gray-300 rounded-lg p-2 mb-4"
              placeholder="Local do evento"
              value={newEvent.location}
              onChangeText={(text) => setNewEvent(prev => ({ ...prev, location: text }))}
            />
            <TouchableOpacity 
              className="border border-gray-300 rounded-lg p-2 mb-4"
              onPress={() => setIsDatePickerVisible(true)}
            >
              <Text className="text-gray-500">
                {newEvent.date || 'Selecione uma data'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="border border-gray-300 rounded-lg p-2 mb-4"
              onPress={() => setIsTimePickerVisible(true)}
            >
              <Text className="text-gray-500">
                {newEvent.time || 'Selecione um horário'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                setNewEvent(prev => ({ ...prev, date: date.toISOString().split('T')[0] }));
                setIsDatePickerVisible(false);
              }}
              onCancel={() => setIsDatePickerVisible(false)}
            />
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={(date) => {
                setNewEvent(prev => ({ 
                  ...prev, 
                  time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                }));
                setIsTimePickerVisible(false);
              }}
              onCancel={() => setIsTimePickerVisible(false)}
            />
            <View className="flex-row justify-end space-x-2">
              <Button
                title="Cancelar"
                onPress={() => {
                  setIsModalVisible(false);
                  setNewEvent({
                    title: '',
                    description: '',
                    category: '',
                    date: '',
                    time: '',
                    location: '',
                  });
                }}
                className="bg-gray-500"
              />
              <Button
                title="Criar"
                onPress={handleCreateEvent}
                className="bg-indigo-500"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}