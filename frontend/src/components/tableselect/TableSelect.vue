<template>
  <div id="table-select" class="container col-sm-8">

    <div class="title">
      <h2>Select a table</h2>
    </div>

    <div class="absolute-center">
      <div class="date-selector">
        <a class="btn btn-light" @click="subDay()">
          <i class="fas fa-angle-left"></i>
        </a>
        <router-link :to="{name:'date-select'}">
          <h5>{{selected_date}}</h5>
        </router-link>
        <a class="btn btn-light" @click="addDay()">
          <i class="fas fa-angle-right"></i>
        </a>
      </div>
    </div>

    <div class="center">
      <div class="room">
        <a v-for="table in tables" :style="{
              width:table.width + '%', 
              height:table.height + '%',
              top: table.top + '%',
              left: table.left + '%'
            }" :title="`Places: ${table.places_number}`" :class="{
              'table':true,
              'table-free':!(isReserved(table.number)),
              'table-reserved':isReserved(table.number),
              'table-selected':isSelected(table.number),
              'oval':table.shape=='oval',
              'rectangle':table.shape=='rectangle'
            }" @click="updateSelected(table.number)">
            <div class="table-inner">
              {{table.number}}
            </div>
          </a>
        </div>
      </div>

      <div class="legend-block">
        <small>
          <i class="legend legend-free"></i> - free
          <i class="legend legend-selected"></i> - selected
          <i class="legend legend-reserved"></i> - reserved
        </small>
      </div>

      <div class="bottom">
        <router-link :to="{name:'date-select'}" class="btn btn-outline-info btn-lg">
          Up
        </router-link>
        <router-link :to="{name:'booking'}" v-if="selected_numbers_length>0" class="btn btn-outline-success btn-lg">
          Next
        </router-link>
      </div>

    </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import { toString } from 'datejs'

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
    isReserved (number) {
      //Check if number in reserved numbers
      if (this.reserved_numbers.indexOf(number)==-1)
        return false
      else 
        return true
    },
    isSelected (number) {
      //Check if number in selected numbers
      if (this.selected_numbers.indexOf(number)==-1)
        return false
      else 
        return true
    },
    updateSelected (number) {
      if (this.isReserved(number))
        return
      else
        this.updateSelectedNumbers(number)
    },
    addDay () {
      let date = new Date(this.selected_date)
      date.setDate(date.getDate() + 1)
      this.changeDate(date.toString('yyyy-MM-dd'))
    },
    subDay () {
      let date = new Date(this.selected_date)
      date.setDate(date.getDate() - 1)
      this.changeDate(date.toString('yyyy-MM-dd'))
    }
  }
}

</script>

<style lang='scss' scoped>
  @import 'tableselect.scss'
</style>