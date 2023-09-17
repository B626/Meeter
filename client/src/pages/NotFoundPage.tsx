import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const NotFoundPage = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      isAuth ? navigate("/main") : navigate("/");
    }, 5000);
  }, [navigate]);
  return (
    <section className="notfound">
      <div className="container">
        <h1 className="black-h1">Not Found Page</h1>
      </div>
    </section>
  );
};

export default NotFoundPage;
