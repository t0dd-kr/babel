<template>
  <div class="index">
    <Header/>
    <Body/>
  </div>
</template>

<script>
import Header from './Header'
import Body from './Body'
export default {
  name: 'Index',
  components: {
    Body,
    Header
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
