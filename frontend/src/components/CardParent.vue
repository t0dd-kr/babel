<template lang="html">
  <div v-if="card" class="card-parent" :style="{zIndex: zIndex}">
    <div class="container-question row">
      <div class="left-question col-3 row justify-content-center align-items-center">
        Q.
      </div>
      <div class="question col row align-items-center">
        {{card.question}}
      </div>
    </div>
    <div class="container-answer row">
      <div class="left-answer col-3 row justify-content-center align-items-center">
        A.
      </div>
      <ol v-if="card.is_ordered" class="col row align-items-center">
        <li v-for="(answer, index) in card.answers" class="col-12 answer" v-bind:key="index">
          <div class="text-answer">
            {{answer}}
          </div>
        </li>
      </ol>
      <ul v-else class="col row align-items-center">
        <li v-for="(answer, index) in card.answers" class="col-12 answer" v-bind:key="index">
          <div class="text-answer">
            {{answer}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardParent',
  props: {
    card: Object,
    zIndex: Number
  }
}
</script>

<style scoped>
  .card-parent {
    font-size: .75rem;
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
    padding: 0;
    padding-top: .2rem;
    padding-bottom: .3rem;
  }
  .question {
    font-size: 1rem;
  }
  ol, ul {
    margin: 0;
  }
  li, li textarea, li input{
    float: left;
  }
</style>
