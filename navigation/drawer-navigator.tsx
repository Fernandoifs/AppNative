import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';
import { useWindowDimensions } from 'react-native';

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
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 1024; // Define se a tela é grande

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: isLargeScreen,
        drawerStyle: {
          backgroundColor: '#FFFFFF',
          width: isLargeScreen ? 300 : 240, // 📏 Ajuste dinâmico da largura do menu
        },
        drawerLabelStyle: {
          marginLeft: 8,
          fontSize: isLargeScreen ? 18 : 16, // 📏 Tamanho do texto ajustável
        },
        drawerType: isLargeScreen ? 'permanent' : 'slide', // 🖥️ Fixo no desktop, deslizante no mobile
        headerStyle: {
          height: 60
        },
        headerLeftContainerStyle: {
          paddingLeft: 16
        },
        headerTitleStyle: {
          fontSize: 20
        },
        drawerIconStyle: {
          width: isLargeScreen ? 32 : 28, // 📏 Ícones maiores em telas grandes
          height: isLargeScreen ? 32 : 28
        }
      }}
    >
      <Drawer.Screen
        name="TabNavigator"
        component={BottomTabNavigator}
        options={{
          title: 'Início',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
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
        name="Attendance"
        component={Attendance}
        options={{
          title: 'Presença',
          drawerIcon: ({ size, color }) => (
            <FontAwesome name="check-square" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
