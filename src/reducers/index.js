// import selectedTicketReducer from './selected-ticket-reducer';
// import ticketListReducer from './ticket-list-reducer';
//
// const rootReducer = combineReducers({
//   selectedTicket: selectedTicketReducer,
//   masterTicketList: ticketListReducer
// });
//
// export default rootReducer;



// All Code above is example


import apiInformation from './api-information.js';
import mainPic from './main-pic.js';
import blocks from './blocks';
import blocksFinished from './blocksFinished';
import colors from './colors';
import ctx from './ctx';
import images from './images';
import imagesPlaced from './imagesPlaced';
import size from './size';
import string from './string';
import stringLength from './stringLength';
import totalBlocks from './totalBlocks';
import value from './value';
import finished from './finished';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  array: mainPic,
  blocks: blocks,
  colors: colors,
  images: images,
  finished: finished,
  size: size,
  value: value,
  string: string,
  stringLength: stringLength,
  totalBlocks: totalBlocks,
  blocksFinished: blocksFinished,
  imagesPlaced: imagesPlaced,
  ctx: ctx,

})

export default rootReducer;
