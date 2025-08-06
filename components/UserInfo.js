import { TouchableOpacity, Text, StyleSheet, } from 'react-native';

const UserInfo = ({ user }) => {
  return (
    <TouchableOpacity key={user.id} style={styles.container} activeOpacity={0.6} accessibilityHint='user page'>
      <Text style={styles.name}>👤 {user.username}</Text>
      <Text style={styles.email}>📧 {user.email}</Text>
      <Text style={styles.role}>🔐 Rol: {user.role}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#62ff91ff',
    borderRadius: 20,
    margin: 10,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    padding:2,
  },
  email: {
    fontSize: 14,
    color: '#333',
    padding:2,
  },
  role: {
    fontSize: 14,
    color: '#666',
    padding:2,
  },
});

export default UserInfo;
