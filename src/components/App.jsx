import React from 'react';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import Error404 from './Error404';
import image from "../assets/images/bird.jpg";
import { Colors } from '../ApiCalls/apiColor';
import { Observable } from 'rxjs';
import { Grid } from './Grid';




function main() {
  const grid = new Grid;
  var img = document.getElementById("myPic");
  var width = img.clientWidth;
  var height = img.clientHeight;
  let canvasGap = document.getElementById("myCanvas");
  var c = document.getElementById("myCanvas");
  var c2 = document.getElementById('firstPicture');
  var ctx2 = c2.getContext('2d');
  var ctx = c.getContext("2d");
  ctx.drawImage(img,1,1);
  grid.secondImage(ctx2, img);
  const value = grid.findBestValue(width, height);
  // let value = 5;
  const array = grid.getColors(canvasGap, c, ctx, img, width, height);
  const blocks = grid.getBlocks(array, value, width, height);
  const yLength = blocks.length;
  const xLength = blocks[0].length;
  const totalBlocks = blocks.length * blocks[0].length;
  let apiColor = new Colors();
  // apiColor.apiCall(totalBlocks);
  let images = apiColor.tempImages();
  let total = 0;
  let lastY = 0;
  grid.createImage(yLength, xLength, blocks, grid, array, width, height, canvasGap, c, ctx, total, lastY, value);
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
      <button onClick={main}></button>
      <div>
        <div>
          <canvas style={canvasStyle} onClick={main} id="myCanvas" ref="canvas" width={1000} height={900} />
        </div>
        <img style={imgStyle} src={image} alt="" id="myPic"/>
      </div>
      <canvas style={firstPicture} id='firstPicture' ref='canvas' width={1000} height={900} />
    </div>
  );
}

export default App;
