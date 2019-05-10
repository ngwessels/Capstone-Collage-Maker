import React from 'react';




class CombineImages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      row: 0,
      column: 0,
      structureColors: [],
      blocks: [],
      blocksTotal: 0,
    }
  }

  main(state) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    const row = state.width / state.value;
    const column = state.height / state.value;
    const structuredColors = this.structuredColors(state.colors, row, column);
    let blocksTotal = (state.width / state.value) * (state.height / state.value);
    // console.log('Blocks Total', blocksTotal);
    // console.log('Structured Array', structuredColors);
    // console.log('Blocks Array', state.blocks);
    // console.log('Images Array', state.images);
    for(let y = 0; y < column - 1; y++) {
      for(let x = 0; x < row; x++) {
        const instance = structuredColors[y][x];
        const block = state.blocks[0][y][x];
        this.loop(x, y, instance, state.images, block, state.value, ctx, c, state.width, state.height);
      }
    }
    console.log('done');
  }

  loop(x, y, structuredColors, images, block, value, ctx, c, width, height) {
    // console.log('x', x, 'y', y, 'dominantColor', structuredColors, 'image', images, 'blocks', blocks, 'value', value);
    const newImageArray = [];
    console.log(images);
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
        // console.log('dominantColor', dominantColor, 'red', red, 'green', green, 'blue', blue)
        if((red < 5 && red > -5) && (green < 5 && green > -5) && (blue < 5 && blue > -5)) {
          console.log('Perfect Image At Block', block, 'Dominant Color is', dominantColor);
          this.placeImage(pixelValues, block, ctx, c, width, height, value);
          return;
        }
      }
    }

  }

  placeImage(pixels, blocks, ctx, c, width, height, value) {
    // console.log(pixels);
    let array = [];
    const toX = blocks[0] + value;
    const toY = blocks[1] + value;
    var imgData = ctx.getImageData(0, 0, c.width, c.height);
    // console.log('Placing Image between x:', blocks[0], 'and x:', toX, 'and y:', blocks[1], 'and y:', toY);
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

}

export default CombineImages;
