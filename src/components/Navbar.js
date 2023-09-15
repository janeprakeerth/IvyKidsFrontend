'use client'
import Link from 'next/link'
import React from 'react'
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className='flex flex-row justify-center gap-4 text-2xl'>
      <div className='flex flex-col gap-6'>

        <Link href="/home" className='hover:bg-blue-200 py-2 mt-28 px-2'><div>Home</div></Link>
        <Link href="/profile" className='hover:bg-blue-200 py-2 '><div className='ml-2'>My Profile</div></Link>
        </div>

      
    </div>
  )
}

export default Navbar
