import { View, Text, StyleSheet } from 'react-native';

const UserInfo = ({ user }) => {
  return (
    <View key={user.id} style={styles.card}>
      <Text style={styles.name}>👤 {user.username}</Text>
      <Text style={styles.email}>📧 {user.email}</Text>
      <Text style={styles.role}>🔐 Rol: {user.role}</Text>
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
