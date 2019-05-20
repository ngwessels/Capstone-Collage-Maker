export default (state = null,
action) => {
  switch (action.type) {
    case 'COLORS':
    return action.result;
    default:
    return state;
  }
}
