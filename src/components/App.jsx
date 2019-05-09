import React from 'react';
import Header from './Header';
import Error404 from './Error404';
import { Observable } from 'rxjs';
import PropTypes from 'prop-types';
import Grid from './Grid';
import CombineImages from './CombineImages';
let blocks;
import { Switch, Route, withRouter } from 'react-router-dom';
import Main from './Main';



export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      array: {},
      colors: {},
      blocks: {},
      images: {},
      finished: false,
      width:0,
      height: 0,
      value: 0,
    }
    this.updateArray = this.updateArray.bind(this);
    this.updateBlocks = this.updateBlocks.bind(this);
    this.updateColors = this.updateColors.bind(this);
    this.updateImages = this.updateImages.bind(this);
    this.isFinished = this.isFinished.bind(this);
    this.updateSize = this.updateSize.bind(this);
  }



  isFinished(info) {
    this.setState({
      finished: info
    })
    let combine = new CombineImages();
    if(info == true) {
      combine.main(this.state);
    }
  }

  updateArray(info){
    this.setState({
      array: [
        ...this.state.array,
        info
      ]
    })


  }

  updateImages(info) {
    this.setState({
      images: [
        ...this.state.images, info
      ]
    })
  }

  updateBlocks(info) {
    this.setState({
      blocks: [
        ...this.state.blocks, info
      ]
    })
  }

  updateColors(info) {
    // this.setState({
    //   colors: [
    //     ...this.state.colors,
    //     info
    //   ]
    // })
    this.setState(prevState => ({
      colors: [...prevState.colors, info]
    }))
  }
  updateSize(width, height, value) {
    this.setState({
      width: width,
      height: height,
      value: value,
    })
  }


  render() {
    return (
      <Switch>
        <Route path='/' render={()=><Main blocks={this.state.blocks} array={this.state.array} colors={this.state.colors} updateArray={this.updateArray} updateBlocks={this.updateBlocks} updateColors={this.updateColors} isFinished={this.isFinished} updateImages={this.updateImages} updateSize={this.updateSize}/>} />
      </Switch>
    )
  }



}
App.PropTypes = {

}

export default App;
