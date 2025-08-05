import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { AuthContext } from "../components/AuthContext";
import instance from "../api";
import UserInfo from "../components/UserInfo";
import UserList from "../components/UserList";

export default function HomeScreen() {
  const [users, setUsers] = useState([]);
  const { logout, userData, setUserData, lastFetched, setLastFetched } =
    useContext(AuthContext);

  useEffect(() => {
    const updateUserInfoIfNeeded = async () => {
      // Si no hay datos, o han pasado más de X minutos
      if (!userData || Date.now() - lastFetched > 5 * 60 * 1000) {
        const res = await instance.get("/account/profile");
        setUserData(res.data);
        setLastFetched(Date.now());
      }
    };

    updateUserInfoIfNeeded();
  }, []);

  useEffect(() => {
    const tryGetUserInfo = async () => {
      try {
        const res = await instance.get("/account/profile");
        setUserData(res.data);
      } catch (err) {
        console.error("Error al obtener perfil:", err);
        alert("Non Authorized");
      }
    };

    tryGetUserInfo();
  }, []);

  const tryGetUsersList = async () => {
    try {
      const res = await instance.get("/users/");
      console.log("Data fetched");
      setUsers(res.data);
    } catch (err) {
      console.warn("Error al obtener usuarios:", err);
      alert("Non Authorized");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Welcome Home!</Text>

      {userData ? (
        <UserInfo user={userData} />
      ) : (
        <Text>Cargando perfil...</Text>
      )}

      <View style={{ marginVertical: 10 }}>
        <Button title="Get Users List" onPress={tryGetUsersList} />
      </View>

      {users ? <UserList users={users} /> : <Text>Cargando lista...</Text>}

      <View style={{ marginTop: 20 }}>
        <Button title="Logout" onPress={logout} />
      </View>
    </ScrollView>
  );
}
