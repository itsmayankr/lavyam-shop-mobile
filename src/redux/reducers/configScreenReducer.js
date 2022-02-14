import * as types from "../constant";
const initialState = {
  pinCodes: {
    totalCount: 0,
  },
  markets: {
    totalCount: 0,
  },
  categorys: {
    totalCount: 0,
  },
  adsUser: {}
};

const configScreen = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PINCODES:
      return { ...state, pincodes: action.payload, isLoading: false };

    case types.FETCH_MARKETS:
      return { ...state, markets: action.payload, isLoading: false };

    case types.FETCH_CATEGORYS:
      return { ...state, categorys: action.payload, isLoading: false };

    case types.GET_AD_USER: {
      return { ...state, adsUser: action.payload };
    }

    default:
      return { ...state };
  }
};

export default configScreen;
