<template>
  <div class="contact">
    <my-search placeholder="搜索" />
    <mu-list>
      <mu-list-item button :ripple="false">
        <mu-list-item-title>新朋友</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button :ripple="false">
        <mu-list-item-title>创建群聊</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
    </mu-list>
    <!-- 好友列表 -->
    <div class="contact-list">
      <mu-list toggle-nested>
        <mu-list-item :ripple="false" button nested :open="false">
          <mu-list-item-action>
            <mu-icon value="keyboard_arrow_right"/>
          </mu-list-item-action>
          <mu-list-item-title>特别关心</mu-list-item-title>
          <mu-list-item-action>
            0/0
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item  :ripple="false" button nested :open="false" @toggle-nested="change">
          <mu-list-item-action>
            <mu-icon :value="icon"/>
          </mu-list-item-action>
          <mu-list-item-title>我的好友</mu-list-item-title>
          <mu-list-item-action>
            {{list.length}}/{{list.length}}
          </mu-list-item-action>
          <mu-list-item button :ripple="false" slot="nested" avatar class="item" v-for="item in list" :key="item.userId" @click="dialogue(item.userId)">
            <mu-list-item-action class="img">
              <mu-avatar>
                <img :src="item.avatar">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-sub-title>
                <span style="color: rgba(0, 0, 0, 1)">{{item.nickName}}</span>
                <br/>
                [手机在线]
              </mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          </mu-list-item>
      </mu-list>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Contact',
  data () {
    return {
      icon: 'keyboard_arrow_right',
      list: this.$store.state.friends
    }
  },
  methods: {
    dialogue (friendId) {
      this.$router.push(
        {
          name: 'Dialogue',
          query: {friendId: friendId}
        }
      )
    },
    change (value) {
      this.icon = value === true ? 'keyboard_arrow_down' : 'keyboard_arrow_right'
    }
  }
}
</script>
<style lang="less">
@import '~static/less/init';
.contact{
  .mu-list {
    background: white;
    padding: 0;
    i {
      color: #D4D4D4;
    }
  }
  .contact-list {
    margin-top:@_8;
    .mu-item {
      padding: 0 @_10;
      margin-left:0 !important;
      .img {
        margin-left: @_5;
        margin-right: @_10;
      }
    }
    .mu-item-action {
      min-width: @_30;
    }
    .item {
      border-bottom: 1px solid #E0E0E0;
      height: calc(~"57px + 0.5rem");
      padding: @_5 0;
    }
  }
}
</style>
