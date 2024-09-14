import React, { useState } from "react";
import "./Reset.css";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `http://127.0.0.1:8000/api/users/reset/${email}`,
        {
          email: email,
        },
        config
      );

      setMessage(data);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="loginsingnup">
      <div className="loginsignup-container">
        <div className="loginsignup-header">
          <h1>Reset Password</h1>
        </div>

        {message && (
          <Alert className="errormsg" variant="danger">
            {message}
          </Alert>
        )}

        <form onSubmit={submitHandler}>
          <div className="loginsignup-fields">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address or username"
              required
            />
          </div>
          <button type="submit">SEND</button>
        </form>

        <div className="loginsignup-login">
          Create an account?{" "}
          <Link style={{ textDecoration: "none" }} to={"/signup"}>
            {" "}
            <span>Signup here</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reset;
