import React, {useCallback} from "react";
import Chat from "../components/MiniChat";
import {TinderCardComponent} from "../components/TinderCard";
import {useDashboardPage} from "../hooks/useDashboardPage";

const DashboardPage = () => {
    const {matches, addMatch, users} = useDashboardPage();


    const swiped = useCallback((direction: any, userEmail: string) => {
        const emails = matches.map((e: any) => e.email);

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
                            {users.length ? users.map((user) =>
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
