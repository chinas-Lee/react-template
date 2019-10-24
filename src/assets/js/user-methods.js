/**
 * Created by LCQ on 2019-05-17,0017.
 */
/*
* 用户信息
*/
import { _getSessionStorageObject, _getLocalStorage, _setLocalStorage } from './storage-methods'
import crypto from 'crypto'
import ConfigInfo from '../../utils/config'

// 获取用户toKen
const _getToken = () => {
    let resData = {
        token: ''
    }
    try {
        const USER_DATA = _getSessionStorageObject('userData') || {}
        USER_DATA.token ? resData.token = USER_DATA.token : resData.token = ConfigInfo.projectInfo.DEFAULT_TOKEN
    } catch (e) {
        console.log(e)
    }
    return resData
}

// 获取SN
const _getSN = () => {
    let resData = {
        SN: ''
    }
    try {
        resData.SN = _getLocalStorage('sn') || ''
        if (!resData.SN) {
            resData.SN = `web_${Math.random().toString(36).substr(2, 15)}`
            _setLocalStorage('sn', resData.SN)
        }
    } catch (e) {
        console.log(e)
    }
    return resData
}

/*
* 获取签名
* */
const _getSign = (api = '', data = {}) => {
    try {
        let { token } = _getToken()
        let { SN } = _getSN()
        let userData = _getSessionStorageObject('userData') || {}
        let params = {
            v: ConfigInfo.projectInfo.CR_V,
            osv: '',
            dc: ConfigInfo.projectInfo.DC,
            did: SN,
            m: api,
            paramlist: JSON.stringify(data),
            ts: +new Date(),
            at: ConfigInfo.projectInfo.AT
        }
        if (userData.oid) {
            params.oid = userData.oid
        } else {
            params.oid = ''
            params.token = ConfigInfo.projectInfo.DEFAULT_TOKEN
        }
        // 对参数的key进行排序
        let keyList = []
        for (let key in params) {
            key !== 'sign' && keyList.push(key)
        }
        keyList.sort()
        // 生成加密
        let content = ''
        keyList.forEach(item => {
            params[item].length !== 0 && (content += item + params[item])
        })
        content += token
        let md = crypto.createHash("md5")
        md.update(content)
        let sig = md.digest('hex')
        params.sig = sig.toUpperCase()
        return params
    } catch (e) {
        console.log(e)
        return false
    }
}

export {
    _getToken,
    _getSign,
    _getSN
}
