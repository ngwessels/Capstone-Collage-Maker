


export class BlockImages {



  dominantImages(imgs, value) {
    console.log(imgs)
    let that = this;
    const length = imgs.length;
    let array = [];
    var c2 = document.getElementById('secondCanvas');
    var ctx2 = c2.getContext('2d');
    ctx2.clearRect(0, 0, value, value);
    document.getElementById('firstPicture').removeAttribute('src');
    let image = [];
    for(let i = 0; i < length; i++) {
      image[i] = new Image();
      image[i] = document.getElementById("firstPicture");
      image[i].crossOrigin = "Anonymous";
      image[i].width = value;
      image[i].height = value;
      image[i].src = '#';
      image[i].src = imgs[i];
      console.log(image[i].src);
      document.getElementById('secondCanvas').width = value;
      document.getElementById('secondCanvas').height = value;
      that.runningImage(image[i], ctx2, c2, value);
    }
  }

  runningImage(image, ctx2, c2, value) {
    let that = this;
    image.onload = function(){
      ctx2.drawImage(image,1,1,value, value);
      const pictureColors = that.getColors(c2, ctx2, image, value, value);
      const dominantColor = that.dominantColor(pictureColors, value);
    }
  }


  dominantColor(array, value) {
    let color = [];
    for(let y = 0; y < value; y++) {
      for(let x = 0; x < value; x++) {
        const instance = array[y][x];
        let red = instance[0];
        let green = instance[1];
        let blue = instance[2];
        const colorLength = color.length;
        let isClose = false;
        for(let colorI = 0; colorI < colorLength; colorI++) {
          if(red >= (color[colorI][0] - 10) && red <= (color[colorI][0] + 10) && green >= (color[colorI][1] - 10) && green <= (color[colorI][1] + 10) && blue >= (color[colorI][2] - 10) && blue <= (color[colorI][2] + 10)) {
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
    let longestStart = 0;
    for(let i = 0; i < colorLength; i++) {
      if(longestStart == 0) {
        longest = color[i];
        longestStart = color[i][3];
      } else if(longest[0] == 255 && longest[1] == 255 && longest[2] == 255) {
        longestStart = 0;
        longest = [];
      } else if(longest[0] == 0 && longest[1] == 0 && longest[2] == 0) {
        longestStart = 0;
        longest = [];
      }
      else if(color[i][3] > longest[3]) {
        if(color[i][0] === 255) {
        }
        longest = color[i];
        longestStart = color[i][3];
      }
    }
  }



  getDominantColor(array, value, xx, yy, yValue, width, height, c, ctx) {
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

  }







  getColors(c2, ctx2, img, width, height) {
    let array = [];
    for(let i = 1; i < height + 1; i++) {
      let row = [];
      for(let e = 1; e < width + 1; e++) {
        let pixelData = ctx2.getImageData(e, i, 1, 1);
        let data = pixelData.data;
        let info = [data[0], data[1], data[2], data[3]];
        row.push(info);
      }
      array.push(row);
    }
    return array;
  }














}
