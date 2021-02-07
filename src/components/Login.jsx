import React, { useState, useEffect, useContext } from "react";
import SubmitBtn from "./SubmitBtn";
import axios from "axios";
import qs from "qs";
import { Link, useHistory } from "react-router-dom";
import { LoggedUser } from "./Savestate";

export default function Login() {
  const [loggedUser, setName] = useContext(LoggedUser);
  var history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signuptext, setSignuptext] = useState("");
  function handleSubmit() {
    axios({
      method: "post",
      url: "http://localhost:5000/login/",
      data: qs.stringify({
        username: username,
        password: password,
      }),
    }).then((res) => {
      console.log(res.data);
      if (res.data === "loggedin") {
        setName(username);
        history.push("/");
      } else {
        console.log("wrong credentials");
        setSignuptext("If not registered First Sign Up");
      }
    });
  }
  return (
    <div className="login wrapper">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label className="login-label">Username</label>
        </div>
        <input
          name="username"
          type="text"
          className="form-input"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <div>
          <label className="login-label">Password</label>
        </div>
        <input
          name="password"
          type="password"
          className="form-input"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitBtn text="Login" />
        {signuptext === "" ? (
          <></>
        ) : (
          <Link to="/signup">
            <div>{signuptext}</div>
            <SubmitBtn text="Sign up"></SubmitBtn>
          </Link>
        )}
      </form>
    </div>
  );
}
