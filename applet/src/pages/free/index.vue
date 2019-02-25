<template>
  <div>
    <div class="box box1 ">
      <div class="main">
        <div>
          <img src="http://res.catchme.com.cn/activity/free/box1.png" alt="" mode="widthFix" />
        </div>
      </div>
      <button class="btn btn1" @click="getFreeOrder">立即领取</button>
    </div>
    <div class="box box2" :class="{'high':isHigh==='box2'}">
      <div class="main">
        <div>
          <img src="http://res.catchme.com.cn/activity/free/box2.png" alt="" mode="widthFix">
          <h3>恭喜您获得<span class="s1">2</span>个游戏币</h3>
          <span class="s2">2币</span>
        </div>
      </div>
      <button class="btn btn2" @click="closeApplet">去抓娃娃</button>
      <p>使用方法：点击“去抓娃娃”按钮，<br/>关闭公众号对话框，投币开始游戏。</p>
    </div>
    <div class="box box3" :class="{'high':isHigh==='box3'}">
      <div class="main">
        <div>
          <h3>本月已领取，下个月再来领哦～</h3>
          <img src="http://res.catchme.com.cn/activity/free/box3.png" alt="" mode="widthFix">
        </div>
      </div>
      <button class="btn btn3" @click="closeApplet">去抓娃娃</button>
      <p>使用方法：点击“去抓娃娃”按钮，<br/>关闭公众号对话框，投币开始游戏。</p>
    </div>
  </div>
</template>

<script>
  import api from './../../api'
  import {login} from './../../utils'
  export default {
    name:'free',
    async mounted() {
      wx.setNavigationBarTitle({
        title: '我抓娃娃机'
      })
      await login();
    },
    data(){
      return {
        isHigh:''
      }
    },
    onLoad: function (options) {
      if(options.finish) {
        wx.navigateBack({
          delta: 1
        })
      }
    },
    methods:{
      getFreeOrder(){
        api.getFreeOrder({ coin_price_id: 104, coupon_id: 9, machine_no: 'CATCH_199999'}).then((response)=>{
          console.log(response)
          if (response.data.status_code === 200) {
              this.isHigh = 'box2'
          } else if (response.data.status_code === 1012) {
              this.isHigh = 'box3'
          }
          else {
            wx.showToast({
              title: response.data.message,
              icon: 'none',
              duration: 2000
            })
          }
        })
      },
      closeApplet(){
//        console.log('1111');
//        wx.navigateBack({
//          delta: -1
//        })
//        wx.navigateTo({
//          url: 'main?finish=true'
//        })
        wx.reLaunch({url:'../index/index?finish=false'})
      }
    }
  }
</script>

<style scoped>

  .box {
    width: 100%;
    height: 100%;
    position: absolute;
    background: url("http://res.catchme.com.cn/activity/free/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .box1 {
    z-index: 3;
  }
  .box2 {
    z-index: 2;
  }
  .box3 {
    z-index: 2;
  }
  .box .main{
    width: 100%;
    height: calc(100% - 2.9rem);
    position: relative;
  }
  .box .main >div{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
  }

  .box1 .main >div>img{
    width: 6.91rem;
    display: block;
    margin:0 auto 0.1rem auto;
  }

  .btn{
    width: 4.6rem;
    height: 0.94rem;
    position: absolute;
    border-radius: 0.1rem;
    background: #374cc6;
    border: 0.06rem solid #25edff;
    box-shadow: 0.04rem 0.04rem 0.24rem rgba(28,39,98,0.4),-4px -4px 0.24rem rgba(28,39,98,0.4);
    font-size: 0.36rem;
    color: #fff;
    left: 50%;
    padding: 0;
    bottom: 1.96rem;
    transform: translateX(-50%);
    display: block;
    margin:0 auto;
    outline: none;
    line-height: 0.82rem;
  }

  .box2 .main >div >img{
    width: 6.91rem;
    display: block;
    margin: 0 auto 0.1rem auto;
  }

  .box2 >div h3{
    width: 100%;
    font-size:0.42rem;
    color: #25edff;
    position: absolute;
    line-height: 0.42rem;
    top: 2.76rem;
    left: 0;
    text-align: center;
    letter-spacing: 3px;
  }
  .box2 h3 span{
    font-size: 0.6rem;
    color: #fa8e3f;
  }
  .box2 div>span{
    position: absolute;
    color: #fa8e3f;
    font-size: 0.63rem;
    top:6.3rem;
    left: 50%;
    font-weight: 600;
    text-align: center;
    line-height: 0.63rem;
  }

  .box2>p,.box3>p{
    font-size: 0.22rem;
    color: rgba(255,255,255,0.9);
    position: absolute;
    bottom: 0.8rem;
    left: 0;
    width: 100%;
    text-align: center;
    line-height: 0.32rem;
  }

  .box3 .main >div>img{
    width: 4.7rem;
    display: block;
    margin:0 auto;
  }
  .box3 h3{
    font-size: 0.32rem;
    text-align: center;
    color: #25edff;
    width: 100%;
    margin: 0 0 1.12rem 0;
    font-weight: normal;
  }

  .high{
    z-index: 999;
  }
</style>
