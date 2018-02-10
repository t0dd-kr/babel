<template>
  <div class="container-write">
    <Header/>
    <div class="write container-fluid">
      <div class="row">
        <div class="col-2">
          <div class="container-card-parent row justify-content-center">
            <CardParent/>
          </div>
          <div class="darken"></div>
        </div>
        <div class="col-5">
          <div class="container-card-main row justify-content-center">
            <CardWrite/>
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
    z-index: 10;
    transition: left .25s
  }
  .darken {
    position:fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: -1;
    transition: background-color .25s, z-index .25s;
  }
  .container-card-parent:hover {
    left: 5%;
  }
  .container-card-parent:hover + .darken{
    background-color: rgba(0,0,0,0.25);
    z-index: 9;
  }
</style>
