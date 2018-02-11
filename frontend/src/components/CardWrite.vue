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
          v-on:keydown="autoSize($event)"
          v-model="question"
        />
      </div>
    </div>
    <div class="container-answer row">
      <div class="list-type col-3 row justify-content-center align-items-center">
        <a href="javascript:;">
          <img v-if="is_ordered" src="../assets/olist-black.svg" class="olist"/>
          <img v-else v-on:click="is_ordered = !is_ordered" src="../assets/olist-gray.svg" class="olist"/>
        </a>
        <a href="javascript:;">
          <img v-if="!is_ordered" src="../assets/ulist-black.svg" class="ulist"/>
          <img v-else v-on:click="is_ordered = !is_ordered" src="../assets/ulist-gray.svg" class="ulist"/>
        </a>
      </div>
      <div class="col">
        <div class="container-reference col-12 row justify-content-start">
          <div class="reference" v-for="(reference, index) in references" v-bind:key="reference">
            <div class="text-reference">
              <a :href="reference" target="_blank">
                {{ reference }}
              </a>
            </div>
            <div class="delete-reference"
              v-on:click="deleteReference($event, index)"
            >
            </div>
          </div>
          <div class="w-100"></div>
          <input type="text" class="input-reference" placeholder="Please leave the source..."
            v-on:keydown="addReference($event)"
          >
        </div>
      </div>
      <div class="w-100"></div>
      <div class="left-answer col-3 row justify-content-center align-items-center">
        A.
      </div>
      <ol v-if="is_ordered" class="col row align-items-center">
        <li v-for="(answer, index) in answers" class="col-12 answer" v-bind:key="index">
          <textarea
            class="input-answer"
            v-bind:name="'answer-' + (index + 1)"
            rows="1"
            placeholder="Write your answer here."
            v-on:keydown="autoSize($event)"
            v-on:blur="onBlur($event)"
            v-on:focus="onFocus($event, index)"
            v-model="answer.answer"
          />
          <textarea
            class="input-answer-detail"
            v-bind:name="'answer-detail-' + (index + 1)"
            rows="1"
            placeholder="Details..."
            v-on:keydown="autoSize($event)"
            v-on:blur="onBlurDetail($event)"
            v-on:focus="onFocus($event, index)"
            v-model="answer.detail"
          />
        </li>
      </ol>
      <ul v-else class="col row align-items-center">
        <li v-for="(answer, index) in answers" class="col-12 answer" v-bind:key="index">
          <textarea
            class="input-answer"
            v-bind:name="'answer-' + (index + 1)"
            rows="1"
            placeholder="Write your answer here."
            v-on:keydown="autoSize($event)"
            v-on:blur="onBlur($event)"
            v-on:focus="onFocus($event, index)"
            v-model="answer.answer"
          />
          <textarea
            class="input-answer-detail"
            v-bind:name="'answer-detail-' + (index + 1)"
            rows="1"
            placeholder="Details..."
            v-on:keydown="autoSize($event)"
            v-on:blur="onBlurDetail($event)"
            v-on:focus="onFocus($event, index)"
            v-model="answer.detail"
          />
        </li>
      </ul>
    </div>
    <div class="container-hashtag col-12 row justify-content-center">
      <div class="hashtag" v-for="(hashtag, index) in hashtags" v-bind:key="hashtag">
        <div class="text-hashtag">
          #{{ hashtag }}
        </div>
        <div class="delete-hashtag"
          v-on:click="deleteHashtag($event, index)"
        >
        </div>
      </div>
      <div class="w-100"></div>
      <input type="text" class="input-hashtag" placeholder="Type hashtag here..."
        v-on:keydown="addHashtag($event)"
      >
    </div>
    <div class="container-submit col-12 row justify-content-end">
      <button type="button"
        v-on:click="submit"
        :class="submitAble ? 'submit-able' : 'submit-unable'"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardWrite',
  computed: {
    submitAble: function () {
      var isValid = this.answers.filter((value) => {
        return value.answer === '' && value.detail !== ''
      })
      if (isValid === []) {
        console.log(false)
        return false
      } else {
        return this.question !== '' && this.answers[0].answer !== ''
      }
    }
  },
  methods: {
    autoSize: function (event, index) {
      var el = event.target
      if (event.keyCode === 13) {
        if (el.className === 'input-answer') {
          event.preventDefault()
          el.parentNode.children[1].focus()
        } else if (el.className === 'input-question') {
          event.preventDefault()
          el.blur()
        }
      } else if (event.keyCode === 8) {
        if (el.className === 'input-answer' || el.className === 'input-answer-detail') {
          if (el.parentNode.children[0].value === '' && el.parentNode.children[1].value === '') {
            this.answers = this.answers.filter((value, idx) => {
              return idx !== index
            })
          }
        }
      }
      setTimeout(function () {
        el.style.cssText = 'height:auto; padding:0'
        // for box-sizing other than "content-box" use:
        // el.style.cssText = '-moz-box-sizing:content-box';
        el.style.cssText = 'height:' + (el.scrollHeight + 21) + 'px'
      }, 0)
    },
    onBlurDetail: function (event) {
      var el = event.target
      while (el.value[el.value.length - 1] === '\n') {
        el.value = el.value.slice(0, -1)
        this.autoSize(event)
      }
      this.onBlur(event)
    },
    onBlur: function (event) {
      while (this.answers[this.answers.length - 1].answer === '' && this.answers[this.answers.length - 1].detail === '' &&
      this.answers[this.answers.length - 2].answer === '' && this.answers[this.answers.length - 2].detail === '') {
        this.answers.pop()
      }
    },
    onFocus: function (event, index) {
      var el = event.target
      if (index === this.answers.length - 1 && el.value.length === 0 && this.answers.length < 5) {
        this.answers.push({answer: '', detail: ''})
      }
    },
    submit: function () {
      if (this.doCompute('submitAble')) {
        this.answers = this.answers.filter((value) => {
          return !(value.answer === '' && value.detail === '')
        })
        this.$http.post('/api/card', {
          user_id: this.user_id,
          question: this.question,
          answers: this.answers.map(obj => obj.answer),
          details: this.answers.map(obj => obj.detail),
          parent: this.card_parent === null ? null : this.card_parent._id,
          hashtags: this.hashtags,
          references: this.references,
          is_ordered: this.is_ordered
        })
          .then((res) => {
            if (res.data.status) {
              console.log(res.data.id)
              this.$router.go('/show/' + res.data.id)
            }
          })
          .catch((res) => {
            console.log('card save error')
          })
      }
    },
    doCompute: function (prop) {
      return this[prop]
    },
    addHashtag: function (event) {
      var el = event.target
      var hashtag = el.value.trim()
      if (event.keyCode === 13) {
        if (hashtag.indexOf(' ') !== -1) {
          el.placeholder = 'Cannot include blank (\' \') in the hashtag'
          setTimeout(function () {
            el.placeholder = 'Type hashtag here...'
          }, 1500)
        } else if (hashtag !== '') {
          var filtered = this.hashtags.filter((value) => {
            return value === hashtag
          })
          if (filtered.length === 0) {
            this.hashtags.push(hashtag)
          } else {
            el.placeholder = 'Same hashtag already exists.'
            setTimeout(function () {
              el.placeholder = 'Type hashtag here...'
            }, 1500)
          }
        }
        el.value = ''
      }
    },
    deleteHashtag: function (event, index) {
      this.hashtags = this.hashtags.filter((value, idx) => {
        return index !== idx
      })
    },
    addReference: function (event) {
      var el = event.target
      var reference = el.value.trim()
      if (reference.indexOf('http://') === -1 && reference.indexOf('https://') === -1) {
        reference = 'http://' + reference
      }
      if (event.keyCode === 13) {
        if (reference.indexOf(' ') !== -1) {
          el.placeholder = 'Cannot include blank (\' \')'
          setTimeout(function () {
            el.placeholder = 'Please leave the source...'
          }, 1500)
        } else if (reference !== '') {
          var filtered = this.references.filter((value) => {
            return value === reference
          })
          if (filtered.length === 0) {
            this.references.push(reference)
          } else {
            el.placeholder = 'Same source already exists.'
            setTimeout(function () {
              el.placeholder = 'Please leave the source...'
            }, 1500)
          }
        }
        el.value = ''
      }
    },
    deleteReference: function (event, index) {
      this.references = this.references.filter((value, idx) => {
        return index !== idx
      })
    }
  },
  props: {
    user_id: {
      type: String,
      required: true
    },
    card_parent: {
      type: Object,
      null: true
    }
  },
  data () {
    return {
      question: '',
      answers: [{
        answer: '',
        detail: ''
      }],
      hashtags: [],
      references: [],
      is_ordered: true
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
  .container-question{
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
  }
  .container-hashtag {
    margin: 0;
    background-color: #FFF;
    padding: .75rem;
    max-width: 100%;
  }
  .container-submit {
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
  ol, ul {
    padding-left: 2.5rem;
    margin: 0;
  }
  li, li textarea, li input{
    float: left;
  }
  input {
    display: block;
    width: 90%;
    height: 2rem;
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
    border-collapse: collapse;
    box-sizing: border-box;
    font-size: 13px;
    border-radius: 3px;
    border: none;
    padding: 5px 15px 5px 15px;
    margin-top: 10px;
    font-weight: bold;
    color: white;
    font-size: 1rem;
  }
  .submit-able {
    background-color: #45D745;
  }
  .submit-able:hover {
    background-color: #55E755;
  }
  .submit-able:active {
    background-color: #35C735;
  }
  .submit-unable {
    background-color: #808080;
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
    height: 45px;
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
  .input-hashtag {
    background-color: #FFF;
    border: none;
    transition: background-color .25s;
  }
  .input-hashtag:focus {
    background-color: #EDEDED;
  }
  .hashtag {
    display: block;
    padding: .25rem .5rem .25rem .5rem;
    margin: .25rem .25rem .35rem .25rem;
    border-radius: .75rem;
    font-weight: 500;
    background-color:#E0E2E3;
  }
  .img-delete-hashtag {
    height: 1rem;
    margin: 0;
  }
  .text-hashtag {
    display: block;
    float:left;
    font-size: .8rem;
  }
  .delete-hashtag {
    width: 1rem;
    height: 1rem;
    margin: .1rem -.2rem 0rem .35rem;
    background-image: url('../assets/letter-x.svg');
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: 50%;
    border-radius: 50%;
    display: block;
    float: left;
  }
  .delete-hashtag:hover {
    background-color:#C0C2A3;
  }
  .reference {
    display: block;
    padding: .25rem .5rem .25rem .5rem;
    margin: .25rem .25rem .35rem .25rem;
    border-radius: .75rem;
    font-weight: 500;
    background-color:#B0FAB0;
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
  .delete-reference {
    width: 1rem;
    height: 1rem;
    margin: .1rem -.2rem 0rem .35rem;
    background-image: url('../assets/letter-x-green.svg');
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: 50%;
    border-radius: 50%;
    display: block;
    float: left;
  }
  .delete-reference:hover {
    background-color: #60EA60;
  }
  .input-reference {
    background-color: #B0FAB0;
    border: none;
    color: #20CA20;
  }
  .input-reference::placeholder {
    color: #20CA20;
  }
  .ulist, .olist {
    height: 1.8rem;
  }
</style>
