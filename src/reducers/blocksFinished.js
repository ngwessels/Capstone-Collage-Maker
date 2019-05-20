export default (state = {},
action) => {
  switch (action.type) {
    case 'BLOCKSFINISHED':
    return action.result;
    default:
    return state;
  }
}
