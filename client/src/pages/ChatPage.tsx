import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/slices";

const ChatPage = () => {
    const [component, setComponent] = useState<any>("notselected");
    const [selectedUser, setSelectedUser] = useState<any>(null)
    const [matchedUsers, setMatchedUsers] = useState<any[]>([])
    const [messages, setMessages] = useState<any>([])
    const [textareaValue, setTextareaValue] = useState<any>("")
    const user = useAppSelector(getUser);

    async function getMessages(userEmail:string) {
      const response = await axios.get(
      "http://localhost:9000/messages",
      {
        withCredentials: true,
        params:
          {
            email: userEmail
          }
        }
      )
    return response.data
    }

    const onSelectContact = (e:any) => {
      setComponent("messages")
      setSelectedUser(e)
      getMessages(e.email).then(res => setMessages(res))
    }

    useEffect(() => {
      async function getMatchedUsers() {
        const response = await axios.get("http://localhost:9000/matchedusers", {
          withCredentials: true,
        });
        return response.data;
      }
      getMatchedUsers().then(setMatchedUsers);
    }, []);

    return (
      <main className="chat">
        <div className="container">
          <div className="chat__inner">
            <div className="chat__matches-bar">
              {matchedUsers?.map((e:any, i:any) => {
                return (
                  <div 
                    onClick={() => onSelectContact(e)} 
                    className="chat-contact" key={i}>
                      <p className="chat-contact__name">{e.first_name}</p>
                  </div>
                )
              })}
            </div>
            <div className="chat__messages-bar">
              {component === "messages" 
              ? 
              <div className="messages-area">
                <div className="messages-area__contact-info">
                  <p className="messages-area__contact-name">{selectedUser?.first_name}</p>
                </div>
                <div className="chat__messages"> 
                  {messages?.map((e:any, i:any) => {
                    const date = new Date(e.timestamp)
                    return (
                      <div className="chat-message" key={i}>
                        <p 
                          className={e.from !== user.email 
                          ? "chat-message__date-friend" 
                          : "chat-message__date"}>
                          {date.getHours()}:{date.getMinutes()}
                        </p>
                        <div 
                        className=
                        {e.from !== user.email 
                        ? "chat-message__pic-text-area-friend" 
                        : "chat-message__pic-text-area"}>
                          <img className="chat-message__pic" 
                          src={e.from !== user.email ? selectedUser.pic_url : user.pic_url} alt="" />
                          <p className="chat-message__text">{e.message}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="messages-area__input-area">
                  <textarea 
                    onChange={(e) => setTextareaValue(e.target.value)}
                    value={textareaValue}
                    placeholder="Your message.." 
                    className="messages-area__textarea"
                    >
                  </textarea>
                  <button className="messages-area__button primary-button">Send message</button>
                </div>
              </div>
              : 
              "chat not selected"}
            </div>
          </div>
        </div>
      </main>
    );
};

export default ChatPage;
