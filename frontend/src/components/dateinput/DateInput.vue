<template>
  <div id="date-input" class="container col-sm-8">
    <div class="center">

      <div class="header">
        <h2>Select a date</h2>
      </div>
      
      <div class="date form-group">
        <input type="date" class="date form-control form-control-md" v-model="selected_date"
        @input="changeDate(selected_date)">
      </div>
      
      <router-link :to="{name:'table-select'}" class="btn btn-outline-success btn-lg button">
        Next
      </router-link>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      // For local storage of a selected date
      selected_date: this.$store.getters.selected_date
    }
  },
  methods: {
    ...mapActions([
      'changeDate'
      ]),
  }
}

</script>

<style lang='scss' scoped>
  @import 'dateinput.scss'
</style>