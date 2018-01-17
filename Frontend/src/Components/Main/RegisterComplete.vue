<template>
  <div class = "registerComplete">
    <div class='container content'>
      <br>
      <h3>Thanks for Registering !</h3>
      <p>Please Log In on the top right to purchase Boots!</p>
      <br>

    </div>
  </div>
</template>
<script>
  import moment from 'moment';
  export default {
    data(){
      return {
        firstName: ''
      };
    },
  }
</script>
<style>
  .registerComplete {
    min-height: 900px;
    margin: 0 auto;
    text-align: center;
    margin-top: 10%;
    color: white;
  }
</style>
