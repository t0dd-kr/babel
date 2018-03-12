<template>
  <div class="container-show">
    <Header
      @authorized="(id) => user_id = id"
    />
    <EmptyBody
      v-if="isEmpty"
    />
    <SearchBody
      :user_id="user_id"
      :cards="cards"
      :zIndexChildren="zIndexChildren"
      v-else
    />
  </div>
</template>
<script>
import Header from './Header'
import SearchBody from './SearchBody'
import EmptyBody from './EmptyBody'
export default {
  name: 'SearchHashtag',
  components: {
    Header,
    SearchBody,
    EmptyBody
  },
  data () {
    return {
      user_id: '',
      cards: [],
      zIndexChildren: []
    }
  },
  computed: {
    isEmpty: function () {
      if (this.cards.length === 0) {
        return true
      }
      return false
    }
  },
  beforeCreate () {
    if (this.$route.params.text) {
      this.$http.get(`/api/cards/search_hashtag/${this.$route.params.text}`)
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
    this.$http.get(`/api/cards/search_hashtag/${this.$route.params.text}`)
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
