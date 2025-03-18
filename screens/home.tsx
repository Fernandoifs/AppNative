import { ScrollView, Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import type { Event } from '../types';

type QuickAccessCardProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color: string;
};

const QuickAccessCard = ({ title, icon, onPress, color }: QuickAccessCardProps) => (
  <Button
    onPress={onPress}
    className="items-center justify-center p-4 m-2 bg-white rounded-lg shadow-md w-[160px] h-[120px]">
    <Ionicons name={icon} size={32} color={color} />
    <Text className="mt-2 text-gray-800 font-medium text-center">{title}</Text>
  </Button>
);

const EventCard = ({ event }: { event: Event }) => (
  <View className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
    <View className="p-4">
      <View className="bg-blue-100 self-start px-2 py-1 rounded-full mb-2">
        <Text className="text-blue-800 text-xs font-medium">Evento</Text>
      </View>
      <Text className="text-lg font-medium text-gray-800 mb-1">{event.title}</Text>
      <Text className="text-gray-600">
        {event.date} • {event.startTime} - {event.endTime}
      </Text>
    </View>
  </View>
);

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Culto de Domingo',
    description: 'Culto dominical com louvor e pregação',
    date: '2024-01-21',
    startTime: '10:00',
    endTime: '12:00',
    location: 'Templo Principal',
    type: 'service',
    status: 'upcoming',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Reunião de Oração',
    description: 'Momento de intercessão e busca espiritual',
    date: '2024-01-24',
    startTime: '19:30',
    endTime: '21:00',
    location: 'Sala de Oração',
    type: 'meeting',
    status: 'upcoming',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function Home() {
  const quickAccessItems = [
    { title: 'Visitas Pastorais', icon: 'home', color: '#3B82F6', onPress: () => {} },
    { title: 'Eventos', icon: 'calendar', color: '#10B981', onPress: () => {} },
    { title: 'Pedidos de Oração', icon: 'heart', color: '#8B5CF6', onPress: () => {} },
    { title: 'Dízimos e Ofertas', icon: 'gift', color: '#EF4444', onPress: () => {} },
  ];

  return (
    <>
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-8 bg-blue-600">
          <Text className="text-3xl font-bold text-white mb-2 text-center">Igreja Cristã</Text>
          <Text className="text-white opacity-80 text-center">
            Bem-vindo à nossa comunidade de fé, esperança e amor
          </Text>
        </View>

        <View className="p-4">
          <Text className="text-xl font-semibold text-gray-800 mb-4">Acesso Rápido</Text>
          <View className="flex-row flex-wrap justify-between">
            {quickAccessItems.map((item, index) => (
              <QuickAccessCard key={index} {...item} />
            ))}
          </View>
        </View>

        <View className="p-4">
          <Text className="text-xl font-semibold text-gray-800 mb-4">Próximos Eventos</Text>
          {MOCK_EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </View>
      </ScrollView>

      <View className="bg-white border-t border-gray-200 py-2 px-4 flex-row justify-around items-center">
        <Button onPress={() => {}} className="items-center">
          <Ionicons name="home" size={24} color="#4F46E5" />
        </Button>
        <Button onPress={() => {}} className="items-center">
          <Ionicons name="calendar" size={24} color="#6B7280" />
        </Button>
        <Button onPress={() => {}} className="items-center">
          <Ionicons name="book" size={24} color="#6B7280" />
        </Button>
        <Button onPress={() => {}} className="items-center">
          <Ionicons name="gift" size={24} color="#6B7280" />
        </Button>
      </View>
    </>
  );

}
