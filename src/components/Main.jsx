import React from 'react';
import PropTypes from 'prop-types';
import {CombineImages} from './CombineImages';
import { BlockImages } from './BlockImages';
import { Grid } from './Grid';
import image from '../assets/images/bird.jpg';
const { c } = constants;
import constants from './../constants';
const { firebaseConfig } = constants;
import Firebase from 'firebase'



class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      enoughCalled: 0,
      needed: 0,
    };

    this.main = this.main.bind(this);
    this.getImages = this.getImages.bind(this);
    this.apiTotal = this.apiTotal.bind(this);
    this.needed = this.needed.bind(this);
    this.change = this.change.bind(this);
  }

  apiFinished(info) {
    let combine = new CombineImages();
    combine.getData(info, blocks, this.imagesPlaced);
  }


  apiDominantImages(skip, num, randomobject) {
    let colors = ['Black', 'Blue', 'Brown', 'Gray', 'Green', 'Orange', 'Pink', 'Purple', 'Red', 'Teal', 'White', 'Yellow'];
    console.log(this.props.state.masterState)
    let objects = this.props.state.masterState.apiInformation;
    let currentColor = colors[num];
    const object = objects[randomobject];
    var myHeaders = new Headers();
    myHeaders.append('Ocp-Apim-Subscription-Key', process.env.imageAPI);
    let that = this;
    var myInit = {
      method: 'GET',
      headers: myHeaders
    };
    var myRequest = new Request(`https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${object}&count=150&offset=${skip}&mkt=en-us&safeSearch=Moderate&width=100&height=100&imageType=Photo&color=${currentColor}`, myInit);
    fetch(myRequest)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let arrayString = [];
        let arrayLength = data.value.length;
        for(let i = 0; i < arrayLength; i++) {
          let currentData = data.value[i].contentUrl;
          arrayString.push([currentData]);
        }
        that.props.updateImage(arrayString, arrayLength);
        that.apiTotal(arrayLength);
      })
      .catch(err => {
      });
  }

  needed(e) {
    this.setState({needed: e});
  }

  enoughCalled() {
    if(this.state.enoughCalled > this.state.needed) {
      return true;
    } else {
      return false;
    }
  }


  apiTotal(e) {
    console.log(this.state.enoughCalled + e);
    const current = this.state.enoughCalled;
    const newNum = current + e;
    this.setState({enoughCalled: newNum});
    this.callAgain();
  }

  callAgain() {
    if(this.state.enoughCalled < this.state.needed) {
      this.getImages();
    } else {
      this.props.isFinished(true);
    }
  }


  getImages() {
    let that = this;
    let i = 0;
    let objectLength = this.props.state.masterState.apiInformation.length
    const random = Math.floor(Math.random() * 12);
    const randomSkip = Math.floor(Math.random() * 100);
    const randomObject = Math.floor(Math.random() * objectLength);
    this.apiDominantImages(randomSkip, random, randomObject);
    const result = this.enoughCalled();

  }


  main() {
    const grid = new Grid;
    console.log(this.props.state.masterState.imageURL[1].name)
    var xhr = new XMLHttpRequest();
    var img = document.getElementById('myPic');
    img.src = require(`../assets/images/${this.props.state.masterState.imageURL[1].name}`);
    let that = this;
    const props = this.props;
    setTimeout(function() {
      var width = img.clientWidth;
      var height = img.clientHeight;
      let canvasGap = document.getElementById('myCanvas');
      document.getElementById('myCanvas').width = width;
      document.getElementById('myCanvas').height = height;
      var c = document.getElementById('myCanvas');
      var ctx = c.getContext('2d');
      ctx.drawImage(img,1,1);
      console.log(props);
      props.updateCTX(ctx);
      // const value = grid.findBestValue(width, height);
      const value = 20;
      props.updateSize(width, height, value);
      const array = grid.getColors(canvasGap, c, ctx, img, width, height);
      props.updateArray(array);
      const blocks = grid.getBlocks(array, value, width, height);
      props.updateBlocks(blocks);
      const yLength = blocks.length;
      const xLength = blocks[0].length;
      const totalBlocks = blocks.length * blocks[0].length;
      props.updateTotalBlocks(totalBlocks);
      let imagesNeeded = ((width / value) * (height / value));
      imagesNeeded = imagesNeeded * 12;
      that.needed(imagesNeeded);
      console.log('Images Needed', imagesNeeded);
      that.getImages();
      let total = 0;
      let lastY = 0;
      grid.createImage(yLength, xLength, blocks, grid, array, width, height, canvasGap, c, ctx, total, lastY, value, props.updateColors);

    }, 5000)



  }



  change(e) {
    let that = this;
    firebase.initializeApp(firebaseConfig);
    console.log(e);
    var file = e.target.files[0];
    console.log(file);
    console.log(file);
    var storageRef = firebase.storage().ref(`images/${file.name}`);
    storageRef.put(file)
    setTimeout(function() {
      storageRef.getDownloadURL().then((url) => {
        console.log(url)
        var data = null;
        var xhr = new XMLHttpRequest();
        // xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            const result = JSON.parse(this.responseText);
            let instance = result.result.tags;
            let array = [];
            let length = instance.length;
            for(let i = 0; i < length; i++) {
              const current = instance[i].tag.en;
              array.push(current);
            }
            const action = {
              type: 'IMAGERESULT',
              result: array,
            }
            const actionImage = {
              type: 'IMAGEURL',
              result: [url, file],
            }
            const { dispatch } = that.props.state;
            dispatch(action);
            dispatch(actionImage)
            console.log(this.responseText)
            that.main();
          }
        });
        xhr.open("GET", "https://api.imagga.com/v2/tags?image_url=" + encodeURIComponent(url));
        xhr.setRequestHeader("authorization", "Basic YWNjXzlhNGFlMGQ4MjBiNzYzODo1NWUxZGE1YmZkMDljZTZmNTRmMDU2ZmVjNDY3YzI4OQ==");
        // xhr.setRequestHeader('Access-Control-Allow-Origin', null)
        xhr.send(data);
    }).catch(function(error) {
      console.log('Error')
    });
  }, 3000)
  }


  render() {
    console.log(this.props)
    let canvasStyle = {
    };

    let imgStyle = {
    };

    let firstPicture = {

    };

    let imageBlocks = {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
      margin: '0 auto'
    };

    let button = {
      width: '100px',
      height: '100px',
      backgroundColor: 'black',
      color: 'white',
      marginTop: '40px'
    };

    return (
      <div style={{width: '100%', height: '9000vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <button style={button} onClick={this.main}>Click Me</button>

        <input type='file' id='fileButton' onChange={this.change}/>



        <div style={imageBlocks}>
          <img style={imgStyle} src='' alt="" id="myPic"/>
          <canvas style={canvasStyle} onClick={this.main} id="myCanvas"/>
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
  updateCTX: PropTypes.func,
  state: PropTypes.object,
};

export default Main;
