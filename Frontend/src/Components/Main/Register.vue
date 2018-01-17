<template>
  <div class = "register">

    <form>
      <div class="form-group">
        <div class="field">
          <label for="first_name">FirstName</label>
          <input id="first_name" v-model="firstName" type="text" :class="['is-danger' ? firstNameError : '', 'form-control']">
          <span class="help is-danger" v-show="firstNameError">
                        {{ firstNameError }}
                    </span>
        </div>
      </div>
      <div class="form-group">
        <div class="field">
          <label for="last_name">LastName</label>
          <input id="last_name" v-model="lastName" type="text" :class="['is-danger' ? lastNameError : '', 'form-control']">
          <span class="help is-danger" v-show="lastNameError">
                        {{ lastNameError }}
                    </span>
        </div>
      </div>
      <div class="form-group">
        <div class="field">
          <label for="address">Address</label>
          <input id="address" v-model="address" type="text" :class="['is-danger' ? addressError : '', 'form-control']">
          <span class="help is-danger" v-show="addressError">
                        {{ addressError }}
                    </span>
        </div>
      </div>
      <div class="form-group">
        <div class="field">
          <label for="email">Email</label>
          <input id="email" v-model="Remail" type="text" :class="['is-danger' ? Remail : '', 'form-control']">
          <span class="help is-danger" v-show="RemailError">
                        {{ RemailError }}
                    </span>
        </div>
      </div>
      <div class="form-group">
        <div class="field">
          <label for="password">Password</label>
          <input id="password" v-model="Rpassword" type="password" :class="['is-danger' ? Rpassword : '', 'form-control']">
          <span class="help is-danger" v-show="RpasswordError">
                        {{ RpasswordError }}
                    </span>
        </div>
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="validate" :disabled="formCheckSending">
                    <span v-if="formCheckSending">
                        <i class="fa fa-btn fa-spinner fa-spin"></i>
                        Registering...
                    </span>
        <span v-else>
                        <i>Register</i>
                    </span>
      </button>
    </form>

  </div>
</template>

<script>

  import axios from "axios";
  import vSelect from "vue-select"

  export default {
    components: {vSelect},
    data() {
      return {
        firstName: '',
        lastName: '',
        address: '',
        Remail: '',
        Rpassword: '',
        user: 'NULL',

        formCheckError: false,
        formCheckSending: false,
        firstNameError: null,
        lastNameError: null,
        addressError: null,
        RemailError: null,
        RpasswordError: null,
      }
    },
    methods: {
      validate(){
        console.log('checking')
        this.clearCardErrors();
        let valid = true;
        if(!this.firstName){ valid = false; this.firstNameError = "FirstName is Required"; }
        if(!this.lastName){ valid = false; this.lastNameError = "Lastname is Required"; }
        if(!this.address){ valid = false; this.addressError = "Address is Required"; }
        if(!this.Remail){ valid = false; this.RemailError = "Email is Required"; }
        if(!this.Rpassword){ valid = false; this.RpasswordError = "Password is Required"; }
        if(valid){
          this.register();
        }
      },
      clearCardErrors(){
        this.firstNameError = null;
        this.lastNameError = null;
        this.addressError = null;
        this.RemailError = null;
        this.RpasswordError = null;
      },
      register() {
        this.formCheckError = false;
        var newUser = {
          "firstName": this.firstName,
          "lastName": this.lastName,
          "address": this.address,
          "email": this.Remail,
          "password": this.Rpassword,
        }
        axios({
          url: 'https://users-microservice.cfapps.io/register',
          method: 'post',
          contentType: 'application/json',
          data: newUser
        })
        this.formCheckSending = true;
        console.log(newUser)
        this.$router.push({ path: 'registerComplete'})
      },
    }
  }
</script>

<style>

.register {
  width: 50%;
  margin: auto;
  height: 900px;
}

.register form {
  color: #7FFF00;
  margin-top: 100px;
}

.buttonDiv button {
  width: 10px;
  margin-bottom: 100px;
}

  span {
    color: #FF4500;
  }

  span i {
    color: white;
  }
</style>
