<template>
  <div id = "Checkout">
  <div class="container" v-if="user != 'guest' && user != 'admin'">
    <div class="row">
      <div class="col-xs-8">
        <div class="panel panel-info">
          <div class="panel-heading">
            <div class="panel-title">
              <div class="row">
                <div class="col-xs-6">
                  <h5><span class="glyphicon glyphicon-shopping-cart" ></span> Shopping Cart</h5>
                </div>
                <div class="col-xs-6">
                  <button type="button" class="btn btn-primary btn-sm btn-block">
                    <span class="glyphicon glyphicon-share-alt"></span> Continue shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="panel-body">
            <hr>
            <div class="row" v-for="item in items">
              {{ item.imageURL }}
              <div class="col-xs-2"><img :src="item.thumbnail" >
              </div>
              <div class="col-xs-4">
                <h4 class="product-name"><strong>{{ item.name }}</strong></h4>
              </div>
              <div class="col-xs-6">
                <div class="col-xs-6 text-right">
                  <h6><strong>€ {{ item.price }} <span class="text-muted">x</span></strong></h6>
                </div>
                <div class="col-xs-4">
                  {{item.quantity}}
                </div>
                <div class="col-xs-2">
                  <button type="button" class="btn btn-link btn-xs">
                    <span @click="removeFromCart(item)" class="glyphicon glyphicon-trash"> </span>
                  </button>
                </div>
              </div>
            </div>
            <hr>
          </div>
          </div>
          <hr id='left-line'>

          <div class="field">
            <label for="card_number">Card Number</label>
            <input id="card_number" v-model="card.number" type="text" :class="['is-danger' ? cardNumberError : '', 'form-control']" placeholder='4242424242424242'>
            <span class="help is-danger" v-show="cardNumberError">
                        {{ cardNumberError }}
                    </span>
          </div>
          <div class="field">
            <label for="cvc">CVC</label>
            <input id="cvc" v-model="card.cvc" type="text" class="form-control" placeholder='123'>
            <span class="help is-danger" v-show="cardCvcError">
                        {{ cardCvcError }}
                    </span>
          </div>
          <div class="field">
            <label for="exp_month">Expiry Month</label> <br>

            <input id="exp_month" v-model="card.exp_month" type="text" :class="['is-danger' ? cardMonthError : '', 'input']" placeholder="MM">
            <span class="help is-danger" v-show="cardMonthError">
                        {{ cardMonthError }}
                    </span>
          </div>
          <div class="field">
            <label for="exp_month">Expiry Year</label> <br>
            <input id="exp_year" v-model="card.exp_year" type="text" :class="['is-danger' ? cardYearError : '', 'input']" placeholder="YY">
            <span class="help is-danger" v-show="cardYearError">
                        {{ cardYearError }}
                    </span>
          </div>

          <div class="help is-danger" v-if="cardCheckError">
            <span>{{ cardCheckErrorMessage }}</span>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class='column is-12'> <br>
          <button type="submit" class="button btn-primary" @click.prevent="validate" :disabled="cardCheckSending">
                    <span v-if="cardCheckSending">
                        <i class="fa fa-btn fa-spinner fa-spin"></i>
                        Ordering...
                    </span>
            <span v-else>
                        Place Order
                    </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    props: ['items', 'user' ],
    data (){
      return {
        verified: false,
        username: '',
        password: '',
        stripeKey: 'pk_test_cz5OFBOqFsDfMp7Cd1TOGThl',
        // fields
        card: {
          number: '4242424242424242',
          cvc: '123',
          exp_month: '01',
          exp_year: '19'
        },
        // validation
        cardNumberError: null,
        cardCvcError: null,
        cardMonthError: null,
        cardYearError: null,
        cardCheckSending: false,
        cardCheckError: false,
        cardCheckErrorMessage: ''
      }
    },
    computed: {
      total: function () {
        var total = 0;
        for(var i = 0; i < this.items.length; i++) {
          var a = parseFloat(this.items[i].price.toFixed(2))
          total += a;
        }
        return total;
      }
    },
    methods: {
      validate(){
        this.clearCardErrors();
        let valid = true;
        if(!this.card.number){ valid = false; this.cardNumberError = "Card Number is Required"; }
        if(!this.card.cvc){ valid = false; this.cardCvcError = "CVC is Required"; }
        if(!this.card.exp_month){ valid = false; this.cardMonthError = "Month is Required"; }
        if(!this.card.exp_year){ valid = false; this.cardYearError = "Year is Required"; }
        if(valid){
          this.createToken();
        }
      },
      clearCardErrors(){
        this.cardNumberError = null;
        this.cardCvcError = null;
        this.cardMonthError = null;
        this.cardYearError = null;
      },
      createToken() {
        this.cardCheckError = false;
        window.Stripe.setPublishableKey(this.stripeKey);
        //window.Stripe.createToken(this.card, $.proxy(this.stripeResponseHandler, this));
        try {
          window.Stripe.card.createToken(this.card, (status, response) => this.stripeResponseHandler(status, response));
        }
        catch (e) {
          this.handleError("submitPayment - inner", e);
        }
        this.cardCheckSending = true;
      },
      stripeResponseHandler(status, response) {
        this.cardCheckSending = false;
        if (response.error) {
          this.cardCheckErrorMessage = response.error.message;
          this.cardCheckError = true;
          console.error(response.error);
        } else {
          // token to create a charge on our server
          var token_from_stripe = response.id;
          var request = {
            username: this.user,
            card: this.card,
            token_from_stripe: token_from_stripe,
            price: this.total
          };
          // Send to our server
          axios({
            url: 'https://orders-microservice.cfapps.io/charge',
            method: 'post',
            contentType: 'application/json',
            data: request,
          }).then(res => {
            var error = res.data.error;
            var charge = res.data.charge;
            if (error){
              console.error(error);
            } else {
              console.log('success' + charge.id)
              this.$router.push({ path: 'order-complete/' + charge.id })
              this.$emit('checkout');
            }
          });
        }
        console.log(request);
        },
      removeFromCart(item) {
        this.$emit('removeFromCart', item);
      },
    },
    removeFromCart(item) {
      this.$emit('removeFromCart', item);
    },
    logAuthPayment() {
      console.log('success');
    },
  }

</script>

<style>

#Checkout {
  min-height: 900px;
  margin:auto;
  margin-left:20%;
  margin-top: 10%;
}

#Checkout img {
  height: 70px;
  width: 70px;
}

.field {
  color: #7FFF00;
}


  h2 { text-decoration: underline; }
  .container { margin-bottom: 30px; }
  .column > img { margin-top: 60px; }
  #left-line { margin-top:27px; }

</style>


