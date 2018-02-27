<template>
  <div id="success" class="container col-sm-8">
    <div class="center">

      <div class="header">
        <h2 class="green">Success!</h2>
      </div>
      <h5>Your order has been processed, you will receive an email</h5>
      
      <router-link :to="{name:'date-select'}" class="btn btn-outline-success btn-lg" 
      @click="this.$router.push('/')">
        New order
      </router-link>
    </div>
  </div>
</template>

<style lang='scss' scoped>
  @import 'success.scss'
</style>