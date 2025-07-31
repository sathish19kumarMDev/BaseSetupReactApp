import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'inversify-react';
import { StatusBar, useColorScheme } from 'react-native';
import { dependancyContainer } from './src/dependancyInjector/dependancyContainer';
import ProductDetailScreen from './src/view/ProductSections/ProductDetailScreen';
import ProductScreen from './src/view/ProductSections/ProductScreen';
import SettingScreen from './src/view/SettingSections/SettingScreen';
import HomeScreen from './src/view/HomeSections/HomeScreen';
import SplashScreen from './src/view/HomeSections/SplashScreen';


export type Mixed = string | number

export const ScreenName = [
  "HomeScreen",
  "SettingScreen",
  "SplashScreen",
  "ProductScreen",
  "ProductDetailScreen"
] as const

export type ScreenNameType = (typeof ScreenName)[number]

export type RootStackParamList = {
  [K in ScreenNameType]
  //: K extends "Homescreen"
  // ? { id?: String }
  : undefined
}

export type StackNavigation = NavigationProp<RootStackParamList>

const Stack = createNativeStackNavigator()
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider container={dependancyContainer}>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="SettingScreen" component={SettingScreen} />
          <Stack.Screen name="ProductScreen" component={ProductScreen} />
          <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
