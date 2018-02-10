<template lang="html">
  <div class="card-main">
    <div class="container-question row">
      <div class="left-question col-3 row justify-content-center align-items-center">
        Q.
      </div>
      <div class="question col row align-items-center">
        Why does do doing else you are doing ?
        <router-link :to="{ name: 'Write', params: { }}">
          <img src="../assets/pencil.svg" class="btn-write">
        </router-link>
      </div>
    </div>
    <div class="container-answer row">
      <div class="left-answer col-3 row justify-content-center align-items-center">
        A.
      </div>
      <div class="col-9 row align-items-center">
        <div class="col">
          <div v-for="n in 3" class="answer row" v-bind:key="n">
            {{ n }}. hihihi
          </div>
        </div>
      </div>
    </div>
    <div class="container-modifier col-12 row justify-content-center">
      <div class="modifier-notice row">
        0 change request
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardMain'
}
</script>

<style scoped>
  .card-main {
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
  .left-question, .left-answer {
    font-size: 3rem;
  }
  .answer {
    padding-top: .25rem;
    padding-bottom: .5rem;
  }
  .container-modifier {
    padding: .25rem;
    margin: 0;
    max-width: 100%;
    background-color: #E0FFE0;
    border-radius: 0rem 0rem .4rem .4rem;
  }
  .modifier-notice {
    font-size: .8rem;
    color: #25E025;
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
</style>
