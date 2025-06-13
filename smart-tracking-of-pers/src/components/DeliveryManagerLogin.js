// src/components/DeliveryManagerLogin.js
import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

const DeliveryManagerLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/authenticate-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (data.success && data.role === "deliveryManager") {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        alert("Access denied. You are not authorized.");
      }
    } catch (error) {
      alert("Login failed. Check your email or try again later.");
    }
  };

  return (
    <Layout>
      <div className="login-page">
        <div className="login-box">
          <h2>Sign in with your w3id</h2>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSignIn}>Sign in</button>
        </div>
      </div>
    </Layout>
  );
};

export default DeliveryManagerLogin;
