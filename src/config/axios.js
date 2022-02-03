import Axios from "axios";

const axios = Axios.create({
  // baseURL:
  //   process.env.REACT_APP_PRODUCTION_BASE_URL ||
  // ``,
  baseURL: `https://marton.lavyam.com/apis/v1`,
  // baseURL: `https://b6a4-103-148-170-92.ngrok.io/apis/v1`,
});


export default axios;
