<template>
  <div class="container-show">
    <Header
      @authorized="(id) => user_id = id"
    />
    <SearchBody
      :user_id="user_id"
      :cards="cards"
      :zIndexChildren="zIndexChildren"
    />
  </div>
</template>
<script>
import Header from './Header'
import SearchBody from './SearchBody'
export default {
  name: 'Search',
  components: {
    Header,
    SearchBody
  },
  data () {
    return {
      user_id: '',
      cards: [],
      zIndexChildren: []
    }
  },
  beforeCreate () {
    if (this.$route.params.id) {
      this.$http.get(`/api/cards/search/${this.$route.params.text}`)
        .then((res) => {
          if (res.data !== '') {
            this.cards = res.data
            this.zIndexChildren = new Array(this.cards.length)
            for (var j = 0; j < this.zIndexChildren.length; j++) {
              this.zIndexChildren[j] = 0
            }
          } else {
            // this.$router.push('/')
          }
        })
        .catch((res) => {
          // this.$router.push('/')
        })
    }
  },
  beforeRouteUpdate (to) {
    this.$http.get(`/api/cards/search/${this.$route.params.text}`)
      .then((res) => {
        if (res.data !== '') {
          this.cards = res.data
          this.zIndexChildren = new Array(this.cards.length)
          for (var j = 0; j < this.zIndexChildren.length; j++) {
            this.zIndexChildren[j] = 0
          }
        } else {
          // this.$router.push('/')
        }
      })
      .catch((res) => {
        // this.$router.push('/')
      })
  }
}
</script>
<style scoped>

</style>
