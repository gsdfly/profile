<template>
  <div class="ticket">
    <div class="ticket-main">
      <input type="text" name="code" v-model="code" placeholder="输入兑换码"/>
      <button @click="receiveTicket">确认兑换</button>
    </div>
    <div class="bg" @click="close" v-show="bgShow" :class="{'twoContent':current_error.content.length>1}">
      <div class="main" @click.stop="">
        <img @click.prevent="" src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"
             @click="close" mode="widthFix">
        <img @click.prevent="" :src="current_error.url" alt="" mode="widthFix">
        <div class="content">
          <p v-for="(item,index) in current_error.content" :key="index">{{item}}</p>
        </div>
        <button @click="close">我知道了</button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from './../../api'

  export default {
    data() {
      return {
        code: '',
        bgShow: false,
        current_error: {
          url: '',
          content: []
        },
        errors: {
          used: {
            url: 'http://res.catchme.com.cn/imgs-2017-12-29-20-42/image_used_dui.png',
            content: ['已经被使用过了']
          },
          not_exist: {
            url: 'http://res.catchme.com.cn/imgs-2017-12-29-20-42/image_code_no.png',
            content: ['兑换码不存在', '请核对后重新填写']
          }
        }
      }
    },
    mounted() {
      wx.setNavigationBarTitle({
        title: '兑换游戏券'
      })
    },
    methods: {
      receiveTicket() {
        if (!this.code.trim()) {
          wx.showToast({
            title: '请输入兑换码',
            icon: 'none'
          })
          return;
        }
        api.receive({code: this.code}).then((res) => {
          switch (res.data.status_code) {
            case 1015:
              this.current_error = this.errors.not_exist;
              this.bgShow = true;
              break;
            case 1016:
              this.current_error = this.errors.used;
              this.bgShow = true;
              break;
            case 200:
              wx.showToast({
                title: '领取成功',
                icon: 'none'
              });
              setTimeout(() => {
                this.$router.push('/');
              }, 1000);
              break;
            default:
              wx.showToast({
                title: '领取失败',
                icon: 'none'
              });
              break;
          }
        }).catch((res) => {
          wx.showToast({
            title: '领取失败，请稍后再试',
            icon: 'none'
          })
        })
      },
      close() {
        this.bgShow = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ticket {
    width: 100%;
    height: 100%;
    padding: 0.98rem 0 0 0;
    .ticket-main {
      width: 6.12rem;
      height: 4rem;
      margin: 0 auto 0 auto;
      input {
        width: 100%;
        border: none;
        outline: none;
        background: none;
        border-bottom: 2px solid #b2b2b2;
        font-size: 0.4rem;
        color: #b2b2b2;
        text-align: center;
        line-height: 0.88rem;
      }
      button {
        width: 100%;
        height: 0.94rem;
        background: #f16319;
        border-radius: 0.1rem;
        border: none;
        outline: none;
        margin: 1.2rem 0 0 0;
        color: #fff;
        font-size: 0.4rem;
      }
    }
    .bg {
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 999;
      background: rgba(0, 0, 0, 0.72);
      .main {
        width: 6.22rem;
        padding: 0.76rem 0.33rem;
        background: #fff;
        border-radius: 5px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        margin: 0.4rem 0 0 0;
        img {
          width: 100%;
          &.close {
            width: 0.84rem;
            height: 0.84rem;
            float: right;
            margin: -2rem -0.33rem 0 0;
          }
        }
        .content {
          margin: 0.47rem 0 0.49rem 0;
          p {
            font-size: 0.4rem;
            color: #353535;
            text-align: center;
            line-height: 0.64rem;
          }
        }
        button {
          width: 100%;
          height: 1rem;
          border: none;
          outline: none;
          font-size: 0.36rem;
          color: #fff;
          text-shadow: 2px 2px 3px #cd1d00;
          background: url("http://res.catchme.com.cn/imgs-2018-04-10/press_default.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .twoContent {
      .main {
        padding: 0.76rem 0.33rem 0.82rem 0.33rem;
        .content {
          margin: 0.45rem 0;
        }
      }
    }
  }

</style>
