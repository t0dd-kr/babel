<template>
  <div class="index">
    <Header
      @authorized="(id) => user_id = id"
    />
    <EmptyBody/>
  </div>
</template>

<script>
import Header from './Header'
import EmptyBody from './EmptyBody'
export default {
  name: 'Index',
  components: {
    Header,
    EmptyBody
  },
  beforeCreate () {
    this.$http.get('/api/cards/random')
      .then((res) => {
        var id = res.data._id
        if (id !== undefined) {
          this.$router.push('/show/' + id)
        }
      })
      .catch((res) => {
        this.$router.push('/')
      })
  },
  data () {
    return {
      user_id: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
