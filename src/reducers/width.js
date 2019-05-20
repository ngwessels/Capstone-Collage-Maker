export default (state = {},
action) => {
  switch (action.type) {
    case 'WIDTH':
    return action.result;
    default:
    return state;
  }
}
