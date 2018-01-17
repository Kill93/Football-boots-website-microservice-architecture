<template>
  <div id = 'Home'>
    <div class ="main header-filter" :style="{ 'background-image': 'url(' + backgroundImage + ')' }">
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <div class="brand">
              <h1></h1>
              <h3>Welcome to the KN Boot Collection!</h3>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        backgroundImage: 'http://www.pearltrees.com/s/pic/or/nike-football-boots-72006045',
        user: 'guest'
      }
    },
  }
</script>

<style>
  #Home {
    min-height: 400px;
    margin-top: -250px;
    font-style: oblique;
    color: white;
  }

  .brand {
    margin-top: 450px;
    margin-left: -200px;
  }

  .main {
    height: 900px;
  }
</style>
