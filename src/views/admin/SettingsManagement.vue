<template>
  <div class="manage-settings">
    <b-tabs>
      <b-tab title="Fee Settings">
        <br>
        <admin-settings-form />
      </b-tab>
    </b-tabs>
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
