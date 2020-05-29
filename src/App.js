import 'react-native-gesture-handler';

import React, { useEffect, useMemo, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

import AuthRoutes from './routes/Auth';
import DrawerContent from './routes/Content';
import SupportPage from './pages/SupportPage';
import MainTabScreen from './pages/MainTabPage';
import SettingsPage from './pages/SettingsPage';
import BookmarksPage from './pages/BookmarksPage';
import { AuthContext } from './components/AuthContext';

const Drawer = createDrawerNavigator();

const App = () => {
  const initialLoginState = {
    isLoading: true,
    username: null,
    userToken: null,
  };

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const CustomDefaultTheme = {
    ...DefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...DarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...DarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (previousState, action) => {
    switch (action.type) {
      case 'SIGNIN':
        return {
          ...previousState,
          username: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'SIGNOUT':
        return {
          ...previousState,
          username: null,
          userToken: null,
          isLoading: false,
        };
      case 'SINGUP':
        return {
          ...previousState,
          username: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'RETRIEVE_TOKEN':
        return {
          ...previousState,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (error) {
        console.log(error);
      }
      dispatch({
        type: 'RETRIEVE_TOKEN',
        token: userToken,
      });
    }, 1000);
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (foundUser) => {
        const userToken = String(foundUser[0].userToken);
        const username = String(foundUser[0].username);
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (error) {
          console.log(error);
        }
        dispatch({ type: 'LOGIN', id: username, token: userToken });
      },
      signUp: () => {},
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (error) {
          console.log(error);
        }
        dispatch({ type: 'SIGNOUT' });
      },
      toggleTheme: () => {
        setIsDarkTheme(!isDarkTheme);
      },
    }),
    [isDarkTheme],
  );

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.userToken !== null ? (
            <Drawer.Navigator
              drawerContent={(props) => <DrawerContent {...props} />}>
              <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
              <Drawer.Screen name="Support" component={SupportPage} />
              <Drawer.Screen name="Settings" component={SettingsPage} />
              <Drawer.Screen name="Bookmarks" component={BookmarksPage} />
            </Drawer.Navigator>
          ) : (
            <AuthRoutes />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
