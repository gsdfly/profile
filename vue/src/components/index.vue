<template>
  <div class="profile" v-if="isShowHtml">
    <div class="header">
      <div class="content">
        <div class="content-img">
          <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="">
          <img class="defaultavatar" v-else="" src="./../assets/img/icon_portrait.png" alt="">
        </div>
        <p>{{userInfo.nickname}}<span>({{userInfo.player_id}})</span></p>
        <div class="mycoin">
            <span></span><b>{{userInfo.coin}}</b>
        </div>
        <!--<p class="ticket" @click="goTo('ticket')">兑换券<span></span></p>-->
        <p class="ticket" @click="goTo('ticket')">兑换券<i class="iconfont icon-go1"></i></p>
      </div>
    </div>
    <div class="main">
      <ul>
        <li @click="goTo('prize')">
          <img src="http://res.catchme.com.cn/profile/imgs/icon_zhong.png" alt="">
          <p>抓中记录</p>
          <span></span>
          <b>{{userInfo.prize}}</b>
        </li>
        <li @click="goTo('game')">
          <img src="http://res.catchme.com.cn/profile/imgs/icon_game.png" alt="">
          <p>游戏记录</p>
          <span></span>
          <b>{{userInfo.consume}}</b>
        </li>
        <li @click="goTo('coin')">
          <img src="http://res.catchme.com.cn/profile/imgs/icon_recharge_record.png" alt="">
          <p>充值记录</p>
          <span></span>
        </li>
        <li @click="goTo('coupon')">
          <img src="./../assets/img/personal_ticket.png" alt="">
          <p>优惠券</p>
          <span></span>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
  import api from './../api/index'
  export default {
    name:'profile',
    data(){
      return {
        userInfo:{
        },
        isShowHtml:false
      }
    },
    created(){
      this.Indicator.open()
    },
    mounted(){
      api.getProfile().then((res)=>{
        this.userInfo = res.data.data;
        this.isShowHtml = true;
        this.Indicator.close()
      })
    },
    methods:{
      goTo(value){
        this.$router.push('/'+value);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .profile{
    background: #f2f2f2;
    width: 100%;
    height: 100%;
  }
  .header{
    width: 100%;
    height: 461px;
    background: url("http://res.catchme.com.cn/profile/imgs/bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 0.1px;
    position: relative;
  }
  .header .content{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top:0;
  }
  .header .content .mycoin{
    width: 240px;
    height: 60px;
    background: #fff;
    border-radius: 30px;
    text-align: center;
    font-size: 40px;
    color: #f16319;
    margin: 40px auto 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

    .header .content .mycoin span{
    display: inline-block;
    width: 48px;
    height: 44px;
    background: url("http://res.catchme.com.cn/profile/imgs/icon_recharge_bi.png") no-repeat;
    background-size: 100% 100%;
  }
  .header .content .mycoin b{
    float: right;
    height: 40px;
    line-height: 40px;
    margin: 0 0 0 8px;
  }

    .header .content .ticket{
    font-size: 28px;
    line-height: 28px;
      position: relative;
      i{
        font-size: 32px;
        line-height: 32px;
      }
  }

    .header .content .content-img{
    width: 200px;
    height: 200px;
    border: 4px solid #fff;
    margin: 30px auto 0 auto;
    border-radius: 50%;
    overflow: hidden;
    /*display: none;*/
      position: relative;
  }

  .header .content p{
    font-size: 36px;
    color: #fff;
    line-height: 36px;
    margin: 14px 0 0 0;
    text-align: center;
  }
  .header .content p span{
    font-size: 24px;
  }

    .header .content>div img{
    width: 100%;
    height: 100%;
  }
  .header .content>div .defaultavatar{
    width: 176px;
    height: 136px;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
  .header .blur{
    width: 100%;
    height: 90%;
    /*height: 100%;*/
    -webkit-filter: blur(5px); /* Chrome, Safari, Opera */
    filter: blur(5px);
  }
  .main{
    width: 100%;
    padding: 0.1px 22px 0 22px;
    height: calc(100% - 461px);
    overflow: auto;
  }
  .main ul{
    width: 100%;
    margin: 26px 0 0 0;
  }
  .main ul li{
    width: 100%;
    height: 174px;
    background: #fff;
    border-radius: 10px;
    margin: 0 0 12px 0;
  }
  .main ul li img{
    width: 118px;
    height: 118px;
    float: left;
    margin: 28px 0 0 22px;
  }
  .main ul li p{
    font-size: 34px;
    line-height: 174px;
    margin: 0 0 0 22px;
    color: #888888;
    float: left;
  }
  .main ul li b{
    font-size: 80px;
    color: #f16319;
    float: right;
    line-height: 174px;
    margin: 0 24px 0 0;
    font-weight: 600;
  }
  .main ul li span{
    width: 16px;
    height: 28px;
    float: right;
    background:url("http://res.catchme.com.cn/profile/imgs/icon_go.png") no-repeat;
    background-size: 100% 100%;
    margin: 73px 22px 0 0;
  }
</style>
