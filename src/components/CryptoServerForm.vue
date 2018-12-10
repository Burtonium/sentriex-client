<template>
  <form>
    <div class="form-group">
      <span>Server Status: </span>
      <span class="text-danger">Offline</span>
    </div>
    <div class="form-group">
      <span>Controls: </span>
      <b-btn variant="outline-primary" disabled>Sync Addresses</b-btn>
      <p class="text-warning"><small>*Not yet implemented</small></p>
    </div>
    <div class="form-group">
      <label for="hostInput">Host</label>
      <input id="hostInput" class="form-control" v-model="cryptoServer.host" type="text" />
    </div>
    <div class="form-group">
      <label for="portInput">Port</label>
      <input id="portInput" class="form-control" v-model="cryptoServer.port"/>
    </div>
    <div class="buttons">
      <b-btn variant="primary" disabled>Save</b-btn>
    </div>
    <p class="text-warning"><small>*Not yet implemented</small></p>
  </form>
</template>
<script>
export default {
  data() {
    return {
      cryptoServer: {
        host: '127.0.0.1',
        port: 8332,
      },
    };
  },
};
</script>
