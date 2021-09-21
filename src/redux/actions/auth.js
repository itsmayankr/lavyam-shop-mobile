import axios from "../../config/axios";
import jwt from "jwt-decode";
// import { toast } from "react-
import { AsyncStorage } from "react-native";

const loginUser = (loginData, navigate) => async (dispatch) => {
  //   dispatch({ type: types.LOGIN_LOADER, payload: true });
  try {
    const res = await axios.post("/user-login", loginData);
    try {
      let tokenData = jwt(res.data.token);
      await AsyncStorage.setItem("token", res.data.token);
      let pincode = await axios.get(`/pincode/${tokenData.pincode}`);
      await AsyncStorage.setItem("userpincode", JSON.stringify(pincode.data));
    } catch (error) {
      console.log(error);
    }
    // dispatch({ type: types.LOGIN_LOADER, payload: false });
    navigate.navigate("ConfigScreen", { replace: true });
  } catch (e) {
    console.log(e);
    // dispatch({ type: types.LOGIN_LOADER, payload: false });
    if (e.response) {
      return (
        // message.error(e.response.data)
        console.log(e.response.data.error)
        // e.response.data.error && toast.success(`${e.response.data.error}`)
      );
    }
  }
};

const register = async (userData, navigation) => {
  try {
    await axios.post("/user-register", userData);
    // message.success("Register Successfully");
    navigation.navigate("Login");
    // if (err.response) return message.error(err.response.data);
  } catch (err) {
    console.log(err);
  }
};

const logout = (navigate) => () => {
  localStorage.clear();

  navigate && navigate("/login");
  // dispatch({ type: "RESET" });
};

export { loginUser, register, logout };