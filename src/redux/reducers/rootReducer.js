import { combineReducers } from "redux";
import theme from "./themeReducer";
import shops from "./shopReducer";
import products from "./productReducer";
import configScreen from "./configScreenReducer";
import cartScreen from "./cartReducer";
import orders from "./orderReducer";
import notification from "./notificationReducer";

const rootReducer = combineReducers({
  theme: theme,
  shops,
  products,
  configScreen,
  cartScreen,
  orders,
  notification,
});
export default rootReducer;
