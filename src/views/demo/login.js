import React from 'react'
import { connect } from 'react-redux'
import { Button, Toast } from 'antd-mobile'
import { login } from '../../service/interface'
import {setUserData} from '../../store/actions'
import { _setSessionStorage } from '../../assets/js/storage-methods'
import { _getRouterParams } from '../../assets/js/other-methods'
import ConfigInfo from '../../utils/config'

class Login extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            demo: 'demo',
            params: _getRouterParams(this.props.location.search, 'type')
        }
        console.log(this.props)
        this.login = this.login.bind(this)
    }
    async login () {
        try {
            let result = await login({mobile: '18312344321', password: '123456'})
            console.log(result)
            Toast.success('登录成功', ConfigInfo.clearToastTime)
            let {setUserData} = this.props
            setUserData(result)
            _setSessionStorage('userData', result)
        } catch (e) {
            console.log(e)
        }
    }
    render () {
        return (
            <div>
                <Button className="text-ellipsis" onClick={this.login}>点我登录</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setUserData (data) {
            dispatch(setUserData(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
