import Link from "next/link";
import Menu from "./Menu";
import NavIcons from "./NavIcons";
import SearchBar from "./SearchBar";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative">
      <div className="h-full  block md:hidden flex items-center justify-between">
        {/*celulares*/}
        <Link href="/">
          <div className="text-2xl tracking-wide">Turibue</div>
        </Link>
        <Menu />
      </div>
      {/* Pantallas grandes*/}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/*IZQUIERDA*/}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href="/" className="flex item-center gap-3">
            <Image src="/logo.png" alt="" width={24} height={24} />
            <div className="text-2xl tracking-wide">Turibue</div>
          </Link>
          <div className="hidden xl:flex gap-4">
            <Link rel="stylesheet" href="" className="">
              Homepage
            </Link>
            <Link rel="stylesheet" href="" className="">
              Tienda
            </Link>
            <Link rel="stylesheet" href="" className="">
              Ofertas
            </Link>
            <Link rel="stylesheet" href="" className="">
              Nosotros
            </Link>
            <Link rel="stylesheet" href="" className="">
              Contacto
            </Link>
          </div>
        </div>
        {/*DERECHA*/}
        <div className="W-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
