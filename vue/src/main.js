// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import callbackUrl from './callbackUrl'
import FastClick from 'fastclick'
import 'mint-ui/lib/style.css'
import Indicator from 'mint-ui/lib/indicator'
import './config/rem'
import infiniteScroll from 'vue-infinite-scroll'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

Vue.use(infiniteScroll);

FastClick.attach(document.body)

!async function () {
  if (process.env.NODE_ENV !== 'development' && document.URL.indexOf('questions') === -1) {
    await callbackUrl();
  }
  Vue.config.productionTip = false

  Vue.filter('handleDate', function (value) {
    return value.replace(/-/g,'.')
  })

  Vue.prototype.Indicator = Indicator

  var sc = document.createElement('script')
  sc.src = 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js'
  document.getElementsByTagName('body')[0].appendChild(sc)

  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
}()

