<template>
  <div class="prize" v-show="isShowHtml">
    <div class="scroll" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <ul @scroll="addEventScroll($event)">
      <li v-for="item in prize">
        <div class="left">
          <h3>{{item.site_name}}</h3>
          <p>{{item.created_at | handleDate}}</p>
        </div>
        <span>抓中</span>
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
    name:'game',
    data(){
      return {
        prize:[],
        pageIndex:0,
        isShowHtml:false,
        last_page:1,
        busy: false
      }
    },
    created(){
      this.Indicator.open()
    },
    mounted(){
      api.getPrize().then((res)=>{
        this.isShowHtml = true;
        this.prize = res.data.data.prizes.data;
        this.pageIndex = res.data.data.prizes.current_page;
        this.last_page = res.data.data.prizes.last_page;
        this.Indicator.close()
      })
    },
    methods:{
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

<style scoped>
  .scroll>p{
    text-align: center;
    font-size: 30px;
    line-height: 50px;
  }
  .scroll {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .prize{
    width: 100%;
    height: 100%;
    padding: 12px 22px;
    background: #f2f2f2;
  }
  ul{
    width: 100%;
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
    color: #f5936e;
    line-height: 104px;
    margin: 0 22px 0 0;
  }
</style>
