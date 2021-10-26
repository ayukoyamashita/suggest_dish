import { createStore } from 'vuex'
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

const initialState = {
  dishes: []
}

const persistedState = createPersistedState({
  key: 'suggest_dish',
});

export default createStore({
  state: initialState,
  mutations: {
    setDishes (state, data) {
      state.dishes = data
    }
  },
  actions: {
    async getDishesAction(context) {
      const data = await axios
          .get('https://script.google.com/a/macros/s-online.co.jp/s/AKfycbwvrRsYMUM52D3RCpa_OwobeAxDLtigaXcPWOucIn1rrgqTLFWsJrbofXBhGNrmnzicdQ/exec')
          .then((res) => res.data);
      context.commit('setDishes', data);
    }
  },
  modules: {
  },
  plugins: [persistedState]
})
