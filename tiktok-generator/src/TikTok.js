import React from "react";
import { fabric } from "fabric";
// import { FontAwesomeIcon } from 'react-fontawesome'
// import faPause from '@fortawesome/fontawesome-free-solid'

import "./css/Tiktok.css";
import allIWant from './assets/musics/all_i_want.mp3'
import bezosI from './assets/musics/bezos-i.mp3'
import september from './assets/musics/september.mp3'

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

  constructor(props) {
    super(props);
    this.content = this.props.content.json;
    this.canvas = null;
    let song = this.getSongFromProps();
    this.audio = new Audio(song);
    this.audio.loop = true;
    this.state = {
      play: true
    }

    this.playpause = React.createRef();
    this.className='fa fa-pause'
    this.audio.play()
  }

  getSongFromProps() {
    for(let url of this.URLS) {
      if (url.name === this.content.musique) { return url.url }
    }
  }

  componentDidMount() {
    this.audio.addEventListener('ended', () => this.setState({ play: false }));  
    this.canvas = new fabric.Canvas("c", {
      width: 500,
      height: window.innerHeight - 20,
    });

    this.canvas.on('mouse:up', this.togglePlay)
  }

  hide(elment) {
    elment.classList.add('hidden')
  }

  togglePlay = () => {
    this.playpause.current.classList.remove('invisible')

    this.setState({ play: !this.state.play }, () => {
      this.state.play ? this.audio.play() : this.audio.pause();
      this.className = this.state.play ? 'fa fa-pause' : 'fa fa-play'

      this.playpause.current.classList.remove('hidden')
      setTimeout(this.hide, 10, this.playpause.current);

    });
  }

  componentWillUnmount() {
    this.audio.pause();
    this.audio.removeEventListener('ended', () => this.setState({ play: false }));  
  }

  render() {
    return (
      <div>
        <div id="playpause" className="invisible" ref={this.playpause}><i className={this.className}/></div>
        <canvas id="c"/>
        <div id="account">@PolyAnimaux</div>
        <div id="title">{this.content.titre}</div>
        <div id="musique"><i className='fa fa-music'/> {this.content.musique}</div>

        <div id="likes">
          <i className='fa fa-heart'/>
          <p>{this.content.vues | 0}</p>
          <div className="divider"></div>
          <i className='fa fa-comment'/>
          <p>{Math.floor(this.content.vues / 100) | 0}</p>
          <div className="divider"></div>
          <i className='fa fa-share'/>
          <p className="share">Share</p></div>
          <div className="divider"></div>
      </div>
    );
  }
}
