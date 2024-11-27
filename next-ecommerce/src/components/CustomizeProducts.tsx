"use client";
import { useState } from "react";
import Add from "./Add";


const CustomizeProducts = ({ product }: { product: any }) => {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Elige la cantidad de personas</h4>
      <div className="flex justify-between">
        <Add product={product} />
      </div>
    </div>
  );
}

export default CustomizeProducts;