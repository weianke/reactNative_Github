
const setData = (state = {}, action) => {
  switch (action.type) {
    case 'SETDATAID':
      return {
        ...state,
        id: action.id
      }
    default:
      return state
  }
}

export default setData
