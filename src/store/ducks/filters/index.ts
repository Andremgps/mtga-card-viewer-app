import { Reducer } from "redux";
import { FilterState, FilterTypes } from "./types";

const INITIAL_STATE: FilterState = {
  data: {},
};

const reducer: Reducer<FilterState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FilterTypes.SET_FILTER:
      return { ...state, data: action.payload.data };
    case FilterTypes.CLEAR_FILTER:
      return { ...state, data: {} };
    default:
      return state;
  }
};

export default reducer;
