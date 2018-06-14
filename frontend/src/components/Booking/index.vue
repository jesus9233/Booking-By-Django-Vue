<template>
  <div
    id="Booking"
    v-if="selected_numbers_length > 0"
    class="row align-items-center justify-content-center main-row"
  >
    <div class="col text-center">
      <div class="row">
        <div class="col">
          <h2 class="header">Confirm your order</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
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
      </div>
      <div class="row">
        <div class="col-10 offset-1 col-md-8 offset-md-2 col-lg-4 offset-lg-4">
          <div class="form-group">
            <input
              v-model="name"
              class="form-control form-control-md"
              type="text"
              placeholder="Name"
            >
          </div>
          <div class="form-group">
            <input
              v-model="email"
              type="email"
              class="form-control form-control-md"
              placeholder="Email"
            >
          </div>
          <div
            v-if="name==''||email==''"
            class="alert alert-danger"
            role="alert"
          >
            All fields required
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-10 offset-1col-10 offset-1 col-sm-10 offset-sm-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <div class="row buttons">
            <router-link
              :to="{name:'table-select'}"
              class="btn btn-light-secondary btn-wide"
            >
              Up
            </router-link>
            <button
              class="btn btn-light-secondary btn-wide"
              v-if="!(name==''||email=='')"
              @click="confirmOrder()"
            >
              Make order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import sendMessage from '../../utils/sendMessage'

export default {
  data() {
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
      const selected_numbers = this.selected_numbers /* Stores the selected
      numbers for e-mail (selected numbers will be deleted during the
      creation of orders)*/

      this.makeOrder().then(() => {
        sendMessage({
          name: this.name,
          date: this.selected_date,
          email: this.email,
          table_numbers: selected_numbers,
        });
        this.$router.push({name: 'success'});
        console.log(`Mail been send`);
      }).catch(error => {
        console.log(`Mail hasn't been send: ${error}`);
      })
    }
  }
}

</script>
