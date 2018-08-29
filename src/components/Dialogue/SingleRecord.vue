<template>
  <div class="single-record">
    <div :class="[item.userId == userInfo.userId ? 'right' : 'left','chat-record']">
      <img v-if="item.userId != userInfo.userId" :src="item.img" @click="personIndex(item.userId)"/>
      <span class="chat-record-text">{{item.message}}</span>
      <img v-if="item.userId == userInfo.userId" :src="item.img" @click="personIndex(item.userId)"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SingleRecord',
  props: ['item'],
  data () {
    return {
      userInfo: this.$store.state.userInfo
    }
  },
  methods: {
    personIndex (id) {
      if (id === this.userInfo.userId) {
        this.$store.commit('setPersonIndex', this.userInfo)
      } else {
        let friend = this.$store.getters.getFriendById(id)
        this.$store.commit('setPersonIndex', friend)
      }
      this.$router.push({
        name: 'PersonIndex'
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '~static/less/init';

.single-record{
  .left {
    justify-content: flex-start;
    span{
      color: black;
      background: white;
    }
  }
  .right {
    justify-content: flex-end;
    span{
      color: white;
      background: #2196F3;
    }
  }
  .chat-record {
    display: flex;
    align-items: center;
    margin-top: @_12;
    img {
      width: @_40;
      height: @_40;
      border-radius: @_25;
    }
    span {
      padding: @_10 @_15;
      border-radius: @_12;
      margin-left: @_5;
      margin-right: @_5;
      max-width:@_50*4.5;
      word-break: break-all;
    }
  }
}
</style>
