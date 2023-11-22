import React, {useCallback} from "react";
import {TinderCardComponent} from "../components/TinderCard";
import {useDashboardPage} from "../hooks/useDashboardPage";
import Matches from "../components/Matches";

const DashboardPage = () => {
    const {matches, addMatch, users, swiped} = useDashboardPage();

    return (
        <section className="dashboard">
            <div className="container">
                <div className="dashboard__inner">
                    <Matches/>
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
