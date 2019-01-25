// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import { store } from "./store/store"
import { mapGetters } from "vuex"

Vue.config.productionTip = false

window.eventBus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: "#app",
  store: store,
  router,
  components: { App },
  template: "<App/>"
})
