<template>
  <div class="container-show">
    <Header
      @authorized="(id) => user_id = id"
    />
    <ShowBody
      :user_id="user_id"
      :card="card"
      :zIndexChildren="zIndexChildren"
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
      user_id: '',
      card: null,
      zIndexChildren: []
    }
  },
  beforeCreate () {
    if (this.$route.params.id) {
      this.$http.get(`/api/cards/${this.$route.params.id}`)
        .then((res) => {
          if (res.data !== '') {
            this.card = res.data
            this.zIndexChildren = new Array(this.card.children.length)
            for (var j = 0; j < this.zIndexChildren.length; j++) {
              this.zIndexChildren[j] = 0
            }
          } else {
            this.$router.push('/')
          }
        })
        .catch((res) => {
          this.$router.push('/')
        })
    }
  },
  beforeRouteUpdate (to) {
    this.$http.get(`/api/cards/${to.params.id}`)
      .then((res) => {
        if (res.data !== '') {
          this.card = res.data
          this.zIndexChildren = new Array(this.card.children.length)
          for (var j = 0; j < this.zIndexChildren.length; j++) {
            this.zIndexChildren[j] = 0
          }
        } else {
          this.$router.push('/')
        }
      })
      .catch((res) => {
        this.$router.push('/')
      })
  }
}
</script>
<style scoped>

</style>
