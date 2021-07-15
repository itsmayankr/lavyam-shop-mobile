import { combineReducers } from "redux";
import theme from "./themeReducer";
import shops from "./shopReducer";

const rootReducer = combineReducers({ theme: theme, shops });
export default rootReducer;
