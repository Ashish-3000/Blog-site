import React, { useEffect } from "react";
import SubmitBtn from "./SubmitBtn";
import axios from "axios";
import qs from "qs";
import { useHistory } from "react-router-dom";

export default function Compose(props) {
  var history = useHistory();
  const [newBlog, setNewBlog] = React.useState({
    title: "",
    author: "",
    imgsrc: "",
    tags: "",
    // date: new Date(),
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNewBlog((previousValues) => {
      return {
        ...previousValues,
        [name]: value,
      };
    });
  }
  function handleSubmit() {
    // preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/compose/",
      data: qs.stringify({
        title: newBlog.title,
        author: newBlog.author,
        imgsrc: newBlog.imgsrc,
        tags: newBlog.tags,
        content: newBlog.content,
      }),
    }).then((res) => {
      console.log(res.data);
      if (res.data === true) {
        history.push("/");
      } else history.push("/login");
    });
  }
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/compose/",
    }).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className="compose wrapper">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label className="Compose-label">Blog Title</label>
        </div>
        <input
          name="title"
          value={newBlog.title}
          onChange={handleChange}
          type="text"
          className="form-input"
          required
        />
        <div>
          <label className="Compose-label">Blog Image</label>
        </div>
        <input
          name="imgsrc"
          value={newBlog.imgsrc}
          onChange={handleChange}
          type="text"
          className="form-input"
          required
        />
        <div>
          <label className="Compose-label">Give Tags to your blog</label>
        </div>
        <input
          name="tags"
          value={newBlog.tags}
          onChange={handleChange}
          type="text"
          className="form-input"
        />
        <div>
          <label className="Compose-label">Blog Content</label>
        </div>
        <textarea
          name="content"
          values={newBlog.content}
          onChange={handleChange}
          className="form-input"
          cols="30"
          rows="10"
          required
        ></textarea>
        <div>
          <label className="Compose-label">Author Name</label>
        </div>
        <input
          name="author"
          value={newBlog.author}
          onChange={handleChange}
          type="text"
          className="form-input"
          required
        />
        <SubmitBtn text="Publish" />
      </form>
    </div>
  );
}
