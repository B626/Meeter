import {useEffect, useState} from "react";
import {useAppSelector} from "../redux/hooks";
import {getUser} from "../redux/slices";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useAuth } from "./useAuth";

export const useMatches = () => {
    const [component, setComponent] = useState<any>("matches");
    const [selectedUser, setSelectedUser] = useState<any>(null)
    const [textareaValue, setTextareaValue] = useState<any>("")
    const [messages, setMessages] = useState<any>([])
    const [matchedUsers, setMatchedUsers] = useState<any[]>([])
    const user = useAppSelector(getUser);
    const { handleUser } = useAuth();
    const img =
        user.pic_url ||
        "https://www.medqualityassurance.org/views/images/default_user.png";
    const { t } = useTranslation();
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

    async function handleDeleteMatch(email:string)  {
        const response = await axios.put(
            "http://localhost:9000/deletematch",
            {
                email
            },
            {
                withCredentials: true,            
            }
        )
        handleUser({
            matches: response.data
        })
    }

    const handleTextClick = (user: any) => {
        setComponent("chat")
        setSelectedUser(user)
        getMessages(user.email).then(setMessages)
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
        handleTextClick,
        t, 
        handleDeleteMatch
    }
}
