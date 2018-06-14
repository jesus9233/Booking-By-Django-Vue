<template>
  <div
    id="DateInput"
    class="row align-items-center justify-content-center main-row"
  >
    <div class="col">
      <div class="row">
        <div class="col">
          <h2 class="header text-center">Select a date</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-10 offset-1 col-md-8 offset-md-2 col-lg-4 offset-lg-4">
          <div class="form-group">
            <input
              type="date"
              class="form-control form-control-md"
              v-model="selected_date"
              @input="changeDate(selected_date)"
            >
          </div>
        </div>
      </div>
      <div class="row buttons">
        <div class="col text-center">
          <router-link
            :to="{name:'table-select'}"
            class="btn btn-light-secondary btn-md btn-wide"
          >
            Next
          </router-link>
        </div>
      </div>
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
