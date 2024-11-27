import { Suspense } from 'react';
import CategoryList from "@/components/CategoryList"
import ProductList from "@/components/ProductList"
import Slider from "@/components/Slider"
import Chatbot from "@/components/Chatbot"

export default function HomePage() {
  return (
    <div>
      <Slider/>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl font-medium mb-8">Excursiones destacadas</h1>
        <ProductList type="featured"/>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl font-medium px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">Categorías</h1>
        <CategoryList/>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-24">
        <h1 className="text-2xl font-medium mb-8">Nuevas experiencias</h1>
        <ProductList type="new"/>
      </div>
      <Chatbot />
    </div>
  )
}