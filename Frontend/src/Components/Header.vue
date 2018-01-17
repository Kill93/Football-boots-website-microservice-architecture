<template>
  <div id = "Header">
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header"><a href="#/" class="navbar-brand">KN</a></div>
        <ul class="nav navbar-nav">
          <li><a href="#/collection">Collection</a></li>
          <li v-if="user == 'admin'"><a href="#/addboot">Add Boot</a></li>
          <li v-if="user == 'admin'"><a href="#/orders">Orders</a></li>
          <div id = cartButton v-if="user != 'guest' && user != 'admin'" >
            <button type="button" class="btn btn-default btn-sm" @click="showCart = !showCart" v-show="!verified">
              <span class="glyphicon glyphicon-shopping-cart"></span> {{ items.length + (items.length > 1 || items.length === 0 ? " items" : " item") }}
            </button>
          </div>
        </ul>

      <form id="signin" class="navbar-form navbar-right" role="form" v-if="user == 'guest'">
        <div class="input-group">
          <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
          <input id="text" type="text" class="form-control" name="Lemail" v-model="Lemail" value="" placeholder="email">
        </div>
        <div class="input-group" v-if="user == 'guest'" >
          <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
          <input id="password" type="password" class="form-control" name="Lpassword" v-model="Lpassword" value="" placeholder="Password">
        </div>
        <button type="button" class="btn btn-outline-success my-2 my-sm-0" v-on:click="login" >Log In</button>
      </form>
        <div id="registerButton">
        <a href="#/Register" v-if="user == 'guest'" class="btn btn-success">Register</a>
        </div>
      <ul class="nav navbar-nav navbar-right" v-if="user != 'guest'">
        <li>
          <a href="#" data-toggle="modal" v-on:click="logout()">logout</a>
        </li>
      </ul>
      </div>

      <div class="cart" v-show="showCart">
          <div v-show="items.length > 0">
            <ul>
              <li v-for="item in items" transition="fade">
                <p><strong>€{{ item.price }}</strong> - {{ item.title }} - QTY :{{item.quantity}} <i class="fa fa-trash" @click="removeFromCart(item)"></i></p>
                <i><span @click="removeFromCart(item)">REMOVE</span></i>
              </li>
            </ul>
            €{{ total }}
            <a href="#/checkout">Check out</a></div>
        <div v-show="items.length === 0">
          <p>Nothing in your cart!</p>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>

  import Artwork from './Main/Collection.vue';
  import axios from "axios";

  export default {
    props: ['items'],
    data (){
      return {
        showCart: false,
        verified: false,
        Lemail: '',
        Lpassword: '',
        user: 'guest',
        userID: ''
      }
    },
    computed: {
      total: function () {
        var total = 0;
        for(var i = 0; i < this.items.length; i++) {
          var a = parseFloat((this.items[i].price * this.items[i].quantity).toFixed(2))
          total += a;
        }
        return total;
      }
    },
    methods: {
      removeFromCart(item) {
        this.$emit('removeFromCart', item);
      },
      login() {

        var logUser = {
          "email": this.Lemail,
          "password": this.Lpassword,
        }

        axios({
          url: 'https://users-microservice.cfapps.io/login',
          method: 'post',
          contentType: 'application/json',
          data: logUser,
        }).then(result => {
          if (result.data.success) {
            this.user = result.data.firstName
            this.userID = result.data.id
            this.$emit('login', this.user);
          }
        }).catch(error => {
          console.log(error);
        });
      },
      logout() {
        this.user = 'guest';
        this.$router.push({ path: 'collection'})
      },
  }}

</script>

<style>

  #registerButton{
    float:right;
  }

#cartButton
{
  margin-left: 1200px;
  margin-top: 10px;
}

  #cartButton
  {
    margin-left: 1200px;
    margin-top: 10px;
  }

  .cart div {
    z-index: 100;
    background: #fff;
    padding: 20px 30px;
    position: absolute;
    right: 30px;
    box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.3);
    text-align: center;
    width: 250px;

  }
  .cart ul, li, p {
    margin-bottom: 0;
    color: white;
  }

  .cart p {
    color: black;
  }
  .cart button {
    margin: 20px 0 10px;
    text-transform: uppercase;
    text-decoration: none;
    font-weight: bold;
    letter-spacing: 2px;
  }

  .cart i {
    color:black;
  }

 .navbar {
    background-color: #4B0082;
  }

#registerButton a {
  margin-top: 5px;
  height: 10%;
  width:105px;
}

</style>


