import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import UserInfo from './UserInfo';

const UserList = ({ users }) => {
  if (!users || users.length === 0) {
    return <Text style={styles.empty}>No hay usuarios disponibles.</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.list}>
        {users.map((user) => (
          <UserInfo key={user.id} user={user} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6294ffff",
    borderRadius: 20,
    maxHeight: Dimensions.get('window').height * 0.5,
    marginHorizontal: 16,
    padding:20,
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
  empty: {
    padding: 16,
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
  },
});

export default UserList;
