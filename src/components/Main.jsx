import React from 'react';
import PropTypes from 'prop-types';
import {CombineImages} from './CombineImages';
import { BlockImages } from './BlockImages';
import { Grid } from './Grid';
import image from "../assets/images/wilderness.jpg";
import { Colors } from '../ApiCalls/apiColor';



class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
    this.state = {
      array: props.array,
      colors: props.colors,
      blocks: props.blocks,
      updateArray: props.updateArray,
      updateBlocks: props.updateBlocks,
      updateColors: props.updateColors,
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
    const value = grid.findBestValue(width, height);
    const array = grid.getColors(canvasGap, c, ctx, img, width, height);
    this.state.updateArray(array);
    const blocks = grid.getBlocks(array, value, width, height);
    this.state.updateBlocks(blocks);
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


Main.propTypes = {
  colors: PropTypes.array,
  blocks: PropTypes.array,
  colors: PropTypes.array,
  updateArray: PropTypes.func,
  updateBlocks: PropTypes.func,
  updateColors: PropTypes.func,
}

export default Main;
