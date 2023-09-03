import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [navigate]);
  return (
    <div className="container">
      <h1 className="primary-h1">Not Found Page</h1>
    </div>
  );
};

export default NotFoundPage;
