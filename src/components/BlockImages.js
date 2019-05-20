let allImages = [];
let total = 0;




export class BlockImages{

  dominantImages(imgArray, value, bigArray, updateImages, blocksFinished) {
    let that = this;
    const length = imgArray.length;
    let array = [];
    var canvasBody = document.getElementById('secondCanvas');
    const imageBody = document.getElementById('firstPicture');
    let image = [];
    for(let i = 0; i < length; i++) {
      const innerLength = imgArray[i].length;
      for(let e = 0; e < innerLength; e++) {
        let createCanvas = document.createElement(`canvas${i}`);
        that.runImage(i, e, imgArray, value, imageBody, canvasBody, bigArray, updateImages);
        document.getElementById('secondCanvas').width = value;
        document.getElementById('secondCanvas').height = value;
      }
    }
    setTimeout(function() {
      blocksFinished(true);


    }, 20000)
  }

  runImage(i, e, imgs, value, imageBody, canvasBody, array, updateImages) {
    let that = this;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob'; //so you can access the response like a normal URL
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {

          let createImageLoc = new Image;
          createImageLoc = document.createElement(`img${i}`);
          let currentImage = document.createElement("IMG");
          currentImage.crossOrigin = "Anonymous";
          currentImage.header = "Access-Control-Allow-Origin";
          currentImage.width = value;
          currentImage.height = value;
          currentImage.src = imgs[i][e];
          currentImage.src = URL.createObjectURL(xhr.response);
          let imageDivLength = document.getElementById('firstPicture').childElementCount;
          currentImage.id=`currentId${imageDivLength + 1}`;
          imageBody.appendChild(currentImage);
          let createCanvas = document.createElement('canvas');
          createCanvas.id = `canvasId${imageDivLength + 1}`;
          createCanvas.width = value;
          createCanvas.height = value;
          var ctx2 = createCanvas.getContext('2d');
          ctx2.clearRect(0, 0, value, value);
          canvasBody.appendChild(createCanvas);
          currentImage.onload = function(){
            ctx2.drawImage(currentImage,1,1,value, value);
            const pictureColors = that.getColors(ctx2, currentImage, value, value);
            const dominantColor = that.dominantColor(pictureColors, value);
            const instance = [currentImage.src, pictureColors, dominantColor];
            allImages.push(instance);
          }
        }
    };
    total++;
    if(total == imgs.length) {
      setTimeout(function() {
        updateImages(allImages);
      }, 4000)
    }
    xhr.open('GET', imgs[i][e], true);
    xhr.send();
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
    return longest;
  }


  getColors(ctx2, img, width, height) {
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
