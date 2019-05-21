export default (state = {},
action) => {
  switch (action.type) {
    case 'IMAGEURL':
    return action.result;
    default:
    return state;
  }
}
