import * as types from "../constant";
import axios from "../../config/axios";
// import { toast } from "react-toastify";

const getPincodes = (page, search) => (dispatch) => {
  let p = page ? `page=${page}` : `page=${1}`;
  let s = search ? `&search=${search}` : "";
  console.log({ s });
  axios
    .get(`/pincode?${p}${s}`)
    .then((response) => {
      // console.log("Action Pincode",response.data);
      dispatch({
        type: types.FETCH_PINCODES,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getMarkets = (page, search, market, search_all) => (dispatch) => {
  console.log("Invoked Get Market")
  let p = page ? `page=${page}` : `page=${1}`;
  let s = search ? `&search=${search}` : "";
  let m = market ? `&market=${market}` : "";
  let searchState = search_all ? `&search_all=${search_all}` : ""

  axios
    .get(`/market?${p}${s}${m}${searchState}`)
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

const getAdCount = (type) => (dispatch) => {

  let p = `page=${1}`;

  axios
    .get(`/advertisement?${p}&type=${type}`)
    .then((response) => {
      dispatch({
        type: types.GET_AD_USER,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });

};

export { getPincodes, getMarkets, getCategorys, getAdCount };
