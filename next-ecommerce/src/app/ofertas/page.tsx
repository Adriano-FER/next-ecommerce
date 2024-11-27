"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  urls: string[];
  duration: string;
  maxPeople: number;
}

const OffersPage = () => {
  const [offers, setOffers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:4444/products');
        const data = await res.json();
        
        // Filtrar productos con precio menor a 100
        const discountedProducts = data.products.filter(
          (product: Product) => product.price < 100
        );
        
        setOffers(discountedProducts);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Cargando ofertas...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8">
      <div className="bg-lama/10 rounded-lg p-8 mb-8">
        <h1 className="text-4xl font-semibold mb-4">Ofertas Especiales</h1>
        <p className="text-gray-600">
          Experiencias increíbles por menos de $100
        </p>
      </div>

      {offers.length === 0 ? (
        <div className="text-center py-8">
          No hay ofertas disponibles en este momento.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((product) => (
            <Link 
              href={`/product/${product.id}`}
              key={product.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={product.urls[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-medium">{product.name}</h2>
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-semibold text-lama">
                      ${product.price}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {product.duration}
                  </span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    Hasta {product.maxPeople} personas
                  </span>
                </div>
                <button className="w-full bg-lama text-white py-2 rounded-3xl hover:bg-lama/90 transition-colors">
                  Ver detalles
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default OffersPage; 