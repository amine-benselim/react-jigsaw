import React, {Component} from "react";

import {DragDropContext} from "react-dnd";

import HTML5Backend from "react-dnd-html5-backend";

import Piece from "./Piece";

import Puzzle from "./Puzzle";

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {imgs: []};
  }

  renderImage(i, src) {
    const left = Math.floor(Math.random() * 400) + "px";

    const top = Math.floor(Math.random() * 200) + "px";

    const styles = {position: "absolute", top: top, left: left};

    return (
      <div key={i} style={styles}>
        <Piece src={src} />
      </div>
    );
  }

  componentDidMount() {
    this.loadImages("http://i.imgur.com/nEHF4E2.png", 4).then(images => {
      this.setState({imgs: images});
    });
  }

  loadImages(src, nb) {
    return new Promise(function(resolve, reject) {
      const img = new Image();

      let imgz = [];

      img.crossOrigin = "anonymous";

      img.src = src;

      img.onload = function() {
        const canvas = document.createElement("canvas");

        const ctx = canvas.getContext("2d");

        for (let j = 0; j < nb * nb; j++) {
          canvas.width = img.width / nb;

          canvas.height = 400 / nb;

          const pieceX = Math.floor(img.width / nb) * (j % nb);

          const pieceY = Math.floor(img.height / nb) * Math.floor(j / nb);

          ctx.drawImage(
            img,
            pieceX,
            pieceY,
            img.width / nb,
            400 / nb,
            0,
            0,
            canvas.width,
            canvas.height
          );

          let url = canvas.toDataURL();

          imgz.push(url);
        }

        resolve(imgz);
      };
    });
  }

  render() {
    var pieces = this.state.imgs.map((url, i) => {
      return this.renderImage(i, url);
    });

    const styles = {
      width: "auto",
      height: "650px",
      backgroundColor: "#ff9600",
      position: "relative",
      overflow: "hidden",
      display: "inline-flex",
      alignItems: "flex-end"
    };

    return (
      <div style={styles}>
        {pieces}
        <Puzzle width="800px" />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Board)
