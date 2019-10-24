import Axios from 'axios'

// 默认超时1H
Axios.defaults.timeout = 1000 * 600

// 配置请求头
Object.assign(Axios.defaults.headers.post, {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
})

// request
Axios.interceptors.request.use((req) => {
    // 参数不为文件流，则序列化处理
    Object.prototype.toString.call(req.data) !== '[object FormData]' && (req.data = JSON.stringify(req.data))
    // console.log(req)
    return req
}, error => Promise.reject(error))

// response
Axios.interceptors.response.use(res => {
    if (!res) return Promise.reject(res)
    // console.log(res)
    return res
}, error => Promise.reject(error))

export default Axios
