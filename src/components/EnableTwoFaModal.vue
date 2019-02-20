<template>
  <b-modal :id="modalId"
           ref="enableTwoFaModal"
           size="lg"
           :title="$t('twoFa.enableTitle')"
           cancel-variant="outline-primary"
           @change="generateSecret"
           @ok.prevent="enableTwoFa">
    <p v-if="error" class="text-danger">
      {{ $t('error.generalExtended') }}
    </p>
    <template v-if="secret">
      <img :src="imageUrl" class="qr-code"><br>
      <small>{{ $t('twoFa.qrScanInstructions') }}</small>
      <br>
      <br>
      <p class="text-bold">
        {{ $t('twoFa.pleaseKeepSafe') }}:
      </p>
      <p class="text-danger">{{ secret }}</p>
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
        <br>
        <p class="text-danger">
          {{ errors.first('code') }}
        </p>
      </div>
    </template>
    <template slot="modal-ok">
      {{ $t('general.enable') }}
    </template>
    <template slot="modal-cancel">
      {{ $t('general.cancel') }}
    </template>
  </b-modal>
</template>
<script>
import { enableTwoFa, generateTwoFaSecret, errorCodes } from '@/api';

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
      const valid = await this.$validator.validateAll();
      if (valid) {
        const response = await enableTwoFa(this.secret, this.code);
        if (response.data.code === errorCodes.INVALID_2FA) {
          this.errors.add({
            field: 'code',
            msg: this.$t('twoFa.invalidCode'),
          });
        }

        if (response.data.code === errorCodes.TWOFA_ALREADY_ENABLED) {
          this.$refs.modal.hide();
        }

        if (response.status === 200) {
          this.secret = '';
          this.code = null;
          this.$validator.reset();
          this.$refs.enableTwoFaModal.hide();
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
</style>
