import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '.';
import Home from '../screens/home';
import Members from '../screens/members';
import Events from '../screens/events';
import Attendance from '../screens/attendance';
import Bible from '../screens/bible';

type Props = StackScreenProps<RootStackParamList, 'BottomTabNavigator'>;

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB'
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Members"
        component={Members}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="users" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Attendance"
        component={Attendance}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="check-square" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bible"
        component={Bible}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="book" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}