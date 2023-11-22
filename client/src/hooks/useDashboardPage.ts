import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "./useAuth";
import {useAppSelector} from "../redux/hooks";
import {getUser} from "../redux/slices";

export const useDashboardPage = () => {
    const [users, setUsers] = useState<any[]>([])
    const {handleUser} = useAuth();
    const {
        email,
        first_name,
        last_name,
        dob_day,
        dob_month,
        dob_year,
        age,
        about,
        gender_identity,
        gender_interest,
        pic_url,
        matches
    } = useAppSelector(getUser);
    useEffect(() => {
        async function getFilteredUsers() {
            const response = await axios.get(
                "http://localhost:9000/filteredusers",
                {
                    withCredentials: true,
                    params:
                        {
                            gender_interest,
                            age,
                            email
                        }
                }
            )
            handleUser({
                email,
                first_name,
                last_name,
                dob_day,
                dob_month,
                dob_year,
                age,
                about,
                gender_identity,
                gender_interest,
                pic_url,
                matches
            })
            return response.data
        }

        getFilteredUsers().then(setUsers)
    }, []);

    const addMatch = async (matchedEmail: any) => {
        try {
            await axios.put("http://localhost:9000/addmatch",
                {
                    email,
                    matched_email: matchedEmail
                },
                {
                    withCredentials: true,
                }
            )
            const updatedMatches = [...matches, {email: matchedEmail}]
            handleUser({
                email,
                first_name,
                last_name,
                dob_day,
                dob_month,
                dob_year,
                age,
                about,
                gender_identity,
                gender_interest,
                pic_url,
                matches: updatedMatches
            })
        } catch (error) {
            console.log(error)
        }
    }

    const swiped = useCallback((direction: any, userEmail: string) => {
    const emails = matches.map((e: any) => e.email);

    if (direction === "right" && !emails.includes(userEmail)) {
        addMatch(userEmail);
    }
    }, []);

    return {
        matches,
        users,
        addMatch,
        swiped
    }
}
