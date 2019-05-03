import React from 'react';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import Error404 from './Error404';
import image from "../assets/images/bird.jpg";
import { Colors } from '../ApiCalls/apiColor';
import { Observable } from 'rxjs';

export class Mains {
  colors: Observable<any[]>;
  runColors() {
    let api = new Colors();
    this.colors = api.colors;
  }
  currentMain() {
    let that = this;
    setInterval(function() {
      that.runColors();
      // console.log(that.colors);
    }, 6000)
  }
}



function main(e) {
  var img = document.getElementById("myPic");
  var width = img.clientWidth;
  var height = img.clientHeight;
  let canvasGap = document.getElementById("myCanvas");
  var c = document.getElementById("myCanvas");
  var c2 = document.getElementById('firstPicture');
  var ctx2 = c2.getContext('2d');
  var ctx = c.getContext("2d");
  secondImage(ctx2, img);
  // const value = findBestValue(width, height);
  let value = 5;
  colorBlock(e, canvasGap, c, ctx, img);
  const array = getColors(canvasGap, c, ctx, img, width, height);
  const blocks = getBlocks(array, value, width, height);
  const ylength = blocks.length;
  const xlength = blocks[0].length;

  const totalBlocks = blocks.length * blocks[0].length;
  let mains = new Mains();
  mains.runColors();
  mains.currentMain();
  let apiColor = new Colors();
  // apiColor.apiCall(totalBlocks);

  let total = 0;
  let lastY = 0;
  for(let i = 0; i < ylength; i++) {
    for(let e = 0; e < xlength; e++) {
      const current = blocks[i][e];
      const x = current[0];
      const y = current[1];
      total++;
      if(blocks[i][e]) {
        let currentValue = (blocks[i][e][0] + value);
        let yValue = blocks[i][e][1] + value;
        getDominantColor(array, currentValue, x, y, yValue, width, height, canvasGap, c, ctx);
      }
    }
  }
}





function findBestValue(width, height) {
  let min = 3;
  let isGood = false;
  while(isGood == false) {
    if(width % min == 0 && height % min == 0) {
      isGood = true;

    }
    else {
      min = min + 1;
    }
  }
  return min;
}




function getBlocks(array, value, width, height) {
  let startX = 0;
  let startY = 0;
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

  return blocks;
}





function getDominantColor(array, value, xx, yy, yValue, width, height, canvasGap, c, ctx) {
  let xCoord = 0;
  let yCoord = 0;
  let color = [];
  let total = 0;
  for(let y = yy; y < yValue; y++) {
    for(let x = xx; x < value; x++) {
      let instance;
      if(array[y][x]) {
        instance = array[y][x];
      } else {
      }
      let iLength;
      if(array[y][x]) {
        iLength = instance.length;
      } else {
        iLength = 0;
      }
      if(iLength > 0) {
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
  }
  let colorLength = color.length;
  let longest = [];

  changeColors(color, colorLength, longest, yy, xx, yValue, value, ctx);
}





function changeColors(color, colorLength, longest, yy, xx, yValue, value, ctx) {
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
    }
  }
}






function secondImage(ctx, image) {
  image.width = 5;
  image.height = 5;
  ctx.drawImage(image, 100, 100);
}




function colorBlock(e, canvasGap, c, ctx, img) {
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




function getColors(canvasGap, c, ctx, img, width, height) {
  let array = [];
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

let firstPicture = {

}





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
      <canvas style={firstPicture} id='firstPicture' ref='canvas' width={1000} height={900} />
    </div>
  );
}

export default App;
