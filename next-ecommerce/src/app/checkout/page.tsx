"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const router = useRouter();

  useEffect(() => {
    // Cargar el SDK de MercadoPago
    const script = document.createElement('script');
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.type = "text/javascript";
    document.body.appendChild(script);

    script.onload = async () => {
      // Inicializar MercadoPago
      // @ts-ignore
      const mp = new MercadoPago("TU_PUBLIC_KEY", {
        locale: 'es-AR'
      });

      try {
        // Crear la preferencia en el backend
        const response = await fetch('/api/create-preference', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: items.map(item => ({
              title: item.name,
              unit_price: item.finalPrice,
              quantity: item.quantity,
            })),
          }),
        });

        const preference = await response.json();

        // Crear el botón de pago
        mp.bricks().create("wallet", "wallet_container", {
          initialization: {
            preferenceId: preference.id,
          },
        });
      } catch (error) {
        console.error("Error al crear la preferencia:", error);
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl">Tu carrito está vacío</h1>
        <button 
          onClick={() => router.push('/list')}
          className="bg-lama text-white px-4 py-2 rounded-3xl"
        >
          Ver experiencias
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8">
      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Resumen del pedido */}
        <div className="lg:w-1/2">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl mb-4">Resumen del pedido</h2>
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.quantity} x ${item.price}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.customizations.people} personas
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.customizations.date} - {item.customizations.time}
                  </p>
                </div>
                <p className="font-medium">${item.finalPrice}</p>
              </div>
            ))}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de MercadoPago */}
        <div className="lg:w-1/2">
          <div id="wallet_container"></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 