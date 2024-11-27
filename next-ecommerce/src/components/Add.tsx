"use client";
import { useState } from "react";
import { useCartStore } from "@/hooks/useCartStore";

interface Product {
  id: number;
  name: string;
  price: number;
  urls: string[];
  description: string;
  maxPeople: number;
  availableHours?: string[];
  // ... otros campos
}

const Add = ({ product }: { product: Product }) => {
    const [quantity, setQuantity] = useState(1);
    const addToCart = useCartStore((state) => state.addToCart);

    const handleQuantity = (type: "i" | "d") => {
        if (type === "i") {
            setQuantity((prev) => Math.min(prev + 1, product.maxPeople || 4));
        } else {
            setQuantity((prev) => Math.max(prev - 1, 1));
        }
    };

    const handleAddToCart = () => {
        try {
            const cartItem = {
                id: product.id.toString(),
                name: product.name,
                price: product.price,
                quantity: quantity,
                image: product.urls[0],
                description: product.description,
                customizations: {
                    date: new Date().toISOString().split('T')[0],
                    time: product.availableHours?.[0] || "10:00",
                    people: quantity
                },
                finalPrice: product.price * quantity
            };

            addToCart(cartItem);
            alert('¡Producto agregado al carrito!');
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            alert('Error al agregar al carrito');
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h4 className="font-medium">Cantidad</h4>
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
                        <button 
                            className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
                            onClick={() => handleQuantity("d")}
                            disabled={quantity === 1}
                        >
                            -
                        </button>
                        {quantity}
                        <button 
                            className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
                            onClick={() => handleQuantity("i")}
                            disabled={quantity === (product.maxPeople || 4)}
                        >
                            +
                        </button>
                    </div>
                    <div className="text-xs">
                        Máximo <span className="text-orange-500">{product.maxPeople || 4} personas</span>
                    </div>
                </div>
            </div>
            <button 
                onClick={handleAddToCart}
                className="w-36 text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-lama hover:text-white transition-colors"
            >
                Agregar al carrito
            </button>
        </div>
    );
}

export default Add;