import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const UserList = ({ users }) => {
  if (!users || users.length === 0) {
    return <Text style={styles.empty}>No hay usuarios disponibles.</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.list}>
        {users.map((user) => (
          <View key={user.id} style={styles.card}>
            <Text style={styles.name}>👤 {user.username}</Text>
            <Text style={styles.email}>📧 {user.email}</Text>
            <Text style={styles.role}>🔐 Rol: {user.role}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: Dimensions.get('window').height * 0.5,
    marginHorizontal: 16,
  },
  list: {
    paddingVertical: 8,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#333',
  },
  role: {
    fontSize: 14,
    color: '#666',
  },
  empty: {
    padding: 16,
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
  },
});

export default UserList;
