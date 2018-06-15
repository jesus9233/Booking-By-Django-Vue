<template>
  <div id="TableMenu" class="row">
      <div class="col-10 offset-1 col-sm-10 offset-sm-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <!-- Date selector -->
        <menu-date-selector />
      </div>
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
    <div class="col-10 offset-1col-10 offset-1 col-sm-10 offset-sm-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <!-- Legend -->
      <menu-legend />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import MenuDateSelector from '../MenuDateSelector';
import MenuLegend from '../MenuLegend';


export default {
  components: { 
    MenuDateSelector,
    MenuLegend 
  },
  computed: {
    ...mapGetters([
      'tables',
      'reserved_numbers',
      'selected_numbers',
      'selected_numbers_length',
    ]),
  },
  methods: {
    ...mapMutations([
      'updateSelectedNumbers',
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
    }
  }
}

</script>

<style lang='scss' scoped>
  @import './style';
</style>