import * as types from "../constant";
import axios from "../../config/axios";
// import { toast } from "react-toastify";

const getProducts = (page, search, shopId) => (dispatch) => {
  let p = page ? `page=${page}` : `page=${1}`;
  let s = search ? `&search=${search}` : "";
  let shop = shopId ? `&shopId=${shopId}` : "";
  axios
    .get(`/products?${p}${s}${shop}`)
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
