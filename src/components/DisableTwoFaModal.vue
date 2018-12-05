<template>
  <b-modal :id="modalId"
           ref="disableTwoFaModal"
           size="lg"
           title="Disable 2FA"
           cancel-variant="outline-primary"
           ok-variant="danger"
           @ok="disable2fa">
    <p v-if="error" class="text-danger">
      Something went wrong. Please contact support.
    </p>
    <p class="text-danger">
      <strong>Warning!</strong> Two factor authentication is a
      critical part of your account security.
    </p>
    <div class="text-center">
      <input id="twofa-code"
             class="form-control"
             v-model="code"
             name="code"
             type="number"
             placeholder="2fa code"
             autocomplete="off"
             :maxlength="6"
             @keydown="preventExtraInput">
      <br>
      <p class="text-danger">
        {{ errors.first('code') }}
      </p>
    </div>
    <template slot="modal-ok">
      Disable
    </template>
  </b-modal>
</template>
<script>
import { disableTwoFa, errorCodes } from '@/api';

const keyCodeIsNumber = evt => ((evt.keyCode >= 48 && evt.keyCode <= 57)
  || (evt.keyCode >= 96 && evt.keyCode <= 109));
export default {
  data() {
    return {
      error: false,
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
    async disable2fa(bvEvt) {
      if (bvEvt) {
        bvEvt.preventDefault();
      }
      const valid = await this.$validator.validateAll();
      if (valid) {
        const response = await disableTwoFa(this.code);
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
          this.$refs.disableTwoFaModal.hide();
          this.flash('warning', 'Two factor authentication disabled');
          this.$emit('2faDisabled');
        }
      }
    },
  },
};
</script>
<style scoped>
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
