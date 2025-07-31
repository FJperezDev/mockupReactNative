import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { login, logout, restoreSession, users } from './auth';
import instance from './api';


export default function App() {
  const [sessionRestored, setSessionRestored] = useState(false);

  useEffect(() => {
    const tryRestore = async () => {
      await restoreSession();
      setSessionRestored(true);
    };
    tryRestore();
  }, []);

  if (!sessionRestored) return <Text>Restaurando sesión...</Text>;

  const getProtected = async () => {
    try {
      const res = await instance.get('/account/profile');
      alert('Datos protegidos: ' + JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
      alert('No autorizado');
    }
  };

  return (
    <View style={{ padding: 40 }}>
      <Button title="Login" onPress={() => login('fran@gmail.com', 'admin123')} />
      <View style={{ height: 10 }} />
      <Button title="Obtener datos cuenta" onPress={getProtected} />
      <View style={{ height: 10 }} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
