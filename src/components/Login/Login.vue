<template>
  <div class="login">
    <!-- 错误提示框 -->
    <mu-alert color="white" @delete="popup = false" delete v-if="popup" transition="mu-scale-transition">
      <mu-icon left value="warning"></mu-icon> {{errorMessage}}
    </mu-alert>
    <transition name="input">
      <div v-if="show">
        <div class="logo">
          <img src="~static/images/qq.png" class="qq">
          <img src="~static/images/QQ-font.png" class="qq-font">
        </div>
        <div class="input">
          <mu-text-field full-width placeholder="QQ号/手机号/邮箱" v-model="userId" /><br/>
          <mu-text-field full-width placeholder="密码" v-model="password" type="password"/><br/>
          <mu-button color="primary" full-width large @click="validate">登&nbsp;录</mu-button>
          <div class="forget">
            <span>忘记密码</span>
            <router-link :to="{name:'Register'}" style="color: #2196F3;">新用户注册</router-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      userId: '',
      password: '',
      show: false,
      popup: false,
      errorMessage: '',
      websocket: null
    }
  },
  mounted () {
    this.show = true
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setWebsocket', 'addMessage', 'addChatRecord', 'addFriend']),
    ...mapActions(['setFriends']),
    // 表单验证
    validate () {
      let reg = /^[0-9]*$/
      if (this.userId === '' || this.password === '') {
        this.popup = true
        this.errorMessage = '账号或密码不能为空'
      } else if (!reg.test(this.userId)) {
        this.popup = true
        this.errorMessage = '请输入正确的账号'
      } else {
        this.login()
      }
    },
    login () {
      this.$axios.get('user/login', {
        params: {
          userId: this.userId,
          password: this.password
        }
      }).then(
        res => {
          if (res.data === '') {
            this.popup = true
            this.errorMessage = '账号不存在或密码错误'
          } else {
            this.setUserInfo(res.data)
            this.setFriends(this).then(
              () => {
                this.webSocketConfig()
                this.$router.push({name: 'Message'})
              }
            )
          }
        }
      )
    },
    // webSocket配置
    webSocketConfig () {
      if ('WebSocket' in window) {
        this.websocket = new WebSocket('ws://47.95.210.82/chat/websocket/socketServer')
        this.setWebsocket(this.websocket)
      }
      // 接受服务器转发过来的消息
      this.websocket.onmessage = evt => {
        // 对象的sendType属性代表接受的是哪种类型
        // 0代表聊天消息，1代表加好友消息
        let messageInfo = JSON.parse(evt.data)
        if (messageInfo.sendType === 0) {
          let chatRecord = {
            friendId: messageInfo.sendId,
            singleRecord: {
              userId: messageInfo.sendId,
              message: messageInfo.message,
              img: this.$store.getters.getFriendById(messageInfo.sendId).avatar,
              time: messageInfo.time
            }
          }
          this.addChatRecord(chatRecord)
          // 将该好友添加到聊天队列中及将其放在队列前
          this.addMessage(messageInfo.sendId)
        } else {
          this.$axios.get('user/queryById', {params: {userId: messageInfo.sendId}})
            .then(res => {
              this.addFriend(res.data)
            })
        }
      }
    }
  },
  watch: {
    // 一定时间之后清除错误提示框
    popup (n, o) {
      if (n === true) {
        setTimeout(() => {
          this.popup = false
        }, 1500)
      }
    }
  }
}
</script>

<style lang="less">
@import '~static/less/init';

.login {
  background:url(~static/images/login.jpg) no-repeat center/cover;
  height: 100vh;
  width: 100vw;
  padding:1px @_20 0 @_20;
  .mu-alert{
    position: fixed;
    top:0;
    left:0;
    width: 100vw;
    border-radius: 0;
    padding: @_12 @_8;
    color: black;
    i {
      color: #2196F3;
    }
    svg{
      color: #CFCFCF;
    }
  }
  .logo {
    margin-top: @_50;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: @_25;
    color: #FFFFFF;
    .qq {
      width: @_35;
      height: @_40;
    }
    .qq-font {
      width: @_70;
      height: @_40;
    }
  }
  .input {
    margin-top:@_40;
    .mu-text-field-input {
      color: #2196F3;
      /*改变input的光标颜色*/
      text-shadow: 0px -4px 0px #EAFBFD;
      -webkit-text-fill-color: transparent;
      font-size: @_17;
    }
    .mu-input-line {
      background: #9AA6BC;
    }
    .mu-input-focus-line {
      background: rgba(0,0,0,0)
    }
    .mu-button .mu-button-wrapper {
      font-size: @_15;
    }
    .forget {
      display: flex;
      justify-content: space-between;
      margin-top: @_10;
      color: #2196F3;
    }
  }
}
.input-enter-active, .input-leave-active {
  transition: all .5s;
}
.input-enter, .input-leave-to {
  transform: translateY(@_200);
  opacity: 0;
}
</style>
