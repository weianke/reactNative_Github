import { combineReducers } from 'redux'
import setData from './setData'
import setNum from './setNum'

const reducers = combineReducers({
  setData,
  setNum
})

export default reducers