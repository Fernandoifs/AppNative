import React, { useState, useCallback } from 'react';
import {
  FlatList, Text, View, Modal, TouchableOpacity, ScrollView, Alert
} from 'react-native';
import { useEventsStore } from '../store/events';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import * as bibleData from '../mocks/bible.json';
import type { Event } from '../types';
import { Button } from 'components/Button';

const BIBLE_BOOKS = [
  'Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio',
  'Josué', 'Juízes', 'Rute', '1 Samuel', '2 Samuel',
  '1 Reis', '2 Reis', '1 Crônicas', '2 Crônicas', 'Esdras',
  'Neemias', 'Ester', 'Jó', 'Salmos', 'Provérbios',
  'Eclesiastes', 'Cânticos', 'Isaías', 'Jeremias', 'Lamentações',
  'Ezequiel', 'Daniel', 'Oséias', 'Joel', 'Amós',
  'Obadias', 'Jonas', 'Miquéias', 'Naum', 'Habacuque',
  'Sofonias', 'Ageu', 'Zacarias', 'Malaquias',
  'Mateus', 'Marcos', 'Lucas', 'João', 'Atos',
  'Romanos', '1 Coríntios', '2 Coríntios', 'Gálatas', 'Efésios',
  'Filipenses', 'Colossenses', '1 Tessalonicenses', '2 Tessalonicenses',
  '1 Timóteo', '2 Timóteo', 'Tito', 'Filemom', 'Hebreus',
  'Tiago', '1 Pedro', '2 Pedro', '1 João', '2 João',
  '3 João', 'Judas', 'Apocalipse'
];

type Reading = {
  book: string;
  chapter: string;
  startVerse: string;
  endVerse: string;
};

type NewEventType = {
  category: string;
  date: string;
  time: string;
  status: string;
  readings?: Reading[];
};

