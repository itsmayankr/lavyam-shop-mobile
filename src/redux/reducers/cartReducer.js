import * as types from "../constant";
const initialState = {
  cart: [],
};

const cartScreen = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CART:
      return { ...state, cart: action.payload, isLoading: false };

    default:
      return { ...state };
  }
};

export default cartScreen;
