<template>
  <div id = "Orders">

    <div class="ordersContainer">
      <table>
        <thead >
        <tr>
          <th>Customer Name</th>
          <th>Amount</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="result in results">
          <td>{{ result.name }}</td>
          <td>€ {{ result.price }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

  import axios from "axios";

  export default {
    props: ['user'],
    name: 'orders',
    data() {
      return {
        results: [],
        selected: null,
      }
    },
    mounted() {
      axios({ method: "GET", "url": "https://orders-microservice.cfapps.io/orders" }).then(result => {

        var results = [];
        var i =0;

        for (i = 0; i < result.data.length; i++) {
          var orderData = {
            "id": result.data[i].order_id,
            "name": result.data[i].firstName,
            "price": result.data[i].price,
          }
          results.push(orderData);
        }
        this.results = results;

      }, error => {
        console.error(error);
      });
    },
  };
</script>

<style>

  #Orders {
    min-height: 900px;
  }

  .ordersContainer {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  table {
    margin: auto;
    width: 800px;
    border-collapse: collapse;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
  }

  th,
  td {
    padding: 15px;
    background-color: #A8A8A8;
    color: #fff;
  }

  th {
    text-align: left;
  }

  thead
  th {
    background-color: #55608f;
  }

  tbody tr
  tr {
     background-color: rgba(255,255,255,0.3);
  }
  tbody td {
     content: "";
     left: 0;
     right: 0;
     top: -9999px;
     bottom: -9999px;
     background-color: rgba(255,255,255,0.2);
     z-index: -1;
   }

</style>
