import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserInfo = ({ username, email, role }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username:</Text>
      <Text style={styles.value}>{username}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{email}</Text>

      <Text style={styles.label}>Role:</Text>
      <Text style={styles.value}>{role}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    margin: 20,
    elevation: 2,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
});

export default UserInfo;
