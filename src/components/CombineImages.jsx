import React from 'react';
import Chart from 'chart.js'

let blocks;
let images;



class CombineImages extends React.Component {

  constructor(props) {
    super(props);

  }

  main(state, imagesPlaced) {
    blocks = state.blocks;
    images = state.images;
    var c = document.getElementById('myCanvas');
    var ctx = c.getContext('2d');
    const row = state.width / state.value;
    const column = state.height / state.value;
    const structuredColors = this.structuredColors(state.colors, row, column);
    let blocksTotal = (state.width / state.value) * (state.height / state.value);
    for(let y = 0; y < column - 1; y++) {
      for(let x = 0; x < row; x++) {
        const instance = structuredColors[y][x];
        const block = state.blocks[0][y][x];
        this.loop(x, y, instance, block, state.value, ctx, c, state.width, state.height);
      }
    }
    console.log('done');
    imagesPlaced(true);
    this.placeChart(state);
  }

  loop(x, y, structuredColors, block, value, ctx, c, width, height) {
    const newImageArray = [];
    const instanceLength = images[0].length;
    for(let i = 0; i < instanceLength; i++) {
      const instance = images[0][i];
      if(instance != images[0][0]) {
        const imageUrl = instance[0];
        const pixelValues = instance[1];
        const dominantColor = instance[2];
        const apiImageRed = dominantColor[0];
        const apiImageGreen = dominantColor[1];
        const apiImageBlue = dominantColor[2];
        const mainRed = structuredColors[0];
        const mainGreen = structuredColors[1];
        const mainBlue = structuredColors[2];
        const red = mainRed - apiImageRed;
        const green = mainGreen - apiImageGreen;
        const blue = mainBlue - apiImageBlue;
        if((red < 30 && red > -30) && (green < 30 && green > -30) && (blue < 30 && blue > -30)) {
          console.log('Perfect Image At Block', block, 'Dominant Color is', dominantColor);
          console.log(images);
          this.placeImage(pixelValues, block, ctx, c, width, height, value);
          images[0].splice(i, 1)
          console.log('new images length', images[0].length)
          return;
        }
      }
    }
  }

  placeImage(pixels, blocks, ctx, c, width, height, value) {
    let array = [];
    const toX = blocks[0] + value;
    const toY = blocks[1] + value;
    var imgData = ctx.getImageData(0, 0, c.width, c.height);
    let y = 0;
    for(let i = blocks[1]; i < toY; i++) {
      let row = [];
      let x = 0;
      for(let e = blocks[0]; e < toX; e++) {
        const red = pixels[y][x][0];
        const green = pixels[y][x][1];
        const blue = pixels[y][x][2];
        let pixelData = ctx.getImageData(e, i, 1, 1);
        let data = pixelData.data;
        let info = [data[0], data[1], data[2], data[3]];
        const index = (e + i * imgData.width) * 4;
        imgData.data[index+0] = red;
        imgData.data[index+1] = green;
        imgData.data[index+2] = blue;
        imgData.data[index+3] = 255;
        row.push(info);
        x++;
      }
      y++;
      array.push(row);
    }



    ctx.putImageData(imgData, 0, 0);
  }
  setPixel(imageData, x, y, r, g, b) {

    return imageData;
  }



  structuredColors(colors, row, column) {
    let array = [];
    let total = 0;
    for(let y = 0; y < column; y++) {
      let instance = [];
      for(let x = 0; x < row; x++) {
        instance.push(colors[total]);
        total++;
      }
      array.push(instance);
    }
    return array;
  }

  placeChart(state) {
    const graph = document.getElementById('graph')
    const ctx = graph.getContext('2d');
    const option = {
        scales: {
            xAxes: [{
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                gridLines: {
                    offsetGridLines: true
                }
            }]
        }
    };
    var myBarChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: [10, 20],
    options: option
    });
  }

}

export default CombineImages;
