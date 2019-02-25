<template>
  <div class="prize" v-show="isShowHtml">
    <scroll-view scroll-y class="scroll" @scrolltolower="loadMore" v-if="prize.length>0">
      <ul>
        <li v-for="(item,index) in prize" :key="index">
          <div class="left">
            <h3>{{item.site_name}}</h3>
            <p>{{item.created_at}}</p>
          </div>
          <span>抓中</span>
        </li>
      </ul>
      <p class="bottomtip" v-if="pageIndex <= last_page && last_page > 1">加载中...</p>
      <p class="bottomtip" v-if="pageIndex > last_page">没有更多了</p>
    </scroll-view>
    <div class="nothing" v-else>
      <img src="./../../../static/img/ticket_nothing.png" alt="" mode="widthFix">
      <p>暂时没有抓中记录哦</p>
    </div>
  </div>
</template>

<script>
  import api from './../../api'

  export default {
    name: 'game',
    data() {
      return {
        prize: [],
        pageIndex: 0,
        isShowHtml: false,
        last_page: 1,
        busy: false
      }
    },
    mounted() {
      wx.setNavigationBarTitle({
        title: '抓中记录'
      })
      api.getPrize().then((res) => {
        this.isShowHtml = true;
        this.prize = res.data.data.prizes.data;
        this.pageIndex = res.data.data.prizes.current_page;
        this.last_page = res.data.data.prizes.last_page;
      })
    },
    methods: {
      loadMore() {
        this.busy = true;
        this.pageIndex++;
        if (this.pageIndex <= 1) {
          this.busy = false;
          return;
        }
        if (this.pageIndex <= this.last_page) {
          api.getPrize({page: this.pageIndex}).then((res) => {
            for (var i = 0; i < res.data.data.prizes.data.length; i++) {
              this.prize.push(res.data.data.prizes.data[i]);
            }
            this.pageIndex = res.data.data.prizes.current_page;
            this.busy = false;
          })
        }
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
    height: 100%;
    overflow: auto;
  }

  .prize {
    width: 100%;
    height: 100%;
    padding: 0.12rem 0.22rem;
    background: #f2f2f2;
  }

  ul {
    width: 100%;
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
    color: #f5936e;
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
