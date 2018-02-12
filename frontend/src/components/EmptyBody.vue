<template>
  <div class="container-empty">
    <div class="empty container-fluid">
      <div class="empty-body row justify-content-center align-items-center">
        <div class="text-empty col">
          Ooops, There is nothing here.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EmptyBody'
}
</script>
<style scoped>
  .empty {
    background-color: #313234;
    padding-top: 3rem;
    display: block;
    height:100%;
    position: fixed;
  }
  .empty-body {
    height: 80%;
  }
  .text-empty {
    text-align: center;
    font-size: 2rem;
    color: #404040;
  }
</style>
