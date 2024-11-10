"use client"
import { useProducts } from "@/context/apiContext";
import ProductImages from "@/components/ProductImages";
import CustomizeProducts from "@/components/CustomizeProducts";
import Add from "@/components/Add";

const SinglePage = ({ params }) => {
  const { products } = useProducts();
  const { id } = params;  // Get the dynamic route ID

  // Find the specific product by ID
  const product = products.find((item) => item.id === parseInt(id));

  // Show loading or error if product is not yet available
  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMAGE */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages images={product.url} />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p>{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">${product.oldPrice}</h3>
          <h2 className="font-medium text-2xl">${product.price}</h2>
        </div>
        <div className="h-[2px] bg-gray-100" />
        <CustomizeProducts options={product.options} />
        <Add product={product} />
      </div>
    </div>
  );
};

export default SinglePage;