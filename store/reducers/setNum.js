const setNum = (state = {}, action) => {
  switch (action.type) {
    case 'SETNUM':
      console.log(state, action)
      return Object.assign({}, state, { num: action.num })
    default:
      return { ...state }
  }
}

export default setNum
