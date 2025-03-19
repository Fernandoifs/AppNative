import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '.';
import { HeaderButton } from '../components/HeaderButton';
import { TabBarIcon } from '../components/TabBarIcon';
import Members from '../screens/members';
import Events from '../screens/events';
import Attendance from '../screens/attendance';
import Bible from '../screens/bible';

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#6B7280',
        headerShown: true,
        headerStyle: {
          backgroundColor: '#F9FAFB',
        },
        headerTitleStyle: {
          color: '#111827',
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name="Members"
        component={Members}
        options={{
          title: 'Membros',
          tabBarIcon: ({ color }) => <TabBarIcon name="people" color={color} />,
        }}
      />
      <Tab.Screen
        name="Events"
        component={Events}
        options={{
          title: 'Eventos',
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
        }}
      />
      <Tab.Screen
        name="Attendance"
        component={Attendance}
        options={{
          title: 'Presença',
          tabBarIcon: ({ color }) => <TabBarIcon name="checkbox" color={color} />,
        }}
      />
      <Tab.Screen
        name="Bible"
        component={Bible}
        options={{
          title: 'Bíblia',
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
