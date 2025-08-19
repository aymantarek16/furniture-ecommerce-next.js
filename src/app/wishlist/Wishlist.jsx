"use client";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "@/lib/wishlistSlice";
import { useState, useMemo, useCallback, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Row component with memo to prevent unnecessary re-renders
const WishlistRow = memo(({ item, onRemove }) => (
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
    <td className="px-6 py-4 font-semibold text-sm md:text-sm">{item.text}</td>
    <td className="px-6 py-4 text-sm md:text-sm">${item.price}</td>
    <td className="px-6 py-4 text-sm md:text-sm">{item.category}</td>
    <td
      className={`px-6 py-4 font-semibold ${
        item.inStock
          ? "text-green-500 text-xs md:text-sm"
          : "text-red-500 text-xs md:text-sm"
      }`}
    >
      {item.inStock ? "In Stock" : "Out of Stock"}
    </td>
    <td className="px-6 py-4 text-center">
      <button
        onClick={() => onRemove(item.id)}
        className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Remove handler wrapped in useCallback
  const handleRemove = useCallback(
    (id) => {
      dispatch(removeFromWishlist(id));
    },
    [dispatch]
  );

  // Memoize paginated items
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return wishlistItems.slice(startIndex, startIndex + itemsPerPage);
  }, [wishlistItems, currentPage]);

  // Memoize totalPages
  const totalPages = useMemo(
    () => Math.ceil(wishlistItems.length / itemsPerPage),
    [wishlistItems.length]
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <h2 className="text-xl md:text-2xl font-bold bg-[#8d1841] text-white text-center mb-6 p-4 rounded-2xl w-full md:w-2/4 mx-auto shadow-md">
        Your Favourite Products
      </h2>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="favTable border border-zinc-400 min-h-[400px] min-w-full border-collapse rounded-2xl shadow-lg backdrop-blur-md">
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
                  <WishlistRow key={item.id} item={item} onRemove={handleRemove} />
                ))}
              </motion.tbody>
            </AnimatePresence>
          </table>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`cursor-pointer px-4 py-2 rounded-lg shadow-md transition ${
                  currentPage === index + 1
                    ? "bg-[#8d1841] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
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
