import {getParamByName, GetCookie, SetCookie,funcUrlDel} from './utils'
import CONFIG from './config'

const callbackUrl = () => {
  return new Promise((resolve, reject) => {
    var token = getParamByName('token')
      if (token) {
        SetCookie('token_', token)
        window.location.href = funcUrlDel('token')
      } else if (GetCookie('token_')) {
        resolve()
      } else {
        if(CONFIG.isAlipay){
          window.location.href = `${CONFIG.url}alipay/oauth?callback=${document.URL}`
        }else if(CONFIG.isTaobao){
          window.location.href = CONFIG.localtionUrl2+'index.php/taobao/oauth?callback='+document.URL;
        }else {
          window.location.href = `${CONFIG.url}wechat/profile?callback=${document.URL}`
        }
      }
    }
    )
}

export default callbackUrl
