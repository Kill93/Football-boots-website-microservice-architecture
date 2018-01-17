<template>
  <div class = "order">
  <div class='container content'>
    <br>
    <h3>Order complete!</h3>
    <p>Thanks a million! Your Football Boots will be shipped out within 1-2 business days.</p>
    <br>

    <div v-if='orderDetails'>
      <dl>
        <dt>Order Number</dt>
        <dd>{{ orderDetails.id }}</dd>
        <dt>Order Created</dt>
        <dd>{{ orderDetails.created | moment }}</dd>
        <dt>Payment Amount</dt>
        <dd>{{ orderDetails.amount | currency }}</dd>
        <dt>Shipping Address</dt>
        <dd>{{ orderDetails.shipping.address.line1 }}, {{ orderDetails.shipping.address.city }}, {{ orderDetails.shipping.address.state }} {{ orderDetails.shipping.address.postal_code }}</dd>
        <dt>Engraving Text</dt>
        <dd>{{ orderDetails.description }}</dd>
        <dt>Email</dt>
        <dd>{{ orderDetails.receipt_email }}</dd>
      </dl>
    </div>
  </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import moment from 'moment';
  export default {
    data(){
      return {
        orderDetails: false
      };
    },
    created(){
      var charge_id = this.$route.params.id;
      console.log('OC' + charge_id)
      axios.get('https://orders-microservice.cfapps.io/charge/' + charge_id)
        .then((res)=>{
          this.orderDetails = res.data.charge;
        });
    },
    filters: {
      moment(date) {
        return moment.unix(date).format('MMMM Do, YYYY - h:mm a');
      },
      currency(amount){
        return `$${(amount/100).toFixed( 2 )}`;
      }
    }
  }
</script>
<style>
  .order {
    min-height: 900px;
    margin: 0 auto;
    text-align: center;
    color: white;
    margin-left:7%;
  }
</style>
