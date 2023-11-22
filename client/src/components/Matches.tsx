import React from "react";
import {useMatches} from "../hooks/useMatches";

const Matches = () => {
    const {
        matchedUsers,
        t,
        handleDeleteMatch
    } = useMatches();

    return (
        <section className="matches">
            <div className="matches__body">
                <h2 className="matches__title">{t("matches")}</h2>
                    <div className="matched-users">
                        {matchedUsers.length ? matchedUsers.map((e: any, i: any) => {
                            return (
                                <div className="match" key={i}>
                                    <div className="match__left">
                                        <img className="match__pic" src={e.pic_url} alt="picture"/>
                                        <p className="match__name">{e.first_name}</p>
                                    </div>
                                    <button onClick={() => handleDeleteMatch(e.email)} className="match__button">
                                        <img className="match__delete-img" src="https://cdn-icons-png.flaticon.com/512/1345/1345824.png" alt="aa" />
                                    </button>
                                </div>
                            )
                        }) : <p>No matches</p>}
                    </div>
            </div>
        </section>
    );
};

export default Matches;
