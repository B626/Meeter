import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/slices";
import axios from "axios";
import { useTranslation } from "react-i18next";

export const useChatPage = () => {
    const [component, setComponent] = useState<'notselected' | 'messages'>("notselected");
    const [selectedUser, setSelectedUser] = useState<any>(null)
    const [matchedUsers, setMatchedUsers] = useState<any[]>([])
    const [matchedUsersEmails, setMatchedUsersEmails] = useState<any[]>([])
    const [messages, setMessages] = useState<any>([])
    const [textareaValue, setTextareaValue] = useState<any>("")
    const [newMessage, setNewMessage] = useState<any>(null)
    const [socket, setSocket] = useState<any>(null);
    const [onlineUsers, setOnlineUsers] = useState<any>([])
    const user = useAppSelector(getUser);

    const messagesBottomRef = useRef<null | HTMLDivElement>(null)
    const { t } = useTranslation();

    useEffect(() => {
        if(messages.length){
            messagesBottomRef.current?.scrollIntoView({
                behavior: "instant",
                block: "end"
            })
        }
    }, [messages.length])

    useEffect(() => {
        const newSocket = io("http://localhost:7000")
        console.log("new user connected", newSocket)
        setSocket(newSocket)
        return () => {
            newSocket.disconnect()
        }
    }, [user])

    useEffect(() => {
        console.log("socket getonline users", socket)
        if(socket === null || user === null) return 
        socket.emit("addNewUser", user.email)
        socket.on("getOnlineUsers", (res:any)=>{
            setOnlineUsers(res)
        })
        return () => {
            socket.off("getOnlineUsers")
        }
    }, [socket])

    useEffect(() => {
        console.log("set matched users")
        if(socket === null) return
        socket.emit("setMatchedUsers", matchedUsers)
    }, [matchedUsers])

    useEffect(() => {
        console.log("send message")
        if(socket === null) return  
        socket.emit("sendMessage", 
        {newMessage, receiverEmail: selectedUser.email})
    }, [newMessage])

    useEffect(() => {
        console.log("getting messages")
        if(socket === null) return  
        socket.on("getMessage", (res:any) => {
            console.log(res)
            setMessages((prev:any) => [...prev, res])
        })
        return () => {
            socket.off("getMessage")
        }
    }, [socket, selectedUser])
 
    async function getMessages(userEmail: string) {
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

    async function createChat(userEmail: string) {
        const response = await axios.post(
            "http://localhost:9000/createchat",
            {
                email: userEmail
            },
            {
                withCredentials: true
            }

        )
        return response.data
    }

    const onSelectContact = (e: any) => {
        setComponent("messages")
        setSelectedUser(e)
        createChat(e.email)
        getMessages(e.email).then(setMessages)
    }

    const onlineMatchedUsers = onlineUsers.filter(function(onlineUser:any) {
        return matchedUsersEmails.includes(onlineUser.userEmail)
    })

    const onlineMatchedUsersArray = onlineMatchedUsers.map((e:any) => {
        return e.userEmail
    })

    const handleSendMessage = async (e:any) => {
        console.log("handle send message", e)
        if (textareaValue !== "") {
            try {
                setTextareaValue("")
                const response = await axios.post(
                    "http://localhost:9000/sendmessage",
                    {
                        message: textareaValue,
                        to: selectedUser.email
                    },
                    {
                        withCredentials: true
                    }
                )
                createChat(selectedUser.email)
                setNewMessage(response.data)
                getMessages(selectedUser.email).then(setMessages)
            } catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        async function getMatchedUsers() {
            const response = await axios.get("http://localhost:9000/matchedusers", {
                withCredentials: true,
            });
            let matchedEmails = response.data.map((e:any) => {
                return e.email
            })
            setMatchedUsersEmails(matchedEmails)
            return response.data;
        }
        getMatchedUsers().then(setMatchedUsers)
    }, []);
    
    return {
      matchedUsers,
      onSelectContact,
      onlineMatchedUsersArray,
      component, 
      messages,
      selectedUser,
      user,
      setTextareaValue,
      textareaValue,
      handleSendMessage,
      messagesBottomRef,
      onlineUsers,
      t
    }
}
   
