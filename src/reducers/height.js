export default (state = {},
action) => {
  switch (action.type) {
    case 'HEIGHT':
    return action.result;
    default:
    return state;
  }
}
