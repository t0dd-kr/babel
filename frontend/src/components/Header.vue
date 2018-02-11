<template lang="html">
  <div class="container-fluid container-header" role="banner">
    <div class="d-flex px-3 flex-justify-between container-lg row align-items-center">
      <div class="container-search col-2">
        <input type="text" class="search" name="" value="" placeholder="Search">
        <a href="#" class="container-btn-search">
          <img src="../assets/search.svg" class="btn-search">
        </a>
      </div>
      <div class="col-8 row justify-content-center align-items-center">
        <router-link :to="{ name: 'Index'}" class="link">
          <img src="../assets/logo.png" class="logo" alt="">
        </router-link>
      </div>
      <div v-if="authorized" class="row align-items-center">
        Welcome,&nbsp;
        <div class="user-name">
          {{user_name}}
        </div>
        <a href="javascript:;">
          <img src="../assets/logout.svg" class="logout" v-on:click="logout">
        </a>
      </div>
      <div v-else class="">
        <div class="sign-in">
          <router-link :to="{ name: 'Login'}" class="link">Sign in</router-link>
        </div>
        or
        <div class="sign-up">
          <router-link :to="{ name: 'Join'}" class="link">Sign up</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  beforeCreate: function () {
    this.$http.get('/auth')
      .then((res) => {
        if (res.data !== '') {
          this.authorized = true
          this.user_name = res.data.name
          this.user_id = res.data._id
          this.$emit('authorized', res.data._id)
        } else {
          this.authorized = false
        }
      })
      .catch((res) => {
        this.authorized = false
      })
  },
  methods: {
    logout: function () {
      this.$http.post('/auth/logout')
        .then((res) => {
          this.$router.go('/')
        })
        .catch((res) => {
          console.log(res)
        })
    }
  },
  data () {
    return {
      authorized: false,
      user_name: '',
      user_id: ''
    }
  }
}
</script>

<style scoped>
  .container-header {
    z-index: 2;
    padding-top: 12px;
    padding-bottom: 12px;
    color: rgba(255,255,255,0.75);
    background-color: #24292e;
    display: block;
  }
  .container-lg {
    max-width: 1012px;
    margin-right: auto;
    margin-left: auto;
  }
  .container-search {
    display: table;
  }
  .search {
    font-size: .9rem;
    display:table-cell;
    color: inherit;
    padding: .25rem;
    padding-left: .5rem;
    background-color: rgba(255,255,255,0.125);
    border:none;
    border-radius: .1rem 0rem 0rem .1rem;s
    box-shadow: none;
    outline: none;
  }
  .search:focus + .container-btn-search {
    background-color: rgba(255,255,255,0.175);
  }
  .search:focus, .search:focus + .container-btn-search{
    background-color: rgba(255,255,255,0.175);
  }
  .search::placeholder {
    color: #898989;
  }
  .container-btn-search {
    display:table-cell;
    border-radius: 0rem .1rem .1rem 0rem;
    background-color: rgba(255,255,255,0.125);
  }
  .btn-search {
    margin: .25rem .6rem .3rem .25rem;
    height:.9rem;
  }
  .sign-in, .sign-up, .user-name{
    color: white;
    font-weight: bolder;
    display: inline-block;
  }
  .link {
    color:white;
    text-decoration: none;
  }
  .logo {
    height: 2rem;
  }
  .logout {
    height: 1rem;
    margin-left: .75rem;
  }
</style>
