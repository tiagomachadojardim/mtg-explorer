export interface Card {
  id: string;
  name: string;
  manaCost?: string;
  cmc?: number;
  type?: string;
  types?: string[];
  supertypes?: string[];
  subtypes?: string[];
  rarity?: string;
  set?: string;
  setName?: string;
  text?: string;
  flavor?: string;
  artist?: string;
  number?: string;
  power?: string;
  toughness?: string;
  layout?: string;
  multiverseid?: string;
  imageUrl?: string;
  colors?: string[];
  colorIdentity?: string[];
}

export interface Set {
  code: string;
  name: string;
  type?: string;
  releaseDate?: string;
  block?: string;
  onlineOnly?: boolean;
}

export interface ListParams {
  page?: number;
  pageSize?: number;
  name?: string;
  set?: string;
  type?: string;
  colors?: string; // comma separated per API docs
}
