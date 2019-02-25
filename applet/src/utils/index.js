import CONFIG from './../config'
import api from './../api'

export const login = () => {
  return new Promise((resolve, reject) => {
    var self = this;
    var time = new Date().getTime();
    try {
      var token_x = JSON.parse(wx.getStorageSync('token_x'));

    } catch (err) {
      token_x = {};
    }
    if (JSON.stringify('token_x') !== '{}' && (time - token_x.time < 3600000)) {
      CONFIG.token = token_x.token;
      api.getProfile().then((res) => {
        this.userInfo = res.data.data;
        this.isShowHtml = true;
        wx.hideLoading()
      })
      resolve();
    } else {
      console.log('登录');
      wx.login({
        success: (res) => {
          wx.getUserInfo({
            lang: "zh_CN",
            success: function (res2) {
//                    console.table(res2)
              api.onLogin({"js_code": res.code, raw: res2}).then((res3) => {
                CONFIG.token = res3.data.data.token;
                wx.setStorageSync('token_x', JSON.stringify({'token': res3.data.data.token, 'time': time}));
                api.getProfile().then((res) => {
                  self.userInfo = res.data.data;
                  self.isShowHtml = true;
                  wx.hideLoading()
                })
                resolve();
              }).catch(() => {
                wx.hideLoading();
              })
            }
          })
        }
      });
    }
  });
}

