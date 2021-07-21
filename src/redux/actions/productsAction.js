import * as types from "../constant";
import axios from "axios";
// import { toast } from "react-toastify";

const getProducts = (page, search) => (dispatch) => {
  let p = page ? `page=${page}` : `page=${1}`;
  let s = search ? `&search=${search}` : "";

  axios
    .get(`http://marton-dev.lavyam.com/apis/v1/products?${p}${s}`)
    .then((response) => {
      dispatch({
        type: types.FETCH_PRODUCTS,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getProducts };
