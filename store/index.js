import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      sessionId: '',
    };
  },
  mutations: {
    setSessionId(state, sessionId) {
      state.sessionId = sessionId;
    },
  },
  actions: {
    updateSessionId({ commit }, sessionId) {
      commit('setSessionId', sessionId);
    },
  },
  getters: {
    sessionId: (state) => state.sessionId,
  },
});

export default store;
