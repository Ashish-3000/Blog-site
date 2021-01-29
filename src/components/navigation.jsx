import React from "react";
import {Route, Link, BrowserRouter as Router, Switch} from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Login from "./Login";
import Compose from "./Compose";
import Home from "./Home";


function Navigation() {

    return (
        <Router>
            <nav className="site-nav">
                <span><a href="/">Bloggie</a></span>
                <ul>
                    <Link to="/" >HOME</Link>
                    <Link to="/about">ABOUT</Link>
                    <Link to="/contact">CONTACT</Link>
                    <Link to="/compose">COMPOSE</Link>
                    <Link to="/login">LOGIN</Link>
                </ul>
            </nav>
            <Switch>
                <Route path="/" exact strict component={Home} />
                <Route path="/about" exact strict component={About} />
                <Route path="/contact" exact strict component={Contact} />
                <Route path="/compose" exact strict component={Compose} />
                <Route path="/login" exact strict component={Login} />
            </Switch>
        </Router>
    );
}

export default Navigation;