import React, { useState } from "react";
import memesData from "./Meme.json";
import { UserContext } from "../../../UserContext";
import { useContext } from "react";

const MemMemes = () => {
  const initialMemes = memesData.memes.map((meme) => ({
    ...meme,
    showComments: false,
  }));
  const [memes, setMemes] = useState(initialMemes);
  const [clickedReactions, setClickedReactions] = useState({});
  const { user } = useContext(UserContext);

  const handleReaction = (memeId, reactionType) => {
    if (clickedReactions[`${memeId}-${reactionType}`]) {
      return;
    }

    const updatedMemes = [...memes];
    const memeIndex = updatedMemes.findIndex((meme) => meme.id === memeId);

    if (memeIndex !== -1) {
      updatedMemes[memeIndex].reactions[reactionType]++;
      setMemes(updatedMemes);

      // Mark this reaction as clicked for this meme
      setClickedReactions({
        ...clickedReactions,
        [`${memeId}-${reactionType}`]: true,
      });
    }
  };

  const toggleComments = (memeId) => {
    setMemes((prevMemes) =>
      prevMemes.map((meme) => {
        if (meme.id === memeId) {
          return { ...meme, showComments: !meme.showComments };
        }
        return meme;
      })
    );
  };

  const handleComment = (memeId, commentText) => {
    const updatedMemes = [...memes];
    const memeIndex = updatedMemes.findIndex((meme) => meme.id === memeId);

    if (memeIndex !== -1) {
      updatedMemes[memeIndex].comments.push({
        text: commentText,
        user: user.user.username, // You can replace this with the user's name.
      });
      setMemes(updatedMemes);
    }
  };

  return (
    <div style={{ height: "100%", overflowY: "auto" }} className="w-3/5  ml-52 ">
      {memes.map((meme) => (
        <div
          key={meme.id}
          className="meme-post bg-[#e6e6fa] pl-auto pr-auto shadow-md rounded-lg mb-8" // Adjust the card size here
        >
          <img
            src={meme.image}
            alt={meme.title}
            className="w-3/4 pl-36 pt-4 h-auto "
          />
          <div className="reactions mt-2 flex space-x-4">
            <button
              onClick={() => handleReaction(meme.id, "like")}
              className="text-blue-500 hover:text-blue-700"
              disabled={clickedReactions[`${meme.id}-like`]}
            >
              👍 {meme.reactions.like}
            </button>
            <button
              onClick={() => handleReaction(meme.id, "love")}
              className="text-red-500 hover:text-red-700"
              disabled={clickedReactions[`${meme.id}-love`]}
            >
              ❤️ {meme.reactions.love}
            </button>
            <button
              onClick={() => handleReaction(meme.id, "wow")}
              className="text-yellow-500 hover:text-yellow-700"
              disabled={clickedReactions[`${meme.id}-wow`]}
            >
              😲 {meme.reactions.wow}
            </button>
          </div>
          <button
            onClick={() => toggleComments(meme.id)}
            className="mt-2 text-black font-semibold hover:text-blue-700"
          >
            {meme.showComments ? "Hide Comments" : "Show Comments"}
          </button>
          {meme.showComments && (
            <div className="comments mt-4">
              {meme.comments.map((comment, index) => (
                <div key={index} className="comment bg-gray-100 p-2 rounded">
                  <p>{comment.text}</p>
                  <span className="text-gray-500">{comment.user}</span>
                </div>
              ))}
            </div>
          )}
          {meme.showComments && (
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
          )}
        </div>
      ))}
    </div>
  );
};

export default MemMemes;
