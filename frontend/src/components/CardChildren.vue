<template lang="html">
  <div class="card-children">
    <div class="container-question row">
      <div class="left-question col-3 row justify-content-center align-items-center">
        Q.
      </div>
      <div class="question col row align-items-center">
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
  </div>
</template>

<script>
export default {
  name: 'CardChildren'
}
</script>

<style scoped>
  .card-children {
    font-size: .75rem;
    z-index: 1;
    display: block;
    width: 90%;
    color: black;
  }
  .container-question {
    margin: 0;
    background-color: #E0E2E3;
    padding: .6rem;
    max-width: 100%;
    border-radius: .4rem .4rem 0rem 0rem;
  }
  .container-answer {
    margin: 0;
    background-color: #FFF;
    padding: .6rem;
    max-width: 100%;
    border-radius: 0rem 0rem .4rem .4rem;
  }
  .left-question, .left-answer {
    font-size: 1.75rem;
  }
  .answer {
    padding-top: .2rem;
    padding-bottom: .4rem;
  }
</style>
