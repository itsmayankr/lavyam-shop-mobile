import * as types from "../constant";
const initialState = {
  shops: [],
  isFirstOpen: false,
  isLoading: false,
};

const shops = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SHOPS:
      return { ...state, shops: action.payload, isLoading: false };

    default:
      return { ...state };
  }
};

export default shops;
