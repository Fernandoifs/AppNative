import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';
import { useWindowDimensions, View, Text, StyleSheet } from 'react-native';

import { RootStackParamList } from '.';
import Home from '../screens/home';
import Members from '../screens/members';
import Events from '../screens/events';
import Attendance from '../screens/attendance';
import Bible from '../screens/bible';

type Props = StackScreenProps<RootStackParamList, 'DrawerNavigator'>;

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 1024;

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          backgroundColor: '#FFFFFF',
          width: isLargeScreen ? 300 : 280,
          borderRightWidth: 1,
          borderRightColor: '#E5E7EB',
        },
        drawerLabelStyle: styles.drawerLabel,
        drawerItemStyle: styles.drawerItem,
        drawerActiveBackgroundColor: '#EFF6FF',
        drawerActiveTintColor: '#3B82F6',
        drawerInactiveTintColor: '#6B7280',
        drawerType: isLargeScreen ? 'permanent' : 'slide', // Agora recolhe corretamente
        headerStyle: styles.header,
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerTitleStyle: styles.headerTitle,
        drawerIconStyle: { width: 24, height: 24 },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Início',
          drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Bible"
        component={Bible}
        options={{
          title: 'Bíblia',
          drawerIcon: ({ size, color }) => <FontAwesome name="book" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Events"
        component={Events}
        options={{
          title: 'Eventos',
          drawerIcon: ({ size, color }) => <FontAwesome name="calendar" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Members"
        component={Members}
        options={{
          title: 'Membros',
          drawerIcon: ({ size, color }) => <FontAwesome name="users" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Attendance"
        component={Attendance}
        options={{
          title: 'Presença',
          drawerIcon: ({ size, color }) => <FontAwesome name="check-square" size={size} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}

// Componente customizado para o conteúdo do Drawer
function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>Comunidade</Text>
        <Text style={styles.drawerSubtitle}>Gerenciamento da Igreja</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

// Estilos organizados
const styles = StyleSheet.create({
  drawerLabel: {
    marginLeft: -8, // Reduz a margem negativa para alinhar melhor
    paddingLeft: 8, // Adiciona espaçamento entre o ícone e o nome
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  drawerItem: {
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  drawerHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  drawerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});
