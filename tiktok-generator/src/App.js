import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./Home";
import Tiktok from "./TikTok";
import './css/App.css'
import ParticlesBg from 'particles-bg'

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      json: "nothing"
    }
  }

  handleChange = (json) => {
    this.setState({ json })
  }

  render(){
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home content_handler={this.handleChange}/>}></Route>
          <Route path="/tiktok" element={<Tiktok content={this.state}/>}></Route>
        </Routes>
      </div>
      <ParticlesBg color="#49515f" num={100} type="cobweb" bg={true} />
    </Router>
    
  );
}
}


