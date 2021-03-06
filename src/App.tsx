import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";

import Overview from "pages/Overview";

function App() {
  return (
    <div className="">
      <Overview />
    </div>
  );
}

export default App;
