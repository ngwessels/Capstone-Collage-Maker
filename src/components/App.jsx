import React from 'react';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import Error404 from './Error404';
import image from "../assets/images/wilderness.jpg";


function test(e) {
  let canvasGap = document.getElementById("myCanvas");
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  // var img = new Image();
  // var img.src = "../assets/images/wilderness.jpg";
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
  // console.log(e);

}

let canvasStyle = {

}

let imgStyle = {

}

function App(){
  return (
    <div>
      <div>
        <div>
          <canvas style={canvasStyle} onClick={test} id="myCanvas" ref="canvas" width={1000} height={600}/>
          <div style={{width: '100px', height: '100px'}} id="colorChoice"></div>
        </div>
        <img onClick={() => this.test(someparameter)} />
        <img style={imgStyle} src={image} alt="" id="myPic"/>
    </div>
    </div>
  );
}

export default App;
