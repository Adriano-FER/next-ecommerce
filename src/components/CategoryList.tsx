"use client"
import Link from "next/link";
import Image from "next/image";
import { useProducts } from '../context/apiContext'; // Import the hook

const CategoryList = () => {
  const { products } = useProducts(); // Access products from context

  // Display a loading message if products are still loading
  if (!products || products.length === 0) {
    return <div>Loading categories...</div>;
  }

  // Extract unique categories from products
  const uniqueCategories = Array.from(
    products.reduce((map, product) => {
      if (!map.has(product.category)) {
        map.set(product.category, product);
      }
      return map;
    }, new Map()).values()
  );

  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {uniqueCategories.map((categoryProduct) => (
          <Link
            href={`list?cat=${categoryProduct.category}`} // Use category name in the link
            key={categoryProduct.category} // Unique key based on category name
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
          >
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src={categoryProduct.url} // Display the first image from products in this category
                alt={categoryProduct.category} // Accessible alt text
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
            <h1 className="mt-8 font-light text-cl tracking-wide">
              {categoryProduct.category} {/* Display category name */}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
