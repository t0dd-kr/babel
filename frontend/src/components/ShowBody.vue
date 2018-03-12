<template>
  <div class="container-show">
    <div class="show container-fluid">
      <canvas id="canvas"></canvas>
      <div v-if="card" class="row">
        <div class="col-2">
          <a class="link-container-card-parent" v-if="card.parent" :href="'/show/' + card.parent._id">
            <div class="container-card-parent row justify-content-center">
              <CardParent
                :card="card.parent"
                :zIndex="zIndexParent"
              />
            </div>
          </a>
          <div class="darken"></div>
        </div>
        <div class="col-5">
          <div class="container-card-main row justify-content-center">
            <CardMain
              :card="card"
              :authorized="user_id !== ''"
            />
          </div>
        </div>
        <div class="container-children col-3">
          <a v-for="(child, index) in card.children" :key="child._id" v-if="child" :href="'/show/' + child._id" class="link-container-card-children">
            <div class="container-card-children row justify-content-center" :data-index="index" :data-parent="child._id">
              <CardChildren
                :card="child"
                :zIndex="zIndexChildren[index]"
              />
            </div>
          </a>
        </div>
        <div class="col-2">
          <div class="container-card-grandson row justify-content-center" v-for="grandson in grandsons" :key="grandson._id">
            <CardGrandson
              :card="grandson"
              :zIndex="100"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CardParent from './CardParent'
import CardMain from './CardMain'
import CardChildren from './CardChildren'
import CardGrandson from './CardGrandson'
export default {
  name: 'ShowBody',
  components: {
    CardParent,
    CardMain,
    CardChildren,
    CardGrandson
  },
  data () {
    return {
      grandsons: [],
      curChild: null,
      zIndexParent: 1,
      parentRect: null,
      childrenRect: [],
      grandsonsRect: [],
      selfRect: null,
      drawing: false
    }
  },
  props: {
    user_id: String,
    zIndexChildren: Array,
    card: Object
  },
  created () {
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
                this.grandsons = []
                this.curChild = elements[i].dataset.index
                this.loadGrandson(elements[i].dataset.parent)
              }
            } else {
              this.grandsons = []
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
    },
    draw: function () {
      var canvas = window.$('#canvas')[0]
      var ctx = canvas !== undefined ? canvas.getContext('2d') : null
      var children = window.$('.card-children')
      var parent = window.$('.card-parent')
      var self = window.$('.card-main')
      this.childrenRect = []
      this.selfRect = self[0].getBoundingClientRect()
      for (var i = 0; i < children.length; i++) {
        this.childrenRect.push(children[i].getBoundingClientRect())
      }
      if (parent.length > 0) {
        this.parentRect = parent[0].getBoundingClientRect()
      } else {
        this.parentRect = null
      }
      if (ctx) {
        var headerTop = window.$('container-header')[0] !== undefined ? window.$('container-header')[0].getBoundingClientRect().top : 56
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.strokeStyle = 'rgb(255,255,255)'
        ctx.lineWidth = 2
        if (this.parentRect !== null) {
          ctx.beginPath()
          ctx.moveTo(this.parentRect.right, -headerTop + (this.parentRect.top + this.parentRect.bottom) / 2)
          ctx.lineTo((this.parentRect.right + this.selfRect.left) / 2, -headerTop + (this.parentRect.top + this.parentRect.bottom) / 2)
          ctx.lineTo((this.parentRect.right + this.selfRect.left) / 2, -headerTop + (this.selfRect.top + this.selfRect.bottom) / 2)
          ctx.lineTo(this.selfRect.left, -headerTop + (this.selfRect.top + this.selfRect.bottom) / 2)
          ctx.stroke()
        }
        this.childrenRect.forEach((childRect) => {
          ctx.beginPath()
          ctx.moveTo(this.selfRect.right, -headerTop + (this.selfRect.top + this.selfRect.bottom) / 2)
          ctx.lineTo((this.selfRect.right + childRect.left) / 2, -headerTop + (this.selfRect.top + this.selfRect.bottom) / 2)
          ctx.lineTo((this.selfRect.right + childRect.left) / 2, -headerTop + (childRect.top + childRect.bottom) / 2)
          ctx.lineTo(childRect.left, -headerTop + (childRect.top + childRect.bottom) / 2)
          ctx.stroke()
        })
        var grandsons = window.$('.card-grandson')
        this.grandsonsRect = []
        for (var j = 0; j < grandsons.length; j++) {
          this.grandsonsRect.push(grandsons[j].getBoundingClientRect())
        }
        this.grandsonsRect.forEach((grandsonRect) => {
          if (this.curChild) {
            var childRect = window.$('.card-children')[this.curChild].getBoundingClientRect()
            ctx.beginPath()
            ctx.moveTo(childRect.right, -headerTop + (childRect.top + childRect.bottom) / 2)
            ctx.lineTo((childRect.right + grandsonRect.left) / 2, -headerTop + (childRect.top + childRect.bottom) / 2)
            ctx.lineTo((childRect.right + grandsonRect.left) / 2, -headerTop + (grandsonRect.top + grandsonRect.bottom) / 2)
            ctx.lineTo(grandsonRect.left, -headerTop + (grandsonRect.top + grandsonRect.bottom) / 2)
            ctx.stroke()
          }
        })
      }
      requestAnimationFrame(this.draw)
    }
  },
  updated () {
    if (!this.drawing) {
      this.draw()
      this.drawing = true
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
  #canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
