<template>
  <div v-if="card" class="container-show">
    <Header
      v-on:authorized="(id) => user_id = id"
    />
    <div class="show container-fluid">
      <div class="row">
        <div class="col-2">
          <a class="link-container-card-parent" v-if="card.parent" :href="'/show/' + card.parent._id">
            <div class="container-card-parent row justify-content-center">
              <CardParent
                v-bind:card="card.parent"
                v-bind:zIndex="zIndexParent"
              />
            </div>
          </a>
          <div class="darken"></div>
        </div>
        <div class="col-5">
          <div class="container-card-main row justify-content-center">
            <CardMain
              v-bind:card="card"
              v-bind:authorized="user_id !== ''"
            />
          </div>
        </div>
        <div class="container-children col-3">
          <a v-for="(child, index) in card.children" v-bind:key="child._id" v-if="child" :href="'/show/' + child._id" class="link-container-card-children">
            <div class="container-card-children row justify-content-center" :data-index="index" :data-parent="child._id">
              <CardChildren
                v-bind:card="child"
                v-bind:zIndex="zIndexChildren[index]"
              />
            </div>
          </a>
        </div>
        <div class="col-2">
          <div class="container-card-grandson row justify-content-center" v-for="grandson in grandsons" v-bind:key="grandson._id">
            <CardChildren
              v-bind:card="grandson"
              :zIndex="100"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import Header from './Header'
import CardParent from './CardParent'
import CardMain from './CardMain'
import CardChildren from './CardChildren'
import CardGrandson from './CardGrandson'
export default {
  name: 'Show',
  components: {
    Header,
    CardParent,
    CardMain,
    CardChildren,
    CardGrandson
  },
  beforeCreate () {
    if (this.$route.params.id) {
      this.$http.get(`/api/cards/${this.$route.params.id}`)
        .then((res) => {
          if (res.data !== '') {
            this.card = res.data
            this.zIndexChildren = new Array(this.card.length)
            for (var j = 0; j < this.zIndexChildren.length; j++) {
              this.zIndexChildren[j] = 0
            }
          } else {
            this.$router.push('/')
          }
        })
        .catch((res) => {
          this.$router.push('/')
        })
    }
  },
  beforeRouteUpdate (to) {
    this.$http.get(`/api/cards/${to.params.id}`)
      .then((res) => {
        if (res.data !== '') {
          this.card = res.data
          this.zIndexChildren = new Array(this.card.length)
          for (var j = 0; j < this.zIndexChildren.length; j++) {
            this.zIndexChildren[j] = 0
          }
        } else {
          this.$router.push('/')
        }
      })
      .catch((res) => {
        this.$router.push('/')
      })
  },
  data () {
    return {
      card: null,
      user_id: '',
      grandsons: [],
      curChild: null,
      zIndexChildren: [],
      zIndexParent: 1
    }
  },
  created: function () {
    window.addEventListener('mousemove', this.onMouseMove)
  },
  methods: {
    loadGrandson: function (parentId) {
      this.$http.get(`/api/cards/${parentId}/children`)
        .then((res) => {
          if (res.data !== '') {
            this.deactiveTransition('.container-card-grandson', 'container-card-grandson-active')
            this.grandsons = res.data
            setTimeout(() => {
              this.activeTransition('.container-card-grandson', 'container-card-grandson-active')
            }, 10)
          } else {
            this.$router.push('/')
          }
        })
        .catch((res) => {
          this.$router.push('/')
        })
    },
    activeTransition: function (selector, name, index) {
      if (window.$(selector).hasClass(name) === false) {
        window.$(selector).addClass(name)
      }
    },
    deactiveTransition: function (selector, name, index) {
      while (window.$(selector).hasClass(name) === true) {
        window.$(selector).removeClass(name)
      }
    },
    onMouseMove: function (event) {
      var Mouse = {
        X: event.pageX,
        Y: event.pageY
      }
      var elements = window.$('.container-card-children')
      if (window.$('.container-card-parent').length !== 0) {
        elements.push(window.$('.container-card-parent')[0])
      }
      var activateDarken = false
      for (var i = 0; i < elements.length; i++) {
        var rect = elements[i].getBoundingClientRect()
        if (this.isPointInRect(Mouse.X, Mouse.Y, rect.left, rect.top, rect.right - rect.left, rect.bottom - rect.top)) {
          this.activeTransition('.darken', 'darken-active')
          activateDarken = true
          if (elements[i].className.indexOf('container-card-children') !== -1) {
            if (this.curChild !== null) {
              if (this.curChild !== elements[i].dataset.index) {
                this.curChild = elements[i].dataset.index
                this.loadGrandson(elements[i].dataset.parent)
              }
            } else {
              this.curChild = elements[i].dataset.index
              this.loadGrandson(elements[i].dataset.parent)
            }
            for (var j = 0; j < this.zIndexChildren.length; j++) {
              this.zIndexChildren[j] = 0
            }
            this.zIndexChildren[this.curChild] = 100
          } else {
            this.zIndexParent = 100
          }
          break
        }
      }
      if (!activateDarken) {
        this.zIndexChildren[this.curChild] = 0
        this.zIndexParent = 0
        this.curChild = null
        this.deactiveTransition('.darken', 'darken-active')
        this.deactiveTransition('.container-card-grandson', 'container-card-grandson-active')
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
  .show {
    background-color: #313234;
    padding-top: 3rem;
    display: block;
    height:100%;
    position: fixed;
  }
  .container-card-children {
    position: relative;
    margin-bottom: 1rem;
    transition: left .25s;
    left: 0%;
  }
  .link-container-card-children {
    text-decoration: none;
  }
  .container-card-children:hover {
    left: -20%;
  }
  .container-card-parent {
    position:absolute;
    width: 150%;
    left: -50%;
    transition: left .25s;
  }
  .container-card-grandson {
    position:absolute;
    width: 120%;
    right: -120%;
    transition: right .25s;
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
  .container-card-grandson-active {
    right: 5%;
  }
  .container-card-parent:hover {
    left: 5%;
  }
</style>
