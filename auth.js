import instance from "./api";
import {
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
  deleteRefreshToken
} from "./utils/memory";

export const login = async (email, password) => {
  try {
    const res = await instance.post("/token/", { email, password });
    const { access, refresh } = res.data;

    if (!access || !refresh) throw new Error("Tokens not arrived");

    setAccessToken(access);
    await setRefreshToken(refresh);
    console.log("Login succesful");
  } catch (error) {
    console.warn("Login error:", error.response?.data || error.message);
    throw error;
  }
};

export const logout = async () => {
  console.log("Logout succesful");
  try {
    await instance.post("/logout/");
    await deleteRefreshToken("refresh");
    setAccessToken(null);
  } catch (err) {
    console.warn("Error deleting refresh token:", err.message);
  }
};

export const logoutAll = async () => {
  console.log("Logout from all devices");
  try {
    await instance.post("/logout_all/");
    await deleteRefreshToken("refresh");
    setAccessToken(null);
  } catch (err) {
    console.warn("Error deleting refresh token:", err.message);
  }
};

export const register = async (data) => {
  try {
    const res = await instance.post("/register/", data);
    return res.data;
  } catch (err) {
    console.warn("Register error:", err.response?.data || err.message);
    throw err;
  }
};

export const refreshAccessToken = async () => {
  try {
    
    const refresh = await getRefreshToken();
    if (!refresh) throw new Error("No refresh token saved");
    
    const res = await instance.post("/token/refresh/", { refresh });
    const newAccess = res.data.access;
    if (res.data.refresh) {
      await setRefreshToken(res.data.refresh); 
    }
    if (!newAccess) throw new Error("Access token not received");

    setAccessToken(newAccess);
    return newAccess;
  } catch (err) {
    console.warn(
      "Refreshing access token error:",
      err.response?.data || err.message
    );
    throw err;
  }
};

export const restoreSession = async () => {
  try {
    await refreshAccessToken(); // si falla, se atrapará
    return true;
  } catch (err) {
    console.warn("Couldn't restore session", err);
    return false;
  }
};
