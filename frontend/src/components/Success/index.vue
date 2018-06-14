<template>
  <div
    id="Success"
    class="row align-items-center justify-content-center main-row"
  >
    <div class="col text-center">
      <div class="row text-center">
        <div class="col">
          <h2 class="header text-success">Success!</h2>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h5>Your order has been processed, you will receive an email</h5>
        </div>
      </div>
      <div class="row buttons">
        <div class="col-10 offset-1col-10 offset-1 col-sm-10 offset-sm-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <router-link
            :to="{name:'date-select'}"
            class="btn btn-light-secondary btn-wide"
            @click="this.$router.push('/')"
          >
            New order
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
