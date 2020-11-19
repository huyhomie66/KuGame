import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useContext, Suspense } from 'react';
import { StatusBar } from 'react-native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { ThemeProvider } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';

import HeaderSettingsButton from './src/components/HeaderSettingsButton';
import Tabbar from './src/components/Tabbar';
import AppearanceSettings from './src/screens/AppearanceSettings';
import Calendar from './src/screens/Calendar';
import Dashboard from './src/screens/Dashboard';
import { darkTheme, lightTheme } from './src/theme';
import Details from './src/screens/Details';
import Settings from './src/screens/Settings';
import News from './src/screens/News';
import Search from './src/screens/Search';
import NotificationsSettings from './src/screens/NotificationsSettings';
import Licenses from './src/screens/Licenses';
import AppState from './src/stores/AppState';
import { Themes } from './src/types';
import AppIconSettings from './src/screens/AppIconSettings';
// import useCodePush from './src/hooks/useCodePush';
import Plash from './src/components/Plash';
import KuApp from './src/KuApp/Home';
console.disableYellowBox = true;
enableScreens();

const Tab = createBottomTabNavigator();
const HomeNav = createNativeStackNavigator();
const CalendarNav = createNativeStackNavigator();
const NewsNav = createNativeStackNavigator();
const SearchNav = createNativeStackNavigator();
const Header_Color = '#FFD700';
const HomeStack = () => {
  return (
    <HomeNav.Navigator>
      <HomeNav.Screen
        options={{
          headerTranslucent: false,
          headerHideShadow: true,
          headerTitle: 'KuBet',
          headerStyle: { backgroundColor: Header_Color },
          headerRight: HeaderSettingsButton,
        }}
        name="Home"
        component={KuApp}
      />
      <HomeNav.Screen
        name="Details"
        component={Details}
        options={{ headerBackTitle: 'Details', headerStyle: { backgroundColor: Header_Color } }}
      />
      <HomeNav.Screen
        name="Settings"
        component={Settings}
        options={{ headerBackTitle: 'Home', headerStyle: { backgroundColor: Header_Color } }}
      />
      <HomeNav.Screen name="Notifications" component={NotificationsSettings} />
      <HomeNav.Screen name="Appearance" component={AppearanceSettings} />
      <HomeNav.Screen name="Icon" component={AppIconSettings} />
      <HomeNav.Screen
        name="Licenses"
        // options={{
        //   headerLargeTitle: true,
        //   headerHideShadow: true,
        // }}
        component={Licenses}
      />
    </HomeNav.Navigator>
  );
};

const CalendarStack = () => {
  const { colors } = useTheme();
  return (
    <CalendarNav.Navigator>
      <CalendarNav.Screen
        options={{
          // headerLargeTitle: true,
          // headerHideShadow: true,
          headerStyle: { backgroundColor: Header_Color },
        }}
        name="Calendar"
        component={Calendar}
      />
      <CalendarNav.Screen name="Details" component={Details} />
    </CalendarNav.Navigator>
  );
};
const NewsStack = () => {
  const { colors } = useTheme();
  return (
    <NewsNav.Navigator>
      <NewsNav.Screen
        options={{
          // headerLargeTitle: true,
          // headerHideShadow: true,
          headerStyle: { backgroundColor: Header_Color },
          headerShown: false,
        }}
        name="News"
        component={News}
      />
    </NewsNav.Navigator>
  );
};

const SearchStack = () => {
  const { colors } = useTheme();
  return (
    <SearchNav.Navigator>
      <SearchNav.Screen
        options={{
          // headerLargeTitle: true,
          // headerHideShadow: true,
          headerStyle: { backgroundColor: Header_Color },
          headerShown: false,
        }}
        name="Search"
        component={Search}
      />
      <SearchNav.Screen
        name="Details"
        component={Details}
        options={{
          headerBackTitle: 'Details',
          headerShown: false,
          headerStyle: { backgroundColor: Header_Color },
        }}
      />
    </SearchNav.Navigator>
  );
};

const App = observer(() => {
  const scheme = useColorScheme();
  const appStateStore = useContext(AppState);

  let theme;
  let statusBarStyle;
  if (appStateStore.theme === Themes.automatic) {
    if (scheme === 'dark') {
      theme = darkTheme;
      statusBarStyle = 'light-content';
    } else {
      theme = lightTheme;
      statusBarStyle = 'dark-content';
    }
  } else if (appStateStore.theme === Themes.light) {
    theme = lightTheme;
    statusBarStyle = 'dark-content';
  } else if (appStateStore.theme === Themes.dark) {
    theme = darkTheme;
    statusBarStyle = 'light-content';
  }

  return (
    <AppearanceProvider>
      <ThemeProvider theme={theme.colors}>
        <NavigationContainer theme={theme}>
          <StatusBar barStyle={statusBarStyle} />
          <Tab.Navigator tabBar={Tabbar}>
            <Tab.Screen name="News" component={NewsStack} />
            <Tab.Screen name="Search" component={SearchStack} />
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Calendar" component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </AppearanceProvider>
  );
});

const AppContainer = () => {
  // const { hasUpdate, progress, synced } = useCodePush();
  return (
    <Suspense>
      {/* {!!synced && <App />}
      {!synced && <Plash hasUpdate={hasUpdate} progress={progress} />} */}
      <App />
    </Suspense>
  );
};

export default AppContainer;
