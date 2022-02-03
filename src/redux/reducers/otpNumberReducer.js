import * as types from "../constant";
const initialState = {
 number:""
};

const otpNumber = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_NUMBER:
      return { ...state, number: action.payload };

    default:
      return { ...state };
  }
};

export default otpNumber;
