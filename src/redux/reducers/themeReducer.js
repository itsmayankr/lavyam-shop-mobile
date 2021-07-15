import * as types from "../constant";
import customTheme from "../../themes/theme";

const theme = (state = customTheme, action) => {
  switch (action.type) {
    case types.GET_THEME: {
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default theme;
