import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useWindowDimensions } from 'react-native';

import DrawerNavigator from './menu-navigator';
import BottomTabNavigator from './bottomTab-navigator';

export type RootStackParamList = {
  DrawerNavigator: undefined;
  TabNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 1024;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLargeScreen ? "DrawerNavigator" : "TabNavigator"}>
        {isLargeScreen ? (
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="TabNavigator"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}