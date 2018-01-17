<template>
  <div id = "Collection">

    <div class="container">

        <div class="support-grid">

        <section class="grid-1">
          <div class="item-1"v-for="result in results">
            <div id = "img"><img :src="result.imageURL" >
            </div>

          <div class="caption">
            <h4 class="group inner list-group-item-heading">
              {{ result.name }}</h4>
            <p class="group inner list-group-item-text">
              {{ result.type }}</p>
            <p class="group inner list-group-item-text">
              {{ result.colour }}</p>
            <div class="row">
              <div class="col-xs-12 col-md-6">
                <p class="lead">
                  <b>€{{ result.price }}</b></p>
              </div><br>
                <a class="btn btn-success" v-if="user != 'guest' && user != 'admin'" v-on:click="addToCart(result)">Add to cart</a>
                <a class="btn btn-success" v-if="user =='admin' " v-on:click="deleteBoot(result.id)">Delete</a>
            </div>
          </div>
          </div>
        </section>
        </div>
    </div>
  </div>
</template>

<script>

  import axios from "axios";
  import vSelect from "vue-select"
  import Header from '../Header.vue'

  export default {
    props: ['items', 'user'],
    name: 'app',
    components: {vSelect},
    data() {
      return {
        results: [],
        selected: null,
        showCart: false,
        verified: false,
      }
    },
    computed: {
      total() {
        var total = 0;
        for(var i = 0; i < this.items.length; i++) {
          total += this.items[i].price;
        }
        return total;
      },
    },
    mounted() {
      axios({ method: "GET", "url": "https://boots-microservice.cfapps.io/boots" }).then(result => {

        var results = [];
        var i =0;

        for (i = 0; i < result.data.length; i++) {
            var bootData = {
              "id": result.data[i].boot_id,
              "name": result.data[i].name,
              "colour": result.data[i].colour,
              "type": result.data[i].type,
              "imageURL": result.data[i].imageName,
              "price": result.data[i].price,
              "quantity": 1,
            }
            results.push(bootData);
        }
        this.results = results;

      }, error => {
        console.error(error);
      });
    },
    methods: {
      addToCart(item) {
//        item.quantity += 1;
        //this.items.push(item);
        this.$emit('itemAdded', item);
//        console.log(item.title);
      },
      removeFromCart(item) {
        item.quantity -= 1;
        this.items.splice(this.items.indexOf(item), 1);
      },
      deleteBoot(id) {
        axios({
          url: 'https://boots-microservice.cfapps.io/removeBoot',
          method: 'post',
          contentType: 'application/json',
          data: id
        })
        console.log(id)
        axios({ method: "GET", "url": "https://boots-microservice.cfapps.io/boots" }).then(result => {

          var results = [];
          var i =0;

          for (i = 0; i < result.data.length; i++) {
            var bootData = {
              "id": result.data[i].boot_id,
              "name": result.data[i].name,
              "colour": result.data[i].colour,
              "type": result.data[i].type,
              "imageURL": result.data[i].imageName,
              "price": result.data[i].price,
              "quantity": 1,
            }
            results.push(bootData);
          }
          this.results = results;

        }, error => {
          console.error(error);
        });
      },
    }
  };
</script>

<style>

  #Collection {
    min-height: 900px;
    color:white;
  }

  .container {
    max-width: 900px;
    margin-top: 5%;
    margin-left: 10%;
  }

  .grid-1 {
    padding-top: 40px;
    display: grid;
    width: 100%;
    max-width: 750px;
    margin: 0 auto;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    text-align: center;
  }

  /* items */

  .grid-1 div {
    font-size: 20px;
    padding: 20px;
    text-align:center;
  }

  .row a {
    text-align:center;
    margin-left: -8%;
    margin-top: 60px;
    position:absolute;
  }

  .row p {
    text-align:center;
    margin-left: 45px;
  }

  /*#img{*/
    /*background-color: grey;*/
  /*}*/

  #img img{
    height:250px;
    width: 250px;
    border: 15px solid grey;
    padding: 10px;

  }






</style>
