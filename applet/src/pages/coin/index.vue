<template>
  <div class="coin" v-show="isShowHtml">
    <h2 class="cointotal" v-if="coinInfo.orders.data.length>0">{{coinInfo.coin_total}}<span>币</span></h2>
    <scroll-view scroll-y class="scroll" @scrolltolower="loadMore" v-if="coinInfo.orders.data.length>0">
      <ul>
        <li v-for="(item,index) in coinInfo.orders.data" :key="index">
          <div class="left">
            <h3>充值{{item.total_price}}元</h3>
            <p>{{item.created_at}}</p>
          </div>
          <span>+{{item.coin_num}}币</span>
        </li>
      </ul>
      <p class="bottomtip" v-if="pageIndex <= last_page && last_page > 1">加载中...</p>
      <p class="bottomtip" v-if="pageIndex > last_page">没有更多了</p>
    </scroll-view>
    <div class="nothing" v-else>
      <img src="./../../../static/img/ticket_nothing.png" alt="" mode="widthFix">
      <p>暂时没有充值记录哦</p>
    </div>
  </div>
</template>

<script>
  import api from './../../api'

  export default {
    name: 'coin',
    data() {
      return {
        coinInfo: {
          orders: {
            data: []
          }
        },
        pageIndex: 0,
        isShowHtml: false,
        last_page: 1,
        busy: false,
        marginTop: 0,
        top: 0,
        count: 0
      }
    },
    mounted() {
      wx.setNavigationBarTitle({
        title: '我的游戏币'
      })
      api.getOrder().then((res) => {
        this.coinInfo = res.data.data;
        this.isShowHtml = true;
        this.pageIndex = res.data.data.orders.current_page;
        this.last_page = res.data.data.orders.last_page;
      })
    },
    methods: {
      loadMore() {
        this.busy = true;
        //官方示例中延迟了1秒，防止滚动条滚动时的频繁请求数据
//        setTimeout(() => {
        this.pageIndex++;
        if (this.pageIndex <= 1) {
          this.busy = false;
          return;
        }
        if (this.pageIndex <= this.last_page) {
          api.getOrder({page: this.pageIndex}).then((res) => {
            for (var i = 0; i < res.data.data.orders.data.length; i++) {
              this.coinInfo.orders.data.push(res.data.data.orders.data[i]);
            }
            this.pageIndex = res.data.data.orders.current_page;
            this.busy = false;
          })
        }
//        }, 1000);
      }
    }

  }
</script>

<style lang="scss" scoped>
  .scroll .bottomtip {
    text-align: center;
    font-size: 0.3rem;
    line-height: 0.5rem;
  }

  .scroll {
    width: 100%;
    height: calc(100% - 1.98rem);
    overflow: auto;
  }

  .coin {
    width: 100%;
    height: 100%;
    background: #f2f2f2;
    padding: 0.1px 0.22rem;
  }

  h2 {
    margin: 0.12rem 0;
    height: 1.74rem;
    line-height: 1.74rem;
    font-size: 0.8rem;
    color: #f16319;
    background: #fff;
    text-align: center;
    font-weight: 600;
  }

  h2 span {
    font-size: 0.36rem;
  }

  ul {
    width: 100%;
    /*min-height: calc(100% + 12px);*/
    /*overflow: auto;*/
  }

  ul li {
    width: 100%;
    height: 1.04rem;
    background: #fff;
    border-radius: 0.1rem;
    margin: 0 0 0.12rem 0;
  }

  ul li .left {
    float: left;
    padding: 0.22rem 0 0 0.22rem;
  }

  ul li .left h3 {
    font-size: 0.3rem;
    color: #353535;
    line-height: 0.3rem;
    margin: 0 0 0.1rem 0;
  }

  ul li .left p {
    font-size: 0.2rem;
    color: #888888;
    line-height: 0.2rem;
  }

  ul li > span {
    float: right;
    font-size: 0.34rem;
    color: #f16319;
    line-height: 1.04rem;
    margin: 0 0.22rem 0 0;
  }

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
</style>
