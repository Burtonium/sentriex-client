<template>
  <div class="container mb-5 text-left">
    <h2 class="text-primary">
      Investment Funds
    </h2>
    <p>
      We offer a variety of investment funds and products for the varying goals
      and risk tolerances of our users.  All of our services and products are
      currently based in BTC and we will launch USD and ETH based services shortly.
    </p>
    <p>
      Questions or comments: <a href="mailto:funds@sentriex.com">funds@sentriex.com</a>
    </p>
    <p>
      All of our funds are internally audited and our trade histories and transaction
      histories meticulously recorded. Periodically, we will have external audits
      conducted and open to external audits as requested by our users.
    </p>
    <p>
      Questions or comments: <a href="mailto:audits@sentriex.com">audits@sentriex.com</a>
    </p>
    <p>
      Additionally we are open to bringing on new traders to participate with the creation
      of new funds. If you are interested, please <router-link :to="'/manager-application'">
      apply</router-link> and we'll get in touch if you qualify.
    </p>
    <p class="text-center m-5">
      <b-btn variant="primary" :to="'/investment-funds'" size="lg">View Investment Funds</b-btn>
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
