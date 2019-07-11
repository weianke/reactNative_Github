import { onThemeChange } from './theme'
import { onRefreshPopular, onLoadMorePopular } from './popular'
import { onRefreshTrending, onLoadMoreTrending } from './trending.js'


// 默认导出根action
export default {
  onThemeChange,
  onRefreshPopular,
  onLoadMorePopular,
  onRefreshTrending,
  onLoadMoreTrending
}
