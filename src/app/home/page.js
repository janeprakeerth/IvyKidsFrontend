import React from 'react'
import Navbar from '@/components/Navbar'
import Posts from '@/components/HomePage'
import Wtf from '@/components/Right_Panel'

const Home = () => {
  return (
    <div className='bg-white  min-h-screen text-black flex justify-center'>
        <div className='flex flex-row gap-24 mt-10'>
            <div><Navbar /></div>
            <div><Posts /></div>
            <div><Wtf /></div>
        </div>
    </div>
  )
}

export default Home