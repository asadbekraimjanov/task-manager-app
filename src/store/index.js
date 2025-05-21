import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    userData: null,
    accessToken: null,
  },
  getters: {
    getUserData(state) {
      return state.userData
    },
    accessToken(state) {
      return state.accessToken
    }
  },
  mutations: {
    setUserData(state, payload) {
      state.userData = payload
    },
    setToken(state, payload) {
      state.accessToken = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
