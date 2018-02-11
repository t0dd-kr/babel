<template lang="html">
  <div>
    <Header/>
    <div class="body container-fluid">
      <div class="row justify-content-center">
        <div class="container-login col-6 row justify-content-center">
          <div class="login col-8">
            <div class="container-question row">
              <div class="left-question col-3 row justify-content-center align-items-center">
                Q.
              </div>
              <div class="question col row align-items-center">
                What's your e-mail?
              </div>
            </div>
            <div class="container-answer row">
              <div class="left-answer col-3 row justify-content-center align-items-center">
                A.
              </div>
              <div class="col-9 row align-items-center">
                <div class="col">
                  <form>
                    <div class="answer">
                      <input v-model="name" type="text" name="name" value="" placeholder="name" v-on:keydown="($event) => { if ($event.keyCode === 13) { join() } }">
                    </div>
                    <div class="answer">
                      <input v-model="email" type="email" name="email" value="" placeholder="e-mail" v-on:keydown="($event) => { if ($event.keyCode === 13) { join() } }">
                    </div>
                    <div class="answer">
                      <input v-model="password" type="password" name="password" value="" placeholder="password" v-on:keydown="($event) => { if ($event.keyCode === 13) { join() } }">
                    </div>
                    <div class="answer">
                      <input v-model="password_confirm" type="password" name="password-confirm" value="" placeholder="contirm password" v-on:keydown="($event) => { if ($event.keyCode === 13) { join() } }">
                    </div>
                    <div class="answer">
                      <button type="button" v-on:click="join">Sign Up</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="container-error col-12 row justify-content-center">
              <div class="error-notice row">
                {{error}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header'
export default {
  name: 'Login',
  components: {
    Header
  },
  methods: {
    join: function () {
      if (this.name === '') {
        this.errorcode = 1
      } else if (this.email === '') {
        this.errorcode = 2
      } else if (this.password === '') {
        this.errorcode = 3
      } else if (this.password_confirm === '') {
        this.errorcode = 4
      } else if (this.password === this.password_confirm) {
        this.$http.post('/auth/join', {
          email: this.email,
          password: this.password,
          name: this.name
        })
          .then((res) => {
            if (res.data.status) {
              this.$router.push('/')
            } else {
              // alert(res.data.message)
              this.errorcode = res.data.message
            }
          })
          .catch((res) => {
            console.log(res)
          })
      }
    }
  },
  data () {
    return {
      errorcode: 0,
      name: '',
      email: '',
      password: '',
      password_confirm: ''
    }
  },
  computed: {
    error: function () {
      switch (this.errorcode) {
        case 0:
          return '0 error occured'
        case 1:
          return 'error occured: name required'
        case 2:
          return 'error occured: e-mail required'
        case 3:
          return 'error occured: password required'
        case 4:
          return 'error occured: confirm password required'
      }
    }
  }
}
</script>

<style scoped>
  .body {
    position: fixed;
    background-color: #313234;
    height: 100%;
  }
  .login {
    z-index: 1;
    display: block;
    width: 90%;
    color: black;
  }
  .container-question {
    margin: 0;
    background-color: #E0E2E3;
    padding: .75rem;
    max-width: 100%;
    border-radius: .4rem .4rem 0rem 0rem;
  }
  .container-answer {
    margin: 0;
    background-color: #FFF;
    padding: .75rem;
    max-width: 100%;
    /* border-radius: 0rem 0rem .4rem .4rem; */
  }
  .question {
    font-size: 1.25rem;
  }
  .left-question, .left-answer {
    font-size: 3rem;
  }
  .answer {
    padding-top: .25rem;
    padding-bottom: .5rem;
  }
  .container-error {
    padding: .25rem;
    margin: 0;
    max-width: 100%;
    background-color: #FFE0E0;
    border-radius: 0rem 0rem .4rem .4rem;
  }
  .error-notice {
    font-size: .8rem;
    color: #E02525;
    font-weight: bolder;
  }
  .btn-write {
    background-image: url('../assets/pencil.svg');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 1.25rem;
    height: 1.25rem;
    position: absolute;
    bottom: -.1rem;
    right: .8rem;
  }
  .container-login {
    margin-top: 5rem;
  }
  input {
    display: block;
    width: 90%;
    border-collapse: collapse;
    box-sizing: border-box;
    background-color: rgb(237, 237, 237);
    font-size: 13px;
    border-radius: 3px;
    border: 1px solid rgb(216, 219, 219);
    border-image: initial;
    padding: 11px 0px 12px 10px;
    margin-top: 10px;
  }
  input:focus, button:focus {
    outline: none;
  }
  button {
    display: block;
    width: 90%;
    border-collapse: collapse;
    box-sizing: border-box;
    background-color: #2865E7;
    font-size: 13px;
    border-radius: 3px;
    border: 1px solid rgb(200, 219, 200);
    border-image: initial;
    padding: 5px 0px 5px 10px;
    margin-top: 10px;
    font-weight: bold;
    color: white;
    font-size: 1.25rem;
  }
</style>
