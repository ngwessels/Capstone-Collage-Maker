import React from 'react';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import Error404 from './Error404';
import image from "../assets/images/wilderness.jpg";
import { Colors } from '../ApiCalls/apiColor';
import { Observable } from 'rxjs';
import { Grid } from './Grid';
import { BlockImages } from './BlockImages';
import PropTypes from 'prop-types';
import {CombineImages} from './CombineImages';
let blocks;



export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      array: {},
      colors: {},
      blocks: {},
    }
    this.main = this.main.bind(this);
  }

  apiFinished(info) {
    let combine = new CombineImages();
    combine.getData(info, blocks);
  }

  main() {
    const grid = new Grid;
    var img = document.getElementById("myPic");
    var width = img.clientWidth;
    var height = img.clientHeight;
    let canvasGap = document.getElementById("myCanvas");
    document.getElementById('myCanvas').width = width;
    document.getElementById('myCanvas').height = height;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.drawImage(img,1,1);
    // grid.secondImage(ctx2, img);
    const value = grid.findBestValue(width, height);
    // const value = 20;
    const array = grid.getColors(canvasGap, c, ctx, img, width, height);
    // this.setState(state => {
    //   const array = {this.state.array, array};
    //   return {
    //     array
    //   }
    // })
    console.log(this.state);
    blocks = grid.getBlocks(array, value, width, height);
    const yLength = blocks.length;
    const xLength = blocks[0].length;
    const totalBlocks = blocks.length * blocks[0].length;
    let apiColor = new Colors();
    // apiColor.apiCall(totalBlocks);
    let images = apiColor.tempImages();
    let total = 0;
    let lastY = 0;
    grid.createImage(yLength, xLength, blocks, grid, array, width, height, canvasGap, c, ctx, total, lastY, value);
    let blockImage = new BlockImages();
    blockImage.dominantImages(images, value, array);

  }


// <canvas style={firstPicture} id='firstPicture' ref='canvas' width={1000} height={900} />

  render() {

    let canvasStyle = {
    };

    let imgStyle = {
    };

    let firstPicture = {

    }

    let imageBlocks = {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
      margin: '0 auto'
    }

    let button = {
      width: '100px',
      height: '100px',
      backgroundColor: 'black',
      color: 'white',
      marginTop: '40px'
    }

    return (
      <div style={{width: '100%', height: '200vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <button style={button}onClick={this.main}>Click Me</button>
        <div style={imageBlocks}>
          <img style={imgStyle} src={image} alt="" id="myPic"/>
          <canvas style={canvasStyle} onClick={this.main} id="myCanvas"/>
          <p>Currently this program pixelates the image. Its seperating the image into small squares. There is a function that determines the best sized square based of size of image</p>
        </div>
        <div id='secondCanvas'/>
        <div id='firstPicture' />
      </div>
    );
  }
}
App.PropTypes = {

}

export default App;
