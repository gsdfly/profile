<template>
  <div class="coupon" v-show="showHtml">
    <ul v-if="records.length > 0">
      <li v-for="item in records">
      <img :src="couponBg[item.remarks.coupontype-1]" alt="">
        <div class="center">
          <h3 class="price"><b v-if="item.remarks.moneytype === 2">+</b><em v-else="">￥</em><span>{{item.remarks.price}}</span><i v-if="item.overdue">(券已过期)</i></h3>
          <button @click="openCoupon(item.remarks.coupontype,item.code,item.end_time)">去使用</button>
          <h4 class="description">{{item.remarks.title}}</h4>
          <p>{{item.remarks.description}}</p>
        </div>
      </li>
    </ul>

    <div class="nothing" v-else>
      <img src="./../assets/img/ticket_nothing.png" alt="">
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
          <img @click.prevent=""   src="http://res.catchme.com.cn/activity/jiewu/big/bg3.png" alt="" class="imgBg">
          <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close" @click="closeBg"/>
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
          <img @click.prevent="" src="http://res.catchme.com.cn/catch2/my.png" alt="" class="imgBg">
          <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close" @click="closeBg"/>
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
            <img src="http://res.catchme.com.cn/activity/card/copy.png" alt="" @click.prevent="" class="imgBg"/>
          </div>
          <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
               @click="closeBg"/>
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
            <img src="http://res.catchme.com.cn/activity/cake/shuoming.png" alt="" @click.prevent="" class="imgBg"/>
          </div>
          <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
               @click="closeBg"/>
        </div>
        <div style="width: 100%;height: 100%;position: absolute;z-index:1000" @click="closeBg"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Clipboard from 'clipboard';
  import api from './../api/index';
  import { Toast } from 'mint-ui';

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
         require('./../assets/catch2/personal_bg.png'),
         'http://res.catchme.com.cn/profile/ikang_card_bg.png'
    ],
//        recordsJ:[],
//        recordsD:[],
        currentcode:'',
        endtime:'',
//        recordsK:[]
      }
    },
    created(){
      this.Indicator.open()
    },
    mounted(){
      api.getProfileVoucher().then((res)=>{
        var records = res.data.data.records;
        for(var i=0;i<records.length;i++ ){
          records[i].remarks = JSON.parse(records[i].remarks);
        }
        this.records = records;
        this.Indicator.close();
        this.showHtml = true;
      })
    },
    methods:{
//      getVoucherLength(value){
//        if(value>1){
//          var scrollIn= document.querySelector('.bg-center1 .scroll-in');
//          scrollIn.style = 'width:'+(66.3*value+6.4)+'vw';
//        }
//      },
//      getVoucherLength2(value){
//        if(value>1){
//          var scrollIn= document.querySelector('.bg-center9 .scroll-in');
//          scrollIn.style = 'width:'+(68.4*value+6.4)+'vw';
//        }
//      },
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
          default:this.contentShow = 'exchange2';break;
        }

