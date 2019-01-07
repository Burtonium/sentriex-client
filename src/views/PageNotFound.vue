<template>
  <div>
    <div class="not-found">
      <div class="four-oh-four">
        <img class="travolta" src="../assets/images/404.gif">
        <div class="backdrop">
          404
        </div>
      </div>
      <h2>We're sorry, we couldn't find the page you were looking for.</h2>
    </div>
  </div>
</template>
<style scoped>
.four-oh-four {
  position:relative;
}
.backdrop {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  font-size: 500px;
  color: grey;
}
.travolta {
  position: relative;
  z-index: 10;
  margin-top: 200px;
  margin-bottom: 30px;
}
</style>
