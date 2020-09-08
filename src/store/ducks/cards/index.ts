import { Reducer } from "redux";
import { CardsState, CardsTypes } from "./types";

const INITIAL_STATE: CardsState = {
  cards: { data: [], page: 1 },
  error: false,
  loading: false,
};

const reducer: Reducer<CardsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CardsTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case CardsTypes.LOAD_SUCCESS:
      return { ...state, loading: false, error: false, cards: action.payload.data };
    case CardsTypes.LOAD_FAIL:
      return { ...state, loading: false, error: true };
    case CardsTypes.LOAD_MORE_REQUEST:
      return { ...state, loading: true };
    case CardsTypes.LOAD_MORE_SUCCESS:
      const newCardsList = action.payload.data.data;
      const actualCardsList = state.cards.data;
      action.payload.data.data = [...actualCardsList, ...newCardsList];
      return { ...state, loading: false, error: false, cards: action.payload.data };
    case CardsTypes.LOAD_MORE_FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default reducer;
