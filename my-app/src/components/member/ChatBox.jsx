import React from "react";
import "./ChatBox.css";
import send from "./send.png";

const ChatBox = () => {
  return (
    <div className="ChatBoxMem">
      <div className="cbm_container">
        <div className="UserName_mem">
          <h1 className="UserNameText_mem">Listener 1</h1>
        </div>
        <div className="ChatSection_member">Here we talk</div>
        <div className="Input_member">
          <div className="ip_left">
            <input
              className="InputField_mem"
              type="text"
              placeholder="    Type here"
            />
          </div>
          <button className="send_right">
            <img src={send} alt={send} className="send-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
