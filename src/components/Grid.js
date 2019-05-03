

export class Grid {

  findBestValue(width, height) {
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




  getBlocks(array, value, width, height) {
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





  getDominantColor(array, value, xx, yy, yValue, width, height, canvasGap, c, ctx) {
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
  changeColors(color, colorLength, longest, yy, xx, yValue, value, ctx) {
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






  secondImage(ctx, image) {
    image.width = 5;
    image.height = 5;
    ctx.drawImage(image, 100, 100);
  }




  colorBlock(e, canvasGap, c, ctx, img) {
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




  getColors(canvasGap, c, ctx, img, width, height) {
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



}
