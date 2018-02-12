<template>
  <div class="container-show">
    <Header
      @authorized="(id) => user_id = id"
    />
    <ShowBody
      :user_id="user_id"
    />
  </div>
</template>
<script>
import Header from './Header'
import ShowBody from './ShowBody'
export default {
  name: 'Show',
  components: {
    Header,
    ShowBody
  },
  data () {
    return {
      user_id: ''
    }
  }
}
</script>
<style scoped>

</style>
