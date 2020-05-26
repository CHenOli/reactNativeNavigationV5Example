import 'react-native-gesture-handler';

import AuthRoutes from './routes/Auth';
import { View } from 'react-native-animatable';
import { ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect, useMemo, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent from './routes/Content';
import { AuthContext } from './components/AuthContext';
import SupportPage from './pages/SupportPage';
import SettingsPage from './pages/SettingsPage';
import BookmarksPage from './pages/BookmarksPage';
import MainTabScreen from './pages/MainTabPage';

const Drawer = createDrawerNavigator();

const App = () => {
  const initialLoginState = {
    isLoading: true,
    username: null,
    userToken: null,
  };

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
        console.log('caiu logout');
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
    }),
    [],
  );

  if (loginState.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
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
  );
};

export default App;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
