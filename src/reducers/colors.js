export default (state = {},
action) => {
  switch (action.type) {
    case 'COLORS':
    return action.result;
    default:
    return state;
  }
}
