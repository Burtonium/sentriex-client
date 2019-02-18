<template>
  <div class="container mb-5 text-left">
    <div class="info-page" v-html="$t('investmentFundInfo')"></div>
    <p class="text-center m-5">
      <b-btn variant="primary" :to="'/investment-funds'" size="lg">
        {{ $t('funds.viewFunds') }}
      </b-btn>
    </p>
    <br>
    <p class="text-center m-2">
      <img src="../assets/images/logo-blue.png"/>
    </p>
  </div>
</template>
<style lang="scss" scoped>
strong {
  font-weight: 800;
}
h2 {
  color: map-get($theme-colors, primary);
  margin: 30px 0;
}

h4 {
  color: map-get($theme-colors, primary);
  margin: 25px 0;
}

p {
  line-height: 2;
  letter-spacing: 1px;
}
</style>
