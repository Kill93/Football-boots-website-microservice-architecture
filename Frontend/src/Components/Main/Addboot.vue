<template>
  <div id = "AddBoot">

    <form>
      <div class="form-group">
        <label class="col-form-label" for="formGroupExampleInput">Name</label>
        <input type="text" class="form-control" v-model="name" id="name" placeholder="Boot Name">
      </div>
      <div class="form-group">
        <label class="col-form-label" for="formGroupExampleInput2">Colour</label>
        <input type="text" class="form-control" id="colour" v-model="colour" placeholder="Boot Colours">
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Ground Type</label>
        <select class="form-control" v-model="type" id="type">
          <option>Firm Ground</option>
          <option>Soft Ground</option>
          <option>Astro</option>
        </select>
      </div>
      <div class="form-group">
        <label class="col-form-label" for="formGroupExampleInput3">Image URL</label>
        <input type="text" class="form-control" v-model="imageName" id="imageName" placeholder="www.">
      </div>
      <div class="form-group">
        <label class="col-form-label" for="formGroupExampleInput4">Price</label>
        <input type="number" class="form-control" v-model="price" id="price" placeholder="0.00">
      </div>
      <button type="button" class="btn btn-primary" v-on:click="addB" >Submit</button>
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
        name: '',
        colour: '',
        type: '',
        imageName: '',
        price: '',
      }
    },
    methods: {
      addB() {

        var newBoot = {
          "name": this.name,
          "colour": this.colour,
          "type": this.type,
          "imageName": this.imageName,
          "price": this.price,
        }

        axios({
          url: 'https://boots-microservice.cfapps.io/addBoot',
          method: 'post',
          contentType: 'application/json',
          data: newBoot
        })
        console.log(newBoot)
        this.$router.push({ path: '/collection'})
      },
    }
  }

</script>
<style>

  #AddBoot
  {
    min-height: 900px;
  }

  #AddBoot form {
    color: #7FFF00;
    width: 800px;
    margin:auto;
    margin-top: 100px;
  }
</style>
