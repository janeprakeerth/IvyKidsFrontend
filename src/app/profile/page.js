import React from 'react'
import Navbar from '@/components/Navbar'
import Wtf from '@/components/Right_Panel'
import MyPosts from '@/components/MyProfile'

const Profile = () => {
  return (
    <div className='bg-white text-black flex justify-center min-h-screen'>
    <div className='flex flex-row gap-24 mt-10'>
        <div><Navbar /></div>
        <div><MyPosts /></div>
        <div><Wtf /></div>
    </div>
</div>
  )
}

export default Profile