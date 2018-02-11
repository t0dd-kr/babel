<template>
  <div class="container-write">
    <Header
      v-on:authorized="(id) => user_id = id"
    />
    <div class="write container-fluid">
      <div class="row">
        <div class="col-2">
          <router-link class="link-container-card-parent" v-if="card_parent" :to="{ name: 'Show', params: { id: card_parent._id}}">
            <div class="container-card-parent row justify-content-center">
              <CardParent
                v-bind:card="card_parent"
              />
            </div>
          </router-link>
          <div class="darken"></div>
        </div>
        <div class="col-5">
          <div class="container-card-main row justify-content-center">
            <CardWrite
              v-bind:card_parent="card_parent"
              v-bind:user_id="user_id"
            />
          </div>
        </div>
        <div class="container-children col-3">
          <div class="container-card-children row justify-content-center">
          </div>
        </div>
        <div class="col-2">
          <div class="container-card-grandson row justify-content-center">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from './Header'
import CardParent from './CardParent'
import CardWrite from './CardWrite'
export default {
  name: 'Write',
  components: {
    Header,
    CardParent,
    CardWrite
  },
  data () {
    return {
      user_id: '',
      card_parent: null
    }
  },
  beforeCreate () {
    if (this.$route.params.id !== 'new') {
      this.$http.get(`/api/cards/${this.$route.params.id}`)
        .then((res) => {
          if (res.data !== '') {
            this.card_parent = res.data
          } else {
            this.card_parent = null
          }
        })
        .catch((res) => {
          this.card_parent = null
        })
    }
  }
}
</script>
<style scoped>
  .write {
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
  .link-container-card-parent:hover + .darken {
    background-color: rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
    z-index: 10;
  }
</style>
