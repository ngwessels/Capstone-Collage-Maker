


export class BlockImages {



  dominantImages(imgs, value) {

    let that = this;
    const length = imgs.length;
    let array = [];
    var c2 = document.getElementById('secondCanvas');
    var ctx2 = c2.getContext('2d');
    ctx2.clearRect(0, 0, value, value);
    document.getElementById('firstPicture').removeAttribute('src');
    var image = new Image();
    image.crossOrigin = "Anonymous";
    image = document.getElementById("firstPicture");
    image.src = imgs[4];
    image.width = value;
    image.height = value;
    document.getElementById('secondCanvas').width = value;
    document.getElementById('secondCanvas').height = value;
    for(let i = length; i > 1; i--) {
      let that = this;
      setTimeout(function() {
        ctx2.drawImage(image,1,1);
        const pictureColors = that.getColors(c2, ctx2, image, value, value);
        const dominantColor = that.dominantColor(pictureColors);
      }, 1 * i);
    }
  }


  dominantColor(array) {
    if(red >= (color[colorI][0] - 5) && red <= (color[colorI][0] + 5) && green >= (color[colorI][1] - 5) && green <= (color[colorI][1] + 5) && blue >= (color[colorI][2] - 5) && blue <= (color[colorI][2] + 5))
    console.log(array);

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
