<template>
  <div class="profile" v-if="isShowHtml">
    <div class="header">
      <div class="content">
        <div class="content-img">
          <img class="img" :src="userInfo.avatar" alt="" mode="widthFix">
        </div>
        <p>{{userInfo.nickname}}</p>
        <div class="mycoin">
          <span></span><b>{{userInfo.coin}}</b>
        </div>
        <p class="ticket" @click="goTo('ticket')">兑换券<i class="iconfont icon-go1"></i></p>
      </div>
    </div>
    <div class="main">
      <ul>
        <li @click="goTo('prize')">
          <img src="http://res.catchme.com.cn/profile/imgs/icon_zhong.png" alt="" mode="widthFix">
          <p>抓中记录</p>
          <span></span>
          <b>{{userInfo.prize}}</b>
        </li>
        <li @click="goTo('game')">
          <img src="http://res.catchme.com.cn/profile/imgs/icon_game.png" alt="" mode="widthFix">
          <p>游戏记录</p>
          <span></span>
          <b>{{userInfo.consume}}</b>
        </li>
        <li @click="goTo('coin')">
          <img src="http://res.catchme.com.cn/profile/imgs/icon_recharge_record.png" alt="" mode="widthFix">
          <p>充值记录</p>
          <span></span>
        </li>
        <li @click="goTo('coupon')">
          <img src="./../../../static/img/personal_ticket.png" alt="" mode="widthFix">
          <p>优惠券</p>
          <span></span>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
  import api from './../../api/index'
  import CONFIG from "../../config/index";

  export default {
    name: 'profile',
    data() {
      return {
        userInfo: {},
        isShowHtml: false,
      }
    },
    created() {
//      wx.showLoading({
//        title: '加载中',
//      })
    },
    onLoad: function (options) {
      if(options.finish === 'false'){
        wx.navigateTo({
          url: 'index?finish=true'
        })
      }
      if(options.finish === 'true') {
        wx.navigateBack({
          delta: 1
        })
      }
    },
    async mounted() {
      await this.login();
    },
    methods: {
      login() {
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
      },
      goTo(value) {
        wx.navigateTo({
          url: './../' + value + '/main'
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .profile {
    background: #f2f2f2;
    width: 100%;
    height: 100%;
  }

  .header {
    width: 100%;
    height: 4.61rem;
    background: url("http://res.catchme.com.cn/profile/imgs/bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 0.1px;
    position: relative;
  }

  .header .content {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .header .content .mycoin {
    width: 2.40rem;
    height: 0.6rem;
    background: #fff;
    border-radius: 0.3rem;
    text-align: center;
    font-size: 0.4rem;
    color: #f16319;
    margin: 0.4rem auto 0.2rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header .content .mycoin span {
    display: inline-block;
    width: 0.48rem;
    height: 0.44rem;
    background: url("http://res.catchme.com.cn/profile/imgs/icon_recharge_bi.png") no-repeat;
    background-size: 100% 100%;
  }

  .header .content .mycoin b {
    float: right;
    height: 0.4rem;
    line-height: 0.4rem;
    margin: 0 0 0 0.08rem;
  }

  .header .content .ticket {
    font-size: 0.28rem;
    line-height: 0.28rem;
    position: relative;
    i {
      font-size: 0.32rem;
      line-height: 0.32rem;
      display: inline;
    }
  }

  .header .content .content-img {
    width: 2rem;
    height: 2rem;
    border: 4px solid #fff;
    margin: 0.3rem auto 0 auto;
    border-radius: 50%;
    overflow: hidden;
    /*display: none;*/
  }

  .header .content p {
    font-size: 0.36rem;
    color: #fff;
    line-height: 0.36rem;
    margin: 0.14rem 0 0 0;
    text-align: center;
  }

  .header .content div > img {
    width: 2rem;
    height: 2rem;
    /*width: 100%;*/
    /*height: 100%;*/
  }

  .header .blur {
    width: 100%;
    height: 90%;
    /*height: 100%;*/
    -webkit-filter: blur(5px); /* Chrome, Safari, Opera */
    filter: blur(5px);
  }

  .main {
    width: 100%;
    padding: 0.1px 0.22rem 0 0.22rem;
    height: calc(100% - 4.61rem);
    overflow: auto;
  }

  .main ul {
    width: 100%;
    margin: 0.26rem 0 0 0;
  }

  .main ul li {
    width: 100%;
    height: 1.74rem;
    background: #fff;
    border-radius: 0.1rem;
    margin: 0 0 0.12rem 0;
  }

  .main ul li img {
    width: 1.18rem;
    height: 1.18rem;
    float: left;
    margin: 0.28rem 0 0 0.22rem;
  }

  .main ul li p {
    font-size: 0.34rem;
    line-height: 1.74rem;
    margin: 0 0 0 0.22rem;
    color: #888888;
    float: left;
  }

  .main ul li b {
    font-size: 0.8rem;
    color: #f16319;
    float: right;
    line-height: 1.74rem;
    margin: 0 0.24rem 0 0;
    font-weight: 600;
  }

  .main ul li span {
    width: 0.16rem;
    height: 0.28rem;
    float: right;
    background: url("http://res.catchme.com.cn/profile/imgs/icon_go.png") no-repeat;
    background-size: 100% 100%;
    margin: 0.73rem 0.22rem 0 0;
  }
</style>
