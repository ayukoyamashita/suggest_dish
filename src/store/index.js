import { createStore } from 'vuex'
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

const initialState = {
  dishes: []
}

const persistedStateOptions = {
  key: 'suggestDish'
}

export default createStore({
  state: initialState,
  mutations: {
    getDishes (state) {
      axios.get('https://script.google.com/a/macros/s-online.co.jp/s/AKfycbwvrRsYMUM52D3RCpa_OwobeAxDLtigaXcPWOucIn1rrgqTLFWsJrbofXBhGNrmnzicdQ/exec')
          .then((res) => {
            state.dishes = res.data;
          }).catch((e) => {
        alert(e);
      });
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState(persistedStateOptions)]
})
