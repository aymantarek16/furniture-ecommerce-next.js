import { addToCart, removeFromCart } from "@/lib/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/lib/wishlistSlice";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaCheck, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({ id, image, text, price, category, inStock }) => {
  // set up redux dispatch and select cart items to check if the product is  in the cart
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === id);

  // handle cart icon click to toggle add/remove product from cart and
  // show a toast notification
  const handleToggleCart = () => {
    if (isInCart) {
      dispatch(removeFromCart(id));
      toast.success("Removed from cart", {
        duration: 2000,
        position: "top-center",
        icon: <FaCheck className="text-white" />,
        style: toastStyle("#ef4444", "#fff"),
      });
    } else {
      dispatch(
        addToCart({
          id,
          image,
          text,
          price: numericPrice,
          quantity: 1,
          category,
          inStock,
        })
      );
      toast.success("Successfully Added To Cart", {
        duration: 2000,
        position: "top-center",
        icon: <FaCheck className="text-white" />,
        style: toastStyle("#22c55e", "#fff"),
      });
    }
  };

  // convert price to a number
  const numericPrice =
    typeof price === "string"
      ? parseFloat(price.replace("$", "")) || 0
      : Number(price) || 0;

  const wishlistItems = useSelector((state) => state.wishlist.items); // get wishlist items from redux store
  const isInWishlist = wishlistItems.some((item) => item.id === id); // check if the item is already added

  // handle heart icon to toggle add/remove items from wishlist
  // show a toast notification
  const handleToggleHeart = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(id)),
        toast.success("Removed from wishlist", {
          duration: 2000,
          position: "top-center",
          icon: <FaCheck className="text-white" />,
          style: toastStyle("#ef4444", "#fff"),
        });
    } else {
      dispatch(
        addToWishlist({
          id,
          image,
          text,
          price: numericPrice,
          category,
          inStock,
        })
      ),
        toast.success("Successfully Added To Wishlist", {
          duration: 2000,
          position: "top-center",
          icon: <FaCheck className="text-white" />,
          style: toastStyle("#22c55e", "#fff"),
        });
    }
  };

  const toastStyle = (bg, color) => ({
    background: bg,
    color: color,
    fontSize: "16px",
    fontWeight: 600,
    padding: "12px 20px",
    borderRadius: "6px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "opacity .3s ease",
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-visible flex flex-col h-[280px]">
      <div className="relative w-full h-[200px]">
        <Image src={image} fill className="object-cover w-full" alt={text} />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 px-4 py-3 m-0">
        {text}
      </h3>
      <div className="flex items-center justify-between px-4 pt-0 pb-4 m-0">
        <span className="text-xl font-bold text-gray-700">
          ${numericPrice.toFixed(2)}
        </span>
        <div className="flex space-x-3">
          <FaHeart
            className={`cursor-pointer ${
              isInWishlist ? "text-red-500" : "text-gray-600 hover:text-red-500"
            }`}
            onClick={handleToggleHeart}
          />
          <FaShoppingCart
            className={`cursor-pointer ${
              isInCart ? "text-green-500" : "text-gray-600 hover:text-green-500"
            }`}
            onClick={handleToggleCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
