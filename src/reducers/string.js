export default (state = {},
action) => {
  switch (action.type) {
    case 'IMAGESTRING':
    return action.result;
    default:
    return state;
  }
}
