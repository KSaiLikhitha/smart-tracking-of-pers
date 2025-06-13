import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout"; // Import the Layout component

const ProjectExecutiveLogin = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Optional: Add login validation logic
    navigate("/projectexecutivedashboard");
  };

  return (
    <Layout>
      <div className="login-page">
        <div className="login-box">
          <h2>Sign in with your w3id credentials</h2>
          <p>Use your w3id and password</p>

          <input type="email" placeholder="Email address" />
          <input type="password" placeholder="Password" />

          <a href="#" className="forgot-password">
            Forgot password?
          </a>

          <div className="checkbox-container">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember my email address</label>
          </div>

          <button onClick={handleSignIn}>Sign in</button>

          <div className="links">
            View other <a href="#">sign in methods</a>
            <br />
            We’re enhancing w3id. <a href="#">Learn more</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectExecutiveLogin;
