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

<style>
#date-input {
  height: 100vh;
  padding-top: 25px;
  padding-bottom: 25px;
}
#date-input .center {
  top: 30vh;
}
.header {
  margin-bottom: 40px;
}
.button {
  margin-top: 30px;
}
.date {
  width: 80%;
  margin-left: 10%;
}
</style>