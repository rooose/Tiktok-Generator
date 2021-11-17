import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Tiktok from "./TikTok";
import "./css/App.css";
import ParticlesBg from "particles-bg";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      json: undefined,
    };
  }

  handleChange = (json) => {
    this.setState({ json });
  };

  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home content_handler={this.handleChange} />}></Route>
            <Route path="/tiktok" element={<Tiktok content={this.state} />}></Route>
          </Routes>
        </div>
        <ParticlesBg color="#49515f" num={100} type="cobweb" bg={true} />
      </Router>
    );
  }
}
