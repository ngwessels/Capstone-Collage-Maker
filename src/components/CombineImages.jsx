import React from 'react';




class CombineImages extends React.Component {

  main(state) {
    const row = state.width / state.value;
    const column = state.height / state.value;
    console.log(row, column);
    const structuredColors = this.structuredColors(state.colors, row, column);
    let blocksTotal = (state.width / state.value) * (state.height / state.value);
    // console.log('Blocks Total', blocksTotal);
    // console.log('Structured Array', structuredColors);
    // console.log('Blocks Array', state.blocks);
    // console.log('Images Array', state.images);
    for(let y = 0; y < column; y++) {
      for(let x = 0; x < row; x++) {
        const instance = structuredColors[y][x];
        const block = state.blocks[0][y][x];
        this.loop(x, y, instance, state.images, block)
      }
    }
  }

  loop(x, y, structuredColors, images, blocks) {
    console.log('x', x, 'y', y, 'dominantColor', structuredColors, 'image', images, 'blocks', blocks)




  }

  // const instance = state.images[0][i];
  // console.log(instance);
  // const instanceLength = instance.length;
  // if(instance != state.images[-1]){
  //   const imageUrl = instance[0];
  //   const pixelValues = instance[1];
  //   const dominantColor = instance[2];
  //   // console.log(imageUrl, pixelValues, dominantColor, blocksTotal, i);
  // }


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
