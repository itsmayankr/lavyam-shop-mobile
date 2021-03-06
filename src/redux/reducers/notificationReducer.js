import * as types from "../constant";
const initialState = {
  notification: [],
};

const notification = (state = initialState, action) => {
  switch (action.type) {
    case types.NOTIFICATION: {
      return {
        ...state,
        notification: [...action.payload],
      };
    }
    default:
      return { ...state };
  }
};

export default notification;
