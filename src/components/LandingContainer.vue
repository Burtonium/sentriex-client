<template>
  <div class="landing-container">
    <div class="row">
      <div class="center-container col-md-6 col-sm-8 offset-md-3  offset-md-2">
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style>
.landing-container {
  text-align: center;
  padding: 120px 0;
}

.landing-logo {
  margin: 0 auto;
}
.center-container {
  max-width:720px;
  margin: 0 auto;
  transition: height 0.5s;
}
.center-container > div {
  margin-bottom: 70px;
}
</style>
