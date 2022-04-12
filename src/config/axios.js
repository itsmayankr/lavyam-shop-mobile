import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

const axios = Axios.create({
  // baseURL:
  //   process.env.REACT_APP_PRODUCTION_BASE_URL ||
  // ``,
  // baseURL: `https://marton.lavyam.com/apis/v1`,
  baseURL: `https://ce6e-2405-201-6826-4845-79eb-1dc-c7a5-1582.ngrok.io/apis/v1`,
});


export default axios;
