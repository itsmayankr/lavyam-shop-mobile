import * as types from "../constant";
import axios from "../../config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { toast } from "react-toastify";

const local = async (pinCodeName, marketName, category) => {
  console.log({ pinCodeName, marketName, category }, "asdasdasdasd Shop Action local")
  pinCodeName && await AsyncStorage.setItem("pincode", pinCodeName);
  marketName && await AsyncStorage.setItem("market", marketName);
  category && await AsyncStorage.setItem("category", category);
  return
}

const getShops = (page, pinCodeName, marketName, category, refRBSheet) => (dispatch) => {
  console.log("Invoked Get Shop Action");
  console.log({ pinCodeName, marketName, category }, "First")
  let p = page ? `page=${page}` : `page=${1}`;
  let pin = pinCodeName ? `&pinCodeName=${pinCodeName}` : "";
  let market = marketName ? `&marketName=${marketName}` : "";
  let categoryval = category ? `&category=${category}` : "";
  axios
    .get(`/shopsearch?${p}${pin}${market}${categoryval}`)
    .then(async (response) => {
      dispatch({
        type: types.FETCH_SHOPS,
        payload: response.data,
      });
      await local(pinCodeName, marketName, category)
      refRBSheet && refRBSheet.current.close()
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
      // console.log(response.data, "seller:::::::::::::");
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
