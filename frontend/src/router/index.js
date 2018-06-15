import Vue from "vue";
import VueRouter from "vue-router";

// Pages

import PageMenu from "../components/PageMenu";
import PageDateInput from "../components/PageDateInput";
import PageBooking from "../components/PageBooking";
import PageSuccess from "../components/PageSuccess";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [{
      path: "",
      name: "date-select",
      component: PageDateInput
    },
    {
      path: "/table-select",
      name: "table-select",
      component: PageMenu
    },
    {
      path: "/booking",
      name: "booking",
      component: PageBooking,
    },
    {
      path: "/success",
      name: "success",
      component: PageSuccess
    },
  ]
});
