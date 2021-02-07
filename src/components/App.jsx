import React from "react";
import "../styles/styles.css";
import Navigation from "./navigation";
import Footer from "./footer";
import {LoggedIn} from "./Savestate";

function App() {
  return (
    <LoggedIn>
      <Navigation />
      <Footer />
    </LoggedIn>
  );
}

export default App;
