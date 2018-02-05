<template>
  <div class="index">
    <Header/>
    <div class="col-4">
      <Card/>
    </div>
  </div>
</template>

<script>
import Header from './Header'
import Card from './Card'
export default {
  name: 'Index',
  components: {
    Card,
    Header
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
