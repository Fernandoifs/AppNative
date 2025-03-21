import './global.css';

import 'react-native-gesture-handler';
import { ThemeProvider } from './context/ThemeContext';
import RootStack from './navigation';

export default function App() {
  return (
    <ThemeProvider>
      <RootStack />
    </ThemeProvider>
  );
}
