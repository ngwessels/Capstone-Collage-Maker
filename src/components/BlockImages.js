


export class BlockImages {



  dominantImages(imgs, value) {
    const length = imgs.length;
    console.log(length);
    for(let i = 0; i < length; i++) {
      document.getElementById('firstPicture').removeAttribute('src');
      document.getElementById('firstPicture').src = '#';
      var image = document.getElementById("firstPicture");
      image.src = imgs[3];
      console.log(imgs[i]);
      image.width = 60;
      image.height = 60;
      var c2 = document.getElementById('secondCanvas');
      var ctx2 = c2.getContext('2d');
      ctx2.drawImage(image,1,1);
    }
    return length;
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
