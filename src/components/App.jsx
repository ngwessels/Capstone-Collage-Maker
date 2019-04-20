import React from 'react';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import Error404 from './Error404';
import image from "../assets/images/wilderness.jpg";


function main(e) {
  colorBlock(e);
  const array = getColors();
  changeColors(20);
  getDominantColor(array, 20);
}

function getDominantColor(array, value) {
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
  for(let y = 0; y < value; y++) {
    for(let x = 0; x < value; x++) {
      let instance = array[y][x];
      let iLength = instance.length;
      let red = instance[0];
      let green = instance[1];
      let blue = instance[2];
      const colorLength = color.length;
      let isClose = false;
      for(let colorI = 0; colorI < colorLength; colorI++) {
        if(red <= (color[colorI][0] - 100) && red >= (color[colorI][0] + 100)) {
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
  console.log(color.length);
  // for(let y = 0; y < value; y++) {
  //   for(let x = 0; x < value; x++) {
  //     let newRed = (averageRed / total);
  //     let newGreen = (averageGreen / total);
  //     let newBlue = (averageBlue / total);
  //     console.log(newRed, newGreen, newBlue);
  //     ctx.fillStyle = "rgba("+newRed+","+newGreen+","+newBlue+","+(255)+")";
  //     ctx.fillRect( x, y, 1, 1 );
  //   }}
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
  console.log(red, green, blue, alpha);
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
  console.log(width, height);
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
  console.log(array);
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
