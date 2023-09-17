import React from "react";
import { useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/slices";

const Chat = () => {
  const user = useAppSelector(getUser);
  return (
    <section className="chat">
      <div className="chat__top">
        <p className="chat__username">{user.first_name ? user.first_name : "Unknown"}</p>
        <div className="chat__pic-wrapper">
          <img
            className="chat__pic"
            src={
              user.pic_url
                ? user.pic_url
                : "https://www.medqualityassurance.org/views/images/default_user.png"
            }
            alt=""
          />
        </div>
      </div>
      <div className="chat__body">Chat</div>
    </section>
  );
};

export default Chat;