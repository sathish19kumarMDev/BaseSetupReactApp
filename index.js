import 'react-native-gesture-handler';
import 'react-native-reanimated';
import 'reflect-metadata';
import { enableScreens } from 'react-native-screens';
enableScreens(); // ✅ Call early

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';


AppRegistry.registerComponent(appName, () => App);
