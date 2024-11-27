import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import Image from "next/image";

const ListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* CAMPAIGN */}
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Aprovecha hasta 50% de descuento en 
            <br /> Experiencias Destacadas
          </h1>
          <button className="rounded-3xl bg-lama text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman2.png" alt="" fill className="object-contain" />
        </div>
      </div>
      <Filter/>
      <h1 className="mt-12 text-xl font-semibold">Las mejores experiencias para vos</h1>
      <ProductList />
    </div>
  );
};

export default ListPage;