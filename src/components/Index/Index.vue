<template>
  <div class="index">
    <nav-bar :title="arr[shift]" :avatar="userInfo.avatar" rightIcon="add" @sidebar="open = !open" @rightClick="add"/>
    <!-- 路由部分 -->
    <router-view class="middle"/>
    <!-- 底部导航栏 -->
    <mu-bottom-nav :value.sync="shift">
      <mu-bottom-nav-item tag="div" to="Message" value="Message" title="消息" icon="chat_bubble" replace/>
      <mu-bottom-nav-item tag="div" to="Contact" value="Contact" title="联系人" icon="person" replace/>
      <mu-bottom-nav-item tag="div" to="Dynamic" value="Dynamic" title="动态" icon="star" replace/>
    </mu-bottom-nav>
    <!-- 侧边栏 -->
    <mu-drawer :open.sync="open" :docked="false" width="80%">
      <div class="top">
        <div class="avatar">
          <mu-avatar size="65" @click="personIndex">
            <img :src="userInfo.avatar">
          </mu-avatar>
          <span class="nickname" style="margin-left: 10px;">{{userInfo.nickName}}</span>
        </div>
        <br>
        <div class="signature">不忘初心，砥砺前行</div>
      </div>
      <!-- 侧边栏下部分 -->
      <br>
      <mu-list>
        <mu-list-item button>
          <mu-list-item-action>
            <mu-icon value="account_balance_wallet"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>电子钱包</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-action>
            <mu-icon value="bookmark_border"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>收藏</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-action>
            <mu-icon value="folder_open"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>文件</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-action>
            <mu-icon value="photo"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>相册</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-action>
            <mu-icon value="color_lens"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>个性装扮</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="exit">
          <mu-list-item-action>
            <mu-icon value="exit_to_app"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>切换账号</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data () {
    return {
      arr: {
        'Message': '消息',
        'Contact': '联系人',
        'Dynamic': '动态'
      },
      shift: this.$route.name,
      open: false,
      userInfo: this.$store.state.userInfo,
      websocket: this.$store.state.websocket
    }
  },
  methods: {
    personIndex () {
      this.$store.commit('setPersonIndex', this.userInfo)
      this.$router.push({
        name: 'PersonIndex'
      })
    },
    add () {
      this.$router.push({
        name: 'Add'
      })
    },
    exit () {
      this.websocket.close()
      this.websocket.onclose = () => {
        this.$router.replace({name: 'Login'})
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '~static/less/init';

.index {
  height: 100vh;
  .mu-bottom-nav {
    bottom: 0;
    border-top:2px solid #F1F4F3;
    width: 100vw;
  }
  .middle {
    /*顶部导航栏2.5rem,底部导航栏56px*/
    height: calc(100% - 2.5rem - 56px);
    overflow: scroll;
  }
  .mu-drawer{
    background: url(~static/images/sidebar.jpg) no-repeat center/cover;
    .top {
      height: 25vh;
      padding: 0 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      font-size: 16px;
      .avatar {
        display: flex;
        align-items: center;
        .nickname {
          font-size: @_20;
        }
      }
      .signature {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        max-width: 100%;
      }
    }
  }
}
</style>
