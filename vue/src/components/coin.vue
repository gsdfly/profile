<template>
  <div class="coin" v-show="isShowHtml">
    <h2 class="cointotal">{{coinInfo.coin_total}}<span>币</span></h2>
    <div class="scroll" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <ul>
        <li v-for="item in coinInfo.orders.data">
          <div class="left">
            <h3>充值{{item.total_price}}元</h3>
            <p>{{item.created_at | handleDate}}</p>
          </div>
          <span>+{{item.coin_num}}币</span>
        </li>
      </ul>
      <p v-if="pageIndex <= last_page && last_page > 1">加载中...</p>
      <p v-if="pageIndex > last_page">没有更多了</p>
    </div>
  </div>
</template>

<script>
  import api from './../api'
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
    created() {
      this.Indicator.open()
    },
    mounted() {
      api.getOrder().then((res) => {
        this.coinInfo = res.data.data;
        this.isShowHtml = true;
        this.pageIndex = res.data.data.orders.current_page;
        this.last_page = res.data.data.orders.last_page;
        this.Indicator.close()
      })
    },
    methods: {
      loadMore() {
        this.busy = true;
        //官方示例中延迟了1秒，防止滚动条滚动时的频繁请求数据
//        setTimeout(() => {
          this.pageIndex++;
          if(this.pageIndex <= 1){
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

<style scoped>
  .scroll>p{
    text-align: center;
    font-size: 30px;
    line-height: 50px;
  }
  .scroll {
    width: 100%;
    height: calc(100% - 198px);
    overflow: auto;
  }

  .coin {
    width: 100%;
    height: 100%;
    background: #f2f2f2;
    padding: 0.1px 22px;
  }

  h2 {
    margin: 12px 0;
    height: 174px;
    line-height: 174px;
    font-size: 80px;
    color: #f16319;
    background: #fff;
    text-align: center;
    font-weight: 600;
  }

  h2 span {
    font-size: 36px;
  }

  ul {
    width: 100%;
    /*min-height: calc(100% + 12px);*/
    /*overflow: auto;*/
  }

  ul li {
    width: 100%;
    height: 104px;
    background: #fff;
    border-radius: 10px;
    margin: 0 0 12px 0;
  }

  ul li .left {
    float: left;
    padding: 22px 0 0 22px;
  }

  ul li .left h3 {
    font-size: 30px;
    color: #353535;
    line-height: 30px;
    margin: 0 0 10px 0;
  }

  ul li .left p {
    font-size: 20px;
    color: #888888;
    line-height: 20px;
  }

  ul li > span {
    float: right;
    font-size: 34px;
    color: #f16319;
    line-height: 104px;
    margin: 0 22px 0 0;
  }
</style>
