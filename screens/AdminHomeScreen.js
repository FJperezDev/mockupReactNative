import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, ScrollView, RefreshControl } from "react-native";
import { AuthContext } from "../components";
import instance from "../api";
import { UserInfo } from "../components";
import { UserList } from "../components";

export default function AdminHomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState([]);
  const { logout, logoutAll, userData, setUserData } =
    useContext(AuthContext);

  useEffect(() => {
    const tryGetUserInfo = async () => {
      try {
        const res = await instance.get("/account/profile");
        setUserData(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert("Non Authorized");
      }
    };

    tryGetUserInfo();
  }, []);

  const tryGetUsersList = async () => {
    try {
      const res = await instance.get("/users/");
      setUsers(res.data);
    } catch (err) {
      console.warn("Error fetching users:", err);
      alert("Non Authorized");
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);

      // User profile
      const profileRes = await instance.get("/account/profile");
      setUserData(profileRes.data);

      if(profileRes.data['role'] !== 'user'){
        const usersRes = await instance.get("/users/");
        setUsers(usersRes.data);
      }else{
        setUsers([]);
      }

    } catch (err) {
      console.warn("Error refreshing users:", err);
    } finally {
      setRefreshing(false);
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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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
      <View style={{ marginTop: 20 }}>
        <Button title="LogoutAll" onPress={logoutAll} />
      </View>
    </ScrollView>
  );
}
