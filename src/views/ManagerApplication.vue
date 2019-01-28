<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 text-left mb-5">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-primary mb-4">
              Fund Manager Application
            </h2>
            <fund-manager-application-form />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <img src="../assets/images/logo-blue.png"/>
        <br/>
        <br/>
        <div class="brand-icons mb-3">
          <a href="https://twitter.com/TheSentriex">
            <icon name="brands/twitter" scale="2.5" color="#1da1f2"/>
          </a>
          <a href="https://discord.gg/tSrm67c">
            <icon name="brands/discord" scale="2.5" color="#7289da"/>
          </a>
          <a href="https://t.me/Sentriex">
            <icon name="brands/telegram" scale="2.5" color="#0088cc"/>
          </a>
        </div>
        <p>
          Email: <a href="mailto:contact@sentriex.com">contact@sentriex.com</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import FundManagerApplicationForm from '@/components/FundManagerApplicationForm.vue';

export default {
  components: {
    FundManagerApplicationForm,
  },
};
</script>
<style>
.brand-icons {
  max-width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
</style>
