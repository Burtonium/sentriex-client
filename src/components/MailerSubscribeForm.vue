<template>
  <div>
  <section class="subscription">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7 col-sm-9 col-xs-12 subscription-form">
          <template v-if="loading">
            <icon name="spinner" :spin="true" color="#ddd" scale="2" />
          </template>
          <template v-else-if="success">
            <h2>
              {{ $t('homepage.subscriptionThanks') }}
            </h2>
          </template>
          <template v-else>
            <h2>
              {{ $t('homepage.subscriptionTitle') }}
            </h2>
            <form @submit.prevent="subscribeToMailer">
              <div class="form-group">
                <input type="email" :placeholder="$t('homepage.emailPlaceholder')" v-model="email" required/>
                <button type="submit"> <img src="../assets/images/send.png" alt="" /></button>
              </div>
            </form>
          </template>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>
<script>
import Spinner from '@/components/Spinner.vue';
import { subscribe } from '@/api';

export default {
  components: {
    Spinner,
  },
  data() {
    return {
      loading: false,
      error: false,
      success: false,
      email: '',
    };
  },
  methods: {
    async subscribeToMailer() {
      this.loading = true;
      await subscribe(this.email).finally(() => { this.loading = false; });
      this.success = true;
    }
  }
}
</script>
<style lang="scss" scoped>
/*subscription portion style*/
.subscription {
  width:100%;
  min-height:300px;
  padding:100px 0px;
  background:url("../assets/images/subscription-bg.png");
  background-size:auto;
  background-position:center center;
  background-repeat:no-repeat;
  position:relative;
}

.subscription:before{
  content:"";
  width:100%;
  height:100%;
  position:absolute;
  top:0;
  left:0;
  background:map-get($theme-colors, primary);
  opacity:.8;
  z-index:1;
}
.subscription-form {
  position:absolute;
  z-index:9;
  top:25%;
}
.subscription h2 {
  font-size:1.5rem;
  color:#ffffff;
  text-align:center;
  padding-bottom:20px;
  text-transform:uppercase;
}
.form-group {
  position:relative;
}

.subscription-form input {
  width:100%;
  height:45px;
  border-radius:30px;
  background:#ffffff;
  border:1px solid #f7f7f7;
  padding:0px 20px;
  color:#666666;
}
.subscription-form button {
  background:transparent;
  position:absolute;
  top:9px;
  right:30px;
  border:none;
}
</style>
