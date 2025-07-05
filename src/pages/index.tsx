import Nav from "@/components/nav";
import Layout from "@/components/home/layout";
import type { FoodMenuItem, NextPageWithLayout } from "@/types";
import { ReactElement } from "react";
import MenuItem from "@/components/menuItems";
import Link from "next/link";
import { useAtom } from "jotai";
import { selectedItemsAtom } from "@/states";

const FOOD_MENU_ITEMS: FoodMenuItem[] = [
  {
    name: "Pineapple Juice",
    id: "20",
    img: "https://picsum.photos/seed/pineapple/300/300",
    options: {
      small: { variantName: "small", price: 100, quantity: 0 },
      medium: { variantName: "medium", price: 120, quantity: 0 },
      large: { variantName: "large", price: 140, quantity: 0 },
    },
  },
  {
    name: "Orange Juice",
    id: "21",
    img: "https://picsum.photos/seed/orange/300/300",
    options: {
      small: { variantName: "small", price: 80, quantity: 0 },
      medium: { variantName: "medium", price: 120, quantity: 0 },
      large: { variantName: "large", price: 160, quantity: 0 },
    },
  },
  {
    name: "Apple Juice",
    id: "22",
    img: "https://picsum.photos/seed/apple/300/300",
    options: {
      small: { variantName: "small", price: 80, quantity: 0 },
      medium: { variantName: "medium", price: 120, quantity: 0 },
      large: { variantName: "large", price: 160, quantity: 0 },
    },
  },
  {
    name: "Grape Juice",
    id: "23",
    img: "https://picsum.photos/seed/grape/300/300",
    options: {
      small: { variantName: "small", price: 90, quantity: 0 },
      medium: { variantName: "medium", price: 130, quantity: 0 },
      large: { variantName: "large", price: 170, quantity: 0 },
    },
  },
  {
    name: "Mango Juice",
    id: "24",
    img: "https://picsum.photos/seed/mango/300/300",
    options: {
      small: { variantName: "small", price: 100, quantity: 0 },
      medium: { variantName: "medium", price: 140, quantity: 0 },
      large: { variantName: "large", price: 180, quantity: 0 },
    },
  },
  {
    name: "Cranberry Juice",
    id: "25",
    img: "https://picsum.photos/seed/cranberry/300/300",
    options: {
      small: { variantName: "small", price: 90, quantity: 0 },
      medium: { variantName: "medium", price: 130, quantity: 0 },
      large: { variantName: "large", price: 170, quantity: 0 },
    },
  },
  {
    name: "Watermelon Juice",
    id: "26",
    img: "https://picsum.photos/seed/watermelon/300/300",
    options: {
      small: { variantName: "small", price: 80, quantity: 0 },
      medium: { variantName: "medium", price: 120, quantity: 0 },
      large: { variantName: "large", price: 160, quantity: 0 },
    },
  },
  {
    name: "Pomegranate Juice",
    id: "27",
    img: "https://picsum.photos/seed/pomegranate/300/300",
    options: {
      small: { variantName: "small", price: 110, quantity: 0 },
      medium: { variantName: "medium", price: 150, quantity: 0 },
      large: { variantName: "large", price: 190, quantity: 0 },
    },
  },
  {
    name: "Strawberry Juice",
    id: "28",
    img: "https://picsum.photos/seed/strawberry/300/300",
    options: {
      small: { variantName: "small", price: 100, quantity: 0 },
      medium: { variantName: "medium", price: 140, quantity: 0 },
      large: { variantName: "large", price: 180, quantity: 0 },
    },
  },
  {
    name: "Lemon Juice",
    id: "29",
    img: "https://picsum.photos/seed/lemon/300/300",
    options: {
      small: { variantName: "small", price: 70, quantity: 0 },
      medium: { variantName: "medium", price: 110, quantity: 0 },
      large: { variantName: "large", price: 150, quantity: 0 },
    },
  },
];

const Page: NextPageWithLayout = () => {
  const [selectedItems, setSelectedItems] = useAtom(selectedItemsAtom);

  return (
    <main className="h-[calc(10h-56px)] mb-40">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {FOOD_MENU_ITEMS.map((item, index) => (
          <MenuItem
            item={
              selectedItems.find(
                (selectedItem) => selectedItem.id === item.id
              ) || item
            }
            key={index}
            addItem={(item, variantName) => {
              if (
                selectedItems.some(
                  (i) =>
                    i.id === item.id && i.options[variantName].quantity === 0
                )
              ) {
                setSelectedItems((prev) =>
                  prev.map((selectedItem) =>
                    selectedItem.id === item.id
                      ? {
                          ...selectedItem,
                          options: {
                            ...selectedItem.options,
                            [variantName]: {
                              variantName,
                              price: item.options[variantName].price,
                              quantity: 1,
                            },
                          },
                        }
                      : selectedItem
                  )
                );
                return;
              }
              setSelectedItems((prev) => [
                ...prev,
                {
                  ...item,
                  options: {
                    ...item.options,
                    [variantName]: {
                      variantName,
                      price: item.options[variantName].price,
                      quantity: 1,
                    },
                  },
                },
              ]);
            }}
            removeItem={(item, variantName) => {
              let updatedOptions = item;
              if (
                selectedItems.some(
                  (i) =>
                    i.id === item.id && item.options[variantName].quantity === 1
                )
              ) {
                console.log("Removing item:", item, variantName);
                setSelectedItems((prev) =>
                  prev.map((selectedItem) => {
                    if (selectedItem.id === item.id) {
                      updatedOptions = {
                        ...updatedOptions,
                        options: {
                          ...selectedItem.options,
                          [variantName]: {
                            ...selectedItem.options[variantName],
                            quantity: 0,
                          },
                        },
                      };
                    }
                    return selectedItem.id === item.id
                      ? {
                          ...item,
                          options: {
                            ...item.options,
                            [variantName]: {
                              ...item.options[variantName],
                              quantity: 0,
                            },
                          },
                        }
                      : selectedItem;
                  })
                );
                if (
                  Object.values(updatedOptions.options).every(
                    (option) => option.quantity === 0
                  )
                ) {
                  setSelectedItems((prev) =>
                    prev.filter((selectedItem) => selectedItem.id !== item.id)
                  );
                }
              }
            }}
            isSelected={selectedItems.some(
              (selectedItem) => selectedItem.id === item.id
            )}
            onEditQuantity={(item, quantity, variantName) => {
              setSelectedItems((prev) =>
                prev.map((selectedItem) =>
                  selectedItem.id === item.id
                    ? {
                        ...selectedItem,
                        options: {
                          ...selectedItem.options,
                          [variantName]: {
                            variantName,
                            price: item.options[variantName].price,
                            quantity,
                          },
                        },
                      }
                    : selectedItem
                )
              );
            }}
          />
        ))}
      </div>

      {selectedItems.length > 0 && (
        <Link
          href="/checkout"
          className="flex items-center justify-center fixed bottom-8 left-[calc(50%-5rem)] bg-green-500 shadow-xl p-4 w-44 rounded-3xl"
        >
          {selectedItems.length} item(s) selected
        </Link>
      )}
    </main>
  );
};

Page.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <Nav />
      {page}
    </Layout>
  );
};

export default Page;
