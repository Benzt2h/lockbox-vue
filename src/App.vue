<template>
  <v-app>
    <v-app-bar app color="grey darken-3" light>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'home' }" class="text-link">
        <div class="d-flex align-center white--text">
          LockBox with Vue.js
        </div>
      </router-link>
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

<style scoped>
.text-link {
  text-decoration: none;
}
</style>
