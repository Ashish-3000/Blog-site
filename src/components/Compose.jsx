import React from "react";
import SubmitBtn from "./SubmitBtn";

export default function Compose (props) {

    const [newBlog, setNewBlog] = React.useState({
        title: "",
        author: "",
        imgsrc: "",
        // date: new Date(),
        content: ""
    });

    function handleChange (event) {
        const {name, value} = event.target;
        setNewBlog( previousValues => {
            return {
                ...previousValues, 
                [name]: value
            };
        });
    }

    function submitBlog(event) {
        event.preventDefault();
        console.log(newBlog);
        props.addOnn(newBlog);
        setNewBlog({
            title: "",
            author: "",
            imgsrc: "",
            date: new Date(),
            content: ""
        });
    }

    return (
        <div className="compose wrapper">
            <form action="">
                <div><label className="Compose-label">Blog Title</label></div>
                <input name="title" value={newBlog.title} onChange={handleChange} type="text" className="form-input"/>
                <div><label className="Compose-label">Blog Image</label></div>
                <input name="imgsrc" value={newBlog.imgsrc} onChange={handleChange} type="text" className="form-input"/>
                <div><label className="Compose-label">Blog Content</label></div>
                <textarea name="content" values={newBlog.content} onChange={handleChange} className="form-input" cols="30" rows="10"></textarea>
                <div><label className="Compose-label">Author Name</label></div>
                <input name="author" value={newBlog.author} onChange={handleChange} type="text" className="form-input"/>
                <SubmitBtn text="Publish"/>
            </form>
        </div>
    );
}