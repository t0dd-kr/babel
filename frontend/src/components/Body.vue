<template>
  <div class="body container-fluid">
    <div class="row">
      <div class="col-2">
        <div class="container-card-parent row justify-content-center">
          <Card/>
        </div>
      </div>
      <div class="col-5">
        <div class="container-card-main row justify-content-center">
          <Card/>
        </div>
      </div>
      <div class="container-children col-3">
        <div class="container-card-children row justify-content-center" v-for="n in 10" v-bind:key="n">
          <Card/>
        </div>
      </div>
      <div class="col-2">
        <div class="container-card-grandson row justify-content-center">
          <Card/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from './Card'
export default {
  name: 'Body',
  components: {
    Card
  }
}
</script>
<style scoped>
  .body {
    background-color: #313234;
    padding-top: 3rem;
  }
  .container-card-children {
    margin-bottom: 1rem;
  }
  .container-card-parent {
    position:absolute;
    width: 200%;
    left: -100%;
  }
</style>
