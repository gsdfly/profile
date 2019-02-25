<template>
  <div class="coupon" v-show="showHtml">
    <ul v-if="records.length > 0">
      <li v-if="recordsJ.length>0">
        <img src="http://res.catchme.com.cn/profile/dance_bg.png" alt="" mode="widthFix">
        <div class="center">
          <h3 class="price"><b>+</b><span>0.01</span></h3>
          <button @click="openCoupon('hop')">去使用</button>
          <h4 class="description">“这就是街舞”正版毛巾抵扣券</h4>
          <p>“趣东西商城”内购买这就是街舞正版授权毛巾</p>
        </div>
      </li>
      <li v-if="recordsD.length>0">
        <img src="./../../../static/img/personal_bg.png" alt="" mode="widthFix">
        <div class="center">
          <h3 class="price">￥<span>5</span></h3>
          <button @click="openCoupon()">去使用</button>
          <h4 class="description">现金抵扣券</h4>
          <p>“趣东西商城”内购物满30元使用</p>
        </div>
      </li>
    </ul>

    <div class="nothing" v-else>
      <img src="./../../../static/img/ticket_nothing.png" alt="" mode="widthFix">
      <p>暂时没有优惠券哦</p>
    </div>


    <div class="bg" v-show="bgShow">
      <div class="bg-center1" v-show="contentShow == 'exchange'" style="width: 100%;height: 100%">
        <div class="bg-center9-center">
          <div class="scroll-out">
            <div class="scroll-in" :style="scrollStyle1">
              <div v-for="(item,index) in recordsJ" :key="index">
                <p>
                  <span class="input" :id="'id'+item.code">{{item.code}}</span>
                  <em class="button" :data-clipboard-target="item.code" @click="copy" :class="'btn'+item.code">复制</em>
                </p>
                <b>“这就是街舞毛巾”专用券</b>
              </div>
            </div>
          </div>
          <img @click.prevent="" src="http://res.catchme.com.cn/activity/jiewu/big/bg3.png" alt="" class="imgBg"
               mode="widthFix"/>
          <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
               @click="closeBg" mode="widthFix"/>
        </div>
        <div style="width: 100%;height: 100%;position: absolute;z-index:1000" @click="closeBg"></div>
      </div>

      <div class="bg-center9" v-show="contentShow == 'exchange2'" style="width: 100%;height: 100%">
        <div class="bg-center9-center">
          <div class="scroll-out">
            <div class="scroll-in" :style="scrollStyle2">
              <div v-for="(item,index) in recordsD" :key="index">
                <p>
                  <span class="input" :id="'id'+item.code">{{item.code}}</span>
                  <em class="button" :data-clipboard-target="item.code" @click="copy" :class="'btn'+item.code">复制</em>
                </p>
                <b>“趣东西”商城专用券</b>
              </div>
            </div>
          </div>
          <img @click.prevent="" src="http://res.catchme.com.cn/catch2/my.png" alt="" class="imgBg" mode="widthFix"/>
          <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
               @click="closeBg" mode="widthFix"/>
        </div>
        <div style="width: 100%;height: 100%;position: absolute;z-index:1000" @click="closeBg"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from './../../api/index';

  export default {
    name: 'coupon',
    data() {
      return {
        message: "内容",
        records: [],
        bgShow: false,
        contentShow: '',
        showHtml: false,
        recordsJ: [],
        recordsD: [],
        scrollStyle1: '',
        scrollStyle2: ''
      }
    },
    mounted() {
      wx.setNavigationBarTitle({
        title: '我的优惠券'
      })
      api.getActivityPromocode().then((res) => {
        this.recordsJ = [];
        this.recordsD = [];
        this.records = res.data.data.records;
        for (var i = 0; i < this.records.length; i++) {
          if (this.records[i].voucher_batch_id === 8) {
            this.recordsD.push(this.records[i]);
          } else {
            this.recordsJ.push(this.records[i])
          }
        }
        this.showHtml = true;
      })
    },
    methods: {
      getVoucherLength(value) {
        if (value > 1) {
          this.scrollStyle1 = 'width:' + (495 * value + 60) + 'rpx';
        }
      },
      getVoucherLength2(value) {
        if (value > 1) {
          this.scrollStyle2 = 'width:' + (512 * value + 56) + 'rpx';
        }
      },
      openCoupon(value) {
        this.bgShow = true;
        if (value === 'hop') {
          this.getVoucherLength(this.recordsJ.length);
          this.contentShow = 'exchange';
        } else {
          this.getVoucherLength2(this.recordsD.length);
          this.contentShow = 'exchange2';
        }
      },
      copy(event) {
        wx.setClipboardData({
          data: event.currentTarget.dataset.clipboardTarget,
          success: function (res) {
            wx.navigateToMiniProgram({
              appId: 'wxd2842602d3a59acb',
              success: function () {
                console.log('打开成功')
              }
            })
//            wx.getClipboardData({
//              success: function(res) {
//                console.log(res.data) // data
//              }
//            })
          }
        })
      },
      closeBg() {
        this.bgShow = false;
      }
    }
  }
</script>

