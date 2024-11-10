import CategoryList from "@/components/CategoryList"
import ProductList from "@/components/ProductList"
import Slider from "@/components/Slider"
import Chatbot from "@/components/Chatbot"

const HomePage = () => {
  return (
    <div className=''>
      <Slider/>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64">
        <h1 className="text-2x-l">Excursiones destacadas</h1>
        <ProductList/>
      </div>
      <div className="mt-24">
        <h1 className="text-2x-l px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 mb-12">Categories</h1>
        <CategoryList/>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64">
        <h1 className="text-2x-l">Nuevas experiencias</h1>
        <ProductList/>
      </div>
    </div>
  )
}

export default HomePage