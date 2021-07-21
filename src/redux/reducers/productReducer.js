import * as types from "../constant";
const initialState = {
  products: [],
  isFirstOpen: false,
  isLoading: false,
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS:
      return { ...state, products: action.payload, isLoading: false };

    default:
      return { ...state };
  }
};

export default products;
