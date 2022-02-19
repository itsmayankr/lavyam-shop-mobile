import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

const axios = Axios.create({
  // baseURL:
  //   process.env.REACT_APP_PRODUCTION_BASE_URL ||
  // ``,
  // baseURL: `https://marton.lavyam.com/apis/v1`,
  baseURL: ` https://d554-103-148-170-92.ngrok.io/apis/v1`,
});


export default axios;
