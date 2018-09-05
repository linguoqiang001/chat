<template>
  <div class="confirm-add">
    <nav-bar leftText="取消" rightText="发送" title="添加好友" textColor="white" @rightClick="send"/>
    <div class="top">
      <mu-avatar size="40">
        <img :src="personIndex.avatar">
      </mu-avatar>
      <div class="info">
        <p>{{personIndex.nickName}}</p>
        <span>女 上海</span>
      </div>
    </div>
    <div class="middle">
      <p>填写验证信息</p>
      <textarea></textarea>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ConfirmAdd',
  data () {
    return {
      personIndex: this.$store.state.personIndex,
      websocket: this.$store.state.websocket,
      userInfo: this.$store.state.userInfo
    }
  },
  methods: {
    ...mapMutations(['addFriend']),
    send () {
      this.$axios.get('friend/addFriend', {
        params: {
          friendId: this.personIndex.userId,
          userId: this.userInfo.userId
        }
      }).then(res => {
        if (res.data === 1) {
          this.$router.back()
          this.sendAddInfo()
        } else {
          alert('添加失败')
        }
      })
    },
    sendAddInfo () {
      if (this.websocket.readyState === this.websocket.OPEN) {
        let addInfo = {
          acceptId: this.personIndex.userId,
          sendId: this.userInfo.userId,
          time: new Date().getHours() + ':' + new Date().getMinutes(),
          sendType: 1
        }
        this.websocket.send(JSON.stringify(addInfo))
      } else {
        alert('请求错误')
      }
    }
  }
}
</script>
<style lang="less">
@import '~static/less/init';

.confirm-add {
  .top {
    display: flex;
    align-items: center;
    padding: @_20 @_10;
    .info {
      margin-left: @_10;
      p {
        font-size: @_16;
        margin-bottom: @_5;
      }
      span {
        color: #BDBDBD;
      }
    }
  }
  .middle {
    p {
      padding: 0 @_10;
      color: #BDBDBD;
      font-size: @_12;
    }
    textarea {
      width: 100%;
      height: @_70;
      border-top: 1px solid #F0F1F2;
      border-bottom: 1px solid #F0F1F2;
      margin-top: @_10;
      resize: none;
      padding: @_10 @_10;
    }
  }
}
</style>
