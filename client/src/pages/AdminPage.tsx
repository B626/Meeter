import React from "react";
import {Navigate} from "react-router-dom";
import { useAdminPage } from "../hooks/useAdminPage";

const AdminPage = () => {
  const {user, users, t} = useAdminPage()
  
  return user.is_admin ? (
    <main className="adminpage">
      <div className="container">
        <h1 className="black-h1">{t("all-users")}</h1>
        <div>
          {
            users?.map((e:any, i:any) => {
              return (
                <div className="adminpage-user" key={i}>
                  <p>{t("name")}:{e.first_name}</p>
                  <p>{t("email")}:{e.email}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </main>
  ) : <Navigate to={"/main"} />;
};

export default AdminPage;
