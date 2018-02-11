<template>
  <div class="index">
  </div>
</template>

<script>
export default {
  name: 'Index',
  beforeCreate () {
    this.$http.get('/api/cards/random')
      .then((res) => {
        console.log(res.data)
        var id = res.data._id
        this.$router.push('/show/' + id)
      })
      .catch((res) => {
        this.$router.push('/')
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
