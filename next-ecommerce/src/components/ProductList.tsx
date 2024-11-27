// src/components/ProductList.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';

interface Product {
  id: number;
  urls: string[];
  description: string;
  name: string;
  category: string;
  price: number;
  availableHours: string[];
  maxPeople: number;
  duration: string;
  meetingPoint: string;
  includes: string[];
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:4444/products');
        const data = await res.json();
        setProducts(data.products);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filtrar por búsqueda
    const searchTerm = searchParams.get('search')?.toLowerCase();
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }

    // Filtrar por categoría
    const category = searchParams.get('cat');
    if (category) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filtrar por duración
    const duration = searchParams.get('duration');
    if (duration) {
      filtered = filtered.filter(product => 
        product.duration.includes(duration)
      );
    }

    // Filtrar por precio
    const minPrice = searchParams.get('min');
    const maxPrice = searchParams.get('max');
    if (minPrice) {
      filtered = filtered.filter(product => product.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(product => product.price <= parseInt(maxPrice));
    }

    // Filtrar por cantidad de personas
    const people = searchParams.get('people');
    if (people) {
      if (people.includes('+')) {
        const minPeople = parseInt(people.replace('+', ''));
        filtered = filtered.filter(product => product.maxPeople >= minPeople);
      } else {
        const [minPeople, maxPeople] = people.split('-').map(num => parseInt(num));
        filtered = filtered.filter(product => 
          product.maxPeople >= minPeople && product.maxPeople <= maxPeople
        );
      }
    }

    // Ordenar por precio
    const sort = searchParams.get('sort');
    if (sort) {
      switch (sort) {
        case 'asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
      }
    }

    setFilteredProducts(filtered);
  }, [searchParams, products]);

  if (loading) {
    return <div className="mt-12 text-center">Cargando experiencias...</div>;
  }

  if (error) {
    return <div className="mt-12 text-center text-red-500">Error: {error}</div>;
  }

  if (filteredProducts.length === 0) {
    return <div className="mt-12 text-center">No se encontraron experiencias que coincidan con los filtros seleccionados.</div>;
  }

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {filteredProducts.map((product) => (
        <Link
          href={`/product/${product.id}`}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product.id}
        >
          <div className="relative w-full h-80 group">
            <Image
              src={product.urls[0]}
              alt={product.name}
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 group-hover:opacity-0 transition-opacity duration-500"
            />
            {product.urls[1] && (
              <Image
                src={product.urls[1]}
                alt={product.name}
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md"
              />
            )}
          </div>
          
          <div className="flex justify-between items-start">
            <span className="font-medium flex-1">{product.name}</span>
            <span className="font-semibold text-lama">${product.price}</span>
          </div>
          
          <div className="text-sm text-gray-500 line-clamp-2">
            {product.description}
          </div>
          
          <div className="flex flex-col gap-1 text-xs text-gray-500">
            <div>Duración: {product.duration}</div>
            <div>Punto de encuentro: {product.meetingPoint}</div>
            <div>Máximo: {product.maxPeople} personas</div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {product.includes.slice(0, 2).map((item, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 px-2 py-1 rounded-full"
              >
                {item}
              </span>
            ))}
            {product.includes.length > 2 && (
              <span className="text-xs text-gray-500">
                +{product.includes.length - 2} más
              </span>
            )}
          </div>
          
          <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white transition-colors">
            Agregar al carrito
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
