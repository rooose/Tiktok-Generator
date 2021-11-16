import React from "react";
import { fabric } from 'fabric';
import "./css/Tiktok.css";

export default class Music extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_playing: true
          };


      }

      componentDidMount() {
        this.canvas = new fabric.Canvas(
          'c', 
          {
          width: 500,
          height: window.innerHeight - 20
          });
        // do some stuff with it
      }
    

      render() {
        return (
          <div>
            <canvas id="c" />
          </div>
        );
      }

}