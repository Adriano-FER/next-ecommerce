"use client"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

const Menu = () => {

    const[open,setOpen] = useState(false)

    return (
      <div className=''>
        <Image src="/menu.png" alt="" width={28} height={28} 
        className="cursor-pointer" onClick={()=>setOpen((prev) => !prev)}/>
      
      {open && (
        <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc{100vh-80px}] flex flex-col item-center justify-center gap-8 text-xl z-10">
        <Link rel="stylesheet" href="" className="" >Homepage</Link>
        <Link rel="stylesheet" href="" className="" >Shop</Link>
        <Link rel="stylesheet" href="" className="" >Deals</Link>
        <Link rel="stylesheet" href="" className="" >About</Link>
        <Link rel="stylesheet" href="" className="" >Contact</Link>
        <Link rel="stylesheet" href="" className="" >Logout</Link>
        <Link rel="stylesheet" href="" className="" >Cart{1}</Link>
        </div>
      )}
      </div>
    )
  }
  
  export default Menu