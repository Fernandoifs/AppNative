import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';

export default function Modal() {
  return (
    <View className="flex-1 bg-white">
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
