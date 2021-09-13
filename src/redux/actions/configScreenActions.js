import * as types from "../constant";
import axios from "../../config/axios";
// import { toast } from "react-toastify";

const getPincodes = (page, search) => (dispatch) => {
  let p = page ? `page=${page}` : `page=${1}`;
  let s = search ? `&search=${search}` : "";

  axios
    .get(`/pincode?${p}${s}`)
    .then((response) => {
      dispatch({
        type: types.FETCH_PINCODES,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getMarkets = (page, search) => (dispatch) => {
  let p = page ? `page=${page}` : `page=${1}`;
  let s = search ? `&search=${search}` : "";

  axios
    .get(`/market?${p}${s}`)
    .then((response) => {
      dispatch({
        type: types.FETCH_MARKETS,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getCategorys = (page, search) => (dispatch) => {
  let p = page ? `page=${page}` : `page=${1}`;
  let s = search ? `&search=${search}` : "";

  axios
    .get(`/category?${p}${s}`)
    .then((response) => {
      dispatch({
        type: types.FETCH_CATEGORYS,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getPincodes, getMarkets, getCategorys };
