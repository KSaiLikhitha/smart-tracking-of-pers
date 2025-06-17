import React, { useState } from "react";
import {
  TextInput,
  Button,
  Checkbox,
  Link,
  Stack,
  InlineNotification,
} from "@carbon/react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import "./login.css";

const DeliveryManagerLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/login-dm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/deliverymanagerdashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <Layout>
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Sign in with your IBM email</h2>
          <p className="login-subtitle">Use your full IBM email and password</p>

          <Stack gap={4}>
            {error && (
              <InlineNotification
                kind="error"
                title="Login Error"
                subtitle={error}
                lowContrast
              />
            )}

            <TextInput
              id="email"
              labelText="IBM Email ID"
              type="email"
              placeholder="e.g., KAMBOJI.SAI.LIKHITHA@ibm.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextInput
              id="password"
              labelText="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Link href="#">Forgot password?</Link>

            <Checkbox id="remember" labelText="Remember my email" />

            <Button kind="primary" onClick={handleSignIn}>
              Sign in
            </Button>

            <div className="other-methods">
              <Link href="#">View other sign in methods</Link>
              <p>
                We're enhancing w3id. <Link href="#">Learn more</Link>
              </p>
            </div>
          </Stack>
        </div>
      </div>
    </Layout>
  );
};

export default DeliveryManagerLogin;
