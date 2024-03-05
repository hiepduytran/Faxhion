import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import toast, { Toaster } from "react-hot-toast";
const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const login = async () => {
    console.log("Login", formData);
    let resData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (resData = data));
    if (resData.success) {
      localStorage.setItem("auth-token", resData.token);
      toast.success("Account created successfully");
      window.location.replace("/"); // Redirecting to home page
    } else {
      toast.error(resData.errors);
    }
  };
  const signup = async () => {
    // console.log("Signup", formData);
    let resData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (resData = data));
    if (resData.success) {
      localStorage.setItem("auth-token", resData.token);
      toast.success("Account created successfully");
      window.location.replace("/"); // Redirecting to home page
    } else {
      toast.error(resData.errors);
    }
  };
  return (
    <div className="loginsignup">
      <Toaster />
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Login" ? (
            ""
          ) : (
            <input
              value={formData.username}
              onChange={changeHandler}
              type="text"
              name="username"
              id="username"
              placeholder="Your Name"
            />
          )}
          <input
            value={formData.email}
            onChange={changeHandler}
            type="email"
            name="email"
            idemail
            placeholder="Email Address"
          />
          <input
            value={formData.password}
            onChange={changeHandler}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        {state === "Login" ? (
          <div className="loginsignup-login">
            Create an account?{" "}
            <span
              onClick={() => {
                setState("Signup");
              }}
            >
              Click here
            </span>
          </div>
        ) : (
          <div className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login here
            </span>
          </div>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};
export default LoginSignup;
