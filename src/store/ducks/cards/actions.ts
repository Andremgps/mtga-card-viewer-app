import { action } from "typesafe-actions";
import { CardsTypes, CardList } from "./types";
import { AxiosRequestConfig } from "axios";

export const loadRequest = (options?: AxiosRequestConfig) =>
  action(CardsTypes.LOAD_REQUEST, { options });
export const loadSuccess = (data: CardList) => action(CardsTypes.LOAD_SUCCESS, { data });
export const loadFail = () => action(CardsTypes.LOAD_FAIL);

export const loadMoreRequest = (options?: AxiosRequestConfig) =>
  action(CardsTypes.LOAD_MORE_REQUEST, { options });
export const loadMoreSuccess = (data: CardList) => action(CardsTypes.LOAD_MORE_SUCCESS, { data });
export const loadMoreFail = () => action(CardsTypes.LOAD_MORE_FAIL);
