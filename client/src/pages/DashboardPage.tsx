import axios from "axios";
import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import Chat from "../components/Chat";
import { useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/slices";
import { useAuth } from "../hooks/useAuth";

const DashboardPage = () => {
  const [users,setUsers] = useState<any[]>([])
  const { handleUser } = useAuth();
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
  async function getFilteredUsers() {
    const response = await axios.get(
      "http://localhost:9000/filteredusers",
      {
        params: 
        {
          gender_interest,
          age,
        }
      }
    )
    const filteredUsers = response.data.filter((e: any) => {
      return e.email !== email
    })
    setUsers(filteredUsers)
  }

  useEffect(() => {
    getFilteredUsers()
  }, [])

  const addMatch = async(matchedEmail: any) => {
    try{
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
    } catch(error) {
      console.log(error)
    }
  }

  const swiped = (direction:any, email:any) => {
    if(direction === "right") {
      addMatch(email)
    }
  }

  const outOfFrame = (name:any) => {
    console.log(name + ' left the screen!')
  }

  return (
    <section className="dashboard">
      <div className="container">
        <div className="dashboard__inner">
          <Chat />
          <div className="swiper-container">
            <div className="card-container">
              {users?.map((user) =>
                <TinderCard className='swipe' 
                preventSwipe={["up", "down"]} 
                key={user.first_name} 
                onSwipe={(dir) => swiped(dir, user.email)} 
                onCardLeftScreen={() => outOfFrame(user.first_name)}>
                  <div style={{backgroundImage: `url(${user.pic_url === 
                    "https://www.medqualityassurance.org/views/images/default_user.png" 
                    ? "https://m.media-amazon.com/images/I/31DhmKeNrWL._AC_UF1000,1000_QL80_.jpg" : user.pic_url})`}} className='card'>
                      <div>
                        <h2 className="card__name">{user.first_name ? user.first_name : "unknown"}</h2>
                        <h3 className="card__about">{user.about}</h3>
                      </div>
                      <h2 className="card__age">{user.age}</h2>
                  </div>
                </TinderCard>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
