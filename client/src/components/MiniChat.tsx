import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/slices";
import axios from "axios";
import { Link } from "react-router-dom";

const Chat = () => {
  const [component, setComponent] = useState<any>("matches");
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [textareaValue, setTextareaValue] = useState<any>("")
  const [messages, setMessages] = useState<any>([])
  const [matchedUsers, setMatchedUsers] = useState<any[]>([])
  const user = useAppSelector(getUser);
  const img =
    user.pic_url ||
    "https://www.medqualityassurance.org/views/images/default_user.png";
  
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

  const handleNavigation = (component:any) => {
    if(component === "matches"){
      setComponent(component)
      setSelectedUser(null)
      setMessages([])
    } else {
      setComponent(component)
    }
  }
    
  const handleTextClick = (user: any) => {
    setComponent("chat")
    setSelectedUser(user)
    getMessages(user.email).then(res => setMessages(res))
  }

  const handleSendMessage = async (e:any) => {
    if(textareaValue !== ""){
      try {
        setTextareaValue("")
        await axios.post(
          "http://localhost:9000/sendmessage",
          {
            message: textareaValue,
            to: selectedUser.email
          },
          {
            withCredentials: true
          }
        )
        getMessages(selectedUser.email).then(res => setMessages(res))
      } catch(err) {
        console.log(err)
      }
    }
  }

  useEffect(() => {
    async function getMatchedUsers() {
      const response = await axios.get(
        "http://localhost:9000/matchedusers",
        {
          withCredentials: true
        }
      )
      return response.data
    }
  getMatchedUsers().then(setMatchedUsers)
  }, [user])

  return (
    <section className="mini-chat">
      <div className="mini-chat__top">
        <p className="mini-chat__username">
          {user.first_name ? user.first_name : "Unknown"}
        </p>
        <div className="mini-chat__pic-wrapper">
          <img className="mini-chat__pic" src={img} alt="" />
        </div>
      </div>
      <div className="mini-chat__body">
        <div className="mini-chat__navigation">
          <p className={component === "chat" 
          ? "mini-chat__nav-link--active" 
          : "mini-chat__nav-link"} onClick={() => handleNavigation("chat")}>Chat</p>
          <p className={component === "matches" 
          ? "mini-chat__nav-link--active" 
          : "mini-chat__nav-link"} onClick={() => handleNavigation("matches")}>Matches</p>
        </div>
        {component === "chat" 
        ? 
        <>
          <div className="mini-chat__message-receiver">
            <p className="mini-chat__message-receiver-name">{selectedUser?.first_name}</p>
          </div> 
          <div className="mini-chat__messages">
            {messages?.map((e:any, i:any) => {
              const date = new Date(e.timestamp)
              console.log(date)
              return (
                <div className=
                  "mini-chat__message" key={i}>
                  <p className=
                  {e.from !== user.email ? "mini-chat__message-date-friend" : "mini-chat__message-date"}>{date.getHours()}:{date.getMinutes()}</p>
                  <div className=
                  {e.from !== user.email ? "mini-chat__message-area-friend" : "mini-chat__message-area"}>
                    <img className="mini-chat__user-pic" 
                    src={e.from !== user.email ? selectedUser.pic_url : user.pic_url} alt="" />
                    <p className="mini-chat__message-text">{e.message}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="chat__input-area">
            {
              selectedUser && 
              <>
                <textarea 
                  onChange={(e) => setTextareaValue(e.target.value)}
                  value={textareaValue}
                  placeholder="Your message.." 
                  id="">
                </textarea>
                <button onClick={handleSendMessage} className="primary-button">Send</button>
              </>
            }
          </div>
        </>
        : 
        <div className="matches">
          {matchedUsers?.map((e:any, i:any) => {
            return (
              <div className="match" key={i}>
                <Link to={"/user"}>
                    <img className="match__pic" src={e.pic_url} alt="picture" />
                </Link>
                <div>
                  <Link to={"/user"} className="match__name">{e.first_name}</Link>
                  <button 
                    onClick={() => handleTextClick(e)} 
                    className="primary-button">
                  Text
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        }
      </div>
    </section>
  );
};

export default Chat;
