import React from "react";
import "./ListLanding1.css";

const ListLanding1 = (props) => {
  console.log("props:", props);
  const { user } = props;
  return (
    <div className="ll1_container">
      <div className="ll1_title">
        <h1>Welcome {user.listenerUsername}</h1>
        <h1>Have a chat with the members</h1>
      </div>
      <div className="ll1_text">
        <p>See requests of members who chose you.</p>
        <p>Chat with members you previously talked to.</p>
      </div>
      <div className="list1Btn_area">
        <div className="list1_btn">
          <button>See Requests</button>
        </div>
        <div className="list1_btn">
          <button>Text Member</button>
        </div>
      </div>
    </div>
  );
};

export default ListLanding1;
