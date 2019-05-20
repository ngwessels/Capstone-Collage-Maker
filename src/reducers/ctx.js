export default (state = {},
action) => {
  switch (action.type) {
    case 'CTX':
    return action.result;
    default:
    return state;
  }
}
