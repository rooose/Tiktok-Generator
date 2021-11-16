import React from "react";
import { fabric } from "fabric";
// import { FontAwesomeIcon } from 'react-fontawesome'
// import faPause from '@fortawesome/fontawesome-free-solid'

import "./css/Tiktok.css";

import allIWant from "./assets/musics/all_i_want.mp3";
import bezosI from "./assets/musics/bezos-i.mp3";
import september from "./assets/musics/september.mp3";

import festiveFrame from "./assets/filters/Holly_Christmas_Frame.png";
import blurredFrame from "./assets/filters/ralenti.png";
import starFrame from "./assets/filters/star.png";

export default class Tiktok extends React.Component {
  URLS = [
    {
      name: "All I Want for Christmas is You",
      url: allIWant,
    },
    {
      name: "Bezos I",
      url: bezosI,
    },
    {
      name: "September",
      url: september,
    },
  ];

  GRADIENTS = [
    ['rgb(157,80,187)',  'rgb(110,72,170)'],
    ['rgb(179,255,171)', 'rgb(18,255,247)'],
    ['rgb(255,78,80)',   'rgb(249,212,35)'],
    ['rgb(251,211,233)', 'rgb(187,55,125)'],
    ['rgb(0,210,255)',   'rgb(58,123,213)']
  ];

  constructor(props) {
    super(props);
    this.content = this.props.content.json;
    this.canvas = null;
    this.playpause = React.createRef();
    this.className = "fa fa-pause";
    this.state = {
      play: true,
    };

    if (this.content.musique) {
      this.isMusic = true;
      let song = this.getSongFromProps();
      this.audio = new Audio(song);
      this.audio.loop = true;
      this.audio.play();
    } else {
      this.isMusic = false;
      this.content.musique = "Pas de musique";
    }
  }

  getSongFromProps() {
    for (let url of this.URLS) {
      if (url.name === this.content.musique) {
        return url.url;
      }
    }
  }

  setupImageFilter(src) {
    let context = this.canvas.getContext("2d");
    let imageObj = new Image();

    imageObj.onload = function () {
      context.drawImage(imageObj, 0, 0, 500, 720);
    };
    imageObj.src = src;
  }

  setupMovingFilter(src) {
    let canvas = this.canvas;
    let _this = this;
    console.log("IS PLAYING?", this.state.play);

    new fabric.Image.fromURL(src, function (img) {
      img.set({ top: -img.height, selectable: false, hoverCursor: "default" });
      canvas.add(img);
      (function animate() {
        if (_this.state.play) {
          img.top = img.top + 1;
          if (img.top === canvas.height) {
            img.top = -img.height;
          }
        }
        canvas.renderAll();
        fabric.util.requestAnimFrame(animate);
      })();
    });

    new fabric.Image.fromURL(src, function (img) {
      img.set({ top: 0, selectable: false, hoverCursor: "default" });
      canvas.add(img);
      (function animate() {
        if (_this.state.play) {
          img.top = img.top + 1;
          if (img.top === canvas.height) {
            img.top = -img.height;
          }
        }
        canvas.renderAll();
        fabric.util.requestAnimFrame(animate);
      })();
    });
  }

  showFilter(filterName) {
    if (filterName === "Étoiles") {
      this.setupMovingFilter(starFrame);
    } else if (filterName === "Festif") {
      this.setupImageFilter(festiveFrame);
    } else if (filterName === "Ralenti") {
      this.setupImageFilter(blurredFrame);
    } else {
      console.log("Pas de filtre correspondant trouvé");
    }
  }

  setupBackground() {
    let gradient = this.GRADIENTS[Math.floor(Math.random() * this.GRADIENTS.length)];
    console.log(gradient[0])

    let grad = new fabric.Gradient({
      type: "linear",
      coords: {
        x1: 0,
        y1: 0,
        x2: this.canvas.width,
        y2: this.canvas.height,
      },
      colorStops: [
        {
          color: gradient[0],
          offset: 0,
        },
        {
          color: gradient[1],
          offset: 1,
        },
      ],
    });

    this.canvas.backgroundColor = grad.toLive(this.canvas.contextContainer);
    this.canvas.renderAll();
  }

  componentDidMount() {
    if (this.isMusic) {
      this.audio.addEventListener("ended", () => this.setState({ play: false }));
    }
    this.canvas = new fabric.Canvas("c", {
      width: 500,
      height: 720,
      defaultCursor: "default",
      moveCursor: "default",
    });

    this.canvas.on("mouse:up", this.togglePlay);

    this.setupBackground();

    if (this.content.filtre) {
      this.showFilter(this.content.filtre);
    }
  }

  hide(elment) {
    elment.classList.add("hidden");
  }

  togglePlay = () => {
    this.playpause.current.classList.remove("invisible");

    this.setState({ play: !this.state.play }, () => {
      if (this.isMusic) {
        this.state.play ? this.audio.play() : this.audio.pause();
      }
      this.className = this.state.play ? "fa fa-pause" : "fa fa-play";

      this.playpause.current.classList.remove("hidden");
      setTimeout(this.hide, 10, this.playpause.current);
    });
  };

  componentWillUnmount() {
    if (this.isMusic) {
      this.audio.pause();
      this.audio.removeEventListener("ended", () => this.setState({ play: false }));
    }

    let context = this.canvas.getContext("2d");
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render() {
    return (
      <div className="content">
        <div id="playpause" className="invisible" ref={this.playpause}>
          <i className={this.className} />
        </div>
        <canvas id="c" />
        <div id="account">@PolyAnimaux</div>
        <div id="title">{this.content.titre}</div>
        <div id="musique">
          <i className="fa fa-music" /> {this.content.musique}
        </div>

        <div id="likes">
          <i className="fa fa-heart" />
          <p>{this.content.vues | 0}</p>
          <div className="divider"></div>
          <i className="fa fa-comment" />
          <p>{Math.floor(this.content.vues / 100) | 0}</p>
          <div className="divider"></div>
          <i className="fa fa-share" />
          <p className="share">Share</p>
          <div className="divider"></div>
        </div>
      </div>
    );
  }
}
