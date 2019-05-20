export default (state = {},
action) => {
  switch (action.type) {
    case 'VALUE':
    return action.result;
    default:
    return state;
  }
}
