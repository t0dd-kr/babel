<template>
  <div class="container-show">
    <Header/>
    <div class="show container-fluid">
      <div class="row">
        <div class="col-2">
          <div class="container-card-parent row justify-content-center">
            <CardParent/>
          </div>
          <div class="darken"></div>
        </div>
        <div class="col-5">
          <div class="container-card-main row justify-content-center">
            <CardMain/>
          </div>
        </div>
        <div class="container-children col-3">
          <div class="container-card-children row justify-content-center" v-for="n in 10" v-bind:key="n">
            <CardChildren/>
          </div>
        </div>
        <div class="col-2">
          <div class="container-card-grandson row justify-content-center">
            <CardGrandson/>
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
    margin-bottom: 1rem;
  }
  .container-card-parent {
    position:absolute;
    width: 150%;
    left: -50%;
    z-index: 10;
    transition: left .25s
  }
  .darken {
    position:fixed;
    top: 0px;
    left: 0px;
    width: 0%;
    height: 0%;
    transition: background-color .25s;
  }
  .container-card-parent:hover {
    left: 5%;
  }
  .container-card-parent:hover + .darken{
    background-color: rgba(0,0,0,0.25);
    z-index: 9;
    width: 100%;
    height: 100%;
  }
</style>
