import * as types from "../constant";
const initialState = {
  shops: {
    totalCount: 0,
  },
  sellersAll: [],
  seller: {},
  isFirstOpen: false,
  isLoading: false,
};

const shops = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SHOPS:
      return { ...state, shops: action.payload, isLoading: false };
    case types.GET_SELLER_BY_SHOP_ID:
      return { ...state, seller: action.payload };
    case types.GET_ALL_SELLER:
      return { ...state, sellersAll: action.payload };

    default:
      return { ...state };
  }
};

export default shops;
