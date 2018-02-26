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

<style>
#success {
  height: 100vh;
  padding-top: 25px;
  padding-bottom: 25px;
}
#success .center {
  top: 30vh;
}
#success .btn {
  margin-top: 30px;
} 
.green {
  color: rgb(77, 183, 100);
}
</style>