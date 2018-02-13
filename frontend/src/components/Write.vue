<template>
  <div class="container-write">
    <Header
      @authorized="(id) => user_id = id"
    />
    <div class="write container-fluid">
      <canvas id="canvas"></canvas>
      <div class="row">
        <div class="col-2">
          <router-link class="link-container-card-parent" v-if="card_parent" :to="{ name: 'Show', params: { id: card_parent._id}}">
            <div class="container-card-parent row justify-content-center">
              <CardParent
                :card="card_parent"
              />
            </div>
          </router-link>
          <div class="darken"></div>
        </div>
        <div class="col-5">
          <div class="container-card-main row justify-content-center">
            <CardWrite
              :card_parent="card_parent"
              :user_id="user_id"
            />
          </div>
        </div>
        <div class="container-children col-3">
          <div class="container-card-children row justify-content-center">
          </div>
        </div>
        <div class="col-2">
          <div class="container-card-grandson row justify-content-center">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from './Header'
import CardParent from './CardParent'
import CardWrite from './CardWrite'
export default {
  name: 'Write',
  components: {
    Header,
    CardParent,
    CardWrite
  },
  data () {
    return {
      user_id: '',
      card_parent: null,
      parentRect: null,
      selfRect: null,
      drawing: false
    }
  },
  beforeCreate () {
    this.card_parent = null
    if (this.$route.params.id !== 'new') {
      this.$http.get(`/api/cards/${this.$route.params.id}`)
        .then((res) => {
          if (res.data !== '') {
            this.card_parent = res.data
          } else {
            this.card_parent = null
          }
        })
        .catch((res) => {
          this.card_parent = null
        })
    }
  },
  beforeRouteUpdate () {
    this.card_parent = null
    if (this.$route.params.id !== 'new') {
      this.$http.get(`/api/cards/${this.$route.params.id}`)
        .then((res) => {
          if (res.data !== '') {
            this.card_parent = res.data
          } else {
            this.card_parent = null
          }
        })
        .catch((res) => {
          this.card_parent = null
        })
    }
  },
  methods: {
    draw: function () {
      var canvas = window.$('#canvas')[0]
      var ctx = canvas !== undefined ? canvas.getContext('2d') : null
      if (ctx) {
        var headerTop = window.$('container-header')[0] !== undefined ? window.$('container-header')[0].getBoundingClientRect().top : 56
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
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
      }
      requestAnimationFrame(this.draw)
    }
  },
  updated () {
    if (!this.drawing || (this.parentRect === null && this.card_parent !== null)) {
      var parent = window.$('.card-parent')
      var self = window.$('.card-write')
      this.selfRect = self[0].getBoundingClientRect()
      if (parent.length > 0) {
        this.parentRect = parent[0].getBoundingClientRect()
      } else {
        this.parentRect = null
      }
      this.draw()
      this.drawing = true
    }
  }
}
</script>
<style scoped>
  .write {
    background-color: #313234;
    padding-top: 3rem;
    display: block;
    height:100%;
    position: fixed;
  }
  .container-card-children {
    margin-bottom: 1rem;
  }
  .container-card-parent {
    position:absolute;
    width: 150%;
    left: -50%;
    z-index: 100;
    transition: left .25s
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
  .container-card-parent:hover {
    left: 5%;
  }
  .link-container-card-parent:hover + .darken {
    background-color: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  #canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
