export enum FilterTypes {
  SET_FILTER = "@filters/SET_FILTER",
  CLEAR_FILTER = "@filters/CLEAR_FILTER",
}

export interface Filter {
  page?: number;
  limit?: number;
  name?: string;
  colors?: string;
  matchAllColors?: boolean;
  cmc?: string;
  cmcCondition?: string;
  rarity?: string;
  type?: string;
  subType?: string;
  superType?: string;
  sets?: string;
}

export interface FilterState {
  readonly data: Filter;
}
