"use client";
import { removeFromCart, updateQuantity } from "@/lib/cartSlice";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
const FaTrash = dynamic(() => import("react-icons/fa").then(m => m.FaTrash));
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
  const [inputCode, setinputCode] = useState("");
  const toastMessage = useSelector((state) => state.cart.toast);

  useEffect(() => {
    if (toastMessage) {
      toast.error(toastMessage);
    }
  }, [toastMessage]);

  // set up dispatch and get cart items from redux store
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // update the quantity of cart item (minimum 1)
const handleUpdateQuantity = useCallback((id, delta) => {
  dispatch(updateQuantity({ id, delta }));
}, [dispatch]);


  // remove item from the cart by id
const removeItem = useCallback((id) => {
  dispatch(removeFromCart(id));
}, [dispatch]);

  // calculate the total price of all cart items
  const subtotal = useMemo(
  () => cartItems.reduce((num, item) => num + item.price * item.quantity, 0),
  [cartItems]
);

  return (
    <div className="w-full max-w-7xl mx-auto my-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Shopping Cart
      </h1>
      <p className={cartItems.length === 0 ? "hidden" : "mb-4 text-center"}>
        <span className="text-[#ce498c] font-semibold"></span>{" "}
        Items in the Cart  : <span className="text-green-500">
          {cartItems.length}
        </span>
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* left section: cart items */}
        <div className="w-full lg:w-2/3 md:mx-auto">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-700">Your cart is empty</p>
                <Link
                  href="/products"
                  className="mt-4 inline-block bg-[#a91f64] text-white px-4 py-2 rounded-md hover:bg-[#8a1b54] text-sm sm:text-base"
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              <>
                {/* header */}
                <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 text-gray-700 mb-4 border-b border-gray-300 pb-2 font-bold">
                  <div>Product</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div>Total Price</div>
                </div>

                {/* items */}
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[2fr_1fr_1fr] md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center py-4 border-b border-gray-400 last:border-b-0"
                  >
                    {/* product image and name */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.text}
                          fill
                          style={{ objectFit: "cover" }}
                          className="rounded"
                        />
                      </div>
                      {/* product title */}
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium text-sm sm:text-base">
                          {item.text}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {item.category}
                        </p>
                      </div>
                    </div>

                    {/* product price */}
                    <div className="text-gray-700 text-sm sm:text-base">{}
                      ${item.price.toFixed(2)}
                    </div>


                    {/* product quantity */}
                    <div className="flex items-center w-full sm:w-auto">
                      <button
                        className="w-6 h-6 pb-1 flex items-center justify-center bg-transparent border-2 border-gray-400 rounded-lg hover:bg-gray-300 text-black text-2xl cursor-pointer"
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="w-7 sm:w-8 text-center text-[#8d2257]  text-sm sm:text-base mx-2">
                        {item.quantity}
                      </span>
                      <button
                        className="w-6 h-6 pb-1 flex items-center justify-center bg-transparent border-2 border-gray-400 rounded-lg hover:bg-gray-300 text-black text-2xl cursor-pointer"
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>

                    {/* total price */}
                    <div className="text-gray-700 text-sm sm:text-base font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>

                    {/* remove icon */}
                    <div className="self-center sm:self-auto">
                      <FaTrash
                        className="text-gray-500 hover:text-red-500 cursor-pointer text-xs sm:text-sm"
                        onClick={() => removeItem(item.id)}
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* right section: coupon & total price */}
        {cartItems.length > 0 && (
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Cart Summary
              </h3>
              {/* coupon code */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    value={inputCode}
                    onChange={(e) => setinputCode(e.target.value)}
                    type="text"
                    placeholder="Enter code"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a91f64]"
                  />
                  <button
                    className="bg-[#a91f64] text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-[#8a1b54] text-sm sm:text-base cursor-pointer"
                    onClick={() => {
                      if (inputCode === "") {
                        toast.error("Please enter a code");
                      } else {
                        setinputCode("");
                      }
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* cart total price */}
              <div className="border-t pt-4">
                <div className="flex justify-between text-gray-700 mb-2 text-sm sm:text-base">
                  <span>Total:</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <Link
                  href="/checkout"
                  className="w-full mt-4 bg-[#a91f64] text-white px-4 py-2 rounded-md hover:bg-[#8a1b54] disabled:bg-gray-300 disabled:cursor-not-allowed text-sm sm:text-base cursor-pointer text-center block"
                >
                  Proceed to checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
