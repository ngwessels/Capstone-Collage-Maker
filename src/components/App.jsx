import React from 'react';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import Error404 from './Error404';
import image from "../assets/images/bird.jpg";
import { Colors } from '../ApiCalls/apiColor';
import { Observable } from 'rxjs';
import { Grid } from './Grid';




function main(e) {
  const grid = new Grid;
  var img = document.getElementById("myPic");
  var width = img.clientWidth;
  var height = img.clientHeight;
  let canvasGap = document.getElementById("myCanvas");
  var c = document.getElementById("myCanvas");
  var c2 = document.getElementById('firstPicture');
  var ctx2 = c2.getContext('2d');
  var ctx = c.getContext("2d");
  grid.secondImage(ctx2, img);
  const value = grid.findBestValue(width, height);
  console.log(value);
  // let value = 5;
  grid.colorBlock(e, canvasGap, c, ctx, img);
  const array = grid.getColors(canvasGap, c, ctx, img, width, height);
  const blocks = grid.getBlocks(array, value, width, height);
  const ylength = blocks.length;
  const xlength = blocks[0].length;

  const totalBlocks = blocks.length * blocks[0].length;
  let apiColor = new Colors();
  // apiColor.apiCall(totalBlocks);
  let images = apiColor.tempImages();

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
        grid.getDominantColor(array, currentValue, x, y, yValue, width, height, canvasGap, c, ctx);
      }
    }
  }
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
