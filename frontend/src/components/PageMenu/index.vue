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
    <!-- Table menu -->
    <menu-table-selector />
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
import { mapGetters } from 'vuex';
import MenuTableSelector from '../MenuTableSelector'

export default {
  components: { MenuTableSelector },
  computed:{
    ...mapGetters([
      'selected_numbers_length',
    ]),
  },
}

</script>
