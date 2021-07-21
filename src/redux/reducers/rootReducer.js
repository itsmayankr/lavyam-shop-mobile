import { combineReducers } from "redux";
import theme from "./themeReducer";
import shops from "./shopReducer";
import products from "./productReducer";

const rootReducer = combineReducers({ theme: theme, shops, products });
export default rootReducer;
