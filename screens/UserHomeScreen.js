import React, { useContext, useEffect } from "react";
import { View, Text, Button, ScrollView, RefreshControl } from "react-native";
import { AuthContext, UserInfo, UserList } from "../components";

export default function UserHomeScreen() {
  const { logout, logoutAll, userData, onRefresh, refreshing, users } = useContext(AuthContext);

  useEffect(() => {
    onRefresh();
  }, []);

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
