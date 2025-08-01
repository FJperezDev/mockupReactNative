import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { login, logout, restoreSession, users } from './auth';
import instance from './api';


export default function App() {
  const [sessionRestored, setSessionRestored] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const tryRestore = async () => {
      await restoreSession();
      setSessionRestored(true);
    };
    tryRestore();
  }, []);

  if (!sessionRestored) return <Text>Restauring session...</Text>;

  const getUserInfo = async () => {
    try {
      const res = await instance.get('/account/profile');
      setUserData(res.data)
    } catch (err) {
      console.error(err);
      alert('Non Authorized');
    }
  };
  const getUserList = async () => {
    try {
      const res = await instance.get('/users/');
      alert(JSON.stringify(res.data))
    } catch (err) {
      console.error(err);
      alert('Non Authorized');
    }
  };

  return (
    <View style={{ padding: 40 }}>
      <Button title="Login" onPress={() => login('admin@admin.com', 'admin123', getUserInfo)} />
      <View style={{ height: 10 }} />
      <Button title="Get Users List" onPress={getUserList} />
      <View style={{ height: 10 }} />
      <Button title="Logout" onPress={() => logout(setUserData)} />

      <View>
        <Text>Username: {userData['username']}</Text>
        <Text>Email: {userData['email']}</Text>
        <Text>Role: {userData['role']}</Text>
      </View>
    </View>
  );
}
