import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import { notFound } from "next/navigation";

const SinglePage = async ({ params }: { params: { id: string } }) => {
  const response = await fetch(`http://localhost:4444/products`);
  const data = await response.json();
  const product = data.products.find((p: any) => p.id === Number(params.id));

  if (!product) {
    return notFound();
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8">
      <div className="relative flex flex-col lg:flex-row gap-16">
        {/* IMAGES */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
          <ProductImages images={product.urls} />
        </div>

        {/* DETAILS */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl font-medium">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            {product.duration && (
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">Duración:</span>
                <span>{product.duration}</span>
              </div>
            )}
            {product.meetingPoint && (
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">Punto de encuentro:</span>
                <span>{product.meetingPoint}</span>
              </div>
            )}
            {product.maxPeople && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Máximo de personas:</span>
                <span>{product.maxPeople} personas</span>
              </div>
            )}
          </div>

          <div className="h-[2px] bg-gray-100" />
          <div className="flex items-center gap-4">
            <h2 className="font-medium text-3xl">${product.price}</h2>
            <span className="text-gray-500">por persona</span>
          </div>
          <div className="h-[2px] bg-gray-100" />
          
          <CustomizeProducts product={product} />
        </div>
      </div>
    </div>
  );
};

export default SinglePage;