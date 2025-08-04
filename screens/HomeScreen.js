import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { AuthContext } from "../components/AuthContext";
import instance from "../api";
import UserInfo from "../components/UserInfo";
import UserList from "../components/UserList";

export default function HomeScreen() {
  const [users, setUsers] = useState([]);
  const { logout, userData, setUserData } = useContext(AuthContext);

  useEffect(() => {
    const tryGetUserInfo = async () => {
      try {
        const res = await instance.get("/account/profile");
        setUserData(res.data);
        console.log(res.data)
      } catch (err) {
        console.error("Error al obtener perfil:", err);
        alert("Non Authorized");
      }
    };

    tryGetUserInfo();
  }, []);

  useEffect(() => {
    console.log("UserData actualizado:", userData);
  }, [userData]);

  const tryGetUsersList = async () => {
    try {
      const res = await instance.get("/users/");
      setUsers(res.data);
    } catch (err) {
      console.warn("Error al obtener usuarios:", err);
      alert("Non Authorized");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Welcome Home!</Text>

      {userData?.username ? (
        <UserInfo
          username={userData.username}
          email={userData.email}
          role={userData.role}
        />
      ) : (
        <Text>Cargando perfil...</Text>
      )}

      <View style={{ marginVertical: 10 }}>
        <Button title="Get Users List" onPress={tryGetUsersList} />
      </View>

      {users?(
        <UserList
          users={users}
        />
      ) : (
        <Text>Cargando lista...</Text>
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Logout" onPress={logout} />
      </View>
    </ScrollView>
  );
}
