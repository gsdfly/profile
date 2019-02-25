<template>
  <div class="ticket">
    <div class="ticket-main">
      <input type="text" name="code" v-model="code" placeholder="输入兑换码"/>
      <button @click="receiveTicket">确认兑换</button>
    </div>
    <div class="bg" @click="close" v-show="bgShow" :class="{'twoContent':current_error.content.length>1}" >
      <div class="main" @click.stop="">
        <img @click.prevent="" src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close" @click="close">
        <img @click.prevent="" :src="current_error.url" alt="">
        <div class="content">
          <p v-for="item in current_error.content">{{item}}</p>
        </div>
        <button @click="close">我知道了</button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from './../api'
  import { Toast  } from 'mint-ui';
  export default {
    data(){
      return {
        code:'',
        bgShow:false,
        current_error:{
          url:'',
          content:[]
        },
        errors:{
          used:{
            url:'http://res.catchme.com.cn/imgs-2017-12-29-20-42/image_used_dui.png',
            content:['已经被使用过了']
          },
          not_exist:{
            url:'http://res.catchme.com.cn/imgs-2017-12-29-20-42/image_code_no.png',
            content:['兑换码不存在','请核对后重新填写']
          }
        }
      }
    },
    methods:{
      receiveTicket(){
        console.log(this.code);
        if(!this.code.trim()){
          Toast({message:'请输入兑换码', duration: 1000});
          return;
        }
        api.receive({code:this.code}).then((res)=>{
          switch (res.data.status_code){
            case 1015:this.current_error = this.errors.not_exist;this.bgShow = true;break;
            case 1016:this.current_error = this.errors.used;this.bgShow = true;break;
            case 200: Toast({message:'领取成功', duration: 800});
            setTimeout(()=>{
              this.$router.push('/');
            },1000);break;
            default:Toast({message:'领取失败，请稍后再试', duration: 1000});break;
          }
        }).catch((res)=>{
          Toast({message:'领取失败，请稍后再试', duration: 1000});
        })
      },
      close(){
        this.bgShow = false
      }
    }

  }
</script>

<style lang="scss" scoped>
  .ticket{
    width: 100%;
    height: 100%;
    padding: 98px 0 0 0;
    .ticket-main{
      width: 612px;
      height: 400px;
      margin: 0 auto 0 auto;
      input{
        width: 100%;
        border: none;
        outline: none;
        background: none;
        border-bottom: 2px solid #b2b2b2;
        font-size: 40px;
        color: #b2b2b2;
        text-align: center;
        line-height: 88px;
      }
      button{
        width: 100%;
        height: 94px;
        background: #f16319;
        border-radius: 10px;
        border: none;
        outline: none;
        margin: 120px 0 0 0;
        color: #fff;
        font-size: 40px;
      }
    }
    .bg{
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 999;
      background: rgba(0, 0, 0, 0.72);
      .main{
        width: 622px;
        padding: 76px 33px;
        background: #fff;
        border-radius: 5px;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        margin: 40px 0 0 0;
        img{
          width: 100%;
          &.close{
            width: 84px;
            height: 84px;
            float: right;
            margin: -200px -33px 0 0;
          }
        }
        .content{
          margin: 47px 0 49px 0;
          p{
            font-size: 40px;
            color: #353535;
            text-align: center;
            line-height: 64px;
          }
        }
        button{
          width: 100%;
          height: 100px;
          border: none;
          outline: none;
          font-size: 36px;
          color: #fff;
          text-shadow: 2px 2px 3px #cd1d00;
          background: url("http://res.catchme.com.cn/imgs-2018-04-10/press_default.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .twoContent {
      .main{
        padding: 76px 33px 82px 33px;
        .content{
          margin: 45px 0 ;
        }
      }
    }
  }

</style>
