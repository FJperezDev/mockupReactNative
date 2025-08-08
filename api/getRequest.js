import { instance } from './api'

export const getLoggedUserInfo = async () => {
    try{
        const res = await instance.get("/account/profile");
        return res.data;
    }catch(err){
        console.error("Error fetching logged user data: ", err);
        return null;
    }
}

export const getUsersList = async () => {
    try {
        const res = await instance.get("/users/");
        return res.data;
    } catch (err) {
        console.error("Error fetching users list: ", err);
        return null;
    }
}
