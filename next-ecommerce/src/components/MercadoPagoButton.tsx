"use client";

import { useEffect, useState } from 'react';

interface MercadoPagoButtonProps {
  items: any[];
}

const MercadoPagoButton = ({ items }: MercadoPagoButtonProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMercadoPago = async () => {
      try {
        setIsLoading(true);
        const script = document.createElement('script');
        script.src = "https://sdk.mercadopago.com/js/v2";
        script.type = "text/javascript";
        document.body.appendChild(script);

        script.onload = async () => {
          // @ts-ignore
          const mp = new MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
            locale: 'es-AR'
          });

          try {
            const response = await fetch('/api/mercadopago', {
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

            if (!response.ok) {
              throw new Error('Error al crear la preferencia');
            }

            const preference = await response.json();
            
            if (!preference.id) {
              throw new Error('No se recibió el ID de preferencia');
            }

            mp.bricks().create("wallet", "wallet_container", {
              initialization: {
                preferenceId: preference.id,
              },
              callbacks: {
                onError: (error: any) => {
                  console.error('Error en el brick de MP:', error);
                  setError('Error al cargar el botón de pago');
                },
              },
            });
          } catch (error: any) {
            console.error("Error al crear la preferencia:", error);
            setError(error.message);
          }
        };

        script.onerror = () => {
          setError('Error al cargar el SDK de MercadoPago');
        };
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (items.length > 0) {
      loadMercadoPago();
    }

    return () => {
      const script = document.querySelector('script[src="https://sdk.mercadopago.com/js/v2"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [items]);

  if (isLoading) {
    return <div className="text-center py-4">Cargando opciones de pago...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Método de pago</h2>
      <div id="wallet_container"></div>
    </div>
  );
};

export default MercadoPagoButton; 