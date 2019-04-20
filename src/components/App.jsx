import React from 'react';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import Error404 from './Error404';
import image from "../assets/images/wilderness.jpg";


function main(e) {
  colorBlock(e);
  const array = getColors();
  let value = 5;
  changeColors(value);
  const blocks = getBlocks(array, value);
  const ylength = blocks.length;
  const xlength = blocks[0].length;
  // let currentValue = blocks[1][595][0];
  // console.log(currentValue);
  let total = 0;
  let lastY = 0;
  for(let i = 0; i < ylength; i++) {

    for(let e = 0; e < xlength; e++) {
      const current = blocks[i][e];
      const x = current[0];
      const y = current[1];
      total++;
      if(blocks[i][e][0]) {
        let currentValue = (blocks[i][e][0] + value);
        let yValue = blocks[i][e][1] + value;
        getDominantColor(array, currentValue, x, y, yValue);
        lastY = yValue;
      } else {
      }

    }

  }
  console.log(total, lastY);

}

function getBlocks(array, value) {
  let startX = 0;
  let startY = 0;
  var img = document.getElementById("myPic");
  var width = img.clientWidth;
  var height = img.clientHeight;
  let area = (height * width) / value;
  let totalHeight = height / value;
  let totalWidth = width / value;
  let blocks = [];
  for(let y = 0; y < height; y = y + value) {
    let row = [];
    for(let x = 0; x < width; x = x + value) {
      let currentBlock = [x, y];
      row.push(currentBlock);
    }
    blocks.push(row);
  }
  console.log(blocks);
  return blocks;
}

function getDominantColor(array, value, xx, yy, yValue) {
  let canvasGap = document.getElementById("myCanvas");
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var img = document.getElementById("myPic");
  var width = img.clientWidth;
  var height = img.clientHeight;
  let xCoord = 0;
  let yCoord = 0;
  let color = [];
  let total = 0;
  for(let y = yy; y < yValue; y++) {
    for(let x = xx; x < value; x++) {
      if(!array[y][x]) {
        console.log(x, y);
      }
      let instance = array[y][x];
      let iLength = instance.length;
      let red = instance[0];
      let green = instance[1];
      let blue = instance[2];
      const colorLength = color.length;
      let isClose = false;
      for(let colorI = 0; colorI < colorLength; colorI++) {
        if(red >= (color[colorI][0] - 5) && red <= (color[colorI][0] + 5) && green >= (color[colorI][1] - 5) && green <= (color[colorI][1] + 5) && blue >= (color[colorI][2] - 5) && blue <= (color[colorI][2] + 5)) {
          let totalColor = color[colorI][3];
          color[colorI][3] = totalColor + 1;
          isClose = true;

        }
      }
      if(color.length == 0 || isClose == false) {
        color.push([red, green, blue, 0]);
      }
    }
  }
  let colorLength = color.length;
  let longest = [];
  for(let i = 0; i < colorLength; i++) {
    let instance = color[i][3];
    if(longest.length == 0) {
      longest = color[i];
    }
    if(longest[3] < instance) {
      longest = color[i];
    }
  }
  for(let y = yy; y < yValue; y++) {

    for(let x = xx; x < value; x++) {

      let newRed = longest[0];
      let newGreen = longest[1];
      let newBlue = longest[2];
      ctx.fillStyle = "rgba("+newRed+","+newGreen+","+newBlue+","+(255)+")";
      ctx.fillRect( x, y, 1, 1 );
    }}
}

function changeColors(value) {
  let canvasGap = document.getElementById("myCanvas");
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var img = document.getElementById("myPic");
  var width = img.clientWidth;
  var height = img.clientHeight;
  // for(let i = 1; i < height + 1; i++) {
  //   for(let e = 1; e < width + 1; e++) {
  //     ctx.fillStyle = "rgba("+0+","+0+","+0+","+(255)+")";
  //     ctx.fillRect( e, i, 1, 1 );
  //   }
  // }
}

function colorBlock(e) {
  let canvasGap = document.getElementById("myCanvas");
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var img = document.getElementById("myPic");
  ctx.drawImage(img,1,1);
  let actualX = Math.floor(e.pageX - canvasGap.offsetLeft);
  let actualY = Math.floor(e.pageY - canvasGap.offsetTop);

  let pixelData = ctx.getImageData(actualX, actualY, 1, 1);
  let data = pixelData.data;
  let red = data[0];
  let green = data[1];
  let blue = data[2];
  let alpha = data[3];
  let rgba = "rgba( " + red + ", " + green + ", " + blue + ", " + alpha + ")";
  document.getElementById("colorChoice").style.backgroundColor = rgba;
}

function getColors() {
  let array = [];
  let canvasGap = document.getElementById("myCanvas");
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var img = document.getElementById("myPic");
  var width = img.clientWidth;
  var height = img.clientHeight;
  for(let i = 1; i < height + 1; i++) {
    let row = [];
    for(let e = 1; e < width + 1; e++) {
      let pixelData = ctx.getImageData(e, i, 1, 1);
      let data = pixelData.data;
      let info = [data[0], data[1], data[2], data[3]];
      row.push(info);
    }
    array.push(row);
  }
  return array;
}

let canvasStyle = {

};

let imgStyle = {

};

function App(){
  return (
    <div>
      <div>
        <div>
          <canvas style={canvasStyle} onClick={main} id="myCanvas" ref="canvas" width={1000} height={900}/>
          <div style={{width: '100px', height: '100px'}} id="colorChoice"></div>
          <div style={{width: '20px', height: '20px', backgroundColor: 'black'}}></div>
        </div>
        <img onClick={() => this.main(someparameter)} />
        <img style={imgStyle} src={image} alt="" id="myPic"/>
    </div>
    </div>
  );
}

export default App;
