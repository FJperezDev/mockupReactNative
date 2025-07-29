import React, { useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import { login, logout } from './auth';
import axios from './api';

export default function App() {
  const handleLogin = async () => {
    try {
      await login('admin@admin.com', 'admin123');  // Sustituye por valores reales
      alert('Login correcto');
    } catch (err) {
      console.error(err);
      alert('Error al iniciar sesión');
    }
  };

  const handleLogout = async () => {
    await logout();
    alert('Cierre de sesión completo');
  };

  const getProtected = async () => {
    try {
      const res = await axios.get('/users/');
      alert('Datos protegidos: ' + JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
      alert('No autorizado');
    }
  };

  return (
    <View style={{ padding: 40 }}>
      <Button title="Login" onPress={handleLogin} />
      <View style={{ height: 10 }} />
      <Button title="Obtener datos protegidos" onPress={getProtected} />
      <View style={{ height: 10 }} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
