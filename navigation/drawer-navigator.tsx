import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '.';
import BottomTabNavigator from './tab-navigator';
import Home from '../screens/home';
import Members from '../screens/members';
import Events from '../screens/events';
import Attendance from '../screens/attendance';
import Bible from '../screens/bible';

type Props = StackScreenProps<RootStackParamList, 'DrawerNavigator'>;

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ navigation }: Props) {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#FFFFFF',
          width: 280
        },
        drawerLabelStyle: {
          marginLeft: -16
        }
      }}
    >
      <Drawer.Screen
        name="TabNavigator"
        component={BottomTabNavigator}
        options={{
          title: '',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Members"
        component={Members}
        options={{
          title: 'Membros',
          drawerIcon: ({ size, color }) => (
            <FontAwesome name="users" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Events"
        component={Events}
        options={{
          title: 'Eventos',
          drawerIcon: ({ size, color }) => (
            <FontAwesome name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Attendance"
        component={Attendance}
        options={{
          title: 'Presença',
          drawerIcon: ({ size, color }) => (
            <FontAwesome name="check-square" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Bible"
        component={Bible}
        options={{
          title: 'Bíblia',
          drawerIcon: ({ size, color }) => (
            <FontAwesome name="book" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
