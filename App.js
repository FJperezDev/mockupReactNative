// import React, { useEffect, useState } from "react";
// import { View, Button, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { login, logout, restoreSession, users } from "./auth";
// import instance from "./api";
// import * as ImagePicker from "expo-image-picker";

import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './components/AuthContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

// const App = () => {
//   const [sessionRestored, setSessionRestored] = useState(false);
//   const [userData, setUserData] = useState({});

//   useEffect(() => {
//     const tryRestore = async () => {
//       await restoreSession();
//       setSessionRestored(true);
//     };
//     tryRestore();
//   }, []);

//   if (!sessionRestored) return <Text>Restauring session...</Text>;

//   let openImagePicker = async () => {
//     let permissionResult =
//       await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (permissionResult.granted === false) {
//       alert("Permission to access camera is required");
//       return;
//     }
//   };

//   const getUserInfo = async () => {
//     try {
//       const res = await instance.get("/account/profile");
//       res['auth'] = true
//       setUserData(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Non Authorized");
//     }
//   };
//   const getUserList = async () => {
//     try {
//       const res = await instance.get("/users/");
//       alert(JSON.stringify(res.data));
//     } catch (err) {
//       console.error(err);
//       alert("Non Authorized");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.button}
//         title="Login"
//         onPress={() => login("admin@admin.com", "admin123", getUserInfo)}
//       >
//         <Text>Login</Text>
//       </TouchableOpacity>
//       <View style={{ height: 10 }} />
//       <TouchableOpacity style={styles.button} onPress={getUserList}>
//         <Text>Get Users List</Text>
//       </TouchableOpacity>
//       <View style={{ height: 10 }} />
//       <ImagePickerExample />
//       <View style={{ height: 10 }} />
//       <TouchableOpacity
//         style={styles.button}
//         title="Logout"
//         onPress={() => logout(setUserData)}
//       >
//         <Text>Logout</Text>
//       </TouchableOpacity>

//       <View>
//         <Text>Username: {userData["username"]}</Text>
//         <Text>Email: {userData["email"]}</Text>
//         <Text>Role: {userData["role"]}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container:{
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#cececeff",
//   },
//   button: {
//     backgroundColor: "#c8ff80ff",
//   },
// });

export default App;
