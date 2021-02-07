import React from "react";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";

function Blogcard(props) {
  const title = props.title;
  return (
    <div className="blog-box card">
      <img src={props.imgsrc} alt="blogImage" />
      <Link to={"/blogs/"+props.title}>
        <h5>{props.title}</h5>
        <h5>{props.author}</h5>
      </Link>
    </div>
  );
}

export default Blogcard;
