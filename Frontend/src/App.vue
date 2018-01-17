<template>
  <div id="app">
    <app-header :items="items" :user="user" @removeFromCart="removeFromCart" @login="login"></app-header>
    <router-view @itemAdded="itemAdded" @checkout="checkout" @removeFromCart="removeFromCart" :user="user" :items="items" ></router-view>
    </div>
</template>

<script>

  import Collection from './Components/Main/Collection.vue';
  import Header from './Components/Header.vue';
  var icons = require('glyphicons')

export default {
//  name: 'app',
  data() {
    return {
      items: [],
      user: 'guest'
    }
  },
  methods: {
    itemAdded(item) {
      var i =0;
      var add = 1;
        if (this.items.length == 0){
          this.items.push({id: item.id, name: item.name, thumbnail: item.imageURL, price: item.price, quantity: item.quantity})
        }
        else  {
          for (i = 0; i < this.items.length; i++) {
            if (item.id == this.items[i].id) {
              this.items[i].quantity+= 1;
              console.log("Added to Items Quantity")
              add = 1;
            }
            else {
              console.log("Added to Items List")
              add = 2;
            }
          }
          if (add == 2) {
            this.items.push({id: item.id, name: item.name,thumbnail: item.imageURL, price: item.price, quantity: item.quantity})
          }
      }
    },
    login(username) {
      this.user= username
    },
    checkout() {
      this.items = []
    },
    removeFromCart(item) {
      var i =0;
      for (i = 0; i < this.items.length; i++) {
        if (item.id == this.items[i].id) {
          if(this.items[i].quantity == 1) {
            this.items.splice(i, 1);
          } else {
            this.items[i].quantity -= 1;
          }
        }
      }
    }
  },
    components: {
      appHeader: Header,
      appArtwork: Collection
    }
}
</script>

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.css';

  #app
  {
    background-color: #100C08;
    height: 100%;
  }


</style>
