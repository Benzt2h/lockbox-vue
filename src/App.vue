<template>
  <v-app>
    <v-app-bar app color="grey darken-3" light>
      <v-spacer></v-spacer>
      <div class="d-flex align-center white--text">
        LockBox with Vue.js
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
