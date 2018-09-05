import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userInfo: {},
  friends: [],
  message: [],
  personIndex: {},
  websocket: null
}
const getters = {
  getFriendById: (state) => (id) => {
    return state.friends.find(friend => friend.userId === id)
  },
  getChatRecordById: (state) => (id) => {
    let friend = state.friends.find(friend => friend.userId === id)
    return friend === undefined ? undefined : friend.content
  }
}
const mutations = {
  setUserInfo (state, user) {
    state.userInfo = user
    state.message = []
  },
  setWebsocket (state, websocket) {
    state.websocket = websocket
  },
  setFriends (state, friends) {
    state.friends = []
    friends.forEach(value => {
      let friend = value.friend
      friend.content = value.content
      state.friends.push(friend)
    })
  },
  addFriend (state, friend) {
    // 后台返回的friend没有content属性，自己加上
    friend.content = []
    state.friends.push(friend)
  },
  addMessage (state, friendId) {
    let friend = state.friends.find(friend => friend.userId === friendId)
    let index = state.message.findIndex(message => message.userId === friendId)
    state.message.unshift(friend)
    // 如果聊天队列中已经有该用户了，还要将其删除
    if (index !== -1) {
      state.message.splice(index + 1, 1)
    }
  },
  deleteMessage (state, friendId) {
    let index = state.message.findIndex(message => message.friendId === friendId)
    state.message.splice(index, 1)
  },
  setPersonIndex (state, info) {
    state.personIndex = info
  },
  addChatRecord (state, chatRecord) {
    let friend = state.friends.find(friend => friend.userId === chatRecord.friendId)
    friend.content.push(chatRecord.singleRecord)
  }
}
const actions = {
  setFriends: async ({commit, state}, that) => {
    let friends = []
    await that.$axios.get('friend/list', {params: {userId: state.userInfo.userId}})
      .then(res => {
        friends = res.data
      })
    commit('setFriends', friends)
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
