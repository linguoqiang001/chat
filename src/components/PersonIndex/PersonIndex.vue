<template>
  <div class="person-index">
    <nav-bar color="rgba(0,0,0,0)" leftIcon="keyboard_arrow_left" leftText="返回" textColor="rgba(255,255,255,.8)" style="position: fixed;width: 100%;z-index: 10"/>
    <div class="top">
      <div class="praise">
        <mu-icon value="thumb_up" color="white"/>
        <p class="num">1001</p>
      </div>
      <div class="avatar">
        <!-- <img :src="personIndex.avatar" v-preview="personIndex.avatar"> -->
        <mu-avatar :size="80">
          <img :src="personIndex.avatar" v-preview="personIndex.avatar">
        </mu-avatar>
        <p class="nickname">{{personIndex.nickName}}</p>
        <p class="signature">不忘初心，砥砺前行</p>
      </div>
    </div>
    <!-- 个人信息中间列表部分 -->
    <mu-list>
      <mu-list-item button :ripple="false">
        <mu-list-item-action>
          <mu-icon value="person"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>{{personIndex.nickName}} ({{personIndex.userId}})</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button :ripple="false">
        <mu-list-item-action>
          <mu-icon value="location_on"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>男 20岁 重庆</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item button :ripple="false">
        <mu-list-item-action>
          <mu-icon value="phone"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>17720808331</mu-list-item-title>
      </mu-list-item>
    </mu-list>
    <!-- 底部 -->
    <div class="bottom">
      <mu-button color="white" textColor="black" large v-text="buttonText1" v-if="friend != undefined"/>
      <mu-button color="primary" large v-text="buttonText2" v-if="friend != undefined" @click="button2"/>
      <mu-button class="add" color="white" textColor="black" large v-if="friend == undefined" @click="add">加好友</mu-button>
    </div>
    <mu-snackbar position="top" :color="open.color" :open.sync="open.state">
      <mu-icon left :value="open.icon"></mu-icon>
      添加成功
      <mu-icon value="close" slot="action" color="white" @click="open.state = false"></mu-icon>
    </mu-snackbar>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: 'PersonIndex',
  data () {
    return {
      userInfo: this.$store.state.userInfo,
      personIndex: this.$store.state.personIndex,
      buttonText1: '',
      buttonText2: '',
      websocket: this.$store.state.websocket,
      open: {
        state: false,
        color: 'success',
        icon: 'check_circle'
      },
      from: ''
    }
  },
  mounted () {
    this.buttonText1 = this.userInfo.userId === this.personIndex.userId ? '个性名片' : 'QQ电话'
    this.buttonText2 = this.userInfo.userId === this.personIndex.userId ? '编辑资料' : '发消息'
  },
  computed: {
    // 判断当前主页信息是否是好友，如果是好友返回对象，如果是自己返回0，如果是陌生人返回undefined
    friend () {
      if (this.userInfo.userId !== this.personIndex.userId) {
        return this.$store.getters.getFriendById(this.personIndex.userId)
      }
      return 0
    },
    state () {
      return this.open.state
    }
  },
  methods: {
    ...mapMutations(['addFriend']),
    add () {
      this.$router.push({name: 'ConfirmAdd'})
    },
    button2 () {
      if (this.userInfo.userId !== this.personIndex.userId) {
        this.$router.replace({
          name: 'Dialogue',
          query: {friendId: this.personIndex.userId}
        })
      }
    }
  },
  watch: {
    state (n, o) {
      let that = this
      if (n === true) {
        setTimeout(() => {
          that.open.state = false
        }, 1000)
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    // 如果是添加完朋友回到该页面，出现添加成功的提示
    next(vm => {
      if (vm.friend === undefined && vm.friend !== 0 && from.path === '/ConfirmAdd') {
        vm.open.state = true
        vm.addFriend(vm.personIndex)
      }
    })
  }
}
</script>
<style lang="less">
@import '~static/less/init';

.person-index{
  height: 100vh;
  background: white;
  .top {
    height: 35vh;
    background: url(~static/images/personindex.png) no-repeat center/cover;
    position: relative;
    .praise {
      position: absolute;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,.3);
      padding: @_5 @_10;
      text-align: center;
      .num{
        font-size: @_11;
        color: white;
      }
    }
    .avatar {
      position: absolute;
      width: 100vw;
      top: calc(35vh - 55px);
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .nickname {
      text-align: center;
      margin-top: @_8;
      font-size: @_20;
    }
    .signature {
      margin-top: @_8;
      font-size: @_14;
      color: #B1B2B2;
    }
  }
  .mu-list {
    margin-top: @_70;
    .mu-item-action {
      min-width: @_40;
    }
  }
  .bottom {
    position: fixed;
    bottom: 0;
    width: 100vw;
    display: flex;
    justify-content: space-around;
    background: #F8F8F8;
    padding: @_5 0;
    button {
      min-width: 43vw;
      height: @_40;
    }
    .add {
      width: 95vw;
    }
  }
}
</style>
