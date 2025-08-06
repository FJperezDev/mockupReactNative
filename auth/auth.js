import { instance } from "./sessionApi";
import {
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
} from "../utils/memory";

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
