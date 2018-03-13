<template>
  <div class="container-hashtagbody">
    <div class="hashtagbody container-fluid">
      <div class="row">
        <div class="container-hashtags col-2">
          <a class="link-container-hashtag row justify-content-center col-12" v-for="(hashtag, index) in hashtags" v-bind:key="index" v-if="index % 6 === 0" :href="'/search_hashtag/' + hashtag.hashtag" :data-index="index">
            <Hashtag
              :hashtag="hashtag"
              :zIndex="zIndexChildren[index]"
            />
          </a>
        </div>
        <div class="container-hashtags col-2">
          <a class="link-container-hashtag row justify-content-center col-12" v-for="(hashtag, index) in hashtags" v-bind:key="index" v-if="index % 6 === 1" :href="'/search_hashtag/' + hashtag.hashtag" :data-index="index">
            <Hashtag
              :hashtag="hashtag"
              :zIndex="zIndexChildren[index]"
            />
          </a>
        </div>
        <div class="container-hashtags col-2">
          <a class="link-container-hashtag row justify-content-center col-12" v-for="(hashtag, index) in hashtags" v-bind:key="index" v-if="index % 6 === 2" :href="'/search_hashtag/' + hashtag.hashtag" :data-index="index">
            <Hashtag
              :hashtag="hashtag"
              :zIndex="zIndexChildren[index]"
            />
          </a>
        </div>
        <div class="container-hashtags col-2">
          <a class="link-container-hashtag row justify-content-center col-12" v-for="(hashtag, index) in hashtags" v-bind:key="index" v-if="index % 6 === 3" :href="'/search_hashtag/' + hashtag.hashtag" :data-index="index">
            <Hashtag
              :hashtag="hashtag"
              :zIndex="zIndexChildren[index]"
            />
          </a>
        </div>
        <div class="container-hashtags col-2">
          <a class="link-container-hashtag row justify-content-center col-12" v-for="(hashtag, index) in hashtags" v-bind:key="index" v-if="index % 6 === 4" :href="'/search_hashtag/' + hashtag.hashtag" :data-index="index">
            <Hashtag
              :hashtag="hashtag"
              :zIndex="zIndexChildren[index]"
            />
          </a>
        </div>
        <div class="container-hashtags col-2">
          <a class="link-container-hashtag row justify-content-center col-12" v-for="(hashtag, index) in hashtags" v-bind:key="index" v-if="index % 6 === 5" :href="'/search_hashtag/' + hashtag.hashtag" :data-index="index">
            <Hashtag
              :hashtag="hashtag"
              :zIndex="zIndexChildren[index]"
            />
          </a>
        </div>
        <div class="darken"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Hashtag from './Hashtag'
export default {
  name: 'HashtagBody',
  data () {
    return {
      curChild: null
    }
  },
  components: {
    Hashtag
  },
  props: {
    user_id: String,
    hashtags: Array,
    zIndexChildren: Array
  },
  created () {
    window.addEventListener('mousemove', this.onMouseMove)
  },
  methods: {
    activeTransition: function (selector, name) {
      if (window.$(selector).hasClass(name) === false) {
        window.$(selector).addClass(name)
      }
    },
    deactiveTransition: function (selector, name) {
      while (window.$(selector).hasClass(name) === true) {
        window.$(selector).removeClass(name)
      }
    },
    onMouseMove: function (event) {
      var Mouse = {
        X: event.pageX,
        Y: event.pageY
      }
      var elements = window.$('.link-container-hashtag')
      var activateDarken = false
      for (var i = 0; i < elements.length; i++) {
        var rect = elements[i].getBoundingClientRect()
        if (this.isPointInRect(Mouse.X, Mouse.Y, rect.left, rect.top, rect.right - rect.left, rect.bottom - rect.top)) {
          this.activeTransition('.darken', 'darken-active')
          activateDarken = true
          if (this.curChild !== null) {
            if (this.curChild !== elements[i].dataset.index) {
              this.curChild = elements[i].dataset.index
            }
          } else {
            this.curChild = elements[i].dataset.index
          }
          for (var j = 0; j < this.zIndexChildren.length; j++) {
            this.zIndexChildren[j] = 0
          }
          this.zIndexChildren[this.curChild] = 100
          this.$forceUpdate()
        }
      }
      if (!activateDarken) {
        this.zIndexChildren[this.curChild] = 0
        this.curChild = null
        this.deactiveTransition('.darken', 'darken-active')
      }
    },
    isPointInRect: function (px, py, rx, ry, rw, rh) {
      if (px >= rx && px <= rx + rw && py >= ry && py <= ry + rh) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style scoped>
  .hashtagbody {
    background-color: #313234;
    padding-top: 3rem;
    display: block;
    height: 100%;
    position: fixed;
  }
  .container-hashtags {
    padding: 0;
  }
  .link-container-hashtag {
    position: relative;
    text-decoration: none;
    margin-bottom: 3rem;
    margin-left: 0;
    margin-right: 0;
    padding: 0;
  }
  .darken {
    position:fixed;
    top: 0px;
    left: 0px;
    width: 0%;
    height: 0%;
    z-index: -1;
    transition: background-color .25s;
  }
  .darken-active {
    background-color: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
    z-index: 10;
  }
</style>
