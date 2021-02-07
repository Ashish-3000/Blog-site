import React, { useEffect } from "react";
import axios from "axios";

export default function BlogOpen(props) {
  const [blog, setBlog] = React.useState({
    title: "",
    author: "",
    imgsrc: "",
    date: "",
    content: "",
  });

  useEffect(() => {
    const axiosPromise = () => {
      const promise = axios.get("http://localhost:5000/blogs/" + props.title);
      const dataPromise = promise.then((response) => response.data);
      return dataPromise;
    };
    axiosPromise()
      .then((result) => {
        console.log(result);
        const [data] = result;
        setBlog(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  return (
    <div style={{ paddingTop: "5%" }} className="blog-section">
      <div style={{ width: "50%" }} className="blog-view wrapper">
        <h3>{blog.title}</h3>
        <div className="content">
          <div>
            <img
              style={{ width: "100%", height: "auto" }}
              src={blog.imgsrc}
              alt=""
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h5>{blog.author}</h5>
            <h5>{blog.date}</h5>
          </div>
          <p>{blog.content}</p>
        </div>
      </div>
    </div>
  );
}
