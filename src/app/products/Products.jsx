"use client";
import ProductCard from "@/components/ProductCard";
import React, { useEffect, useMemo, useState } from "react";
import data from "../../../public/data/data.json";
import { FaTimes } from "react-icons/fa";

const ProductsPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState(() => {
    return localStorage.getItem("sortOrder") || "default";
  });

  const [filters, setFilters] = useState({
    category: [],
    priceRange: [],
    availability: [],
    material: [],
    roomtype: [],
    style: [],
  });

  const handleFilterChange = ([filterType, value]) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((v) => v !== value)
        : [...prev[filterType], value],
    }));
  };

  const priceRanges = {
    // "$0 - $100": (price) => price >= 0 && price < 100,
    "$100 - $300": (price) => price >= 100 && price < 300,
    "$300+": (price) => price >= 300,
  };

  const filteredProducts = useMemo(() => {
    return data.products.filter((product) => {
      return Object.entries(filters).every(([filterType, filterValues]) => {
        if (filterValues.length === 0) return true;

        switch (filterType) {
          case "priceRange":
            return filterValues.some((range) =>
              priceRanges[range](product.price)
            );

          case "availability":
            const status = product.inStock ? "In Stock" : "Out of Stock";
            return filterValues.includes(status);

          case "roomtype":
            return filterValues.includes(product.roomtype);

          case "Style":
            return filterValues.includes(product.Style);

          default:
            return filterValues.includes(product[filterType]);
        }
      });
    });
  }, [data.products, filters]);

  let sortedProducts = filteredProducts;

  useEffect(() => {
    localStorage.setItem("sortOrder", sortOrder);
  }, [sortOrder]);

  switch (sortOrder) {
    case "price-low":
      sortedProducts = [...sortedProducts].sort((a, b) => a.price - b.price);
      break;

    case "price-high":
      sortedProducts = [...sortedProducts].sort((a, b) => b.price - a.price);
      break;

    case "name":
      sortedProducts = [...sortedProducts].sort((a, b) =>
        a.text.localeCompare(b.text)
      );
      break;

    default:
      break;
  }

  const handleSort = (order) => {
    setSortOrder(order);
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto my-12 px-4 max-[774px]:my-8 max-[774px]:px-3">
        {/* page title */}
        <h1 className="ProductsTitle text-3xl md:text-4xl font-bold text-gray-900 mb-6 max-[774px]:text-xl max-[774px]:mb-4 max-[774px]:top-0 max-[774px]:z-10 max-[774px]:pt-4">
          Products
        </h1>

        <div className="flex flex-col md:flex-row gap-6 max-[774px]:gap-4">
          {/* filter section */}
          <div className="filterSection hidden md:block w-full md:w-1/4 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800  mb-4">
              Filter Options
            </h3>
            <div className="filtersLabel space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-700">Category</h4>
                {["Furniture", "Lighting", "Decor"].map((cat) => (
                  <label key={cat} className="block mt-2">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={filters.category.includes(cat)}
                      onChange={() => handleFilterChange(["category", cat])}
                    />{" "}
                    {cat}
                  </label>
                ))}
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700">
                  Price Range
                </h4>
                {["$0 - $100", "$100 - $300", "$300+"].map((range) => (
                  <label key={range} className="block mt-2">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={filters.priceRange.includes(range)}
                      onChange={() => handleFilterChange(["priceRange", range])}
                    />{" "}
                    {range}
                  </label>
                ))}
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700">
                  Availability
                </h4>
                {["In Stock", "Out of Stock"].map((avail) => (
                  <label key={avail} className="block mt-2">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={filters.availability.includes(avail)}
                      onChange={() =>
                        handleFilterChange(["availability", avail])
                      }
                    />{" "}
                    {avail}
                  </label>
                ))}
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700">Material</h4>
                {["Wood", "Metal", "Fabric", "Leather", "Glass"].map((mat) => (
                  <label key={mat} className="block mt-2">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={filters.material.includes(mat)}
                      onChange={() => handleFilterChange(["material", mat])}
                    />{" "}
                    {mat}
                  </label>
                ))}
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700">Room Type</h4>
                {[
                  "Living Room",
                  "Bedroom",
                  "Dining Room",
                  "Office",
                  "Kids Room",
                  "Kitchen",
                ].map((room) => (
                  <label key={room} className="block mt-2">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={filters.roomtype.includes(room)}
                      onChange={() => handleFilterChange(["roomtype", room])}
                    />{" "}
                    {room}
                  </label>
                ))}
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700">Style</h4>
                {[
                  "Modern",
                  "Traditional",
                  "Mid-Century",
                  "Rustic",
                  "Minimalist",
                  "Contemporary",
                ].map((sty) => (
                  <label key={sty} className="block mt-2">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={filters.style.includes(sty)}
                      onChange={() => handleFilterChange(["style", sty])}
                    />{" "}
                    {sty}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* products list title & sort by button */}
          <div className="w-full md:w-3/4">
            <div className="ProductsList flex justify-between items-center mb-6 max-[774px]:mb-4">
              <h2 className="text-xl font-semibold text-gray-800 max-[774px]:text-base">
                Products List ({filteredProducts.length})
              </h2>
              <div className="min-[774px]:flex items-center gap-3">
                <span className="hidden md:block text-gray-700 font-medium text-base">
                  Sort By :
                </span>
                <select
                  value={sortOrder}
                  onChange={(e) => {
                    handleSort(e.target.value);
                  }}
                  className="select hidden md:block border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a91f64] text-xs md:text-sm"
                >
                  <option value="default" className="option">
                    Newest
                  </option>
                  <option value="price-low" className="option">
                    Price: Low to High
                  </option>
                  <option value="price-high" className="option">
                    Price: High to Low
                  </option>
                  <option value="name" className="option">
                    Name: A to Z
                  </option>
                </select>
              </div>
            </div>

            {/* mobile design for sort by & filter buttons */}
            <div className="ProductsList md:hidden sticky top-8 bg-transparent z-10 p-2">
              <div className="flex items-center justify-between gap-2">
                <button
                  className="bg-[#a91f64] text-white px-4 py-2 h-[35px] rounded-md text-sm font-medium flex-1 cursor-pointer"
                  onClick={() => setIsFilterOpen(true)}
                >
                  Filters
                </button>
                <select
                  onChange={(e) => handleSort(e.target.value)}
                  value={sortOrder}
                  className="select border border-gray-300 rounded-md px-2 py-1 h-[35px] text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a91f64] flex-1 cursor-pointer"
                >
                  <option value="default">Newest</option>
                  <option value="price-low">Price: Low</option>
                  <option value="price-high">Price: High</option>
                  <option value="name">Name: A-Z</option>
                </select>
              </div>
            </div>

            {/* mobile filter modal */}
            {isFilterOpen && (
              <div
                className="max-[774px]:fixed max-[774px]:inset-0 max-[774px]:bg-gray-900 max-[774px]:opacity-100 max-[774px]:z-20 max-[774px]:flex max-[774px]:justify-center max-[774px]:items-center max-[774px]:p-4 min-[774px]:hidden"
                onClick={() => setIsFilterOpen(false)}
              >
                <div
                  className="filterSection bg-white rounded-lg p-6 mt-16 w-full max-w-md max-h-[80vh] overflow-y-auto shadow-lg z-30"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 max-[774px]:text-lg">
                      Filters
                    </h3>
                    <button
                      className="text-gray-600 hover:text-[#a91f64] text-lg cursor-pointer"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <div className="space-y-6 max-[774px]:space-y-4">
                    <div>
                      <h4 className="text-base font-medium text-gray-700 max-[774px]:text-sm">
                        Category
                      </h4>
                      {["Furniture", "Lighting"].map((cat) => (
                        <label
                          key={cat}
                          className="flex items-center mt-2 text-base max-[774px]:text-sm"
                        >
                          <input
                            type="checkbox"
                            className="mr-2 h-4 w-4 max-[774px]:h-5"
                            checked={filters.category.includes(cat)}
                            onChange={() =>
                              handleFilterChange(["category", cat])
                            }
                          />{" "}
                          {cat}
                        </label>
                      ))}
                    </div>

                    <div>
                      <h4 className="text-base font-medium text-gray-700 max-[774px]:text-sm">
                        Price Range
                      </h4>
                      {["$0", "$100", "$100", "$300", "$300+"].map(
                        (range, idx) => (
                          <label
                            key={idx}
                            className="flex items-center mt-2 text-base max-[774px]:text-sm"
                          >
                            <input
                              type="checkbox"
                              className="mr-2 h-4 w-4 max-[774px]:h-5"
                              checked={filters.priceRange.includes(range)}
                              onChange={() =>
                                handleFilterChange(["priceRange", range])
                              }
                            />{" "}
                            {range}
                          </label>
                        )
                      )}
                    </div>

                    <div>
                      <h4 className="text-base font-medium text-gray-700 max-[774px]:text-sm">
                        Availability
                      </h4>
                      {["In Stock", "Out of Stock"].map((avail) => (
                        <label
                          key={avail}
                          className="flex items-center mt-2 text-base max-[774px]:text-sm"
                        >
                          <input
                            type="checkbox"
                            className="mr-2 h-4 w-4 max-[774px]:h-5"
                            checked={filters.availability.includes(avail)}
                            onChange={() =>
                              handleFilterChange(["availability", avail])
                            }
                          />{" "}
                          {avail}
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    className="mt-6 w-full bg-[#a91f64] text-white px-4 py-2 rounded-md text-base font-medium hover:bg-[#8b1a5a] transition-colors duration-300 cursor-pointer"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}

            {/* products cards section */}
            <div className="grid grid-cols-1 gap-6 max-[774px]:gap-3 min-[774px]:grid-cols-2 md:grid-cols-3">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="max-[774px]:h-[248px] max-[774px]:[&>div]:h-[240px] max-[774px]:[&div]:h-[240px] max-[774px]:[&div>h3]:text-base max-[774px]:[&div>span]:text-lg max-[774px]:[&div>svg]:text-[77px] max-[774px]:[&div>h3]:py-2 max-[774px]:[&div>span]:max-[774px]:[&div>svg]:text-[77px]"
                >
                  <ProductCard
                    id={product.id}
                    image={product.image}
                    text={product.text}
                    price={product.price}
                    category={product.category}
                    inStock={product.inStock}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
