export default (state = {},
action) => {
  switch (action.type) {
    case 'ARRAY':
    return action.result;
    default:
    return state;
  }
}
