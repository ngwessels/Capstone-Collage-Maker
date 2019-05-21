



export class Beautify {

  main(state) {
    const rowLength = state.array[0].length;
    const columnLength = state.array[0][0].length;
    const ctx = state.ctx;
    var imgData = ctx.getImageData(0, 0, columnLength, rowLength);
    this.beautify(state.array[0], imgData, ctx, rowLength, columnLength);
  }


  beautify(array, imgData, ctx, height, width) {
    for(let y = 0; y < height; y++) {
      for(let x = 0; x < width; x++) {
        const instance = array[y][x];
        const currentRed = instance[0];
        const currentGreen = instance[1];
        const currentBlue = instance[2];
        let pixelData = ctx.getImageData(x, y, 1, 1);
        const data = pixelData.data;
        const newRed = ((currentRed + data[0]) / 2);
        const newGreen = ((currentGreen + data[1]) / 2);
        const newBlue = ((currentBlue + data[2]) / 2);
        const index = (x + y * imgData.width) * 4;
        imgData.data[index+0] = newRed;
        imgData.data[index+1] = newGreen;
        imgData.data[index+2] = newBlue;
        imgData.data[index+3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

}
