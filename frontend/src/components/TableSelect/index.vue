<template>
  <div
  id="table-select"
  class="row align-items-center justify-content-center main-row"
  >
  <div class="col text-center">
    <div class="row">
      <div class="col text-center">
        <div class="header">
          <h2>Select a table</h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-10 offset-1 col-sm-10 offset-sm-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <div class="row align-items-center date-selector">
          <div class="col-3">
            <a class="btn " @click="subDay()">
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
      </div>
    </div>
    <div class="row">
      <div class="col-10 offset-1 col-sm-10 offset-sm-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <div class="room">
          <a
            v-for="table in tables"
            :key="table.id"
            :style="getTableStyle(table)"
            :title="`Places: ${table.places_number}`"
            :class="getTableClass(table)"
            @click="updateSelected(table.number)"
          >
          <div class="table-inner">
            {{table.number}}
          </div>
        </a>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-10 offset-1col-10 offset-1 col-sm-10 offset-sm-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <div class="row legend-block">
        <div class="col-4">
          <small>
            <div class="text-center">
              <i class="legend legend-free"></i>
            </div>
            free
          </small>
        </div>
        <div class="col-4">
          <small>
            <div class="text-center">
              <i class="legend legend-selected"></i>
            </div>
            selected
          </small>
        </div>
        <div class="col-4">
          <small>
            <div class="text-center">
              <i class="legend legend-reserved"></i>
            </div>
            reserved
          </small>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-10 offset-1col-10 offset-1 col-sm-10 offset-sm-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <div class="row buttons">
        <router-link
          :to="{name:'date-select'}"
          class="btn btn-light-secondary btn-md btn-wide"
        >
          Up
        </router-link>
        <router-link
          :to="{name:'booking'}"
          v-if="selected_numbers_length>0"
          class="btn btn-light-secondary btn-md btn-wide"
        >
          Next
        </router-link>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import { toString } from 'datejs';

export default {
  computed:{
    ...mapGetters([
      'tables',
      'selected_date',
      'reserved_numbers',
      'selected_numbers',
      'selected_numbers_length',
    ]),
  },
  methods: {
    ...mapMutations([
      'updateSelectedNumbers',
    ]),
    ...mapActions([
      'changeDate',
    ]),
    getTableStyle(table) {
      return {
        width:table.width + '%',
        height:table.height + '%',
        top: table.top + '%',
        left: table.left + '%'
      }
    },
    getTableClass(table) {
      return {
        'table': true,
        'table-free': !(this.isReserved(table.number)),
        'table-reserved': this.isReserved(table.number),
        'table-selected': this.isSelected(table.number),
        'oval': table.shape == 'oval',
        'rectangle': table.shape == 'rectangle'
      }
    },
    isReserved(number) {
      //Check if number in reserved numbers
      if (this.reserved_numbers.indexOf(number)==-1) return false;
      else return true;
    },
    isSelected(number) {
      //Check if number in selected numbers
      if (this.selected_numbers.indexOf(number)==-1) return false;
      else return true;
    },
    updateSelected(number) {
      if (!this.isReserved(number))
        this.updateSelectedNumbers(number);
    },
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

<style lang='scss' scoped>
@import 'style.scss';
</style>
