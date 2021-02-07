import React, { useState, useEffect,useContext } from "react";
import SubmitBtn from "./SubmitBtn";
import axios from "axios";
import qs from "qs";
import { useHistory } from "react-router-dom";
import { LoggedUser } from "./Savestate";

export default function Signup() {
  const [loggedUser, setName] = useContext(LoggedUser);
  var history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit() {
    axios({
      method: "post",
      url: "http://localhost:5000/signup/",
      data: qs.stringify({
        username: username,
        password: password,
      }),
    }).then((res) => {
      console.log(res.data);
      if (res.data === "signup") {
        setName(username);
        history.push("/");
      } else {
        console.log("the user already exists");
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
        />
        <div>
          <label className="login-label">Password</label>
        </div>
        <input
          name="password"
          type="password"
          className="form-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitBtn text="Sign Up" />
      </form>
    </div>
  );
}
