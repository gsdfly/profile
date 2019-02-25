import {getParamByName,GetCookie} from "../utils/index";

function IsWeixinOrAlipay() {
  var ua = window.navigator.userAgent.toLowerCase()
  //判断是不是微信
  if (ua.match(/MicroMessenger/i) == 'micromessenger') return "WeiXin"
  //判断是不是支付宝
  if (ua.match(/AlipayClient/i) == 'alipayclient') return "Alipay"
  if (ua.match(/aliapp\(tb/i) == 'aliapp\(tb' || ua.match(/tmall/i) == 'tmall') return "taobao"
  //哪个都不是
  return "false"
}
var expName = IsWeixinOrAlipay()

let CONFIG = {
  url: document.URL.indexOf('catchme') !== -1 ?  'https://front.catchme.com.cn/' : 'https://front.5zhua.cn/',
  localtionUrl2:document.URL.indexOf('catchme') !== -1 ? 'https://catchme.ewssh.m.jaeapp.com/' : 'https://zhua.ewssh.m.jaeapp.com/',
  token: process.env.NODE_ENV === 'development' ?'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Zyb250LjV6aHVhLmNuL3dlY2hhdC9wcm9maWxlIiwiaWF0IjoxNTQ1NzkwMjEzLCJleHAiOjE1NDYwMDYyMTMsIm5iZiI6MTU0NTc5MDIxMywianRpIjoiaXhENzlEdFNHbWd1dkpKVCIsInN1YiI6Mn0.jHEvuPaVqL83OfXEtC_HywTyMjajhNUHx6a08G8-3eI' : (getParamByName('token') || GetCookie('token_')),
  isWx: expName === 'WeiXin' ? true : false,
  isAlipay: expName === 'Alipay' ? true : false,
  isTaobao: expName === 'taobao' ? true : false,
}
export default CONFIG
