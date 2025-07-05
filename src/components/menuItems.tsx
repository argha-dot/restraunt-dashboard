import { FoodMenuItem } from "@/types";

const COLORS = ["bg-green-500", "bg-yellow-500", "bg-red-500"];

const MenuItem = ({
  item,
  addItem,
  removeItem,
  isSelected = false,
  onEditQuantity,
}: {
  item: FoodMenuItem;
  addItem: (item: FoodMenuItem, variantName: string) => void;
  removeItem: (item: FoodMenuItem, variantName: string) => void;
  onEditQuantity: (
    item: FoodMenuItem,
    quantity: number,
    variantName: string
  ) => void;
  isSelected?: boolean;
}) => {
  return (
    <div
      className={`flex flex-col relative w-full bg-white shadow-md rounded-xl ${
        isSelected ? "outline-2 outline-black" : ""
      }`}
    >
      <div className="w-full min-h-40 max-h-40">
        <img
          src={item.img}
          alt={item.name}
          className="rounded-lg rounded-b-none mb-1 w-full h-full object-cover"
        />
      </div>
      <div className="px-4 py-1 flex items-center justify-between h-full">
        <h2 className="text-lg">{item.name}</h2>
        <p className="text-black font-sm font-semibold">
          <span>₹</span>&nbsp;
          {/* {item.options[item.variantName].price * item.quantity} */}
        </p>
      </div>
      {Object.values(item.options).map((option, index) =>
        option.quantity > 0 ? (
          <div
            key={option.variantName}
            className={`w-full ${COLORS[index]} last:rounded-b-xl flex items-center justify-around py-2`}
          >
            <button
              className="bg-white w-6 h-6 flex justify-center items-center rounded-full"
              onClick={() => {
                if (option.quantity > 1) {
                  onEditQuantity(item, option.quantity - 1, option.variantName);
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
                onEditQuantity(item, option.quantity + 1, option.variantName)
              }
            >
              +
            </button>
          </div>
        ) : (
          <button
            key={option.variantName}
            className={`w-full ${COLORS[index]} last:rounded-b-xl flex items-center justify-center py-2`}
            onClick={() => addItem(item, option.variantName)}
          >
            Add {option.variantName}
          </button>
        )
      )}
    </div>
  );
};

export default MenuItem;
