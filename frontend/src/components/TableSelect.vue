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

<style>
#table-select {
  height: 100vh;
  padding-bottom: 25px;
  text-align: center;
}
#table-select .center {
  top: 27vh;
}
.date-selector {
  position: absolute;
  top: 19vh;
  width: 350px;
  height: 45px;
  left: 50%;
  margin-left:-175px;
  text-align: center;  
  padding: 0px;

}
.date-selector > * {
  display: inline-block;
  position: relative;
}
.date-selector > a {
  margin-left: 20px;
  margin-right: 20px;
  background: #fff;
  border: none;
}
.date-selector h5 {
  color: #009EBB;
}
.room {
  position: absolute;
  width: 50vh;
  height: 50vh;
  border: 1px solid #CDD2DA;
  border-radius: 5px;
  left: 50%;
  margin-left:-25vh;
}
.table {
  display: block;
  position: absolute;
  text-align: center;
  border: none;
  margin:0;
  padding: 0;
}
.table-inner {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 50%;
  bottom: 0;
  margin-top: -12px;
  color: white;

}
.table-free {
  background: #5ec9ff;
}
.table-free:hover, 
.table-selected:hover {
 opacity:0.7; 
 color: #000;
 cursor: pointer;
}
a.table-free:activea, 
.table-selected:active {
  opacity: 0.5; 
 }
.table-reserved {
  background: black;
}
.table-selected {
  background: rgb(77, 183, 100);
}
.rectangle {
  border-radius: 2px;
}
.oval {
  border-radius: 100px / 50px;
}
.legend-block {
  position: absolute;
  top: 80vh;
  width: 100%
}

.legend {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 1px;
  margin-left: 10px;
}
.legend-reserved {
  background: black;
}
.legend-free {
  background: #5ec9ff; 
}
.legend-selected {
  background: rgb(77, 183, 100); 
}

</style>