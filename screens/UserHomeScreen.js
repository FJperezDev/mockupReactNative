import React, { useContext, useEffect } from "react";
import { View, Text, Button, ScrollView, RefreshControl } from "react-native";
import { AuthContext, UserInfo, UserList } from "../components";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function UserHomeScreen( {navigation} ) {
  const { logout, logoutAll, loggedUser, onRefresh, refreshing, users } = useContext(AuthContext);

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
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

          {loggedUser ? (
            <UserInfo userData={loggedUser} />
          ) : (
            <Text>Cargando perfil...</Text>
          )}

          {users ? <UserList users={users} /> : <Text>Cargando lista...</Text>}
          <Button title="Checkout" onPress={() => navigation.navigate('Checkout')} />
          <ScrollView
            horizontal={true}
            scrollEnabled={false}
          >
            <View style={{ margin: 20,  }}>
              <Button title="Logout" onPress={logout} />
            </View>
            <View style={{ marginTop: 20 }}>
              <Button title="LogoutAll" onPress={logoutAll} />
            </View>

          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>  
        
  );
}
