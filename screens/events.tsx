import { useState, useCallback } from 'react';
import { 
  FlatList, Text, View, Modal, TextInput, TouchableOpacity, ScrollView 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import type { Event } from '../types';
import { MOCK_EVENTS } from '../mocks/events';
import { Calendar } from 'react-native-calendars';

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
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [selectedDate, setSelectedDate] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [newEvent, setNewEvent] = useState<NewEventType>({
    category: '',
    date: '',
    time: '',
    status: 'Confirmado',
    readings: [],
  });

  const categories = ['Culto', 'Estudo', 'Juventude', 'Celebração', 'Outro'];

  const addReading = useCallback(() => {
    setNewEvent(prev => ({
      ...prev,
      readings: [...(prev.readings || []), {
        book: BIBLE_BOOKS[0],
        chapter: '',
        startVerse: '',
        endVerse: '',
      }]
    }));
  }, []);

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

  const handleCreateEvent = () => {
    if (!newEvent.category || !newEvent.date || !newEvent.time) return;

    const newEventData: Event = {
      id: events.length + 1,
      category: newEvent.category,
      date: newEvent.date,
      time: newEvent.time,
      status: newEvent.status,
      ...(newEvent.category === 'Culto' && newEvent.readings?.length ? {
        readings: newEvent.readings.map(reading => ({
          book: reading.book,
          chapter: parseInt(reading.chapter, 10),
          verses: [parseInt(reading.startVerse, 10), parseInt(reading.endVerse, 10)],
          description: `Leitura de ${reading.book} ${reading.chapter}:${reading.startVerse}-${reading.endVerse}`,
        }))
      } : {})
    };

    setEvents(prev => [...prev, newEventData]);
    setIsModalVisible(false);
    setNewEvent({ category: '', date: '', time: '', status: 'Confirmado', readings: [] });
  };

  const handleDateConfirm = (date: Date) => {
    setNewEvent(prev => ({ ...prev, date: date.toISOString().split('T')[0] }));
    setIsDatePickerVisible(false);
  };

  const renderEventItem = ({ item }: { item: Event }) => (
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
  );

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Eventos</Text>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
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
                <Picker.Item label="Selecione uma categoria" value="" />
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

                      <Text className="text-gray-700 mb-1">Livro</Text>
                      <Picker
                        selectedValue={reading.book}
                        onValueChange={(value) => updateReading(index, 'book', value)}
                        className="mb-2 bg-white rounded-lg">
                        {BIBLE_BOOKS.map((book) => (
                          <Picker.Item key={book} label={book} value={book} />
                        ))}
                      </Picker>

                      <View className="flex-row gap-2 mb-2">
                        <View className="flex-1">
                          <Text className="text-gray-700 mb-1">Capítulo</Text>
                          <TextInput
                            value={reading.chapter}
                            onChangeText={(value) => updateReading(index, 'chapter', value)}
                            keyboardType="numeric"
                            className="bg-white p-2 rounded-lg"
                            placeholder="Cap."
                          />
                        </View>
                        <View className="flex-1">
                          <Text className="text-gray-700 mb-1">Versículo Inicial</Text>
                          <TextInput
                            value={reading.startVerse}
                            onChangeText={(value) => updateReading(index, 'startVerse', value)}
                            keyboardType="numeric"
                            className="bg-white p-2 rounded-lg"
                            placeholder="Início"
                          />
                        </View>
                        <View className="flex-1">
                          <Text className="text-gray-700 mb-1">Versículo Final</Text>
                          <TextInput
                            value={reading.endVerse}
                            onChangeText={(value) => updateReading(index, 'endVerse', value)}
                            keyboardType="numeric"
                            className="bg-white p-2 rounded-lg"
                            placeholder="Fim"
                          />
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              <Button
                title="Criar Evento"
                onPress={handleCreateEvent}
                className="bg-indigo-500"
                disabled={!newEvent.category || !newEvent.date || !newEvent.time}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setIsDatePickerVisible(false)}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={(time) => {
          setNewEvent(prev => ({
            ...prev,
            time: time.toLocaleTimeString().slice(0, 5)
          }));
          setIsTimePickerVisible(false);
        }}
        onCancel={() => setIsTimePickerVisible(false)}
      />
    </View>
  );
}
