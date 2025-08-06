import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../auth';
import { AuthNavigator } from '../auth';
import { UserHomeScreen } from '../screens';
import { UnauthorizedScreen } from '../screens';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Home" component={UserHomeScreen} />
      ) : (
        <>
          <Stack.Screen name="Auth" component={AuthNavigator} />
          <Stack.Screen name="401" component={UnauthorizedScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
