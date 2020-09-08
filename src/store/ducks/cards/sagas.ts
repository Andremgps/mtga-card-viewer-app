import { call, put } from "redux-saga/effects";
import api from "../../../services/api";
import { loadSuccess, loadFail, loadMoreSuccess, loadMoreFail } from "./actions";
import { AnyAction } from "redux";

export function* loadListSaga(action: AnyAction) {
  const { options } = action.payload;
  try {
    const response = yield call(api.get, "cards", options);
    yield put(loadSuccess(response.data));
  } catch (error) {
    yield put(loadFail());
  }
}

export function* loadMoreListSaga(action: AnyAction) {
  const { options } = action.payload;
  try {
    const response = yield call(api.get, "cards", options);
    yield put(loadMoreSuccess(response.data));
  } catch (error) {
    yield put(loadMoreFail());
  }
}
