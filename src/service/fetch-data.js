import Axios from './http'
import BaseURL from './ip-config'
import ConfigInfo from '../utils/config'
import { _getSign } from '../assets/js/user-methods'
import { _removeSessionStorage } from '../assets/js/storage-methods'
import { Toast } from 'antd-mobile'

/*
 * 异步请求
 * bodyParams - 参数体
 * headParams - URL后参数
 * method - 请求类型
 * */
const FetchData = function (api = '', bodyParams = {}, headParams = '', method = 'post') {
    return new Promise((resolve, reject) => {
        let config = {
            method,
            url: BaseURL.basicApi + headParams
        }
        method === 'get' ? config.params = bodyParams : config.data = _getSign(api, bodyParams) || ''
        Axios(config).then((res) => {
            let result = res.data || {}
            if (!result) {
                Toast.info(ConfigInfo.reqErrorMsg, ConfigInfo.clearToastTime)
                reject(ConfigInfo.reqErrorMsg)
            }
            switch (+result.code) {
                case 0:
                    resolve(result.data)
                    break
                case -1:
                    Toast.info(result.msg || ConfigInfo.reqErrorMsg, ConfigInfo.clearToastTime)
                    reject(result.msg || ConfigInfo.reqErrorMsg)
                    break
                case -2:
                    _removeSessionStorage('userData')
                    window.location.href = window.location.origin + '/login'
                    break
                default:
                    Toast.info(result.msg || ConfigInfo.reqErrorMsg, ConfigInfo.clearToastTime)
                    reject(result.msg || ConfigInfo.reqErrorMsg)
            }
        }, err => {
            console.log(err)
            Toast.info(ConfigInfo.reqErrorMsg, ConfigInfo.clearToastTime)
            reject(ConfigInfo.reqErrorMsg)
        }).catch(error => {
            console.log(error)
            Toast.info(ConfigInfo.reqErrorMsg, ConfigInfo.clearToastTime)
            reject(ConfigInfo.reqErrorMsg)
        })
    })
}

export default FetchData
