import React, { useContext, useState, useEffect } from "react";
import {
  Route,
  Link,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Login from "./Login";
import Compose from "./Compose";
import Home from "./Home";
import Signup from "./Signup";
import { LoggedUser } from "./Savestate";
import axios from "axios";
import BlogforAll from "./BlogforAll";
import TagPage from "./TagPage";

function Navigation() {
  const [userName, setName] = useContext(LoggedUser);
  const newBlog = ({ match }) => {
    console.log(match.params.name);
    const name = match.params.name;
    return <BlogforAll name={name} />;
  };
  const tag = ({ match }) => {
    const name = match.params.name;
    return <TagPage name={name} />;
  };
  return (
    <Router>
      <nav className="site-nav">
        <span>
          <a href="/">Bloggie</a>
        </span>
        <ul>
          <Link to="/">HOME</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/contact">CONTACT</Link>

          {userName === "" ? (
            <Link to="/login">LOGIN</Link>
          ) : (
            <>
              <Link to="/compose">COMPOSE</Link>
              <Link>{userName}</Link>
            </>
          )}
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact strict component={Home} />
        <Route path="/about" exact strict component={About} />
        <Route path="/contact" exact strict component={Contact} />
        <Route path="/compose" exact strict component={Compose} />
        <Route path="/login" exact strict component={Login} />
        <Route path="/signup" exact strict component={Signup} />
        <Route path="/blogs/:name" exact strict component={newBlog} />
        <Route path="/tags/:name" exact strict component={tag} />
      </Switch>
    </Router>
  );
}

export default Navigation;
