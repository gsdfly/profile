import CONFIG from './../config/index'
import fly from 'flyio'

export default {
  getProfile: function (params) {
    return fly.get(CONFIG.url + 'api/profile', Object.assign({},{token:CONFIG.token},params));
  },
  getPrize:function (params) {
    return fly.get(CONFIG.url + 'api/profile/prize', Object.assign({},{token:CONFIG.token},params))
  },
  getGame:function (params) {
    return fly.get(CONFIG.url + 'api/profile/game', Object.assign({},{token:CONFIG.token},params))
  },
  getOrder:function (params) {
    return fly.get(CONFIG.url + 'api/profile/order', Object.assign({},{token:CONFIG.token},params))
  },
  receive:function (params) {
    return fly.get(CONFIG.url+'api/player/receive',Object.assign({},{token:CONFIG.token},params));
  },
  getActivityPromocode:function (params) {
    return fly.get(CONFIG.url+'api/profile/promocode',Object.assign({},{token:CONFIG.token},params))
  },
  getProfileVoucher:function (params) {
    return fly.get(CONFIG.url+'api/profile/voucher',Object.assign({},{token:CONFIG.token},params))
  }
}
