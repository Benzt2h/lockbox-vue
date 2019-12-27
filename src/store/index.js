import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lockers: []
  },
  mutations: {
    set_lockers: (state, lockers) => (state.lockers = lockers)
  },
  actions: {
    set_lockers({ commit }) {
      axios
        .get("https://us-central1-lockbox-api.cloudfunctions.net/lockBox")
        .then(res => commit("set_lockers", res.data));
    }
  },
  modules: {}
});
