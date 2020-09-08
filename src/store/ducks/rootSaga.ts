import { all, takeLatest, takeEvery } from "redux-saga/effects";
import { CardsTypes } from "./cards/types";
import { loadListSaga, loadMoreListSaga } from "./cards/sagas";

export default function* rootSaga() {
  return yield all([
    takeLatest(CardsTypes.LOAD_REQUEST, loadListSaga),
    takeLatest(CardsTypes.LOAD_MORE_REQUEST, loadMoreListSaga),
  ]);
}
