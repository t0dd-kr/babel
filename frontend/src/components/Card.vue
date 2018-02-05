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
    width: 600px;
    color: black;
    border: black 2px solid;
  }
  .container-question {
    margin: 0;
    background-color: #F2F3F4;
    padding-top: .75rem;
    padding-bottom: .75rem;
    max-width: 100%;
  }
  .container-answer {
    margin: 0;
    background-color: #FFF;
    padding-top: .75rem;
    padding-bottom: .75rem;
    max-width: 100%;
  }
  .left-question, .left-answer {
    font-size: 1.5rem;
  }
  .answer {
    padding-top: .25rem;
    padding-bottom: .25rem;
  }
</style>
