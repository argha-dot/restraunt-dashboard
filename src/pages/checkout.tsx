import Layout from "@/components/home/layout";
import { FoodMenuItem, NextPageWithLayout } from "@/types";
import Nav from "@/components/nav";
import Link from "next/link";
import { selectedItemsAtom } from "@/states";
import { useAtom } from "jotai";

const Page: NextPageWithLayout = () => {
  const [selectedItems, setSelectedItems] = useAtom(selectedItemsAtom);

  const removeItem = (item: FoodMenuItem, variantName: string) => {
    let updatedOptions = item;
    if (
      selectedItems.some(
        (i) => i.id === item.id && item.options[variantName].quantity === 1
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
  };
  const onEditQuantity = (
    item: FoodMenuItem,
    quantity: number,
    variantName: string
  ) => {
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
  };
  return (
    <main className="min-h-[calc(100vh-56px)]">
      <Link href="/" className="block w-full h-8 pl-4 mt-2">
        {selectedItems.length > 0 ? "Edit Order" : "Select Items"}
      </Link>

      <div className="p-4 mb-40">
        {selectedItems.map((item) =>
          Object.values(item.options)
            .filter((option) => option.quantity > 0)
            .map((option) => (
              <>
                <div
                  className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-2"
                  key={item.id}
                >
                  <div className="flex flex-col items-start gap-4">
                    <span className="text-lg font-semibold">
                      {item.name} ({option.variantName})
                    </span>
                    <span className="text-lg font-semibold">
                      ₹{option.price * option.quantity}({option.price} x&nbsp;
                      {option.quantity})
                    </span>
                  </div>
                  <div className="bg-green-600 rounded-2xl flex items-center justify-around p-2 gap-2">
                    <button
                      className="bg-white w-6 h-6 flex justify-center items-center rounded-full"
                      onClick={() => {
                        if (option.quantity > 1) {
                          onEditQuantity(
                            item,
                            option.quantity - 1,
                            option.variantName
                          );
                        } else {
                          removeItem(item, option.variantName); // Deselect the item if quantity is 1
                        }
                      }}
                    >
                      -
                    </button>
                    {option.quantity}
                    <button
                      className="bg-white w-6 h-6 flex justify-center items-center rounded-full"
                      onClick={() =>
                        onEditQuantity(
                          item,
                          option.quantity + 1,
                          option.variantName
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </>
            ))
        )}
        {selectedItems.length === 0 && (
          <div className="text-center text-gray-500">No items selected.</div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4">
        <div className="flex items-center justify-between mb-4">
          <p>Total: </p>
          <p className="text-lg font-semibold">
            ₹
            {selectedItems.reduce(
              (total, item) =>
                total +
                Object.values(item.options).reduce(
                  (sum, option) => sum + option.price * option.quantity,
                  0
                ),
              0
            )}
          </p>
        </div>

        <button
          className="w-full bg-green-500 py-4 rounded-sm"
          onClick={(e) => {
            e.preventDefault();
            const orders = localStorage.getItem("orders");
            if (orders) {
              localStorage.setItem(
                "orders",
                JSON.stringify([...JSON.parse(orders), ...selectedItems])
              );
            }
            localStorage.setItem("orders", JSON.stringify(selectedItems));
            setSelectedItems([]);
          }}
        >
          CONFIRM ORDER
        </button>
      </div>
    </main>
  );
};

Page.getLayout = (page) => {
  return (
    <Layout>
      <Nav />
      {page}
    </Layout>
  );
};

export default Page;
