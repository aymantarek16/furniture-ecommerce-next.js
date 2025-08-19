"use client";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "@/lib/wishlistSlice";
import { addToCart } from "@/lib/cartSlice";
import { useState, useMemo, useCallback, memo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const WishlistRow = memo(({ item, onRemove, onAddToCart }) => (
  <tr
    key={item.id}
    className="hover:bg-zinc-800/40 transition duration-200 border-b border-gray-700 last:border-0"
  >
    <td className="px-6 py-4">
      <Image
        src={item.image}
        alt={item.text}
        width={80}
        height={80}
        className="rounded-lg object-cover"
        loading="lazy"
        placeholder="blur"
        blurDataURL="/blur-placeholder.png"
      />
    </td>
    <td className="px-6 py-4 font-semibold text-sm md:text-base">{item.text}</td>
    <td className="px-6 py-4 text-sm md:text-base">${item.price}</td>
    <td className="px-6 py-4 text-sm md:text-base">{item.category}</td>
    <td
      className={`px-6 py-4 font-semibold ${
        item.inStock
          ? "text-green-500 text-xs md:text-base"
          : "text-red-500 text-xs md:text-base"
      }`}
    >
      {item.inStock ? "In Stock" : "Out of Stock"}
    </td>
    <td className="px-6 py-4 text-center grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-5 relative top-2">
      <button
        disabled={!item.inStock}
        onClick={() => onAddToCart(item)}
        className="
          w-full
          px-4 py-1 
          md:px-2 md:py-1.5              
          text-sm   
          bg-green-600 text-white
          rounded-md
          hover:bg-green-500
          disabled:bg-gray-500 disabled:cursor-not-allowed
          cursor-pointer
        "
      >
        Add to cart
      </button>

      <button
        onClick={() => onRemove(item.id)}
        className="bg-red-500 cursor-pointer text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition"
      >
        Remove
      </button>
    </td>
  </tr>
));
WishlistRow.displayName = "WishlistRow";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleRemove = useCallback(
    (id) => {
      dispatch(removeFromWishlist(id));
    },
    [dispatch]
  );

  const addToCartHandler = useCallback(
    (item) => {
      const cartItem = {
        ...item,
        quantity: 1,
      };
      dispatch(addToCart(cartItem));
    },
    [dispatch]
  );

  const totalPages = useMemo(
    () => Math.ceil(wishlistItems.length / itemsPerPage),
    [wishlistItems.length]
  );

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return wishlistItems.slice(startIndex, startIndex + itemsPerPage);
  }, [wishlistItems, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <h2 className="text-xl md:text-2xl font-bold bg-[#8d1841] text-white text-center mb-6 p-4 rounded-2xl w-full md:w-2/4 mx-auto shadow-md">
        Your Favourite Products : {" "}
        <span className="text-green-500">{wishlistItems.length}</span>
      </h2>
      {wishlistItems.length === 0 ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-center py-9 rounded-2xl w-1/2 mx-auto bg-gradient-to-br from-[#1a1919] via-[#2b0b19e8] to-[#781a49]">
            <p className="text-white">Your wish list is empty 😔</p>
            <Link
              href="/products"
              className="mt-4 inline-block bg-[#65173f] text-white px-4 py-2 rounded-md hover:bg-[#8a1b54] text-sm sm:text-base"
            >
              Shop Now
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="favTable border border-zinc-400 min-h-[100px] min-w-full border-collapse rounded-2xl shadow-lg backdrop-blur-md">
            <thead className="hidden md:table-header-group">
              <tr className="bg-[#8d1841] text-white text-left">
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <AnimatePresence mode="wait">
              <motion.tbody
                key={currentPage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {paginatedItems.map((item) => (
                  <WishlistRow
                    key={item.id}
                    item={item}
                    onRemove={handleRemove}
                    onAddToCart={addToCartHandler}
                  />
                ))}
              </motion.tbody>
            </AnimatePresence>
          </table>

          <div className="flex justify-center items-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`cursor-pointer px-4 py-2 rounded-lg shadow-md transition ${
                  currentPage === index + 1
                    ? "bg-[#8d1841] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } ${totalPages <= 1 ? "hidden" : ""}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
