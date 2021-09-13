import * as types from "../constant";
const initialState = {
  orders: [],
};

const orders = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ORDERS:
      return { ...state, orders: action.payload, isLoading: false };

    default:
      return { ...state };
  }
};

export default orders;
