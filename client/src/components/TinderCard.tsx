import React, {memo} from 'react';
import TinderCard from "react-tinder-card";

const defaultUserImg = "https://www.medqualityassurance.org/views/images/default_user.png"

const blackImg = "https://m.media-amazon.com/images/I/31DhmKeNrWL._AC_UF1000,1000_QL80_.jpg"

export const TinderCardComponent = 
memo(({user, swiped}: any) => {
    return (
        <TinderCard 
                     className='swipe'
                    preventSwipe={["up", "down"]}
                    key={user.first_name}
                    onSwipe={(dir) => swiped(dir, user.email)}
        >
            <div style={{
                backgroundImage: `url(${user.pic_url ===
                defaultUserImg
                    ? blackImg : user.pic_url})`
            }} className='card'>
                <div>
                    <h2 className="card__name">{user.first_name ? user.first_name : "unknown"}</h2>
                    <h3 className="card__about">{user.about}</h3>
                </div>
                <h2 className="card__age">{user.age}</h2>
            </div>
        </TinderCard>
    )
}, () => true);

TinderCardComponent.displayName = 'TinderCardComponent';