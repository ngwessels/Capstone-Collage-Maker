export class Grid {



// Gets the height and width of image. From there it determines the best pixel size for each box. For example if a picture is 355px in height and 625px in width each grid is going to be 5px by 5px
  findBestValue(width, height) {
    let min = 5;
    console.log(width, height);
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

  //This runs through every grid and calls getDominantColor to get dominant color of every grid

  createImage(yLength, xLength, blocks, grid, array, width, height, canvasGap, c, ctx, total, lastY, value) {
    let that = this;
    for(let i = 0; i < yLength; i++) {
      for(let e = 0; e < xLength; e++) {
        const current = blocks[i][e];
        const x = current[0];
        const y = current[1];
        total++;
        if(blocks[i][e]) {
          let currentValue = (blocks[i][e][0] + value);
          let yValue = blocks[i][e][1] + value;
          that.getDominantColor(array, currentValue, x, y, yValue, width, height, canvasGap, c, ctx);
        }
      }
    }
  }




// THis is similar to a css grid but im having to do it based off the value that findBestValue() is returning. It gets starting pixel for every grid in every row and appends it to an array
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

  // THis is getting the dominant color in every grid. It get every pixels color and than find the color that appears most often and adds it to an array. It will than call the changeColors function at the end

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

    this.changeColors(color, colorLength, longest, yy, xx, yValue, value, ctx);
  }


  // This changes the color of every grid to its dominat color given to it from getDominantColor

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


  // getColors makes a canvas and adds selected image

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








  // Functions below are experimental and may not serve a purpose at this point


  secondImage(ctx, image) {
    image.width = 5;
    image.height = 5;
    ctx.drawImage(image, 100, 100);
  }
}
