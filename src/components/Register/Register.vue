<template>
  <div class="register">
    <nav-bar color="rgba(0,0,0,0)" leftIcon="keyboard_arrow_left" leftText="返回" textColor="rgba(255,255,255,.8)" style="position: fixed;width: 100%;z-index: 10"/>
    <!-- 错误提示框 -->
    <mu-snackbar position="top" :color="open.color" :open.sync="open.state">
      <mu-icon left :value="open.icon"></mu-icon>
      {{open.text}}
      <mu-icon value="close" slot="action" color="white" @click="open.state = false"></mu-icon>
    </mu-snackbar>
    <!-- 注册成功返回登录账号提示框 -->
    <mu-dialog title="注册成功" width="360" :open.sync="openDialog">
    请牢记你的登录账号:<span style="font-weight: bold;">{{this.userId}}</span>
      <mu-button slot="actions" flat color="primary" @click="closeDialog">关闭</mu-button>
    </mu-dialog>
    <transition name="input">
      <div v-if="show" class="content">
        <span>Register</span>
        <div class="input">
          <mu-text-field full-width placeholder="请输入昵称" v-model="nickName" /><br/>
          <mu-text-field full-width placeholder="请输入密码" v-model="password1" type="password"/><br/>
          <mu-text-field full-width placeholder="确认密码" v-model="password2" type="password"/><br/>
          <mu-button color="primary" full-width large @click="validate">注&nbsp;册</mu-button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data () {
    return {
      nickName: '',
      password1: '',
      password2: '',
      show: true,
      open: {
        state: false,
        color: 'error',
        text: '',
        icon: 'warning'
      },
      openDialog: false,
      userId: 0
    }
  },
  mounted () {
    this.show = true
  },
  methods: {
    validate () {
      if (this.nickName === '' || this.password1 === '' || this.password2 === '') {
        this.openSnackbar('不能为空')
      } else if (this.password1 !== this.password2) {
        this.openSnackbar('两次密码不同')
      } else {
        this.register()
      }
    },
    register () {
      // 随机给用户系统头像
      let index = parseInt(Math.random() * 7 + 1)
      this.$axios.get('user/register', {params: {
        nickName: this.nickName,
        password: this.password1,
        avatar: './static/images/avatar/avatar' + index + '.jpg'
      }}).then(res => {
        this.userId = res.data
        this.openDialog = true
      })
    },
    openSnackbar (text) {
      if (this.open.timer) {
        clearTimeout(this.open.timer)
      }
      this.open.text = text
      this.open.state = true
      this.open.timer = setTimeout(() => {
        this.open.state = false
      }, 1500)
    },
    closeDialog () {
      this.$router.replace({name: 'Login'})
    }
  }
}
</script>
<style lang="less">
@import '~static/less/init';

.register {
  background:url(~static/images/register.jpg) no-repeat center/cover;
  height: 100vh;
  width: 100vw;
  padding-top: 1px;
  .content{
    padding:1px @_20 0 @_20;
    margin-top: @_80;
      span {
        font-size: @_25;
        color: white;
        font-family: SimSun;
        font-weight: bold;
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
}
.input-enter-active, .input-leave-active {
  transition: all .5s;
}
.input-enter, .input-leave-to {
  transform: translateY(@_200);
  opacity: 0;
}
</style>
