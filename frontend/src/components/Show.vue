<template>
  <div v-if="card" class="container-show">
    <Header
      v-on:authorized="(id) => user_id = id"
    />
    <div class="show container-fluid">
      <div class="row">
        <div class="col-2">
          <a class="link-container-card-parent" v-if="card.parent" :href="'/show/' + card.parent._id">
            <div class="container-card-parent row justify-content-center">
              <CardParent
                v-bind:card="card.parent"
              />
            </div>
          </a>
          <div class="darken"></div>
        </div>
        <div class="col-5">
          <div class="container-card-main row justify-content-center">
            <CardMain
              v-bind:card="card"
              v-bind:authorized="user_id !== ''"
            />
          </div>
        </div>
        <div class="container-children col-3">
          <a v-for="child in card.children" v-bind:key="child._id" v-if="child" :href="'/show/' + child._id" >
            <div class="container-card-children row justify-content-center">
              <CardChildren
                v-bind:card="child"
              />
            </div>
          </a>
        </div>
        <div class="col-2">
          <div class="container-card-grandson row justify-content-center">
            <CardGrandson/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import Header from './Header'
import CardParent from './CardParent'
import CardMain from './CardMain'
import CardChildren from './CardChildren'
import CardGrandson from './CardGrandson'
export default {
  name: 'Show',
  components: {
    Header,
    CardParent,
    CardMain,
    CardChildren,
    CardGrandson
  },
  beforeCreate () {
    if (this.$route.params.id) {
      this.$http.get(`/api/cards/${this.$route.params.id}`)
        .then((res) => {
          if (res.data !== '') {
            this.card = res.data
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
          console.log(this.card.children)
        } else {
          this.$router.push('/')
        }
      })
      .catch((res) => {
        this.$router.push('/')
      })
  },
  data () {
    return {
      card: null,
      user_id: ''
    }
  }
}
</script>
<style scoped>
  .show {
    background-color: #313234;
    padding-top: 3rem;
    display: block;
    height:100%;
    position: fixed;
  }
  .container-card-children {
    margin-bottom: 1rem;
  }
  .container-card-parent {
    position:absolute;
    width: 150%;
    left: -50%;
    z-index: 100;
    transition: left .25s
  }
  .darken {
    position:fixed;
    top: 0px;
    left: 0px;
    width: 0%;
    height: 0%;
    z-index: -1;
    transition: background-color .25s;
  }
  .container-card-parent:hover {
    left: 5%;
  }
  .link-container-card-parent:hover + .darken{
    background-color: rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
    z-index: 10;
  }
</style>
