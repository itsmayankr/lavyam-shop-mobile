import Axios from "axios";

const axios = Axios.create({
  // baseURL:
  //   process.env.REACT_APP_PRODUCTION_BASE_URL ||
  // ``,
  baseURL: `https://marton.lavyam.com/apis/v1`,
});

// axios.interceptors.request.use(function (config) {
//   // const token = localStorage.getItem("token");
//   config.headers.authorization = "token" ? `${"asdsad"}` : "";
//   return config;
// });

// axios.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     // const ms = error.message.split(" ")[5];
//     // document.body.classList.remove("loading-indicator");
//     // if (ms === "403") {
//     //   localStorage.removeItem("token");
//     // }
//     return Promise.reject(error);
//   }
// );

export default axios;
