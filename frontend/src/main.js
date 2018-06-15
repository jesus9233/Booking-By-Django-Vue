import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./css/main.scss";
import store from "./store";
import router from "./router";
import { mapActions } from 'vuex';

Vue.use(BootstrapVue);

new Vue({
  el: "#app",
  store,
  router,
  methods: {
    ...mapActions(["initStorage"]),
  },
  created() {
    this.initStorage();
  }
})
