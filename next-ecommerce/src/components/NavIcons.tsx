"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CartModal from "./CartModal"; 
import { useCartStore } from '@/hooks/useCartStore';
import { useAuth } from "@/context/AuthContext";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleProfile = () => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex item-center gap-4 xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt="Profile"
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
      />
      {isProfileOpen && isAuthenticated && (
        <div className="absolute p-4 rounded-md top-12 left-0 text-small shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 bg-white">
          <Link href="/user" className="block hover:text-lama">Mi Perfil</Link>
          <div 
            className="mt-2 cursor-pointer hover:text-lama"
            onClick={() => {
              logout();
              setIsProfileOpen(false);
            }}
          >
            Cerrar Sesión
          </div>
        </div>
      )}
      <Image 
        src="/notification.png" 
        alt="Notifications" 
        width={22} 
        height={22} 
        className="cursor-pointer" 
      />
      <div className="relative cursor-pointer">
        <Image
          src="/cart.png"
          alt="Cart"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={() => setIsCartOpen((prev) => !prev)}
        />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center">
          {itemCount}
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};
export default NavIcons;