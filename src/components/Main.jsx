import React from 'react';
import PropTypes from 'prop-types';
import {CombineImages} from './CombineImages';
import { BlockImages } from './BlockImages';
import { Grid } from './Grid';
import image from '../assets/images/bird.jpg';
const { c } = constants;
import constants from './../constants';
const { firebaseConfig } = constants;
import Firebase from 'firebase';
import './masterStyles.scss';




firebase.initializeApp(firebaseConfig);
let alreadyCalled = false

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      enoughCalled: 0,
      needed: 0,
      progress: 0,
    };

    this.main = this.main.bind(this);
    this.getImages = this.getImages.bind(this);
    this.apiTotal = this.apiTotal.bind(this);
    this.needed = this.needed.bind(this);
    this.change = this.change.bind(this);
    this.displayGraph = this.displayGraph.bind(this);
  }

  apiFinished(info) {
    let combine = new CombineImages();
    combine.getData(info, blocks, this.imagesPlaced);
  }


  apiDominantImages(skip, num, randomObject) {
    let colors = ['Black', 'Blue', 'Brown', 'Gray', 'Green', 'Orange', 'Pink', 'Purple', 'Red', 'Teal', 'White', 'Yellow'];
    let object = this.props.state.masterState.apiInformation[randomObject][0];
    console.log(object);
    let currentColor = colors[num];
    object = object.replace(' ', '+')
    console.log(object);
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
        console.log('Error on bing image api, should auto fix')
        that.apiTotal(0);
      });
  }

  needed(e) {
    this.setState({needed: e});
  }

  enoughCalled() {
    const current = this.state.progress;
    const progress = document.getElementById('progressBar');
    progress.value = (current + ((this.state.enoughCalled / this.state.needed) * 50))
    console.log(this.state.enoughCalled, this.state.needed)
    if(this.state.enoughCalled > this.state.needed) {
      return true;
    } else {
      return false;
    }
  }


  apiTotal(e) {
    const current = this.state.enoughCalled;
    const newNum = current + e;
    this.setState({enoughCalled: newNum});
    this.callAgain();
  }

  callAgain() {
    if(this.state.enoughCalled < this.state.needed) {
      this.getImages();
      console.log('call again')
    } else if(alreadyCalled == false){
      const current = this.state.progress;
      const progress = document.getElementById('progressBar');
      const totalProgress = (current + ((this.state.enoughCalled / this.state.needed) * 30));
      progress.value = (current + ((this.state.enoughCalled / this.state.needed) * 30))
      this.state.progress = totalProgress;
      this.props.isFinished(true, totalProgress);
      alreadyCalled = true;
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

  resizeImage() {
    const img = document.getElementById('myPic');
    const height = img.clientHeight;
    const width = img.clientWidth;
    let isNewHeight;
    let isNewWidth;

    if(height % 20 != 0) {
      const remainder = height % 20;
      if(remainder > 10) {
        const newHeight = 10 - remainder;
        isNewHeight = height + newHeight;
      } else {
        const newHeight = 10 - remainder;
        isNewHeight = height - newHeight;
      }
    } else {
      isNewHeight = height;
    }
    if(width % 20 != 0) {
      const remainder = height % 20;
      if(remainder > 10) {
        const newWidth = 10 - remainder;
        isNewWidth = width + newWidth;
      } else {
        const newWidth = 10 - remainder;
        isNewWidth = width - newWidth;
      }
    } else {
      isNewWidth = width;
    }
    const size = [isNewHeight, isNewWidth];
    console.log('Image Height', img.clientHeight, 'Image Width', img.clientWidth)
    return size;
  }


  main() {
    const grid = new Grid;
    var xhr = new XMLHttpRequest();
    var img = document.getElementById('myPic');
    img.src = require(`../assets/images/${this.props.state.masterState.imageURL[1].name}`);
    let that = this;
    const props = this.props;
    setTimeout(function() {
      const newSize = that.resizeImage();
      var width = img.clientWidth;
      var height = img.clientHeight;
      let canvasGap = document.getElementById('myCanvas');
      document.getElementById('myCanvas').width = newSize[1];
      document.getElementById('myCanvas').height = newSize[0];
      var c = document.getElementById('myCanvas');
      var ctx = c.getContext('2d');
      ctx.drawImage(img,1,1);
      props.updateCTX(ctx);
      const value = grid.findBestValue(newSize[1], newSize[0]);
      // const value = 200;
      console.log('Grid size is', value, 'pixels')
      props.updateSize(newSize[1], newSize[0], value);
      const array = grid.getColors(canvasGap, c, ctx, img, newSize[1], newSize[0]);
      props.updateArray(array);
      const blocks = grid.getBlocks(array, value, newSize[1], newSize[0]);
      props.updateBlocks(blocks);
      const yLength = blocks.length;
      const xLength = blocks[0].length;
      const totalBlocks = blocks.length * blocks[0].length;
      props.updateTotalBlocks(totalBlocks);
      let imagesNeeded = ((width / value) * (height / value));
      imagesNeeded = imagesNeeded * 16;
      console.log('Total Images Needed', imagesNeeded);
      img.style.display = 'none';
      that.needed(imagesNeeded);
      for(let i = 0; i < 150; i++) {
        that.getImages();

      }

      let total = 0;
      let lastY = 0;
      grid.createImage(yLength, xLength, blocks, grid, array, newSize[1], newSize[0], canvasGap, c, ctx, total, lastY, value, props.updateColors);

    }, 5000)

  }



  change(e) {
    const progressBar = document.getElementById('progressBar');
    progressBar.value = 2;
    document.getElementById('fileButton').style.display = 'none';
    let that = this;

    var file = e.target.files[0];
    var storageRef = firebase.storage().ref(`images/${file.name}`);
    storageRef.put(file)
    setTimeout(function() {
      storageRef.getDownloadURL().then((url) => {
        var data = null;
        var xhr = new XMLHttpRequest();
        // xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            progressBar.value = 5;
            const result = JSON.parse(this.responseText);
            let instance = result.result.tags;
            console.log(instance);
            let array = [];
            let length = instance.length;
            for(let i = 0; i < length; i++) {
              if(instance[i].confidence > 51) {
                const current = instance[i].tag.en;
                const confidence = instance[i].confidence;
                array.push([current, confidence]);
              }
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
            that.displayGraph();
            that.main();
          }
        });
        xhr.open("GET", "https://api.imagga.com/v2/tags?image_url=" + encodeURIComponent(url));
        xhr.setRequestHeader("authorization", process.env.immaga);
        // xhr.setRequestHeader('Access-Control-Allow-Origin', null)
        xhr.send(data);
    }).catch(function(error) {
      console.log('Error')
    });
  }, 3000)
  }


  displayGraph() {
    const state = this.props.state.masterState.apiInformation;
    console.log(state.length)
    const length = state.length;
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'purple', 'white', 'lightred', 'lightorange', 'lightyellow', 'limegreen', 'lightgrey'];
    let current = [];
    let backgroundColor = [];
    let currentData = [];
    let currentLabels = [];
    for(let i = 0; i < length; i++) {
      const instance = state[i];
      if(i <= 12) {
        // currentData.push({labels: instance[0], data: [instance[1]], backgroundColor: colors[i]})
        current.push(instance[1]);
        backgroundColor.push(colors[i]);
        currentLabels.push(instance[0])
      }
    }
    this.state.progress = 10;
    this.forceUpdate();
    currentData.push({label: "What is in this Image?", data: current, backgroundColor: backgroundColor});
    console.log(currentData)
    console.log(currentLabels)
    const graph = document.getElementById('graph')
    const ctx = graph.getContext('2d');
    const option = {
      scales: {
        xAxes: [{
          barPercentage: 2,
          barThickness: 20,
          maxBarThickness: 20,
          minBarLength: 2,
          gridLines: {
            offsetGridLines: true,
            color: 'lightgrey'
          }
        }],
        yAxes: [{
          gridLines: {
            color: 'lightgrey'
          }
        }]
      }
    };
    var myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: currentLabels,
        datasets: currentData
      },
      options: option
    });

  }


  render() {
    let that = this;


    let canvasStyle = {
      position: 'absolute'
    };

    let imgStyle = {
      position: 'absolute'
    };

    let firstPicture = {

    };

    let imageBlocks = {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
      margin: '0 auto',
      flexWrap: 'wrap',
      position: 'absolute',
      zIndex: '2',
      marginTop: '600px'
    };

    let button = {
      width: '100px',
      height: '100px',
      backgroundColor: 'black',
      color: 'white',
      marginTop: '40px'
    };

    let upload = {
      zIndex: '1',
      position: 'absolute',
      margin: '0',
      color: 'white',
      marginTop: '300px',
      marginLeft: '2%'
    }

    let container = {
      zIndex: '-1',
      overflow: 'hidden',
    }

    return (
      <div style={{width: '100%', height: '400vh', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'black'}}>
        <progress id='progressBar' value="0" max="100" style={{width: '80%'}}></progress>
        <input style={upload} className='upload' type='file' id='fileButton' onChange={this.change} />
        <canvas id='graph' style={{position: 'absolute', marginTop: '1200px', zIndex: '0', marginTop: '100px', maxWidth: '800px', maxHeight: '500px', width: '60%', height: '50%', }}/>
        <div style={imageBlocks}>
          <img style={imgStyle} src='' alt="" id="myPic"/>
          <canvas style={canvasStyle} id="myCanvas"/>
        </div>
        <div style={container} >
          <div id='secondCanvas' style={{zIndex: '-1'}}/>
          <div id='firstPicture' style={{zIndex: '-1'}}/>
        </div>
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
