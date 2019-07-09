import Types from '../types'
import DataStore from '../../expand/dao/DataStore'

/**
 * 获取最热模块的异步action
 * @param {*} storeName
 * @param {*} url
 * @returns
 */
export function onLoadPuplarData(storeName, url) {
  return async (dispatch) => {
    dispatch({ type: Types.POPULAR_REFRESH, storeName: storeName }) // 首先会触发刷新的action
    let dataStore = new DataStore()
     //异步action与数据流
    dataStore.fetchData(url).then(data => {
      handleData(dispatch, storeName, data)
    }).catch(error => {
      console.log(error);
      dispatch({ 
        type: Types.LOAD_POPULAR_FAIL, 
        storeName,
        error
      }) 
    })
  }
}

function handleData(dispatch, storeName, data) {
  dispatch({
    type: Types.LOAD_POPULAR_SUCCESS,
    items: data && data.data && data.data.items, // 返回成功数据
    storeName 
  })
}
