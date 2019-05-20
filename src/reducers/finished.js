export default (state = {},
action) => {
  switch (action.type) {
    case 'ISFINISHED':
    return action.result;
    default:
    return state;
  }
}
