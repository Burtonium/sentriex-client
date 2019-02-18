<template>
  <b-modal :id="modalId"
           ref="disableTwoFaModal"
           size="lg"
           :title="$t('twoFa.disableTitle')"
           cancel-variant="outline-primary"
           ok-variant="danger"
           @ok.prevent="disable2fa">
    <p v-if="error" class="text-danger">
      {{ $t('error.generalExtended') }}
    </p>
    <p class="text-danger">
      {{ $t('twoFa.disableWarning') }}
    </p>
    <div class="text-center">
      <input id="twofa-code"
             class="form-control"
             v-model="code"
             name="code"
             type="number"
             :placeholder="$t('twoFa.codePlaceholder')"
             autocomplete="off"
             maxlength="6">
      <br>
      <p class="text-danger">
        {{ errors.first('code') }}
      </p>
    </div>
    <template slot="modal-ok">
      {{ $t('general.disable') }}
    </template>
  </b-modal>
</template>
<script>
import { disableTwoFa, errorCodes } from '@/api';

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
    async disable2fa(bvEvt) {
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
