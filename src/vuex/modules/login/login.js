import * as types from '../../mutation-types/login'

const state = {
  telNub:'',
  code:''
}

const getters = {

}

//action
const actions = {
  [types.GO_LOGIN] ({state, rootState}, {Vue, telNub, code}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.loginUrl,
      body: {
        telNub,
        code
      }
    }).then((data) => {
      if (data.status ===rootState.ok) {
        Vue.$router.push('reviewType');
      } else {
        alert('get out');
      }
    });
  },
  [types.GET_CODE] ({state,rootState}, {Vue, telNub}) {
    Vue.$store.dispatch('axios/act/HTTP',{
      Vue,
      url:rootState.getCodeUrl,
      body: {
        telNub
      }
    }).then((data) => {
      if (data.status ===rootState.ok) {
        Vue.codeErr = false;
        Vue.countDown();
      } else {
        alert('get out');
      }
    })
  }
}

const mutations = {

}
export default {
  state,
  getters,
  actions,
  mutations
}