export default (state = {},
action) => {
  switch (action.type) {
    case 'UPDATETOTALBLOCKS':
    return action.result;
    default:
    return state;
  }
}
