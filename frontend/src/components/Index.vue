<template>
  <div class="index">
    <Header
      @authorized="(id) => user_id = id"
    />
    <HashtagBody
      :user_id="user_id"
      :hashtags="hashtags"
      :zIndexChildren="zIndexChildren"
    />
  </div>
</template>

<script>
import Header from './Header'
import EmptyBody from './EmptyBody'
import HashtagBody from './HashtagBody'
export default {
  name: 'Index',
  components: {
    Header,
    EmptyBody,
    HashtagBody
  },
  data () {
    return {
      user_id: '',
      hashtags: [],
      zIndexChildren: []
    }
  },
  beforeCreate () {
    this.$http.get('/api/hashtags')
      .then((res) => {
        if (res.data !== '') {
          this.hashtags = res.data
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
  },
  beforeRouteUpdate (to) {
    this.$http.get('/api/hashtags')
      .then((res) => {
        if (res.data !== '') {
          this.hashtags = res.data
          console.log(this.hashtags)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
