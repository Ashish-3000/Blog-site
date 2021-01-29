import React from "react";
import SubmitBtn from "./SubmitBtn";

export default function Login() {
    return (
        <div className="login wrapper">
            <form action="">
                <div><label className="login-label">Username</label></div>
                <input name="username"  type="text" className="form-input"/>
                <div><label className="login-label">Password</label></div>
                <input name="password" type="text" className="form-input"/>
                <SubmitBtn text="Login"/>
            </form>
        </div>
    );
}