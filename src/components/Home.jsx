import React, { useEffect } from "react";
import blogs from "./assets/blogs";
import SectionTitle from "./SectionTitle";
import SectionText from "./SectionText";
import LargeBtn from "./LargeBtn";
import Tag from "./Tag";
import Blogcard from "./blogcard";
import SubmitBtn from "./SubmitBtn";
import Compose from "./Compose";
import axios from "axios";

export default function Home() {
  const tags = [
    {
      text: "Bollywood",
      link: "bollywood",
    },
    {
      text: "Politics",
      link: "politics",
    },
    {
      text: "Tech",
      link: "tech",
    },
    {
      text: "Movies",
      link: "movies",
    },
    {
      text: "Space",
      link: "space",
    },
    {
      text: "Travel",
      link: "travel",
    },
    {
      text: "Fashion",
      link: "fashion",
    },
    {
      text: "Lifestyle",
      link: "lifestyle",
    },
  ];

  const [arr, setArr] = React.useState([]);

  function addNewBlog(blog) {
    setArr([...arr, blog]);
  }

  useEffect(() => {
    const axiosPromise = () => {
      const promise = axios.get("http://localhost:5000/home/");
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
  }, []);

  return (
    <div id="home">
      <section className="header">
        <div className="wrapper w-row" id="header">
          <div className="w-col wrap-img1">
            <img
              className="header-img"
              src="https://try.mekshq.com/u/byhhj/wp-content/uploads/2019/03/art-art-materials-artist-914922-540x540.jpg"
              alt=""
            />
          </div>
          <div className="w-col col-content">
            <SectionTitle text="Get Your Creative Blogs Here" />
            <SectionText text="Bloggie is a theme carefully designed and developed by experts to get the most out of creativity and Unleash the power of blocks - an awesome new way of creating rich content in mind" />
            <LargeBtn
              link="/contact"
              text={<SectionText text="Find Out More" />}
            />
          </div>
        </div>
      </section>

      <div className="line-border"></div>
      <section className="tagbar">
        {tags.map((tag, index) => {
          return <Tag key={index} text={tag.text} link={tag.link} />;
        })}
      </section>

      <section className="blogs">
        <div className="wrapper">
          <h4>Featured Articles</h4>
        </div>
        <div className="blog-section">
          <div className="blog-wrap wrapper">
            {arr.map((blog, index) => {
              // console.log(blog);
              return (
                <Blogcard
                  addOnn={addNewBlog}
                  key={index}
                  imgsrc={blog.imgsrc}
                  title={blog.title}
                  author={blog.author}
                />
              );
            })}
          </div>
          <div className="sidebar">
            <div className="subscribe-chart chart">
              <h5>Newsletter</h5>
              <p>
                Make sure to subscribe to our newsletter and be the first to
                know the news.
              </p>
              <form action="">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-input"
                />
                <SubmitBtn text="Subscribe" />
              </form>
            </div>
            <div className="social-chart chart">
              <h5>Let's get social</h5>
              <p>
                We are a team of dedicated professionals delivering high quality
                WordPress themes and plugins.
              </p>
              <ul>
                <li>
                  <a href="/">
                    <i className="fab fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fab fa-pinterest"></i>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="topics-chart chart">
              <h5>Topics</h5>
              <div className="topics">
                {tags.map((tag, index) => {
                  return <Tag key={index} text={tag.text} link={tag.link} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
