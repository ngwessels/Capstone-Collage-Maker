export default (state = {},
action) => {
  switch (action.type) {
    case 'IMAGES':
    return action.result;
    default:
    return state;
  }
}
