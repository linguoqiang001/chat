<template>
  <div class="wrap" ref="wrap">
    <nav-bar :title="friend.nickName" leftIcon="navigate_before" rightIcon="person" @rightClick="friendIndex"/>
    <div class="content" ref="content">
      <div class="chat-wrap" v-for="(item,index) in chatRecord" :key="index">
        <single-record :item="item"></single-record>
      </div>
      <p ref="end" style="margin:0;"></p>
    </div>
    <div class="footer" ref="footer">
      <div class="footer-top">
        <input type="text" v-model="value" ref="input">
        <button :class="[send, isEmpty]" @click="sendMessage">发送</button>
      </div>
      <div class="footer-bottom">
        <mu-icon value="mic"></mu-icon>
        <mu-icon value="image"></mu-icon>
        <mu-icon value="camera_alt"></mu-icon>
        <mu-icon value="add_circle_outline"></mu-icon>
        <mu-icon value="videocam"></mu-icon>
        <mu-icon value="mood"></mu-icon>
      </div>
    </div>
  </div>
</template>
<script>
import SingleRecord from './SingleRecord'
import { mapMutations } from 'vuex'

export default {
  name: 'Dialogue',
  components: {
    'single-record': SingleRecord
  },
  data () {
    return {
      send: 'send',
      isEmpty: 'empty',
      value: '',
      userInfo: this.$store.state.userInfo,
      friendId: this.$route.query.friendId,
      websocket: this.$store.state.websocket
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.$refs.end.scrollIntoView(true)
    })
  },
  computed: {
    friend () {
      // 这边通过message页面跳过来this.friendId是Number，但在PersonIndex页面返回又是String类型,因为我判断相等时用 === 所以要强转
      return this.$store.getters.getFriendById(Number(this.friendId))
    },
    chatRecord () {
      // 获取历史聊天记录
      this.$nextTick(function () {
        this.$refs.end.scrollIntoView(true)
      })
      return this.$store.getters.getChatRecordById(Number(this.friendId))
    }
  },
  watch: {
    // 监听输入框是否有值改变input样式
    value (n, o) {
      this.isEmpty = n === '' ? 'empty' : ''
    }
  },
  methods: {
    // 发送消息
    ...mapMutations(['addChatRecord', 'addMessage', 'setPersonIndex']),
    sendMessage () {
      if (this.value !== '') {
        if (this.websocket.readyState === this.websocket.OPEN) {
          let date = new Date()
          let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
          let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
          let chatRecord = {
            friendId: this.friendId,
            singleRecord: {
              userId: this.userInfo.userId,
              message: this.value,
              img: this.userInfo.avatar,
              time: hour + ':' + minute
            }
          }
          this.addChatRecord(chatRecord)
          this.addMessage(this.friendId)
          // 将要发送的信息、发送人id及接收人id封装成json，用JSON.stringify()转为字符串发给后台
          let m = {
            acceptId: this.friendId,
            sendId: this.userInfo.userId,
            message: this.value,
            time: hour + ':' + minute,
            // 0代表聊天内容,接受到会按聊天内容对象进行封装
            sendType: 0
          }
          this.value = ''
          // 发送消息时自动定位到最底部
          this.$nextTick(function () {
            this.$refs.end.scrollIntoView(true)
          })
          // 发送完成输入框获取焦点
          this.$refs.input.focus()
          // 调用后台handleTextMessage方法
          this.websocket.send(JSON.stringify(m))
          console.log('发送成功!')
        } else {
          console.log('连接失败!')
        }
      }
    },
    // 个人主页
    friendIndex () {
      let friend = this.$store.getters.getFriendById(Number(this.friendId))
      this.setPersonIndex(friend)
      this.$router.push({
        name: 'PersonIndex'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~static/less/init';

.wrap {
  width: 100vw;
  height: 100vh;
  background: #F1F2F7;
}
.content {
  box-sizing:border-box;
  background:#F1F2F7;
  padding: 0 @_10 @_10 @_10;
  overflow: scroll;
  height: calc(~"100% - 6rem");
}
.footer {
  position: fixed;
  bottom: 0;
  background:#F1F2F7;
  width: 100%;
  height: @_70;
  .footer-top {
    display: flex;
    justify-content: space-around;
    align-items: center;
    input {
      width: 75vw;
      height: @_30;
      border-radius: 5px;
      border: none;
      outline:none;
    }
    .send {
      width: 20vw;
      border:none;
      height: @_30;
      background: #2196F3;
      color: white;
      padding: @_7 @_2;
      margin-left: @_1;
      border-radius: 5px;
      outline: none;
    }
    .empty{
      background: #DDDEE2;
    }
  }
  .footer-bottom {
    display: flex;
    justify-content: space-around;
    .mu-icon{
      padding: @_5;
    }
  }
}
</style>
