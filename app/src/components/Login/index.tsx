import React, { useState } from "react";
import NavBar from "../NavBar";
import "./style.scss";
import axios, { AxiosResponse } from "axios";
import AppConfig from "../../configs/AppConfig";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleClearfields = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setName("");
    setPassword("");
  };

  const login = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    axios
      .post(`${AppConfig.API_LOGIN}/login`, { name, password })
      .then((res: AxiosResponse<any, any>) => {
        const { token } = res.data;
        localStorage.setItem("token", token);
        navigate("/home");
      });
  };

  return (
    <>
      <NavBar />
      <div id="login">
        <form>
          <h1>Login</h1>
          <span>
            <label htmlFor="name">Name: *</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </span>
          <span>
            <label htmlFor="password">Password: *</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </span>
          <div className="btns">
            <button onClick={(e) => handleClearfields(e)}>Clear</button>
            <button onClick={(e) => login(e)}>Confirm</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
