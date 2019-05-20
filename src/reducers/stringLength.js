export default (state = {},
action) => {
  switch (action.type) {
    case 'IMAGESTRINGLENGTH':
    return action.result;
    default:
    return state;
  }
}
