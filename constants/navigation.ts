import { Ionicons } from '@expo/vector-icons';

export const quickAccessItems = [
  { title: 'Bíblia', icon: 'book-outline' as keyof typeof Ionicons.glyphMap, color: '#3B82F6', screenName: 'Bible' },
  { title: 'Eventos', icon: 'calendar-outline' as keyof typeof Ionicons.glyphMap, color: '#10B981', screenName: 'Events' },
  { title: 'Membros', icon: 'people-outline' as keyof typeof Ionicons.glyphMap, color: '#8B5CF6', screenName: 'Members' },
  { title: 'Presença', icon: 'checkbox-outline' as keyof typeof Ionicons.glyphMap, color: '#EF4444', screenName: 'Attendance' },
];