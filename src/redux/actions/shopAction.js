import * as types from "../constant";
import axios from "../../config/axios";
// import { toast } from "react-toastify";

const getShops = (page, pinCodeName, marketName, category) => (dispatch) => {
  let p = page ? `page=${page}` : `page=${1}`;
  let pin = pinCodeName ? `&pinCodeName=${pinCodeName}` : "";
  let market = marketName ? `&marketName=${marketName}` : "";
  let categoryval = category ? `&category=${category}` : "";
  axios
    .get(`/shopsearch?${p}${pin}${market}${categoryval}`)
    .then((response) => {
      dispatch({
        type: types.FETCH_SHOPS,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// const createShop = (formData) => (dispatch) => {
//   axios
//     .post("/admin/shop", formData)
//     .then((response) => {
//       if (response) {
//         dispatch(getShops());
//         toast.success("Shop created");
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const deleteShop = (id) => (dispatch) => {
//   axios
//     .delete(`/shop/${id}`)
//     .then((_) => {
//       dispatch(getShops());
//       toast.error("Shop Deleted");
//     })
//     .catch((err) => {
//       // message.error(err.message);
//       console.log(err);
//     });
// };

// const updateShop = (data, id) => (dispatch) => {
//   axios
//     .put(`/shop/${id}`, data)
//     .then((_) => {
//       // dispatch(getCustomerById(id));
//       dispatch(getShops());
//     })
//     .catch((err) => {
//       // message.error(err.message);
//       console.log(err);
//     });
// };

const getSellerByShopId = (id) => (dispatch) => {
  axios
    .get(`/seller/${id}`)
    .then((response) => {
      dispatch({
        type: types.GET_SELLER_BY_SHOP_ID,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const getAllSeller = () => (dispatch) => {
  axios
    .get(`/all-sellers`)
    .then((response) => {
      console.log(response.data, "seller:::::::::::::");
      dispatch({
        type: types.GET_ALL_SELLER,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getShops, getSellerByShopId, getAllSeller };
