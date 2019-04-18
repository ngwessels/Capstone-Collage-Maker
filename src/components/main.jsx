import React from 'react';

export class CanvasComponent extends React.Component {

  componentsDidMount() {
    this.updateCanvas();
  }
  componentDidUpdate() {
    this.updateCanvas();
  }
  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0,0, 300, 300);
    rect({ctx,x: 10, y: 10, width: 50, height: 50});
    rect({ctx, x: 110, y:110, width: 50, height: 50});
  }

  Main() {

    return (
      <div>
        <canvas id="myCanvas" ref="canvas" width={300} height={300}/>
      </div>

    );
  }
  export default Main;
}
