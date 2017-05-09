import * as types from '../../mutation-types/redPackets'

const state = {
  objID:''
}

const getters = {

}

//action
const actions = {
  [types.GET_REDPACKET] ({state, rootState}, {Vue, objID}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.getRedPacket,
      body: {
        objID
      }
    }).then((data) => {
      if (data.status ===rootState.ok) {
        alert("红包已发送成功,请在公众号消息内领取")
      } else {
        if (data.data==0) {
          alert(data.msg);
        }else if (data.data==1) {}{
          alert('您已领取过,请查收');
          Vue.$router.push("/reviewType");
        }
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