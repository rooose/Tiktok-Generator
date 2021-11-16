import React from "react";
import "./css/Tiktok.css";

export default class Tiktok extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.content)
        this.content = this.props.content;
      }

      render() {
    
        return (
          <h2>{this.content.json}</h2>
        );
      }

}