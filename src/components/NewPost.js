'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Createpost = () => {

    const [description, setDescription] = useState('');
    let token;
    if (typeof window !== 'undefined') {
        token = JSON.parse(localStorage.getItem('authorization')); 
      }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('https://ivykids.onrender.com/api/tweet', { 
                description 
            } ,{
                headers: {
                    authorization: token,
                  },
            })
            window.location.reload();
            console.log('Description sent successfully');
        } catch (error) {
            console.error('Error sending description:', error);
        }

    };

  return (
    <div className=' bg-white p-4 rounded shadow-md text-black text-lg'>
        <form onSubmit={handleSubmit}>
            <input 
                className='w-[400px] bg-white p-2 rounded shadow-md text-black text-lg ' 
                placeholder='Tweet!!'         
                style={{
                    resize: 'none', 
                    userSelect: 'none',
                    outline: 'none'
                }}
                onChange={(e) => setDescription(e.target.value)}
                >
                
            </input>
            <div className='h-[1px] w-full bg-[#2F3336]'></div>
            <div className='flex justify-end w-full'>
                <button type="submit" className="bg-[#2B8CD6] text-white px-4 py-1 mt-6">
                    Post
                </button>
            </div>
        </form>
    </div>
  )
}

export default Createpost