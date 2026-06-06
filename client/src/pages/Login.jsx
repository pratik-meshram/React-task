import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await loginUser({
        email,
        password,
      });

      console.log(res.data);

      // Token Save
      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      navigate("/home");

    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <>
      <h1>Login Page</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={handleLogin}>
        Login
      </button>
    </>
  );
}

export default Login;