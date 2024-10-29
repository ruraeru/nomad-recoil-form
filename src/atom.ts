import { atom, selector } from "recoil";

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export interface ICountry {
  id: number;
  text: string;
  category: "wishlist" | "visited" | "favorite";
}

interface ICountryState {
  [key: string]: ICountry[];
}

export const countryListState = atom<ICountryState>({
  key: "countryListState",
  default: {
    wishlist: [],
    visited: [],
    favorite: [],
  },
  effects: [localStorageEffect("countryList")],
});

export const countrySelector = selector({
  key: "countrySelector",
  get: ({ get }) => {
    const countrys = get(countryListState);

    return {
      wishlist: countrys["wishlist"],
      visited: countrys["visited"],
      favorite: countrys["favorite"],
    };
  },
});
