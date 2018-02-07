<template lang="html">
  <div class="container-card">
    <div class="container-question row">
      <div class="left-question col-3 row justify-content-center align-items-center">
        Q.
      </div>
      <div class="question col-9 row align-items-center">
        Why does do doing else you are doing ?
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
        변경요청 0건
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card'
}
</script>

<style scoped>
  .container-card {
    z-index: 1;
    display: block;
    width: 75%;
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
</style>
