import { combineReducers } from "redux";
import cards from "./cards";
import filters from "./filters";

export default combineReducers({
  cards,
  filters,
});
