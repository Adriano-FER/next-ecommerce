"use client";

import Image from "next/image";
import { useState } from "react";
import { useProducts } from '../context/apiContext'; // Import the hook

const ProductImages = () => {
  const { products } = useProducts(); // Get products from context
  const [index, setIndex] = useState(0); // Start with the first product

  // If products are still loading or unavailable, show a loading message
  if (!products || products.length === 0) {
    return <div>Loading products...</div>; // Placeholder while loading
  }

  return (
    <div className="">
      <div className="h-[500px] relative">
        <Image
          src={products[index].url} // Use the URL from the products
          alt="Product image"
          fill
          sizes="50vw"
          className="object-cover"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {products.map((product, i) => (
          <div
            className="w-1/4 h-32 relative cursor-pointer"
            key={product.id} // Use product id
            onClick={() => setIndex(i)} // Change index on click
          >
            <Image
              src={product.url} // Use the URL from the products
              alt="Product thumbnail"
              fill
              sizes="30vw"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
