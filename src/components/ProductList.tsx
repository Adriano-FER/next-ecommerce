"use client"
import Link from "next/link";
import Image from "next/image";
import { useProducts } from '../context/apiContext'; // Import the hook

const ProductList = () => {
  const { products } = useProducts(); // Access products from context

  // Check if products are still loading
  if (!products || products.length === 0) {
    return <div>Loading products...</div>; // Placeholder while loading
  }

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {products.map((product) => (
        <Link
          href={`/product/${product.id}`} // Link to product details page
          key={product.id} // Ensure each item has a unique key
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        >
          <div className="relative w-full h-80">
            <Image
              src={product.url} // Use the product image URL
              alt={product.name} // Accessible alt text
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 transition-opacity ease duration-500 hover:opacity-80"
            />
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">${product.price}</span>
          </div>
          <div className="text-sm text-gray-500">{product.description}</div>
          <button className="rounded-2xl ring-1 ring-lama text-lama py-2 px-4 text-xs hover:bg-lama hover:text-white">
            Add to Cart
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
