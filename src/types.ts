import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface FoodItem {
  id: string;
  name: string;
  img: string;
  options: {
    [key: string]: {
      variantName: string;
      price: number;
    };
  };
}

export type FoodMenuItem = FoodItem & {
  options: {
    [key: string]: {
      quantity: number;
      variantName: string;
      price: number;
    };
  };
};
