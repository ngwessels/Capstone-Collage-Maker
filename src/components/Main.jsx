import React from 'react';
import PropTypes from 'prop-types';
import {CombineImages} from './CombineImages';
import { BlockImages } from './BlockImages';
import { Grid } from './Grid';
import image from "../assets/images/luke.jpg";



class Main extends React.Component {

  constructor(props) {
    super(props);

    this.main = this.main.bind(this);
    this.getImages = this.getImages.bind(this);
  }

  apiFinished(info) {
    let combine = new CombineImages();
    combine.getData(info, blocks);
  }



  apiDominantImages(skip, num) {
    let colors = ["Black", "Blue", "Brown", "Gray", "Green", "Orange", "Pink", "Purple", "Red", "Teal", "White", "Yellow"];
    let currentColor = colors[num];
    var myHeaders = new Headers();
    myHeaders.append('Ocp-Apim-Subscription-Key', process.env.imageAPI);
    let that = this;
    var myInit = {
      method: 'GET',
      headers: myHeaders
    };
    var myRequest = new Request(`https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=cats&count=150&offset=${skip}&mkt=en-us&safeSearch=Moderate&width=100&height=100&imageType=Photo&color=${currentColor}`, myInit);
    fetch(myRequest)
      .then(response => {
        return response.json()
      })
      .then(data => {
        let arrayString = [];
        let arrayLength = data.value.length;
        for(let i = 0; i < arrayLength; i++) {
          let currentData = data.value[i].contentUrl;
          arrayString.push([currentData]);
        }
        that.props.updateImage(arrayString, arrayLength);
      })
      .catch(err => {
      })

  }




  getImages(needed) {
    let that = this;
    let a = 0;
    for(let i = 0; i <= needed; i = i + 130) {
      setTimeout(function() {
        const random = Math.floor(Math.random() * 12);
        const randomSkip = Math.floor(Math.random() * 100);
        that.apiDominantImages(randomSkip, random);
        console.log(a, i);
        if(a == i) {
          that.props.isFinished(true);
        }
        a++
      }, 400 * a)

    }
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
    // const value = 10;
    this.props.updateSize(width, height, value);
    const array = grid.getColors(canvasGap, c, ctx, img, width, height);
    this.props.updateArray(array);
    const blocks = grid.getBlocks(array, value, width, height);
    this.props.updateBlocks(blocks);
    const yLength = blocks.length;
    const xLength = blocks[0].length;
    const totalBlocks = blocks.length * blocks[0].length;
    this.props.updateTotalBlocks(totalBlocks);
    let imagesNeeded = ((width / value) * (height / value));
    console.log('imagesNeeded', imagesNeeded);
    let that = this;
    this.getImages(imagesNeeded);
    let total = 0;
    let lastY = 0;
    grid.createImage(yLength, xLength, blocks, grid, array, width, height, canvasGap, c, ctx, total, lastY, value, this.props.updateColors);


  }


  render() {
    console.log(this.props.stringLength);
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
        </div>
        <div id='secondCanvas'/>
        <div id='firstPicture' />
      </div>
    );
  }

}
Main.propTypes = {
  colors: PropTypes.object,
  blocks: PropTypes.object,
  updateArray: PropTypes.func,
  updateBlocks: PropTypes.func,
  updateColors: PropTypes.func,
  updateImages: PropTypes.func,
  isFinished: PropTypes.func,
  updateSize: PropTypes.func,
  updateImage: PropTypes.func,
  string: PropTypes.array,
  stringLength: PropTypes.number,
  totalBlocks: PropTypes.number,
  updateTotalBlocks: PropTypes.func,
}

export default Main;
