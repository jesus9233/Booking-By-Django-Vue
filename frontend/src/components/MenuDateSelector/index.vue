<template>
  <div id="DateSelector" class="row align-items-center date-selector">
    <div class="col-3">
      <a class="btn" @click="subDay()">
        <i class="fas fa-angle-left"></i>
      </a>
    </div>
    <div class="col-6">
      <h5>
        <router-link :to="{name:'date-select'}">
          {{selected_date}}
        </router-link>
      </h5>
    </div>
    <div class="col-3">
      <a class="btn " @click="addDay()">
        <i class="fas fa-angle-right"></i>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { toString } from 'datejs';

export default {
  computed:{
    ...mapGetters([
      'selected_date',
    ]),
  },
   methods: {
    ...mapActions([
      'changeDate',
    ]),

    addDay() {
      let date = new Date(this.selected_date);
      date.setDate(date.getDate() + 1);
      this.changeDate(date.toString('yyyy-MM-dd'));
    },

    subDay() {
      let date = new Date(this.selected_date);
      date.setDate(date.getDate() - 1);
      this.changeDate(date.toString('yyyy-MM-dd'));
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
