import {useEffect, useState} from "react";
import {useAppSelector} from "../redux/hooks";
import {getUser} from "../redux/slices";
import axios from "axios";

export const useMiniChat = () => {
    const [component, setComponent] = useState<any>("matches");
    const [selectedUser, setSelectedUser] = useState<any>(null)
    const [textareaValue, setTextareaValue] = useState<any>("")
    const [messages, setMessages] = useState<any>([])
    const [matchedUsers, setMatchedUsers] = useState<any[]>([])
    const user = useAppSelector(getUser);
    const img =
        user.pic_url ||
        "https://www.medqualityassurance.org/views/images/default_user.png";

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

    const handleNavigation = (component: any) => {
        if (component === "matches") {
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
        getMessages(user.email).then(setMessages)
    }

    const handleSendMessage = async () => {
        if (textareaValue !== "") {
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

                getMessages(selectedUser.email).then(setMessages)
            } catch (err) {
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
    }, [user]);

    return {
        messages,
        user,
        img,
        component, selectedUser, textareaValue, matchedUsers,
        setTextareaValue,
        handleNavigation,
        handleSendMessage,
        handleTextClick,
    }
}
