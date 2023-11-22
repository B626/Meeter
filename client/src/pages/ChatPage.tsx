import React from "react";
import { useChatPage } from "../hooks/useChatPage";

const ChatPage = () => {
    const 
        {matchedUsers,
        onSelectContact,
        onlineMatchedUsersArray,
        component,
        selectedUser,
        messages,
        user,
        setTextareaValue,
        textareaValue,
        handleSendMessage,
        messagesBottomRef,
        t
    } = useChatPage()
    
    return (
        <main className="chat">
            <div className="container">
                <div className="chat__inner">
                    <div className="chat__matches-bar">
                        {matchedUsers?.map((e: any, i: any) => {
                            return (
                                <div
                                    onClick={() => onSelectContact(e)}
                                    className={onlineMatchedUsersArray.includes(e.email) ? "chat-contact--active" : "chat-contact"} key={i}>
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
                                    {messages?.map((e: any, i: any) => {
                                        const date = new Date(e.timestamp)
                                        const dateMonth = date.toLocaleString("en-GB", {month: "long"})
                                        const dateNow = new Date()
                                        const timeDifference = dateNow.getTime() - date.getTime()
                                        const dateDifference = Math.round(timeDifference / (1000 * 3600 * 24))
                                        return (
                                            <div className="chat-message" key={i}>
                                                {dateDifference > 4 && 
                                                <div className="chat-message__big-date">{dateMonth}, {date.getDate()}</div>}
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
                                                            src={e.from !== user.email ? selectedUser.pic_url : user.pic_url}
                                                            alt=""/>
                                                        <p className="chat-message__text">{e.message}</p>
                                                    </div>
                                                </div>
                                        )
                                    })}
                                    <div ref={messagesBottomRef}>

                                    </div>
                                </div>
                            <div className="messages-area__input-area">
                                <textarea
                                    onChange={(e) => setTextareaValue(e.target.value)}
                                    value={textareaValue}
                                    placeholder={t("enter-your-message")}
                                    className="messages-area__textarea">
                                </textarea>
                                <button 
                                className="messages-area__button primary-button"
                                onClick={handleSendMessage}
                                >
                                Send message
                                </button>
                            </div>
                        </div>
                        :
                        t("chat-not-selected")}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ChatPage;
