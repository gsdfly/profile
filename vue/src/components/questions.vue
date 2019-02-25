<template>
  <div class="questions">
    <ul>
      <li v-for="(item,index) in questions">
        <div class="question" @click="changeShow(index)">
          <span><i class="iconfont" :class="current ===index ? 'icon-fa-angle-down' :'icon-fa-angle-right'"></i></span>
          <h3>{{item.title}}</h3>
        </div>
        <div class="questionInfo" v-show="current === index">
          <p v-html="item.p1"></p>
          <p v-html="item.p2" v-if="index===0"></p>
          <div class="questionImg" v-if="item.img1">
            <img :src="item.img1" alt="" @click.prevent="">
          </div>
          <p v-html="item.p2" v-if="index===1"></p>
          <p v-html="item.p3"></p>
          <div class="questionImg" v-if="item.img2">
            <img :src="item.img2" alt="" @click.prevent="">
          </div>
        </div>
      </li>
    </ul>
    <div class="footer">
      <img src="http://res.catchme.com.cn/profile/questions/other.png" alt="" @click.prevent="">
      <span @click="close">在线客服</span>
      <a href="tel:0755-32904117">0755-32904117</a>
    </div>
  </div>
</template>

<script>
  import {questions} from './../config/questions'
  export default {
    name:'questions',
    data(){
      return{
        current:-1,
        questions
      }
    },
    methods:{
      changeShow(index){
        if(index === this.current){
          this.current = -1;
          return;
        }
        this.current = index;
      },
      close(){
        wx.closeWindow();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .questions{
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #f2f2f2;
    color: #353535;
    font-size: 34px;
    ul{
      width: 100%;
      padding: 12px 22px 0 22px;
      li{
        width: 100%;
        background: #fff;
        border-radius: 10px;
        line-height: 94px;
        padding: 0 24px;
        margin: 0 0 10px 0;
       .question{
         width: 100%;
         span{
           float: left;
           width: 48px;
           height: 48px;
           background: #e64340;
           border-radius: 50%;
           margin: 23px 24px 0 0;
           line-height: 48px;
           text-align: center;
           color: #fff;
           i{
             display: block;
             margin: 2px auto;
             font-size: 24px;
           }
         }
         h3{
           display: inline-block;
         }
       }
        .questionInfo{
          font-size: 28px;
          line-height: 48px;
          margin: 10px 0 0 0;
          border-top: 1px solid #e1e1e1;
          padding: 12px 0;
          p{
            margin: 0 0 10px 0;
            b{
              background: #b7d7ff;
              padding: 0 1px;
              margin: 0 4px;
            }
          }
          .questionImg{
            width: 650px;
            padding: 32px 0;
            border: 1px solid #e1e1e1;
            border-radius: 10px;
            margin: 2px auto 12px auto;
            img{
              width: 414px;
              margin: 0 auto;
            }
          }
        }
      }
    }
    .footer{
      width: 100%;
      padding: 0 22px 22px 22px;
      position: relative;
      img{
        width: 100%;
      }
      span{
        position: absolute;
        width: 140px;
        height: 50px;
        right: 230px;
        top:80px;
        font-size: 0;
      }
      a{
        position: absolute;
        width: 240px;
        height: 50px;
        font-size: 0;
        top: 160px;
        left: 210px;
      }
    }
  }

</style>
