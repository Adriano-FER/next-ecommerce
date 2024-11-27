"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const CategoryList = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:4444/products');
        const data = await res.json();
        
        if (!data.products || !Array.isArray(data.products)) {
          throw new Error('Invalid data format');
        }

        const uniqueCategories = Array.from(
          new Set(data.products.map(product => product.category))
        ).map(category => ({
          id: category,
          name: category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' '),
          slug: category.toLowerCase().replace(/ /g, '-'),
          imageUrl: data.products.find(p => p.category === category)?.urls[0]
        }));

        setCategories(uniqueCategories);
        setError(null);
      } catch (error: any) {
        console.error("Error fetching categories:", error);
        setError(error.message);
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return (
      <div className="mt-8 text-center text-red-500">
        Error cargando categorías. Por favor, intente más tarde.
      </div>
    );
  }

  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        <Link
          href="/list"
          className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
        >
          <div className="relative bg-slate-100 w-full h-96">
            <Image
              src="https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg"
              alt="Todas las experiencias"
              fill
              sizes="20vw"
              className="object-cover"
            />
          </div>
          <h1 className="mt-8 font-light text-xl tracking-wide">
            Todas las experiencias
          </h1>
        </Link>

        {categories.map((category) => (
          <Link
            href={`/list?cat=${category.slug}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
            key={category.id}
          >
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
            <h1 className="mt-8 font-light text-xl tracking-wide">
              {category.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
