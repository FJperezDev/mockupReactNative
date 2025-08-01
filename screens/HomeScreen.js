import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../components/AuthContext";
import instance from "../api"
import UserInfo from "../components/UserInfo";

export default function HomeScreen() {
  const [userData, setUserData] = useState({});
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const tryGetUserInfo = async () => {
    try{
        res = await instance.get('/account/profile');
        setUserData(res.data)  
    } catch (err) {
        console.error(err);
        alert('Non Authorized');
    }
    };
    tryGetUserInfo();
        
    }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Welcome Home!</Text>
      <UserInfo username={userData['username']} email={userData['email']} role={userData['role']} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
