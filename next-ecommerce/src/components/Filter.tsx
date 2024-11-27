"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:4444/products');
        const data = await res.json();
        
        if (!data.products || !Array.isArray(data.products)) {
          throw new Error('Invalid data format');
        }

        // Extraer categorías únicas de los productos
        const uniqueCategories = Array.from(
          new Set(data.products.map(product => product.category))
        ).map(category => ({
          id: category,
          name: category.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' '),
          slug: category.toLowerCase().replace(/ /g, '-')
        }));

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <select
          name="duration"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option value="">Duración</option>
          <option value="2">2 horas</option>
          <option value="3">3 horas</option>
          <option value="4">4 horas</option>
          <option value="5">5+ horas</option>
        </select>
        
        <input
          type="number"
          name="min"
          placeholder="Precio mínimo"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        
        <input
          type="number"
          name="max"
          placeholder="Precio máximo"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        
        <select
          name="cat"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
          value={searchParams.get('cat') || ''}
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
        
        <select
          name="people"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option value="">Cantidad de personas</option>
          <option value="1-4">1-4 personas</option>
          <option value="5-8">5-8 personas</option>
          <option value="9+">9+ personas</option>
        </select>
      </div>
      
      <div>
        <select
          name="sort"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
          onChange={handleFilterChange}
        >
          <option value="">Ordenar por</option>
          <option value="asc">Precio (menor a mayor)</option>
          <option value="desc">Precio (mayor a menor)</option>
          <option value="popular">Más populares</option>
          <option value="new">Más nuevos</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;