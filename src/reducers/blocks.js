export default (state = {},
action) => {
  switch (action.type) {
    case 'BLOCKS':
    return action.result;
    default:
    return state;
  }
}
