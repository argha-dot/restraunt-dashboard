import { isBrowser } from "@/states";
import { FoodMenuItem } from "@/types";
import { useMemo, useState } from "react";
import { FaTrash } from "react-icons/fa6";

export default function Index() {
  const orders: FoodMenuItem[] = useMemo(() => {
    if (!isBrowser()) return [];
    return JSON.parse(localStorage.getItem("orders") || "[]");
  }, []);

  const orderCost = useMemo(() => {
    return orders.reduce((total, item) => {
      return (
        total +
        Object.values(item.options).reduce(
          (sum, option) => sum + option.price * option.quantity,
          0
        )
      );
    }, 0);
  }, [orders]);

  const [expenditure, setExpenditure] = useState(0);

  return (
    <div className={`p-4`}>
      <h1 className="font-bold text-xl">Admin Dashboard</h1>

      <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div className="border border-black rounded-xl p-4 py-2 w-full">
          <h3>Total Expenditure</h3>
          <p>{expenditure}</p>
        </div>

        <div className="border border-black rounded-xl p-4 py-2">
          <h3>Total Order Cost</h3>
          <p>{orderCost}</p>
        </div>

        <div className="border border-black rounded-xl p-4 py-2">
          <h3>Total Revenue</h3>
          <p>{orderCost - expenditure}</p>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="font-bold text-lg">Add Expenditures: </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const amount = parseFloat(formData.get("amount") as string);
            if (!isNaN(amount)) {
              setExpenditure((prev) => prev + amount);
              e.currentTarget.reset();
            }
          }}
          className="flex items-center gap-2 mt-2"
        >
          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            className="border border-black rounded-lg px-2 py-1 w-full"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={(e) => {
              e.preventDefault();
              setExpenditure(0);
            }}
          >
            <FaTrash />
          </button>
        </form>
      </div>
    </div>
  );
}
