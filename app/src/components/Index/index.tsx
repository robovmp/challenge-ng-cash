import React, { useEffect } from "react";
import NavBar from "../NavBar";
import "./style.scss";
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/home");

    navigate("/");
  }, []);

  return (
    <>
      <NavBar />
      <div className="index"></div>
    </>
  );
}

export default Index;
