<template>
  <div v-if="selected_numbers_length>0" id="booking" 
       class="container col-sm-8">

    <div class="title">
      <h2>Confirm your order</h2>
    </div>
    <div class="center">
      <div class="order-data">
        <h5>
          You reserved table(s):
          <router-link :to="{name:'table-select'}">
            {{selected_numbers.toString()}}
          </router-link>
          on 
          <router-link :to="{name:'date-select'}">
            {{selected_date}}
          </router-link>
        </h5>
      </div>
      <form>  
        <div class="user-data">
         <div class="form-group">
          <label for="exampleFormControlInput1">Name:</label>
          <input v-model="name" class="form-control form-control-md" 
                 type="text" placeholder="Name">
          <label for="exampleFormControlInput1">Email address:</label>
          <input v-model="email" type="email" class="form-control form-control-md" 
                id="exampleFormControlInput1" placeholder="name@example.com">
        </div>
        <div v-if="name==''||email==''" class="alert alert-danger require" 
          role="alert">
          All fields required 
        </div>
      </div>
    </form>
    <div class="buttons">
      <router-link :to="{name:'table-select'}"  class="btn btn-outline-info btn-lg">
        Up
      </router-link>
      <button class="btn btn-outline-success btn-lg" v-if="!(name==''||email=='')" 
          @click="confirmOrder()">
          Make order
      </button>
    </div>
  </div>

</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import sendMessage from '../utils/sendMessage'

export default {
  data () {
    return {
      name: '',
      email: '' 
    }
  },
  computed: mapGetters([
    'selected_numbers',
    'selected_numbers_length',
    'selected_date'
    ]),
  methods: {
    ...mapActions([
      'makeOrder'
      ]),
    confirmOrder() {
      const selected_numbers = this.selected_numbers //Stores the selected 
      //numbers for e-mail (selected numbers will be deleted during the 
      //creation of orders)

      this.makeOrder().then(() => {
        sendMessage({
          name: this.name,  
          date: this.selected_date, 
          email: this.email,
          table_numbers: selected_numbers,
          }) 
        this.$router.push({name: 'success'})
        console.log(`Mail been send:`)
      }).catch(error => {
        console.log(`Mail hasn't been send: ${error}`)
      })
    }
  }
}

</script>

<style>
#booking {
  height: 100vh;
  padding-top: 25px;
  padding-bottom: 25px;
}
#booking .center {
  top:20vh;
}
.order-data {
  width: 50%;
  margin-left:25%;
}
.buttons {
  margin-top: 47px;
}
.alert {
  margin-bottom: 0px;
}
.order-data a {
  color: #009EBB; 
}
.user-data {
  text-align: left;
  width: 50%;
  margin-left:25%;
}
label {
  margin-top: 15px;
}
.require {
  margin-top: 47px;
}
</style>