<template>
  <b-modal :id="modalId"
           ref="enableTwoFaModal"
           size="lg"
           title="Enable 2FA"
           cancel-variant="outline-primary"
           @change="generateSecret"
           @ok="enableTwoFa">
    <p v-if="error" class="text-danger">
      Something went wrong. Please contact support.
    </p>
    <template v-if="secret">
      <img :src="imageUrl" class="qr-code"><br>
      <small>Scan this on a mobile 2FA app that supports QR codes.</small>
      <br>
      <br>
      <p class="text-bold">
        Please keep this secret somewheres very safe as you will need it for recovery purposes:
      </p>
      <p class="text-danger">{{ secret }}</p>
      <div class="text-center">
        <input id="twofa-code"
               class="form-control"
               v-model="code"
               name="code"
               type="number"
               placeholder="2fa code"
               autocomplete="off"
               :maxlength="6"
               @input="checkCode"
               @keydown="preventExtraInput">
        <br>
        <br>
        <p class="text-danger">
          {{ errors.first('code') }}
        </p>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { enableTwoFa, generateTwoFaSecret, errorCodes } from '@/api';

const keyCodeIsNumber = evt => ((evt.keyCode >= 48 && evt.keyCode <= 57)
  || (evt.keyCode >= 96 && evt.keyCode <= 109));
export default {
  data() {
    return {
      error: false,
      secret: '',
      imageUrl: '',
      code: null,
    };
  },
  props: {
    modalId: {
      type: String,
      required: true,
    },
  },
  methods: {
    preventExtraInput(evt) {
      if (this.code && this.code.length >= 6 && keyCodeIsNumber(evt)) {
        evt.preventDefault();
      }
    },
    checkCode() {
      if (this.code.length === 6) {
        this.enableTwoFa();
      } else {
        this.errors.clear();
      }
    },
    async generateSecret(visible) {
      if (visible) {
        const response = await generateTwoFaSecret();
        if (response.status === 200) {
          this.imageUrl = response.data.url;
          this.secret = response.data.secret;
        }
      } else {
        this.imageUrl = '';
        this.secret = '';
        this.code = '';
        this.$validator.reset();
      }
    },
    async enableTwoFa(bvEvt) {
      if (bvEvt) {
        bvEvt.preventDefault();
      }
      const valid = await this.$validator.validateAll();
      if (valid) {
        const response = await enableTwoFa(this.secret, this.code);
        if (response.data.code === errorCodes.INVALID_2FA) {
          this.errors.add('code', 'Invalid 2fa code');
        }

        if (response.data.code === errorCodes.TWOFA_ALREADY_ENABLED) {
          this.$refs.modal.hide();
        }

        if (response.status === 200) {
          this.secret = '';
          this.code = null;
          this.$validator.reset();
          this.$refs.enableTwoFaModal.hide();
          this.flash('success', 'Two factor authentication enabled');
          this.$emit('2faEnabled');
        } else {
          this.error = true;
        }
      }
    },
  },
};
</script>
<style scoped>
.qr-code {
  width: 320px;
}
#twofa-code {
  width: 100px;
  display:inline-block;
  text-align:center;
}
::-webkit-input-placeholder {
   text-align: center;
}

:-moz-placeholder { /* Firefox 18- */
   text-align: center;
}

::-moz-placeholder {  /* Firefox 19+ */
   text-align: center;
}

:-ms-input-placeholder {
   text-align: center;
}
</style>
