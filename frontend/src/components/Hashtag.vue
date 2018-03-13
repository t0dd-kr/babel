<template lang="html">
  <div v-if="hashtag" class="container-hashtag" :style="{zIndex: zIndex}">
    <div class="row justify-content-center align-items-center">
      <div class="col">
        <div class="hashtag row">
          <div class="hashtag-value col">
            #{{ hashtag.hashtag }}
          </div>
          <div class="hashtag-count col-3">
            {{ hashtag.count }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hashtag',
  props: {
    hashtag: Object,
    zIndex: Number
  }
}
</script>

<style scoped>
  .container-hashtag {
    font-size: .75rem;
    display: block;
    width: 80%;
    color: black;
  }
  .hashtag {
    margin: 0;
    background-color: #FFFFFF;
    padding: .5rem 0rem .5rem 0rem;
    max-width: 100%;
    border-radius: .4rem .4rem .4rem .4rem;
  }
  .hashtag-value {
    text-align: center;
    font-size: 2.5rem;
  }
  .hashtag-count {
    border-left: #DDDDDD solid 1px;
    padding: .25rem;
    text-align: center;
    font-size: 2rem;
  }
</style>
