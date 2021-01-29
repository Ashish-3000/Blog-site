import React from "react";

function Blogcard(props) {

    return (
        <div className="blog-box card">
            <img src={props.imgsrc} alt="blogImage"/>
            <h5>{props.title}</h5>
            <p>{props.date}</p>
            <h5>{props.author}</h5>
        </div>            
    );
}

export default Blogcard;