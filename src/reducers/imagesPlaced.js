export default (state = {},
action) => {
  switch (action.type) {
    case 'IMAGESPLACED':
    return action.result;
    default:
    return state;
  }
}