export default function Events() {
  const navigation = useNavigation<any>();
  const { events, addEvent } = useEventsStore();
  const [selectedDate, setSelectedDate] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState<NewEventType>({
    category: 'Culto', // Categoria padrão
    date: '',
    time: '',
    status: 'Confirmado',
    readings: [{
      book: 'Gênesis',
      chapter: '1',
      startVerse: '1',
      endVerse: '1'
    }]
  });

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewEvent({
      category: 'Culto', // Redefine a categoria para "Culto"
      date: '',
      time: '',
      status: 'Confirmado',
      readings: [{
        book: 'Gênesis',
        chapter: '1',
        startVerse: '1',
        endVerse: '1'
      }]
    });
  };

  const handleCreateEvent = () => {
    const missingFields = [];
    if (!newEvent.category) missingFields.push('Categoria');
    if (!newEvent.date) missingFields.push('Data');
    if (!newEvent.time) missingFields.push('Horário');
    if (newEvent.category === 'Culto' && (!newEvent.readings || newEvent.readings.length === 0)) {
      missingFields.push('Leituras Bíblicas');
    }

    if (missingFields.length > 0) {
      Alert.alert(
        'Campos Obrigatórios',
        `Por favor, preencha os seguintes campos: ${missingFields.join(', ')}`,
        [{ text: 'OK' }]
      );
      return;
    }

    const newEventData = {
      id: events.length + 1,
      category: newEvent.category,
      date: newEvent.date,
      time: newEvent.time,
      status: newEvent.status,
      readings: newEvent.category === 'Culto' && newEvent.readings
        ? newEvent.readings.map(reading => ({
          book: reading.book,
          chapter: parseInt(reading.chapter, 10),
          verses: [parseInt(reading.startVerse, 10), parseInt(reading.endVerse, 10)],
          description: `Leitura de ${reading.book} ${reading.chapter}:${reading.startVerse}-${reading.endVerse}`
        }))
        : undefined
    };

    addEvent(newEventData);
    setIsModalVisible(false);

    // Redefine o estado de newEvent para o padrão
    setNewEvent({
      category: 'Culto', // Categoria padrão
      date: '',
      time: '',
      status: 'Confirmado',
      readings: [{
        book: 'Gênesis',
        chapter: '1',
        startVerse: '1',
        endVerse: '1'
      }]
    });

    Alert.alert('Sucesso', 'Evento criado com sucesso!', [{ text: 'OK' }]);
  };

  const addReading = useCallback(() => {
    setNewEvent(prev => ({
      ...prev,
      readings: [...(prev.readings || []), {
        book: BIBLE_BOOKS[0],
        chapter: '1',
        startVerse: '1',
        endVerse: '1'
      }]
    }));
  }, []);

  const categories = ['Culto', 'Estudo', 'Juventude', 'Celebração', 'Outro'];

  const updateReading = useCallback((index: number, field: keyof Reading, value: string) => {
    setNewEvent(prev => {
      const readings = [...(prev.readings || [])];
      readings[index] = { ...readings[index], [field]: value };
      return { ...prev, readings };
    });
  }, []);

  const removeReading = useCallback((index: number) => {
    setNewEvent(prev => ({
      ...prev,
      readings: prev.readings?.filter((_, i) => i !== index),
    }));
  }, []);

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

  const handleDateConfirm = ({ date }: { date: Date }) => {
    setNewEvent(prev => ({ ...prev, date: date.toISOString().split('T')[0] }));
    setIsDatePickerVisible(false);
  };

  const handleTimeConfirm = ({ hours, minutes }: { hours: number, minutes: number }) => {
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    setNewEvent(prev => ({ ...prev, time }));
    setIsTimePickerVisible(false);
  };

  const handleEventPress = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailsModalVisible(true);
  };

  const renderEventItem = ({ item }: { item: Event }) => (
    <TouchableOpacity onPress={() => handleEventPress(item)}>
      <View className="bg-white p-4 mb-2 rounded-lg shadow-sm">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-medium text-gray-800">{item.category}</Text>
          <View className="bg-blue-100 px-2 py-1 rounded-full">
            <Text className="text-xs text-blue-700">{item.status}</Text>
          </View>
        </View>
        <View className="flex-row mt-2">
          <View className="flex-row items-center mr-4">
            <Ionicons name="calendar" size={16} color="#4F46E5" />
            <Text className="text-gray-600 ml-1">{item.date}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="time" size={16} color="#4F46E5" />
            <Text className="text-gray-600 ml-1">{item.time}</Text>
          </View>
        </View>
        {item.category === 'Culto' && item.readings && (
          <View className="mt-2 border-t border-gray-100 pt-2">
            <Text className="text-sm font-medium text-gray-700 mb-1">Leituras Bíblicas:</Text>
            {item.readings.map((reading, index) => (
              <Text key={index} className="text-sm text-gray-600">
                {reading.description}
              </Text>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Eventos</Text>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        locale="pt-br"
        theme={{
          todayTextColor: '#4F46E5',
          selectedDayBackgroundColor: '#4F46E5',
          dotColor: '#4F46E5',
          selectedDotColor: '#ffffff',
        }}
      />
      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={(item) => String(item.id)}
      />
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <ScrollView className="max-h-[80vh]">
              <Text className="text-xl font-bold mb-4">Criar Novo Evento</Text>

              <Text className="text-gray-700 mb-2">Categoria</Text>
              <Picker
                selectedValue={newEvent.category}
                onValueChange={(value) => setNewEvent(prev => ({ ...prev, category: value }))}
                className="mb-4 bg-gray-100 rounded-lg">
                {categories.map((category) => (
                  <Picker.Item key={category} label={category} value={category} />
                ))}
              </Picker>

              <Text className="text-gray-700 mb-2">Data</Text>
              <TouchableOpacity
                onPress={() => setIsDatePickerVisible(true)}
                className="flex-row items-center p-3 bg-gray-100 rounded-lg mb-4">
                <Ionicons name="calendar" size={20} color="#4F46E5" />
                <Text className="ml-2 text-gray-700">
                  {newEvent.date || 'Selecione uma data'}
                </Text>
              </TouchableOpacity>

              <Text className="text-gray-700 mb-2">Horário</Text>
              <TouchableOpacity
                onPress={() => setIsTimePickerVisible(true)}
                className="flex-row items-center p-3 bg-gray-100 rounded-lg mb-4">
                <Ionicons name="time" size={20} color="#4F46E5" />
                <Text className="ml-2 text-gray-700">
                  {newEvent.time || 'Selecione um horário'}
                </Text>
              </TouchableOpacity>

              {newEvent.category === 'Culto' && (
                <View className="mb-4">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-gray-700">Leituras Bíblicas</Text>
                    <TouchableOpacity onPress={addReading} className="bg-indigo-100 p-2 rounded-full">
                      <Ionicons name="add" size={20} color="#4F46E5" />
                    </TouchableOpacity>
                  </View>

                  {newEvent.readings?.map((reading, index) => (
                    <View key={index} className="bg-gray-50 p-3 rounded-lg mb-2">
                      <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-gray-700 font-medium">Leitura {index + 1}</Text>
                        <TouchableOpacity onPress={() => removeReading(index)} className="bg-red-100 p-2 rounded-full">
                          <Ionicons name="trash" size={16} color="#EF4444" />
                        </TouchableOpacity>
                      </View>

                      <View className="flex-row gap-2 mb-2">
                        <View className="flex-1">
                          <Text className="text-gray-700 mb-1">Livro</Text>
                          <Picker
                            selectedValue={reading.book}
                            onValueChange={(value) => updateReading(index, 'book', value)}
                            className="bg-white rounded-lg">
                            {BIBLE_BOOKS.map((book) => (
                              <Picker.Item key={book} label={book} value={book} />
                            ))}
                          </Picker>
                        </View>
                        <View className="flex-1">
                          <Text className="text-gray-700 mb-1">Capítulo</Text>
                          <Picker
                            selectedValue={reading.chapter}
                            onValueChange={(value) => updateReading(index, 'chapter', value)}
                            className="bg-white rounded-lg">
                            {Array.from({ length: 150 }, (_, i) => i + 1).map((num) => (
                              <Picker.Item key={num} label={String(num)} value={String(num)} />
                            ))}
                          </Picker>
                        </View>
                        <View className="flex-1">
                          <Text className="text-gray-700 mb-1">Versículo Inicial</Text>
                          <Picker
                            selectedValue={reading.startVerse}
                            onValueChange={(value) => updateReading(index, 'startVerse', value)}
                            className="bg-white rounded-lg">
                            {Array.from({ length: 176 }, (_, i) => i + 1).map((num) => (
                              <Picker.Item key={num} label={String(num)} value={String(num)} />
                            ))}
                          </Picker>
                        </View>
                        <View className="flex-1">
                          <Text className="text-gray-700 mb-1">Versículo Final</Text>
                          <Picker
                            selectedValue={reading.endVerse}
                            onValueChange={(value) => updateReading(index, 'endVerse', value)}
                            className="bg-white rounded-lg">
                            {Array.from({ length: 176 }, (_, i) => i + 1).map((num) => (
                              <Picker.Item key={num} label={String(num)} value={String(num)} />
                            ))}
                          </Picker>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              <View className="flex-row gap-2">
                <Button
                  title="Cancelar"
                  onPress={handleCancel}
                  className="bg-gray-500 flex-1"
                />
                <Button
                  title="Criar Evento"
                  onPress={handleCreateEvent}
                  className="bg-indigo-500 flex-1"
                  disabled={!newEvent.category || !newEvent.date || !newEvent.time}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <DatePickerModal
        locale="pt"
        mode="single"
        visible={isDatePickerVisible}
        onDismiss={() => setIsDatePickerVisible(false)}
        date={newEvent.date ? new Date(newEvent.date) : undefined}
        onConfirm={handleDateConfirm}
      />
      <TimePickerModal
        visible={isTimePickerVisible}
        onDismiss={() => setIsTimePickerVisible(false)}
        onConfirm={handleTimeConfirm}
        hours={12}
        minutes={0}
      />
      <Modal visible={isDetailsModalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <ScrollView className="max-h-[80vh]">
              {selectedEvent && (
                <>
                  <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-xl font-bold text-gray-800">{selectedEvent.category}</Text>
                    <TouchableOpacity
                      onPress={() => setIsDetailsModalVisible(false)}
                      className="bg-gray-100 p-2 rounded-full"
                    >
                      <Ionicons name="close" size={24} color="#4F46E5" />
                    </TouchableOpacity>
                  </View>

                  <View className="bg-gray-50 p-4 rounded-lg mb-4">
                    <View className="flex-row items-center mb-2">
                      <Ionicons name="calendar" size={20} color="#4F46E5" />
                      <Text className="text-gray-700 ml-2 font-medium">Data</Text>
                    </View>
                    <Text className="text-gray-600">{selectedEvent.date}</Text>
                  </View>

                  <View className="bg-gray-50 p-4 rounded-lg mb-4">
                    <View className="flex-row items-center mb-2">
                      <Ionicons name="time" size={20} color="#4F46E5" />
                      <Text className="text-gray-700 ml-2 font-medium">Horário</Text>
                    </View>
                    <Text className="text-gray-600">{selectedEvent.time}</Text>
                  </View>

                  <View className="bg-gray-50 p-4 rounded-lg mb-4">
                    <View className="flex-row items-center mb-2">
                      <Ionicons name="information-circle" size={20} color="#4F46E5" />
                      <Text className="text-gray-700 ml-2 font-medium">Status</Text>
                    </View>
                    <View className="bg-blue-100 self-start px-3 py-1 rounded-full">
                      <Text className="text-blue-700">{selectedEvent.status}</Text>
                    </View>
                  </View>

                  {selectedEvent && selectedEvent.category === 'Culto' && selectedEvent.readings && (
                    <View className="bg-gray-50 p-4 rounded-lg">
                      <View className="flex-row items-center mb-3">
                        <Ionicons name="book" size={20} color="#4F46E5" />
                        <Text className="text-gray-700 ml-2 font-medium">Leituras Bíblicas</Text>
                      </View>
                      {selectedEvent.readings.map((reading, index) => (
                        <TouchableOpacity
                          key={index}
                          className="mb-2 last:mb-0"
                          onPress={() => {
                            const bookData = bibleData.biblia.livros.find(b => b.nome === reading.book);
                            if (bookData) {
                              navigation.navigate('Bible', {
                                initialBook: bookData,
                                initialChapter: reading.chapter,
                                initialVerse: reading.verses[0]
                              });
                              setIsDetailsModalVisible(false);
                            }
                          }}
                        >
                          <Text className="text-gray-600">
                            {`Leitura de ${reading.book} ${reading.chapter}:${reading.verses[0]}-${reading.verses[1]}`}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}