import { atom } from "jotai";
import { FoodMenuItem } from "./types";

export const selectedItemsAtom = atom<FoodMenuItem[]>([]);

export const isBrowser = (): boolean => {
  return typeof window !== "undefined";
};
