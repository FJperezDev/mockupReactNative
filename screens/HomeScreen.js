import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../components/AuthContext";
import instance from "../api"
import UserInfo from "../components/UserInfo";
import UserList from "../components/UserList";

export default function HomeScreen() {
  const [users, setUsers] = useState([]);
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

  const tryGetUsersList = async () => {
    try {
      const res = await instance.get('/users/');
      setUsers(res.data);
    } catch (err) {
      console.warn('Error al obtener usuarios:', err);
      alert('Non Authorized');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Welcome Home!</Text>
      <UserInfo username={userData['username']} email={userData['email']} role={userData['role']} />
      <Button title="Get Users List" onPress={tryGetUsersList} />
      <View padding={5}/>
      <UserList users={users}/>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
