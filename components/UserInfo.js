import { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
} from "react-native";
import { getUserInfo, updateUserInfo } from "../api";
import { Picker } from "@react-native-picker/picker";

const UserInfo = ({ userData, canEdit, onRefresh }) => {
  if (!userData) {
    return <Text>Cargando...</Text>;
  }
  const [editView, setEditView] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(userData?.role || "user");

  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
      setEmail(userData.email);
      setRole(userData.role);
    }
  }, [userData]);

  const toggleEditView = () => {
    if (!editView) {
      setUsername(userData.username);
      setEmail(userData.email);
    }
    setEditView((prev) => !prev);
  };

  const handleEdit = async () => {
    const data = await getUserInfo(userData.id);
    data.username = username;
    data.email = email;
    data.role = role;
    const updatedUser = await updateUserInfo(data);
    if (onRefresh) onRefresh();
    setEditView(false);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={!canEdit || 0.6}
        accessibilityHint="user page"
        onPress={toggleEditView}
      >
        <Text style={styles.name}>👤 {userData.username}</Text>
        <Text style={styles.email}>📧 {userData.email}</Text>
        <Text style={styles.role}>🔐 Rol: {userData.role}</Text>
      </TouchableOpacity>

      {canEdit && editView && (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="User" value="user" />
            <Picker.Item label="Admin" value="admin" />
            <Picker.Item label="Superadmin" value="superadmin" />
          </Picker>

          <Button title="Guardar cambios" onPress={handleEdit} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 10 },
  container: {
    padding: 10,
    backgroundColor: "#62ff91ff",
    borderRadius: 20,
    margin: 10,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 2,
  },
  email: {
    fontSize: 14,
    color: "#333",
    padding: 2,
  },
  role: {
    fontSize: 14,
    color: "#666",
    padding: 2,
  },
});

export default UserInfo;
