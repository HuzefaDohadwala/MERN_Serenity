import React from "react";
import "./MemLanding1.css";

const MemLanding1 = (props) => {
  console.log("props:", props);
  const { user } = props;
  return (
    <div className="ml1_container">
      <div className="ml1_title">
        
        <h1>Welcome {user.username}</h1>
        <h1>Get Yourself someone who will listen to you!!</h1>
      </div>
      <div className="ml1_text">
        <p>Send a request to a listener of your choice.</p>
        <p>Chat with listeners preiously chosen by you.</p>
      </div>
      <div className="mem1Btn_area">
        <div className="mem1_btn">
          <button>Find Listener</button>
        </div>
        <div className="mem1_btn">
          <button>Text Listener</button>
        </div>
      </div>
    </div>
  );
};

export default MemLanding1;
