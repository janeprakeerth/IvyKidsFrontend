'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from "@/components/loader";
import { useRouter } from "next/navigation";
const Wtf = () => {
  const router = useRouter();
  const [responseData, setResponseData] = useState();
  const [loading, setLoading] = useState(false);
  let token;
  if (typeof window !== 'undefined') {
    token = JSON.parse(localStorage.getItem('authorization')); 
  }

  useEffect(() => {
    setLoading(true)
    axios.get('https://ivykids.onrender.com/api/user/allUsers', {
      headers: {
        authorization: token,
      },
    })
      .then((response) => {
        setResponseData(response.data.users);
        setLoading(false);
        console.log(response.data.users);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
    }, []);

    const handleFollowButton = async (id) => {
      try {
        console.log(id, token);
        const response = await axios.put(`https://ivykids.onrender.com/api/user/follow/${id}` ,{},{
            headers: {
                authorization: token,
              },
        })
        console.log(response.data);
        window.location.reload();
        console.log('Successfully followed');
      } catch (error) {
          console.error('Error while Following:', error);
      }
    }
    const handleClick = () => {

      localStorage.removeItem("authorization");
      router.push('/login');
    };

    const handleUnFollowButton = async (id) => {
      try {
        setLoading(true);
        console.log(id, token);
        const response = await axios.put(`https://ivykids.onrender.com/api/user/unfollow/${id}` ,{},{
            headers: {
                authorization: token,
              },
        })
        console.log(response.data);
        window.location.reload();
        console.log('Successfully followed');
        setLoading(false);
      } catch (error) {
          console.error('Error while Following:', error);
          setLoading(false);
      }
    }

  return (
    <div className='flex flex-col gap-24'>
      <button onClick={handleClick} className='flex justify-center w-4 bg-[#2B8CD6] text-white px-12 py-2'>Logout</button>


      <div className=' bg-gray-200 rounded-2xl p-4 mt-24'>
        
        <div className='font-semibold text-2xl'>All Users</div>
        <div className=' w-[340px] flex flex-col text-lg mt-10 gap-4'>
          {loading ? <Loading /> : ''}
          {responseData?.map((item)=>(
            item.isFollowing?
            <div key={item._id} className='flex flex-row justify-between items-center'>
              <div className=''>@{item.userName}</div>
              <button className='bg-white text-black px-4 hover:bg-blue-200' onClick={()=>handleUnFollowButton(item._id)}>Following</button>
            </div> :
            <div key={item._id} className='flex flex-row justify-between items-center'>
            <div>@{item.userName}</div>
            <button className='bg-white text-black px-4 hover:bg-blue-200' onClick={()=>handleFollowButton(item._id)}>Follow</button>
          </div>
          ))}


        </div>

      </div>
    </div>
   
  )
}

export default Wtf