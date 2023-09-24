import React from "react";
import {Link} from "react-router-dom";
import {useMiniChat} from "../hooks/useMiniChat";

const Chat = () => {

    const {
        component,
        selectedUser,
        textareaValue,
        matchedUsers,
        user,
        img,
        messages,
        handleNavigation,
        handleTextClick,
        handleSendMessage,
        setTextareaValue,
    } = useMiniChat();


    return (
        <section className="mini-chat">
            <div className="mini-chat__top">
                <p className="mini-chat__username">
                    {user.first_name ? user.first_name : "Unknown"}
                </p>
                <div className="mini-chat__pic-wrapper">
                    <img className="mini-chat__pic" src={img} alt=""/>
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
                            {messages?.map((e: any, i: any) => {
                                const date = new Date(e.timestamp)
                                return (
                                    <div className=
                                             "mini-chat__message" key={i}>
                                        <p className=
                                               {e.from !== user.email ? "mini-chat__message-date-friend" : "mini-chat__message-date"}>{date.getHours()}:{date.getMinutes()}</p>
                                        <div className=
                                                 {e.from !== user.email ? "mini-chat__message-area-friend" : "mini-chat__message-area"}>
                                            <img className="mini-chat__user-pic"
                                                 src={e.from !== user.email ? selectedUser.pic_url : user.pic_url}
                                                 alt=""/>
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
                        {matchedUsers?.map((e: any, i: any) => {
                            return (
                                <div className="match" key={i}>
                                    <Link to={"/user"}>
                                        <img className="match__pic" src={e.pic_url} alt="picture"/>
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
