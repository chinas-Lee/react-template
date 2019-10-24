import { _getSessionStorageObject } from '../assets/js/storage-methods'

// 初始化状态
const State = {
    pageTile: '首页',
    userData: _getSessionStorageObject('userData') || {} // 登录信息
}

export default State
