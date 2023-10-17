import React from "react";
import { useState } from "react";
import memesData from "./Meme.json";

const MemMemes = () => {
  const [memes, setMemes] = useState(memesData.memes);

  const handleReaction = (memeId, reactionType) => {
    const updatedMemes = [...memes];
    const memeIndex = updatedMemes.findIndex((meme) => meme.id === memeId);
    
    if (memeIndex !== -1) {
      updatedMemes[memeIndex].reactions[reactionType]++;
      setMemes(updatedMemes);
    }
  };

  const handleComment = (memeId, commentText) => {
    const updatedMemes = [...memes];
    const memeIndex = updatedMemes.findIndex((meme) => meme.id === memeId);

    if (memeIndex !== -1) {
      updatedMemes[memeIndex].comments.push({
        text: commentText,
        user: "User123", // You can replace this with the user's name.
      });
      setMemes(updatedMemes);
    }
  };

  return (
    <div className="meme-page">
      {memes.map((meme) => (
        <div key={meme.id} className="meme-post bg-white p-4 shadow-md rounded-lg">
          <img src={meme.image} alt={meme.title} className="w-full rounded-lg" />
          <div className="reactions mt-2 flex space-x-4">
            <button onClick={() => handleReaction(meme.id, "like")} className="text-blue-500 hover:text-blue-700">
              Like ({meme.reactions.like})
            </button>
            <button onClick={() => handleReaction(meme.id, "love")} className="text-red-500 hover:text-red-700">
              Love ({meme.reactions.love})
            </button>
          </div>
          <div className="comments mt-4">
            {meme.comments.map((comment, index) => (
              <div key={index} className="comment bg-gray-100 p-2 rounded">
                <p>{comment.text}</p>
                <span className="text-gray-500">{comment.user}</span>
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add a comment..."
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleComment(meme.id, e.target.value);
                e.target.value = "";
              }
            }}
            className="mt-4 p-2 border rounded w-full focus:outline-none focus:border-blue-500"
          />
        </div>
      ))}
    </div>
  );
};

export default MemMemes;
