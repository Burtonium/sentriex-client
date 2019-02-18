<template>
  <div class="not-found mb-5">
    <div class="four-oh-four">
      <img class="travolta" src="../assets/images/404.gif">
      <div class="backdrop">
        404
      </div>
    </div>
    <h2 class="mt-4">{{ $t('notFound') }}</h2>
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
