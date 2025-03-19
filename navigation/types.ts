import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { DrawerScreenProps } from '@react-navigation/drawer';

export type RootStackParamList = {
  DrawerNavigator: undefined;
  TabNavigator: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type RootTabParamList = {
  Home: undefined;
  Members: undefined;
  Events: undefined;
  Attendance: undefined;
  Bible: undefined;
};

export type RootTabScreenProps<T extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type DrawerParamList = {
  Home: undefined;
  Members: undefined;
  Events: undefined;
  Attendance: undefined;
  Bible: undefined;
};

export type DrawerScreenProps<T extends keyof DrawerParamList> = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;