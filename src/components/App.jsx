import React from 'react';
import Header from './Header';
import Error404 from './Error404';
import { Observable } from 'rxjs';
import PropTypes from 'prop-types';
import Grid from './Grid';






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
    }
    this.updateArray = this.updateArray.bind(this);
    this.updateBlocks = this.updateBlocks.bind(this);
    this.updateColors = this.updateColors.bind(this);
  }

  updateArray(info){
    this.setState({
      array: [
        ...this.state.array,
        info
      ]
    })
  }

  updateBlocks(info) {
    console.log(info);
    this.setState({
      blocks: [
        ...this.state.blocks, info
      ]
    })
  }

  updateColors(info) {
    this.setState({
      colors: [
        ...this.state.colors,
        info
      ]
    })
  }


  render() {
    console.log(this.state);
    return (
      <Switch>
        <Route path='/' render={()=><Main blocks={this.state.blocks} array={this.state.array} colors={this.state.colors} updateArray={this.updateArray} updateBlocks={this.updateBlocks} updateColors={this.updateColors}/>} />
        <Grid updateColors={this.updateColors} />
      </Switch>
    )
  }



}
App.PropTypes = {

}

export default App;
