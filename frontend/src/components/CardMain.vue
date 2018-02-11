<template lang="html">
  <div v-if="card" class="card-main">
    <div class="container-question row">
      <div class="left-question col-3 row justify-content-center align-items-center">
        Q.
      </div>
      <div class="question col row align-items-center">
        {{ card.question }}
        <router-link :to="{ name: 'Write', params: {id: (card ? card._id : 'new')}}" v-if="authorized">
          <img src="../assets/pencil.svg" class="btn-write">
        </router-link>
      </div>
    </div>
    <div class="container-answer row">
      <div class="list-type col-3 row justify-content-center align-items-center">
        <a href="javascript:;">
          <img v-if="!isDetail" src="../assets/answer-list-black.svg" class="answer-list"/>
          <img v-else v-on:click="isDetail = !isDetail" src="../assets/answer-list-gray.svg" class="answer-list"/>
        </a>
        <a href="javascript:;">
          <img v-if="isDetail" src="../assets/detail-list-black.svg" class="detail-list"/>
          <img v-else v-on:click="isDetail = !isDetail" src="../assets/detail-list-gray.svg" class="detail-list"/>
        </a>
      </div>
      <div class="col">
        <div class="container-reference col-12 row justify-content-start">
          <div class="reference" v-for="reference in card.references" v-bind:key="reference">
            <div class="text-reference">
              <a :href="reference" target="_blank">
                {{ reference }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="w-100"></div>
      <div class="left-answer col-3 row justify-content-center align-items-center">
        A.
      </div>
      <ol v-if="card.is_ordered" class="col row align-items-center">
        <li v-for="(answer, index) in card.answers" class="col-12 answer" v-bind:key="index">
          <div class="text-answer">
            {{answer}}
          </div>
          <div v-if="isDetail" class="text-details">
            {{card.answer_details[index]}}
          </div>
        </li>
      </ol>
      <ul v-else class="col row align-items-center">
        <li v-for="(answer, index) in card.answers" class="col-12 answer" v-bind:key="index">
          <div class="text-answer">
            {{answer}}
          </div>
          <div v-if="isDetail" class="text-details">
            {{card.answer_details[index]}}
          </div>
        </li>
      </ul>
    </div>
    <div class="container-hashtag col-12 row justify-content-center">
      <div class="hashtag" v-for="hashtag in card.hashtags" v-bind:key="hashtag">
        <div class="text-hashtag">
          #{{ hashtag }}
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
  name: 'CardMain',
  data () {
    return {
      isDetail: false
    }
  },
  props: {
    card: {
      type: Object
    },
    authorized: {
      type: Boolean,
      required: true
    }
  }
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
  .container-hashtag {
    margin: 0;
    background-color: #FFF;
    padding: .75rem;
    max-width: 100%;
  }
  .left-question, .left-answer {
    font-size: 3rem;
  }
  .question {
    font-size: 1.5rem;
  }
  .answer {
    padding: 0;
    padding-top: .75rem;
    padding-bottom: .5rem;
    font-size: 1.75rem;
    font-weight: 500;
  }
  .text-details {
    font-size: 1rem;
    color: #909090;
    font-weight: normal;
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
  .reference {
    display: block;
    padding: .25rem .5rem .25rem .5rem;
    margin: .25rem .25rem .35rem .25rem;
    border-radius: .75rem;
    font-weight: 500;
    background-color:#B0FAB0;
    transition: background-color .25s;
  }
  .reference:hover {
    background-color: #75FA75;
  }
  .text-reference {
    display: block;
    float:left;
    font-size: .8rem;
    text-decoration: none;
  }
  .text-reference a {
    color: #20CA20;
  }
  ol, ul {
    padding-left: 2.5rem;
    margin: 0;
  }
  li, li textarea, li input{
    float: left;
  }
  .answer-list, .detail-list {
    height: 1.8rem;
  }
  .hashtag {
    display: block;
    padding: .25rem .5rem .25rem .5rem;
    margin: .25rem .25rem .35rem .25rem;
    border-radius: .75rem;
    font-weight: 500;
    background-color:#E0E2E3;
    transition: background-color .25s;
  }
  .hashtag:hover {
    background-color:#B0B2B3;
  }
  .text-hashtag {
    display: block;
    float:left;
    font-size: .8rem;
  }
</style>
