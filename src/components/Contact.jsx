import React from "react";
import SubmitBtn from "./SubmitBtn"


export default function Contact() {
    return (
        <div className="wrapper">
            <h3 style={{textAlign: "center"}} className="title">Contact Us</h3>
            <div className="inputs">
                <form action="">
                    <input className="form-input" type="text" name="fName" placeholder="Enter Your First Name" />
                    <input className="form-input" type="text" name="LName" placeholder="Enter Your Last Name" />
                    <input className="form-input" type="text" name="email" placeholder="Enter Your Email" />
                    <textarea className="form-input" name="message" maxLength="500" rows="10" placeholder="Message"></textarea>
                    <SubmitBtn text="Message Us"/>
                </form>
            </div>
        </div>
    );
}