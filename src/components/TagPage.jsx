import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Blogcard from "./blogcard";

function TagPage(props) {
  var history = useHistory();
  const [arr, setArr] = React.useState([]);
  useEffect(() => {
    const axiosPromise = () => {
      const promise = axios.get("http://localhost:5000/tags/" + props.name);
      const dataPromise = promise.then((response) => response.data);
      return dataPromise;
    };
    axiosPromise()
      .then((data) => {
        data.reverse();
        setArr(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.name]);
  return (
    <div className="blog-wrap wrapper">
      {arr.map((blog, index) => {
        // console.log(blog);
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

export default TagPage;
