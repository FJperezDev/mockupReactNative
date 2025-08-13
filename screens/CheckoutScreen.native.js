import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import { initializePayment, openPaymentSheet } from '../api';

export default function CheckoutScreen({navigation}) {
  const [loading, setLoading] = useState(false);

  return (
    <View style={{ flex: 1, padding: 20, alignItems: "center", justifyContent: 'center' }}>
      <Button
        title="Pagar 19.99€"
        onPress={async () => {
          const initialized = await initializePayment(setLoading, "price_1RuWaNIp6CTAphaecuu79yRF");
          if (initialized) {
            await openPaymentSheet(setLoading);
          }
        }}
        disabled={loading}
      />

      <Button
        title="Volver"
        onPress={async () => {navigation.navigate('Home')}}
      />
    </View>
  );
}
