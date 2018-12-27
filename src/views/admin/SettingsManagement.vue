<template>
  <div class="manage-settings">
    <div class="wrapper mt-5 pl-3 pr-3">
      <b-tabs>
        <b-tab title="Fee Settings">
          <br>
          <admin-settings-form />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import AdminSettingsForm from '@/components/AdminSettingsForm.vue';

export default {
  components: {
    AdminSettingsForm,
  },
};
</script>
