import React, { useState } from "react";
import { loginUser } from "../features/auth/authService";
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

      console.log(res);

      localStorage.setItem("token", res.token);

      alert("Login Successful");

      navigate("/home");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          DevQ&A
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to your account
        </p>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 cursor-pointer ml-1 hover:underline"
            >
              Register
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;