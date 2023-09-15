'use client'
import { useState } from 'react';
import axios from 'axios';
import Loading from "@/components/loader";
import { formatDistance } from 'date-fns';

const TweetPost = ({ userName, createdAt, tweetID, text, likes, userId }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedText(text);
  };

  const handleSaveClick = async (id) => {
    try {
      setLoading(true)
      console.log(id, token, editedText);
      const response = await axios.put(`https://ivykids.onrender.com/api/tweet/updateTweet/${id}` ,{
        description: editedText 
      },{
          headers: {
              authorization: token,
            },
      })
      console.log('Successfully Liked');
      console.log(response.data);
      setLoading(false)
    } catch (error) {
        console.error('Error while editing:', error);
        setLoading(false)
    }
    setIsEditing(false);
  };

  let token;
  let userID;
  if (typeof window !== 'undefined') {
    token = JSON.parse(localStorage.getItem('authorization')); 
    userID = JSON.parse(localStorage.getItem('userId'))
  }
  


  const handleLikeClick = async (id) => {

    try {
      setLoading(true)
      console.log(id, token);
      const response = await axios.put(`https://ivykids.onrender.com/api/tweet/like/${id}` ,{},{
          headers: {
              authorization: token,
            },
      })
      window.location.reload();
      console.log('Successfully Liked');
      console.log(response.data);
      setLoading(false)
    } catch (error) {
        console.error('Error while Liking:', error);
        setLoading(false)
    }
  };

  const handleDeleteClick = async (id) => {
    
    try {
      setLoading(true)
      console.log(id, token);
      await axios.delete(`https://ivykids.onrender.com/api/tweet/${id}` ,{
          headers: {
              authorization: token,
            },
      })
      window.location.reload();
      console.log('Successfully Deleted');
      setLoading(false)
    } catch (error) {
        console.error('Error sending description:', error);
        setLoading(false)
    }


    console.log("Delete Button working");
  }
  const date = formatDistance(new Date(createdAt), new Date());

  return (
    <div className="bg-white p-4 rounded shadow-md text-black">
      <div className="flex items-center mb-2">
        <div>
          <p className="font-semibold text-xl text-blue-800">@{userName}</p>
          <p className="text-blue-500 text-md"> tweeted {date} ago</p>
        </div>
      </div>
      <p className="text-2xl w-[400px] mt-6">{editedText}</p>
      <div className='flex flex-row mt-4 justify-start gap-2 items-center'>
        <button
          onClick={()=>handleLikeClick(tweetID)}
          className="bg-[#2B8CD6] text-white px-4 py-1"
        >
          
          Likes <span className='-translate-x-2'>{likes}</span>
        </button>
        {userId===userID && (
          <div className='flex flex-row gap-2'>
            <button
              onClick={()=>handleDeleteClick(tweetID)}
              className="bg-[#2B8CD6] text-white px-4 py-1"
            >
              Delete
            </button> 

            {isEditing?(
              <div className='flex flex-row gap-2'>
                <textarea
                  type="text"
                  value={editedText}
                  onChange={handleInputChange}
                  className='h-8'
                />
                <button onClick={handleCancelClick} className=" text-black px-4 py-1">Cancel</button>
                <button onClick={()=>handleSaveClick(tweetID)} className=" text-black px-4 py-1">Save</button>
              </div>
            ): (
              <div>
                <button
                  onClick={handleEditClick}
                  className="bg-[#2B8CD6] text-white px-4 py-1 "
                >
                  Edit
                </button>
              </div>
            )}



          </div>
        )}
      </div>
    </div>
  );
};

export default TweetPost;