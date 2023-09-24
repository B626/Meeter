import axios from "axios";
import React, {useCallback, useEffect, useState} from "react";
import Chat from "../components/MiniChat";
import {useAppSelector} from "../redux/hooks";
import {getUser} from "../redux/slices";
import {useAuth} from "../hooks/useAuth";
import { TinderCardComponent } from "../components/TinderCard";

const DashboardPage = () => {
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
    }, [])

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
        const emails:any[] = []
        matches.map((e:any) => {
            emails.push(e.email)
        })
        if (direction === "right" && !emails.includes(userEmail)) {
            addMatch(userEmail);
        }
    }, []);

    const outOfFrame = (name: any) => {
        console.log(name + ' left the screen!')
    }



    return (
        <section className="dashboard">
            <div className="container">
                <div className="dashboard__inner">
                    <Chat/>
                    <div className="swiper-container">
                        <div className="card-container">
                            { users ? users?.map((user) =>
                                <TinderCardComponent 
                                user={user}
                                swiped={swiped} 
                                key={user.email} 
                                />
                            ) : <p>No users left</p>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardPage;