//        if(value === 'hop'){
//          this.getVoucherLength(this.recordsJ.length);
//          this.contentShow = 'exchange';
//        }else if(value === 'hop2'){
//          this.getVoucherLength(this.recordsK.length);
//          this.contentShow = 'exchange3';
//        }
//        else {
//          this.getVoucherLength2(this.recordsD.length);
//          this.contentShow = 'exchange2';
//        }
      },
      copy() {
        var clipboard = new Clipboard('.'+event.target.className);
        console.log(event.target.className)
        clipboard.on('success', e => {
          Toast({
            message: '复制成功',
            position: 'middle',
            duration: 1000
          })
          console.log('复制成功')
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          Toast({
            message: '该浏览器不支持自动复制',
            position: 'middle',
            duration: 1000
          })
          // 不支持复制
          console.log('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
      },
      closeBg(){
        this.bgShow = false;
      },

    },
    filters:{
      handleEndTime(value){
        return value.split(' ')[0].replace(/-/g,'.');
      }
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
    width: 118px;
    height: 56px;
    outline: none;
    border:3px solid #25edff;
    font-size: 30px;
    color: #fff;
    background: #374cc6;
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
        width: 506px;
        margin: 140px auto 70px auto;
      }
      p{
        text-align: center;
        color: #888888;
      }
    }
    ul{
      width: 706px;
      margin: 0 auto;
      padding: 0.1px 0 10px 0;
      li{
        width: 100%;
        height: 254px;
        margin: 10px 0 0 0;
        position: relative;
        /*padding: 30px;*/
        img{
          width: 100%;
        }
        .center{
          position: absolute;
          left: 0;
          top:0;
          padding: 0 30px;
          width: 100%;
          height: 100%;
          h3{
            font-size: 32px;
            color: #fff;
            line-height: 76px;
            margin: 30px 0 0 0;
            b{
              font-size: 44px;
            }
            span{
              font-size: 76px;
            }
          }
          button{
            width: 122px;
            height: 42px;
            border-radius: 4px;
            background: #fff;
            border: none;
            outline: none;
            color: #f16319;
            font-size: 26px;
            position: absolute;
            right: 30px;
            top:64px;
          }
          h4{
            font-size: 34px;
          }
          p{
            font-size: 22px;
            position: absolute;
            line-height: 22px;
            bottom: 26px;
          }
        }
      }
    }

    .close{
      width: 82px;
      height: 82px;
      margin: 40px auto 0 auto;
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
            width: 622px;
          }
          .scroll-out{
            width: calc(100% - 64px);
            height: 243px;
            position: absolute;
            top:131px;
            left: 64px;
            overflow: auto;
            .scroll-in{
              /*width: calc(498px * 2 + 50px);*/
              height: 243px;
              >div{
                width: 495px;
                height: 241px;
                background: url("./../assets/img/quan.png") no-repeat;
                background-size: 100% 100%;
                float: left;
                margin: 0 1px 0 0;
                position: relative;
                p{
                  width: 495px;
                  height: 74px;
                  position: absolute;
                  padding: 0 25px;
                  top:47px;
                  .input{
                    border: none;
                    background: none;
                    outline: none;
                    color: #fff;
                    font-size: 40px;
                    height: 100%;
                    width: calc(100% - 128px);
                    -webkit-appearance:none;
                    float: left;
                    line-height: 78px;
                  }
                  button{
                    width: 128px;
                    height: 74px;
                    border: none;
                    outline: none;
                    font-size: 28px;
                    color: #fff;
                    background: url("http://res.catchme.com.cn/activity/jiewu/big/press_copy.png") no-repeat;
                    background-size: 100% 100%;
                    float: right;
                  }
                }
                b{
                  position: absolute;
                  left: 30px;
                  bottom: 26px;
                  font-size: 22px;
                  color: #fff;
                  line-height: 22px;
                }
              }
            }
          }
          .exchange2{
            top:188px;
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
          margin: 0 0 0 15px;
          .imgBg {
            width: 652px;
          }
          .scroll-out{
            width: calc(100% - 30px);
            /*width: calc(100% - 64px);*/
            height: 243px;
            position: absolute;
            top:232px;
            /*left: 50px;*/
            padding: 0 0 0 50px;
            left: 0;
            overflow: auto;
            .scroll-in{
              /*width: calc(498px * 2 + 50px);*/
              height: 243px;
              >div{
                width: 513px;
                height: 240px;
                /*background: url("http://res.catchme.com.cn/activity/jiewu/big/quan.png") no-repeat;*/
                /*background: url("./../assets/catch2/quan.png") no-repeat;*/
                background: url("./../assets/catch2/ticket_bg.png") no-repeat;
                background-size: 100% 100%;
                float: left;
                margin: 0 1px 0 0;
                position: relative;
                p{
                  width: 100%;
                  height: 86px;
                  position: absolute;
                  padding: 0 17px 0 32px;
                  /*top:50%;*/
                  top:42px;
                  /*transform: translateY(-50%);*/
                  .input{
                    border: none;
                    background: none;
                    outline: none;
                    color: #5d4037;
                    font-size: 42px;
                    height: 100%;
                    width: calc(100% - 142px);
                    -webkit-appearance:none;
                    float: left;
                    line-height: 86px;
                    text-align: left;
                  }
                  button{
                    width: 142px;
                    height: 86px;
                    border: none;
                    outline: none;
                    font-size: 28px;
                    color: #fff;
                    background: url("./../assets/catch2/press_copy.png") no-repeat;
                    background-size: 100% 100%;
                    float: right;
                  }
                }
                b{
                  position: absolute;
                  left: 30px;
                  bottom: 26px;
                  font-size: 22px;
                  color: #6d523a;
                  line-height: 22px;
                }
              }
            }
          }
          .exchange2{
            top:232px;
            .scroll-in{
              >div{
                width: 520px;
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
            width: 640px;
            position: relative;
            border-radius: 20px;
            >img{
              width: 100%;
            }
            .scroll{
              width: 541px;
              height: 240px;
              margin: 0 auto;
              color: #a73f2d;
              @include centerX;
              top:130px;
              padding: 20px 0 0 0;
              >div{
                height: 146px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 38px;
                h3{
                  font-size: 44px;
                  line-height: 44px;
                }
                button{
                  width: 122px;
                  height: 68px;
                  outline: none;
                  border: none;
                  background: url("./../assets/card/press_copy.png") no-repeat;
                  background-size: 100% 100%;
                  color: #fef52e;
                  line-height: 40px;
                }
              }
              p{
                font-size: 24px;
                line-height: 44px;
                position: absolute;
                left: 38px;
                bottom: 20px;
              }

            }
            .phone{
              margin: 42px 0 0 0;
              position: relative;
              >div{
                width: 340px;
                position: absolute;
                color: #fff;
                font-size: 26px;
                text-align: left;
                left: 42px;
                top:96px;
                p{
                  margin: 20px 0 0 0;
                  span{
                    opacity: 0;
                  }
                }
              }
              img{
                width: 548px;
                height: 323px;
              }
            }
            .code{
              height: 153px;
              display: flex;
              align-items: center;
              img{
                width: 153px;
                height: 153px;
                float: left;
                margin: 0 26px 0 46px;
              }
              p{
                font-size: 22px;
                line-height: 22px;
                color: #fff;
                margin: 0 0 18px 0;
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
            width: 640px;
            height: 900px;
            position: relative;
            border-radius: 20px;
            >img{
              width: 100%;
            }
            .scroll{
              width: 584px;
              height: 240px;
              margin: 0 auto;
              color: #fff;
              padding: 0.1px;
              @include centerX;
              top:112px;
              text-align: center;
              h3{
                font-size: 44px;
                line-height: 44px;
                margin: 40px 0 20px 0;
              }
              p{
                font-size: 24px;
                line-height: 24px;
                color: rgba(255,255,255,0.7);
                margin: 0 0 20px 0;
              }
              button{
                @include tipButton;
              }
            }
            .phone{
              margin: 42px 0 0 0;
              position: relative;
              >div{
                width: 340px;
                position: absolute;
                color: #fff;
                font-size: 26px;
                text-align: left;
                left: 42px;
                top:96px;
                p{
                  margin: 20px 0 0 0;
                  span{
                    opacity: 0;
                  }
                }
              }
              img{
                width: 548px;
                height: 323px;
              }
            }
            .code{
              height: 153px;
              display: flex;
              align-items: center;
              img{
                width: 153px;
                height: 153px;
                float: left;
                margin: 0 26px 0 46px;
              }
              p{
                font-size: 22px;
                line-height: 22px;
                color: #fff;
                margin: 0 0 18px 0;
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


