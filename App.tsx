import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/components/Login/Login';
import Principal from './src/components/Principal/Principal';
import Formulario from './src/components/Formulario/Formulario';

export type RootStackParamList = {
  Login: undefined;
  Principal: undefined;
  Formulario: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="Formulario" component={Formulario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
