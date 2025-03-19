import { Ionicons } from '@expo/vector-icons';

export const quickAccessItems = [
  { title: 'Visitas Pastorais', icon: 'home-outline' as keyof typeof Ionicons.glyphMap, color: '#3B82F6', screenName: 'Members' },
  { title: 'Pedidos de Oração', icon: 'heart-outline' as keyof typeof Ionicons.glyphMap, color: '#10B981', screenName: 'Events' },
  { title: 'Eventos', icon: 'calendar-outline' as keyof typeof Ionicons.glyphMap, color: '#8B5CF6', screenName: 'Events' },
  { title: 'Bíblia', icon: 'book-outline' as keyof typeof Ionicons.glyphMap, color: '#EF4444', screenName: 'Bible' },
];