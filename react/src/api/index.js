import CONFIG from './../config'
var fly = require('flyio');

// http://front.5zhua.cn/api/profile?

fly.config.baseURL="http://front.5zhua.cn/"

export const GetProfile = function (params) {
    return fly.get('api/profile',Object.assign({},{token:CONFIG.token},params));
}

export const GetPrize=function (params) {
    return fly.get('api/profile/prize', Object.assign({},{token:CONFIG.token},params))
}