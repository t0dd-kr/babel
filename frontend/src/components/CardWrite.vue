<template lang="html">
  <div class="card-write">
    <div class="container-question row">
      <div class="left-question col-3 row justify-content-center align-items-center">
        Q.
      </div>
      <div class="question col row align-items-center">
        <textarea
          class="input-question"
          name="question"
          rows="1"
          placeholder="Any question?"
          v-on:keydown="autosize($event)"
        />
      </div>
    </div>
    <div class="container-answer row">
      <div class="left-answer col-3 row justify-content-center align-items-center">
        A.
      </div>
      <ol class="col row align-items-center">
        <li v-for="(answer, index) in answers" class="col-12 answer" v-bind:key="index">
          <textarea
            class="input-answer"
            v-bind:name="'answer-' + (index + 1)"
            rows="1"
            placeholder="Write your answer here."
            v-on:keydown="autosize($event)"
            v-on:blur="addAnswer($event, index)"
          />
          <textarea
            class="input-answer-detail"
            v-bind:name="'answer-detail-' + (index + 1)"
            rows="1"
            placeholder="details..."
            v-on:keydown="autosize($event)"
            v-on:blur="onBlur($event)"
          />
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardWrite',
  methods: {
    autosize: function (event) {
      var el = event.target
      if (event.keyCode === 13) {
        if (el.className === 'input-answer') {
          event.preventDefault()
          el.parentNode.children[1].focus()
        } else if (el.className === 'input-question') {
          event.preventDefault()
          el.blur()
        }
      }
      setTimeout(function () {
        el.style.cssText = 'height:auto; padding:0'
        // for box-sizing other than "content-box" use:
        // el.style.cssText = '-moz-box-sizing:content-box';
        el.style.cssText = 'height:' + (el.scrollHeight + 21) + 'px'
      }, 0)
    },
    onBlur: function (event) {
      var el = event.target
      if (el.value[el.value.length - 1] === '\n') {
        el.value = el.value.slice(0, -1)
        this.autosize(event)
      }
    },
    addAnswer: function (event, index) {
      var el = event.target
      if (this.answers.length < 5) {
        if (el.value.length !== 0 && this.answers.length === index + 1) {
          this.answers.push({answer: '', detail: ''})
        } else if (el.value.length === 0 && this.answers.length === index + 1 && this.answers.length !== 1) {
          this.answers.pop()
        }
      }
    }
  },
  data () {
    return {
      answers: [{
        answer: '',
        detail: ''
      }]
    }
  }
}
</script>

<style scoped>
  .card-write {
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
    border-radius: 0rem 0rem .4rem .4rem;
  }
  .left-question, .left-answer {
    font-size: 3rem;
  }
  .answer {
    padding: 0;
    padding-top: .75rem;
    padding-bottom: .5rem;
    font-size: 1.75rem;
  }
  ol {
    padding-left: 2.5rem;
  }
  li, li textarea, li input{
    float: left;
  }
  input {
    display: block;
    width: 90%;
    height: 3rem;
    border-collapse: collapse;
    box-sizing: border-box;
    background-color: rgb(237, 237, 237);
    font-size: 13px;
    border-radius: 3px;
    border: 1px solid rgb(216, 219, 219);
    border-image: initial;
    padding: 11px 0px 12px 10px;
  }
  input:focus, button:focus, textarea:focus {
    outline: none;
  }
  button {
    display: block;
    width: 90%;
    height: 3rem;
    border-collapse: collapse;
    box-sizing: border-box;
    background-color: #28C745;
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
  textarea {
    resize: none;
    overflow: hidden;
    display: block;
    width: 90%;
    border-collapse: collapse;
    box-sizing: border-box;
    background-color: rgb(237, 237, 237);
    font-size: 15px;
    border-radius: 3px;
    border: none;
    padding: 11px 0px 12px 10px;
    word-wrap: break-word;
  }
  .input-question {
    background-color: #E0E2E3;
    overflow: hidden;
    transition: background-color .25s
  }
  .input-question:focus {
    background-color: white;
    border: none;
  }
  .input-answer, .input-answer-detail {
    background-color: #FFF;
    overflow: hidden;
    transition: background-color .25s;
  }
  .input-answer {
    font-weight: bolder;
  }
  .input-answer-detail {
    font-size: 12px;
  }
  .input-answer:focus, .input-answer-detail:focus {
    background-color: #EDEDED;
    border: none;
  }
</style>