<style lang="scss">
  .coupon {
    width: 100%;
    height: 100%;
    color: #fff;
    background: #f2f2f2;
    .nothing {
      width: 100%;
      height: 100%;
      padding: 0.1px;
      img {
        display: block;
        width: 5.06rem;
        margin: 1.4rem auto 0.7rem auto;
      }
      p {
        text-align: center;
        color: #888888;
      }
    }
    ul {
      width: 7.06rem;
      margin: 0 auto;
      padding: 0.1px;
      li {
        width: 100%;
        height: 2.54rem;
        margin: 0.1rem 0 0 0;
        position: relative;
        /*padding: 30px;*/
        img {
          width: 100%;
        }
        .center {
          position: absolute;
          left: 0;
          top: 0;
          padding: 0 0.3rem;
          width: 100%;
          height: 100%;
          h3 {
            font-size: 0.32rem;
            color: #fff;
            line-height: 0.76rem;
            margin: 0.3rem 0 0 0;
            b {
              font-size: 0.44rem;
              display: inline;
            }
            span {
              font-size: 0.76rem;
            }
          }
          button {
            /*width: 1.22rem;*/
            height: 0.42rem;
            border-radius: 4px;
            background: #fff;
            border: none;
            outline: none;
            color: #f16319;
            font-size: 0.26rem;
            position: absolute;
            right: 0.3rem;
            top: 0.64rem;
            line-height: 0.42rem;
          }
          h4 {
            font-size: 0.34rem;
          }
          p {
            font-size: 0.22rem;
            position: absolute;
            line-height: 0.22rem;
            bottom: 0.26rem;
          }
        }
      }
    }

    .bg {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.72);
      .bg-center1 {
        .bg-center9-center {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 1001;
          .imgBg {
            width: 6.22rem;
          }
          .close {
            position: absolute;
            right: 0;
            top: -1.2rem;
            width: 0.82rem;
            height: 0.82rem;
          }
          .scroll-out {
            width: calc(100% - 0.64rem);
            height: 2.43rem;
            position: absolute;
            top: 1.31rem;
            left: 0.64rem;
            overflow: auto;
            .scroll-in {
              /*width: calc(498px * 2 + 50px);*/
              height: 2.43rem;
              > div {
                width: 4.95rem;
                height: 2.41rem;
                background: url("./../../../static/img/quan.png") no-repeat;
                background-size: 100% 100%;
                float: left;
                margin: 0 1px 0 0;
                position: relative;
                p {
                  width: 4.95rem;
                  height: 0.74rem;
                  position: absolute;
                  padding: 0 0.25rem;
                  top: 0.47rem;
                  .input {
                    border: none;
                    background: none;
                    outline: none;
                    color: #fff;
                    font-size: 0.4rem;
                    height: 100%;
                    width: calc(100% - 1.28rem);
                    -webkit-appearance: none;
                    float: left;
                    line-height: 0.78rem;
                  }
                  .button {
                    width: 1.28rem;
                    height: 0.74rem;
                    display: inline-block;
                    text-align: center;
                    line-height: 0.74rem;
                    border: none;
                    outline: none;
                    font-size: 0.28rem;
                    color: #fff;
                    background: url("http://res.catchme.com.cn/activity/jiewu/big/press_copy.png") no-repeat;
                    background-size: 100% 100%;
                    float: right;
                  }
                }
                b {
                  position: absolute;
                  left: 0.3rem;
                  bottom: 0.26rem;
                  font-size: 0.22rem;
                  color: #fff;
                  line-height: 0.22rem;
                }
              }
            }
          }
          .exchange2 {
            top: 1.88rem;
            .scroll-in {
              > div {
                background: none;
              }
            }
          }
        }

      }

      .bg-center9 {
        .bg-center9-center {
          position: absolute;
          z-index: 1001;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          margin: 0 0 0 0.15rem;
          .imgBg {
            width: 6.52rem;
          }
          .close {
            position: absolute;
            right: 0.3rem;
            top: -0.6rem;
            width: 0.82rem;
            height: 0.82rem;
          }
          .scroll-out {
            width: calc(100% - 0.3rem);
            /*width: calc(100% - 64px);*/
            height: 2.43rem;
            position: absolute;
            top: 2.32rem;
            /*left: 50px;*/
            padding: 0 0 0 0.5rem;
            left: 0;
            overflow: auto;
            .scroll-in {
              /*width: calc(498px * 2 + 50px);*/
              height: 2.43rem;
              > div {
                width: 5.13rem;
                height: 2.4rem;
                /*background: url("http://res.catchme.com.cn/activity/jiewu/big/quan.png") no-repeat;*/
                /*background: url("./../assets/catch2/quan.png") no-repeat;*/
                background: url("./../../../static/img/ticket_bg.png") no-repeat;
                background-size: 100% 100%;
                float: left;
                margin: 0 1px 0 0;
                position: relative;
                p {
                  width: 100%;
                  height: 0.86rem;
                  position: absolute;
                  padding: 0 0.17rem 0 0.32rem;
                  /*top:50%;*/
                  top: 0.42rem;
                  /*transform: translateY(-50%);*/
                  .input {
                    border: none;
                    background: none;
                    outline: none;
                    color: #5d4037;
                    font-size: 0.42rem;
                    height: 100%;
                    width: calc(100% - 1.42rem);
                    -webkit-appearance: none;
                    float: left;
                    line-height: 0.86rem;
                    text-align: left;
                  }
                  .button {
                    width: 1.42rem;
                    height: 0.86rem;
                    display: inline-block;
                    text-align: center;
                    line-height: 0.8rem;
                    border: none;
                    outline: none;
                    font-size: 0.28rem;
                    color: #fff;
                    background: url("./../../../static/img/press_copy.png") no-repeat;
                    background-size: 100% 100%;
                    float: right;
                  }
                }
                b {
                  position: absolute;
                  left: 0.3rem;
                  bottom: 0.26rem;
                  font-size: 0.22rem;
                  color: #6d523a;
                  line-height: 0.22rem;
                }
              }
            }
          }
          .exchange2 {
            top: 2.32rem;
            .scroll-in {
              > div {
                width: 5.2rem;
                background: none;
              }
            }
          }
        }
      }
    }
  }
</style>


