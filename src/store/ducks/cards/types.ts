export enum CardsTypes {
  LOAD_REQUEST = "@cards/LOAD_REQUEST",
  LOAD_SUCCESS = "@cards/LOAD_SUCCESS",
  LOAD_FAIL = "@cards/LOAD_FAIL",
  LOAD_MORE_REQUEST = "@cards/LOAD_MORE_REQUEST",
  LOAD_MORE_SUCCESS = "@cards/LOAD_MORE_SUCCESS",
  LOAD_MORE_FAIL = "@cards/LOAD_MORE_FAIL",
}

export interface Card {
  id: number;
  name: string;
  color_identity: string[];
  mana_cost: string;
  images: {
    image_uri: string;
  }[];
  rarity: string;
  type_line: string;
  sets: {
    id: number;
    set_icon: string;
  }[];
}

export interface CardList {
  data: Card[];
  page: number;
  limit?: number;
  totalCount?: number;
  hasMore?: boolean;
}

export interface CardsState {
  readonly cards: CardList;
  readonly loading: boolean;
  readonly error: boolean;
}
