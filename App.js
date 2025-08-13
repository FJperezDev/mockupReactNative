// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './components';
import { AppNavigator } from './navigation';
import { StripeProvider } from '@stripe/stripe-react-native';
import { getPublishableKey } from './api';
import { ActivityIndicator, View } from 'react-native';


const App = () => {
  const [publishableKey, setPublishableKey] = useState(null);

  useEffect(() => {
    (async () => {
      const key = await getPublishableKey();
      setPublishableKey(key);
    })();
  }, []);

  if (!publishableKey) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <StripeProvider publishableKey={publishableKey || "pk_test_xxx"}>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </StripeProvider>
  );
}

export default App;
