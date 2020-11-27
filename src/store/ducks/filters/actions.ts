import { action } from "typesafe-actions";
import { FilterTypes, Filter } from "./types";

export const setFilter = (data: Filter) => action(FilterTypes.SET_FILTER, { data });
export const clearFilter = () => action(FilterTypes.CLEAR_FILTER);
export const setSearchCount = (data: number) => action(FilterTypes.SET_SEARCH_COUNT, { data });
