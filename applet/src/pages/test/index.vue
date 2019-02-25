<template>
  <div class="test">
    <!--previous-margin="56rpx" next-margin="56rpx"-->
    <swiper class='swiperClass' :indicator-dots="indicatorDots"
            :autoplay="autoplay" :interval="interval" :duration="duration" @change="bindchange" previous-margin="47rpx" circular="true">
      <block v-for="(item,index) in imgUrls" :key="index">
        <swiper-item>
          <img :src="item" class="slide-image" :class="swiperIndex == index ? 'active' : 'quiet'"/>
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>


<script>
  export default {
    name:'test',
    data(){
      return {
        imgUrls: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        swiperIndex: 0 //这里不写第一次启动展示的时候会有问题
      }
      },
    methods:{
      bindchange(e) {
        console.log(e)
        this.swiperIndex = e.mp.detail.current
      },
    }
    }
</script>

<style lang="scss" scoped>
  .swiperClass {
    margin: 0;
    margin-top: 10px;
  }
  swiper{
    height: 4.2rem;
  }
  swiper-item{
    width: 6.58rem!important;
  }

    .slide-image {
    width: 6.58rem;
    height: 4.2rem;
    /*width: 100%;*/
    /*height: 100%;*/
    border-radius: 10px;
    position: relative;
  }
  img.active {
    transform: none;
    transition: all 5s ease-in 0s;
  }
  img.quiet {
    /*transform: scale(0.904762);*/
    transition: all 5s ease-in 0s;
    transform: scale(0.904762) translateX(0.155rem);
  }
</style>
