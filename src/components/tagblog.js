import React, { useEffect } from "react";
import axios from "axios";
import Blogcard from "./blogcard";

export default function TagBlogs(props) {
  const [arr, setArr] = React.useState([]);

  useEffect(() => {
    const axiosPromise = () => {
      const promise = axios.get("http://localhost:5000/tags/" + props.tagName);
      const dataPromise = promise.then((response) => response.data);
      return dataPromise;
    };
    axiosPromise()
      .then((data) => {
        setArr(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.tagName]);

  return (
    <div className="blog-wrap-2 wrapper">
      {arr.map((blog, index) => {
        return (
          <Blogcard
            key={index}
            imgsrc={blog.imgsrc}
            title={blog.title}
            author={blog.author}
          />
        );
      })}
    </div>
  );
}
