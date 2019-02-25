<template>
  <div class="coupon" v-show="showHtml">
    <ul v-if="records.length > 0">
      <li v-for="(item,index) in records" :key="index">
        <img :src="couponBg[item.remarks.coupontype-1]" alt="" mode="widthFix">
        <div class="center">
          <h3 class="price"><b v-if="item.remarks.moneytype === 2">+</b><em v-else="">￥</em><span>{{item.remarks.price}}</span></h3>
          <button @click="openCoupon(item.remarks.coupontype,item.code,item.end_time)">去使用</button>
          <h4 class="description">{{item.remarks.title}}</h4>
          <p>{{item.remarks.description}}</p>
        </div>
      </li>
    </ul>

    <div class="nothing" v-else>
      <img src="./../../../static/img/ticket_nothing.png" alt="" mode="widthFix">
      <p>暂时没有优惠券哦</p>
    </div>

    <div class="bg" v-show="bgShow">
      <div class="bg-center1" v-if="contentShow == 'exchange'" style="width: 100%;height: 100%">
        <div class="bg-center9-center">
          <div class="scroll-out">
            <div class="scroll-in">
              <div>
                <p>
                  <span class="input" id="foo1" >{{currentcode}}</span>
                  <button data-clipboard-target="#foo1" @click="copy" class="btncopy">复制</button>
                </p>
                <b>“这就是街舞毛巾”专用券</b>
              </div>
            </div>
          </div>
          <img @click.prevent=""   src="http://res.catchme.com.cn/activity/jiewu/big/bg3.png" alt="" class="imgBg" mode="widthFix">
          <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close" @click="closeBg" mode="widthFix" />
        </div>
        <div style="width: 100%;height: 100%;position: absolute;z-index:1000" @click="closeBg"></div>
      </div>

      <div class="bg-center2" v-if="contentShow == 'exchange2'" style="width: 100%;height: 100%">
        <div class="bg-center9-center">
          <div class="scroll-out">
            <div class="scroll-in">
              <div>
                <p>
                  <span class="input" id="foo2" >{{currentcode}}</span>
                  <button data-clipboard-target="#foo2" @click="copy" class="btncopy">复制</button>
                </p>
                <b>“趣东西”商城专用券</b>
              </div>
            </div>
          </div>
          <img @click.prevent="" src="http://res.catchme.com.cn/catch2/my.png" alt="" class="imgBg" mode="widthFix">
          <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close" @click="closeBg" mode="widthFix" />
        </div>
        <div style="width: 100%;height: 100%;position: absolute;z-index:1000" @click="closeBg"></div>
      </div>

      <div class="bg-center3" v-if="contentShow == 'exchange3'" style="width: 100%;height: 100%">
        <div class="bg-center9-center">
          <div>
            <div class="scroll">
              <div>
                <h3 id="foo3">{{currentcode}}</h3>
                <button :data-clipboard-target="'#foo3'" @click="copy" class="btncopy">复制</button>
              </div>
              <p>有效期至：{{couponInfo.end_time | handleEndTime}}</p>
            </div>
            <img src="http://res.catchme.com.cn/activity/card/copy.png" alt="" @click.prevent="" class="imgBg" mode="widthFix" />
          </div>
          <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
               @click="closeBg" mode="widthFix" />
        </div>
        <div style="width: 100%;height: 100%;position: absolute;z-index:1000" @click="closeBg"></div>
      </div>

      <div class="bg-center4" v-if="contentShow == 'exchange4'" style="width: 100%;height: 100%">
        <div class="bg-center9-center">
          <div>
            <div class="scroll">
              <h3 id="foo4">{{currentcode}}</h3>
              <p>有效期至：{{end_time | handleEndTime}}</p>
              <button :data-clipboard-target="'#foo4'" @click="copy" class="btncopy">复制</button>
            </div>
            <img src="http://res.catchme.com.cn/activity/cake/shuoming.png" alt="" @click.prevent="" class="imgBg" mode="widthFix" />
          </div>
          <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
               @click="closeBg" mode="widthFix" />
        </div>
        <div style="width: 100%;height: 100%;position: absolute;z-index:1000" @click="closeBg"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from './../../api/index';

  export default {
    name:'coupon',
    data(){
      return {
        message: "内容",
        records: [],
        bgShow: false,
        contentShow: '',
        showHtml: false,
        couponBg: [
          'http://res.catchme.com.cn/profile/dance_bg.png',
//          require('./../assets/catch2/personal_bg.png'),
          'http://res.catchme.com.cn/profile/ikang_card_bg.png'
        ],
        currentcode:'',
        endtime:'',
      }
    },
    mounted(){
      api.getActivityPromocode().then((res)=>{
        var records = res.data.data.records;
        for(var i=0;i<records.length;i++ ){
          records[i].remarks = JSON.parse(records[i].remarks);
        }
        console.log(records);
        this.records = records;
        this.showHtml = true;
      })
    },
    methods:{
      openCoupon(coupontype=4,code='',endtime=''){
        this.bgShow = true;
        //1.街舞 2.普通 3.体检卡 4.蛋糕
        this.currentcode = code;
        this.endtime = endtime;
        switch (coupontype){
          case 1:this.contentShow = 'exchange';break;
          case 2:this.contentShow = 'exchange2';break;
          case 3:this.contentShow = 'exchange3';break;
          case 4:this.contentShow = 'exchange4';break;
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
      closeBg(){
        this.bgShow = false;
      },
    }
  }
</script>

<style lang="scss" scoped>

  @mixin center {
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
  @mixin centerX {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  @mixin centerY {
    position: absolute;
    top:50%;
    transform: translateY(-50%);
  }

  @mixin tipButton {
    width: 1.18rem;
    height: 0.56rem;
    outline: none;
    border:0.03rem solid #25edff;
    font-size: 0.3rem;
    color: #fff;
    background: #374cc6;
  }
  b,em{
    display: inline;
  }
  .coupon{
    width: 100%;
    height: 100%;
    color: #fff;
    background: #f2f2f2;
    .nothing{
      width: 100%;
      height: 100%;
      padding: 0.1px;
      img{
        width: 5.06rem;
        margin: 1.4rem auto 0.7rem auto;
      }
      p{
        text-align: center;
        color: #888888;
      }
    }
    ul{
      width: 7.06rem;
      margin: 0 auto;
      padding: 0.1px;
      li{
        width: 100%;
        height: 2.54rem;
        margin: 0.1rem 0 0 0;
        position: relative;
        /*padding: 30rem;*/
        img{
          width: 100%;
        }
        .center{
          position: absolute;
          left: 0;
          top:0;
          padding: 0 0.3rem;
          width: 100%;
          height: 100%;
          h3{
            font-size: 0.32rem;
            color: #fff;
            line-height: 0.76rem;
            margin: 0.3rem 0 0 0;
            b{
              font-size: 0.44rem;
            }
            span{
              display: inline;
              font-size: 0.76rem;
            }
          }
          button{
            width: 1.22rem;
            height: 0.42rem;
            line-height: 0.42rem;
            padding: 0;
            border-radius: 0.04rem;
            background: #fff;
            border: none;
            outline: none;
            color: #f16319;
            font-size: 0.26rem;
            position: absolute;
            right: 0.3rem;
            top:0.64rem;
          }
          h4{
            font-size: 0.34rem;
          }
          p{
            font-size: 0.22rem;
            position: absolute;
            line-height: 0.22rem;
            bottom: 0.26rem;
          }
        }
      }
    }

    .close{
      width: 0.82rem;
      height: 0.82rem;
      margin: 0.4rem auto 0 auto;
      display: block;
      //      @include centerX;
    }
    .bg{
      position: fixed;
      left:0;
      top:0;
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
          .scroll-out{
            width: calc(100% - 0.64rem);
            height: 2.43rem;
            position: absolute;
            top:1.31rem;
            left: 0.64rem;
            overflow: auto;
            .scroll-in{
              /*width: calc(498rem * 2 + 50rem);*/
              height: 2.43rem;
              >div{
                width: 4.95rem;
                height: 2.41rem;
                background: url("./../../../static/img/quan.png") no-repeat;
                background-size: 100% 100%;
                float: left;
                margin: 0 1px 0 0;
                position: relative;
                p{
                  width: 4.95rem;
                  height: 0.74rem;
                  position: absolute;
                  padding: 0 0.25rem;
                  top:0.47rem;
                  .input{
                    border: none;
                    background: none;
                    outline: none;
                    color: #fff;
                    font-size: 0.4rem;
                    height: 100%;
                    width: calc(100% - 1.28rem);
                    -webkit-appearance:none;
                    float: left;
                    line-height: 0.78rem;
                  }
                  button{
                    width: 1.28rem;
                    height: 0.74rem;
                    border: none;
                    outline: none;
                    font-size: 0.28rem;
                    color: #fff;
                    background: url("http://res.catchme.com.cn/activity/jiewu/big/press_copy.png") no-repeat;
                    background-size: 100% 100%;
                    float: right;
                  }
                }
                b{
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
          .exchange2{
            top:1.88rem;
            .scroll-in{
              >div{
                background: none;
              }
            }
          }
        }

      }

      .bg-center2 {
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
          .scroll-out{
            width: calc(100% - 0.3rem);
            /*width: calc(100% - 64rem);*/
            height: 2.43rem;
            position: absolute;
            top:2.32rem;
            /*left: 50rem;*/
            padding: 0 0 0 0.5rem;
            left: 0;
            overflow: auto;
            .scroll-in{
              /*width: calc(498rem * 2 + 50rem);*/
              height: 2.43rem;
              >div{
                width: 5.13rem;
                height: 2.4rem;
                /*background: url("http://res.catchme.com.cn/activity/jiewu/big/quan.png") no-repeat;*/
                /*background: url("./../assets/catch2/quan.png") no-repeat;*/
                background: url("./../../../static/img/ticket_bg.png") no-repeat;
                background-size: 100% 100%;
                float: left;
                margin: 0 1px 0 0;
                position: relative;
                p{
                  width: 100%;
                  height: 0.86rem;
                  position: absolute;
                  padding: 0 0.17rem 0 0.32rem;
                  /*top:50%;*/
                  top:0.42rem;
                  /*transform: translateY(-50%);*/
                  .input{
                    border: none;
                    background: none;
                    outline: none;
                    color: #5d4037;
                    font-size: 0.42rem;
                    height: 100%;
                    width: calc(100% - 1.42rem);
                    -webkit-appearance:none;
                    float: left;
                    line-height: 0.86rem;
                    text-align: left;
                  }
                  button{
                    width: 1.42rem;
                    height: 0.86rem;
                    border: none;
                    outline: none;
                    font-size: 0.28rem;
                    color: #fff;
                    background: url("./../../../static/img/press_copy.png") no-repeat;
                    background-size: 100% 100%;
                    float: right;
                  }
                }
                b{
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
          .exchange2{
            top:2.32rem;
            .scroll-in{
              >div{
                width: 5.20rem;
                background: none;
              }
            }
          }
        }
      }

      .bg-center3 {
        .bg-center9-center {
          position: absolute;
          z-index: 1001;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          >div{
            width: 6.40rem;
            position: relative;
            border-radius: 0.20rem;
            >img{
              width: 100%;
            }
            .scroll{
              width: 5.41rem;
              height: 2.40rem;
              margin: 0 auto;
              color: #a73f2d;
              @include centerX;
              top:1.30rem;
              padding: 0.20rem 0 0 0;
              >div{
                height: 1.46rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 0.38rem;
                h3{
                  font-size: 0.44rem;
                  line-height: 0.44rem;
                }
                button{
                  width: 1.22rem;
                  height: 0.68rem;
                  outline: none;
                  border: none;
                  background: url("./../../../static/img/press_copy.png") no-repeat;
                  background-size: 100% 100%;
                  color: #fef52e;
                  line-height: 0.40rem;
                }
              }
              p{
                font-size: 0.24rem;
                line-height: 0.44rem;
                position: absolute;
                left: 0.38rem;
                bottom: 0.20rem;
              }

            }
            .phone{
              margin: 0.42rem 0 0 0;
              position: relative;
              >div{
                width: 3.40rem;
                position: absolute;
                color: #fff;
                font-size: 0.26rem;
                text-align: left;
                left: 0.42rem;
                top:0.96rem;
                p{
                  margin: 0.20rem 0 0 0;
                  span{
                    opacity: 0;
                  }
                }
              }
              img{
                width: 5.48rem;
                height: 3.23rem;
              }
            }
            .code{
              height: 1.53rem;
              display: flex;
              align-items: center;
              img{
                width: 1.53rem;
                height: 1.53rem;
                float: left;
                margin: 0 0.26rem 0 0.46rem;
              }
              p{
                font-size: 0.22rem;
                line-height: 0.22rem;
                color: #fff;
                margin: 0 0 0.18rem 0;
                &:last-of-type{
                  margin:0;
                }
              }
            }
          }
        }

      }

      .bg-center4 {
        .bg-center9-center {
          position: absolute;
          z-index: 1001;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          >div{
            width: 6.40rem;
            height: 9.00rem;
            position: relative;
            border-radius: 0.20rem;
            >img{
              width: 100%;
            }
            .scroll{
              width: 5.84rem;
              height: 2.40rem;
              margin: 0 auto;
              color: #fff;
              padding: 0.1px;
              @include centerX;
              top:1.12rem;
              text-align: center;
              h3{
                font-size: 0.44rem;
                line-height: 0.44rem;
                margin: 0.40rem 0 0.20rem 0;
              }
              p{
                font-size: 0.24rem;
                line-height: 0.24rem;
                color: rgba(255,255,255,0.7);
                margin: 0 0 0.20rem 0;
              }
              button{
                @include tipButton;
              }
            }
            .phone{
              margin: 0.42rem 0 0 0;
              position: relative;
              >div{
                width: 3.40rem;
                position: absolute;
                color: #fff;
                font-size: 0.26rem;
                text-align: left;
                left: 0.42rem;
                top:0.96rem;
                p{
                  margin: 0.20rem 0 0 0;
                  span{
                    opacity: 0;
                  }
                }
              }
              img{
                width: 5.48rem;
                height: 3.23rem;
              }
            }
            .code{
              height: 1.53rem;
              display: flex;
              align-items: center;
              img{
                width: 1.53rem;
                height: 1.53rem;
                float: left;
                margin: 0 0.26rem 0 0.46rem;
              }
              p{
                font-size: 0.22rem;
                line-height: 0.22rem;
                color: #fff;
                margin: 0 0 0.18rem 0;
                &:last-of-type{
                  margin:0;
                }
              }
            }
          }
        }
      }
    }
  }
</style>


