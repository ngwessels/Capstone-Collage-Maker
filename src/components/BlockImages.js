


export class BlockImages {



  dominantImages(imgs) {
    const length = imgs.length;
    console.log(length)
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
