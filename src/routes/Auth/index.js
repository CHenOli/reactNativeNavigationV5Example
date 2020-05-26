import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashPage from '../../pages/SplashPage';
import SignInPage from '../../pages/SignInPage';
import SignUpPage from '../../pages/SignUpPage';

const Stack = createStackNavigator();

const AuthRoutes = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="SplashPage" component={SplashPage} />
    <Stack.Screen name="SignInPage" component={SignInPage} />
    <Stack.Screen name="SignUpPage" component={SignUpPage} />
  </Stack.Navigator>
);

export default AuthRoutes;
