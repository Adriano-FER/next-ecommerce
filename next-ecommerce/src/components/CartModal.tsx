"use client"

import { useProducts } from "../context/ApiContext";
import { useCartStore } from "../hooks/useCartStore";
import { useRouter } from 'next/navigation';

const CartModal: React.FC = () => {
  const router = useRouter();
  const { products } = useProducts();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore((state) => state.total);

  if (items.length === 0) {
    return (
      <div className="absolute top-12 right-0 bg-white p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
        <p>Tu carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="absolute top-12 right-0 bg-white p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 min-w-[300px]">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 mb-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-md"
          />
          <div>
            <h6 className="text-sm font-medium">{item.name}</h6>
            <div className="text-xs text-gray-500">
              {item.quantity} x ${item.price}
            </div>
          </div>
          <button
            className="ml-auto text-xs text-red-500"
            onClick={() => removeItem(item.id)}
          >
            Eliminar
          </button>
        </div>
      ))}
      <div className="flex justify-between font-medium mt-4">
        <span>Total:</span>
        <span>${total}</span>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          className="flex-1 bg-red-500 text-white rounded-3xl py-2 text-sm hover:bg-red-600 transition-colors"
          onClick={clearCart}
        >
          Vaciar carrito
        </button>
        <button
          className="flex-1 bg-lama text-white rounded-3xl py-2 text-sm hover:bg-lama/90 transition-colors"
          onClick={() => router.push('/checkout')}
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
};

export default CartModal;

