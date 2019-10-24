import FetchData from './fetch-data'

// 获取界面数据
const login = (bodyParams) => (FetchData('frame.account.login', bodyParams))

export {
    login
}
