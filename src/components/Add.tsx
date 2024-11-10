"use client";

import { useState } from "react";

const Add = () => {
    const [quantity, setQuantity] = useState(1);

    //TEMPORARY
    const stock = 4;

    const handleQuantity = (type: "i" | "d") => {
        if(type === "d" && quantity > 1){
            setQuantity((prev) => prev -1);
        }
        if(type === "i" && quantity > stock){
            setQuantity((prev) => prev -1);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h4 className="font-medium">Cantidad</h4>
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w32">
                        <button className="cursor-pointer text-xl"></button>
                        {quantity}
                        <button className="cursor-pointer text-xl"></button>
                    </div>
                    <div className="text-xs">
                        Only <span className="text-orange-500">4 items </span> left!
                        <br />{"Don't"} miss it
                    </div>
                </div>
            </div> 
            <button className="w-36 text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-lama hover:text">
                Agregar al carrito
            </button>
        </div>
    );
}

export default Add