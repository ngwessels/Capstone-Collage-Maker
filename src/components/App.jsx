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
import { BlockImages } from './BlockImages';
import { Beautify } from './Beautify';
import { connect } from 'react-redux';
const { c } = constants;
import constants from './../constants';
const { firebaseConfig } = constants;
// import { firebaseConfig } from './../constants/firebaseConfig';
import Firebase from 'firebase'

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
      string: [],
      stringLength: 0,
      totalBlocks: 0,
      blocksFinished: false,
      imagesPlaced: false,
      ctx: '',
    };
    this.updateArray = this.updateArray.bind(this);
    this.updateBlocks = this.updateBlocks.bind(this);
    this.updateColors = this.updateColors.bind(this);
    this.updateImages = this.updateImages.bind(this);
    this.isFinished = this.isFinished.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.updateImage = this.updateImage.bind(this);
    this.updateTotalBlocks = this.updateTotalBlocks.bind(this);
    this.blocksFinished = this.blocksFinished.bind(this);
    this.imagesPlaced = this.imagesPlaced.bind(this);
    this.updateCTX = this.updateCTX.bind(this);
  }

  updateCTX(e) {
    const action = {
      type: 'CTX',
      result: e,
    }
    const { dispatch } = this.props;
    dispatch(action);
  }

  imagesPlaced(e) {
    const action = {
      type: 'IMAGESPLACED',
      result: e,
    }
    const { dispatch } = this.props;
    dispatch(action);
    let beauty = new Beautify();
    beauty.main(this.props.masterState);
  }

  blocksFinished() {
    const action = {
      type: 'BLOCKSFINISHED',
      result: true,
    }
    const { dispatch } = this.props;
    dispatch(action);
    let combine = new CombineImages();
    combine.main(this.props.masterState, this.imagesPlaced);

  }

  updateTotalBlocks(info) {
    const action = {
      type: 'UPDATETOTALBLOCKS',
      result: info,
    }
    const { dispatch } = this.props;
    dispatch(action);
  }

  updateImage(info, add) {
    let currentString;
    let currentLength;
    const arrayLength = this.props.masterState.string.length;
    if(arrayLength == undefined) {
      currentString = info;
    } else {
      let currentArray = this.props.masterState.string;
      currentArray.push.apply(currentArray, info);
      currentString = currentArray;
    }
    if(this.props.masterState.stringLength = {}) {
      const num = 0 + add;
      const stringLengthAction = {
        type: 'IMAGESTRINGLENGTH',
        result: num,
      }
      const { dispatch } = this.props;
      dispatch(stringLengthAction);
    }
    if(this.props.masterState.stringLength) {
      currentLength = this.props.masterState.stringLength + add
    }
    const stringAction = {
      type: 'IMAGESTRING',
      result: currentString,
    }
    const stringLengthAction = {
      type: 'IMAGESTRINGLENGTH',
      result: currentLength,
    }
    const { dispatch } = this.props;
    dispatch(stringAction);
    dispatch(stringLengthAction);
  }

  runBlockImages() {
    let blockImage = new BlockImages();
    blockImage.dominantImages(this.props.masterState.string, this.props.masterState.value, this.props.masterState.array, this.updateImages, this.blocksFinished);

  }

  isFinished(info) {

    const action = {
      type: 'ISFINISHED',
      result: info,
    }
    const { dispatch } = this.props;
    dispatch(action);
    this.runBlockImages();
  }

  updateArray(info){
    let current;
    if(this.props.array) {
      current = [this.props.array, info];
    } else {
      current = [info]
    }
    const action = {
      type: 'ARRAY',
      result: current,
    }
    const { dispatch } = this.props;
    dispatch(action);
  }

  updateImages(info) {
    let current;
    if(this.props.images) {
      current = this.props.images;
      current = [current, info];
    } else {
      current = [info];
    }

    const action = {
      type: 'IMAGES',
      result: current,
    }
    const { dispatch } = this.props;
    dispatch(action);
  }

  updateBlocks(info) {
    const { dispatch } = this.props;
    const action = {
      type: 'BLOCKS',
      result: [info],
    }
    dispatch(action);

  }

  updateColors(info) {

    const action = {
      type: 'COLORS',
      result: info,
    }
    const { dispatch } = this.props;
    dispatch(action);
  }
  updateSize(width, height, value) {
    const widthAction = {
      type: 'WIDTH',
      result: width,
    }
    const heightAction = {
      type: 'HEIGHT',
      result: height,
    }
    const valueAction = {
      type: 'VALUE',
      result: value,
    }
    const { dispatch } = this.props;
    dispatch(widthAction);
    dispatch(heightAction);
    dispatch(valueAction);
  }

  change(e) {
    firebase.initializeApp(firebaseConfig);
    console.log(e);
    var file = e.target.files[0];
    console.log(file);
    var storageRef = firebase.storage().ref(`images/${file.name}`);
    storageRef.put(file)
    setTimeout(function() {
      console.log(file.name)
      storageRef.getDownloadURL().then((url) => {
      alert(url);

    }).catch(function(error) {

    });
  }, 3000)
  }


  render() {
    // firebase.initializeApp(firebaseConfig);
    // const tickets = firebase.database().ref('tickets');
    // tickets.push({
    //   name: 'nate'
    // })

    return (
      <div>
        <input type='file' id='fileButton' onChange={this.change}/>

        <Switch>
          <Route path='/' render={()=><Main blocks={this.props.blocks} array={this.props.array} colors={this.props.colors} updateArray={this.updateArray} updateBlocks={this.updateBlocks} updateColors={this.updateColors} isFinished={this.isFinished} updateImages={this.updateImages} updateSize={this.updateSize} updateImage={this.updateImage} string={this.props.string} stringLength={this.props.stringLength} totalBlocks={this.props.totalBlocks} updateTotalBlocks={this.updateTotalBlocks} updateCTX={this.updateCTX}/>} />
        </Switch>
      </div>
    );
  }



}


const mapStateToProps = state => {
  return {
    masterState:
    state
  };
};





export default withRouter(connect(mapStateToProps)(App));
