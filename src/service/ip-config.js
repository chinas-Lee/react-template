// 不同环境接口api配置
const ServiceType = {
    dev: 'http://pro.yigemed.com/doctor', // 开发环境
    pro: 'http://pro.yigemed.com/doctor', // 测试环境
    api: 'https://api.yigemed.com' // 线上环境
}
const BaseUrl = {
    basicApi: ServiceType[process.env.SERVICE_TYPE]
}

export default BaseUrl
