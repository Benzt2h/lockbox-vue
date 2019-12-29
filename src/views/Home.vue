<template>
  <v-container fluid class="home">
    <v-row align="center" justify="center" class="mb-5 mt-5">
      <router-link :to="{ name: 'about' }" class="text-center">
        ราคาและวิธีใช้งาน
      </router-link>
    </v-row>
    <v-row align="center" justify="center">
      <v-col v-for="locker in lockerM" :key="locker.id" cols="2">
        <v-btn
          v-if="locker.start == null"
          block
          outlined
          color="info"
          router
          :to="{ name: 'lockerdeposit', params: { id: locker.id } }"
        >
          {{ locker.size }}
        </v-btn>
        <v-btn
          v-else
          block
          outlined
          color="error"
          router
          :to="{ name: 'lockerwithdraw', params: { id: locker.id } }"
        >
          {{ locker.size }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col v-for="locker in lockerL" :key="locker.id" cols="3">
        <v-btn
          height="150"
          v-if="locker.start == null"
          block
          outlined
          color="info"
          router
          :to="{ name: 'lockerdeposit', params: { id: locker.id } }"
        >
          {{ locker.size }}
        </v-btn>
        <v-btn
          height="150"
          v-else
          block
          outlined
          color="error"
          router
          :to="{ name: 'lockerwithdraw', params: { id: locker.id } }"
        >
          {{ locker.size }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col v-for="locker in lockerXL" :key="locker.id" cols="5">
        <v-btn
          height="200"
          v-if="locker.start == null"
          block
          outlined
          color="info"
          router
          :to="{ name: 'lockerdeposit', params: { id: locker.id } }"
        >
          {{ locker.size }}
        </v-btn>
        <v-btn
          height="200"
          v-else
          block
          outlined
          color="error"
          router
          :to="{ name: 'lockerwithdraw', params: { id: locker.id } }"
        >
          {{ locker.size }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";

export default {
  name: "Home",

  async created() {
    this.$store.dispatch("set_lockers");
  },

  computed: {
    ...mapState(["lockers"]),
    lockerM() {
      return this.lockers.filter(locker => {
        return locker.size == "M";
      });
    },
    lockerL() {
      return this.lockers.filter(locker => {
        return locker.size == "L";
      });
    },
    lockerXL() {
      return this.lockers.filter(locker => {
        return locker.size == "XL";
      });
    }
  }
};
</script>
