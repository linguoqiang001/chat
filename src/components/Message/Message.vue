<template>
  <div class="message">
    <div class="cover" ref="cover" @touchend="cancelCover"/>
    <my-search placeholder="搜索" />
    <mu-list>
      <div @touchend="touchend(item.userId)" @touchstart="touchstart(index)" v-for="(item,index) in list" :key="item.userId" :class="[longTouch[index] == true ? 'longTouch' : '']">
        <!-- 长按删除框，实现方法很挫，有空改进吧 -->
        <div v-show="longTouch[index]" :class="['delete', index == list.length-1 ? 'top':'bottom']" @touchend.stop="delMessage(item.userId)">删除该聊天</div>
        <mu-list-item avatar button>
          <mu-list-item-action>
            <mu-avatar size="40">
              <img :src="item.avatar">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-sub-title>
              <span style="color: rgba(0, 0, 0, .9)">{{item.nickName}}</span><br>
              {{item.lastRecord.message}}
            </mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-list-item-sub-title>{{item.lastRecord.time}}</mu-list-item-sub-title>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
      </div>
    </mu-list>
    <div class="noMessage" v-show="list.length === 0">
      <mu-icon value="chat" size="80" color="#C3C3C3"/><br>
      <p style="color: #C3C3C3;">暂时没有新消息</p>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Message',
  data () {
    return {
      longTouch: [],
      open: false,
      tiemr: null,
      flag: false
    }
  },
  mounted () {
    for (let i = 0; i < this.list.length; i++) {
      this.longTouch[i] = false
    }
  },
  computed: {
    list () {
      let list = this.$store.state.message
      list.forEach((value, index) => {
        let chatRecord = value.content
        value.lastRecord = chatRecord[chatRecord.length - 1]
        this.$set(list, index, value)
      })
      return list
    }
  },
  methods: {
    ...mapMutations(['deleteMessage']),
    dialogue (friendId) {
      this.$router.push(
        {
          name: 'Dialogue',
          query: {friendId: friendId}
        }
      )
    },
    // 通过触摸屏幕时间来决定是否要显示删除聊天框
    touchstart (index) {
      this.timer = setTimeout(() => {
        this.longTouch.fill(false)
        this.$set(this.longTouch, index, true)
        this.$refs.cover.style.display = 'block'
        this.flag = true
      }, 500)
    },
    touchend (friendId) {
      if (this.flag === false) {
        this.$router.push(
          {
            name: 'Dialogue',
            query: {friendId: friendId}
          }
        )
      }
      this.flag = false
      clearTimeout(this.timer)
    },
    cancelCover () {
      this.longTouch.fill(false)
      // 解决数组改变视图没有响应
      this.$set(this.longTouch, 0, false)
      this.$refs.cover.style.display = 'none'
    },
    delMessage (friendId) {
      this.deleteMessage(friendId)
    }
  },
  watch: {
    list (n, o) {
      for (let i = 0; i < this.list.length; i++) {
        this.longTouch[i] = false
      }
    }
  }
}
</script>
<style lang="less">
@import '~static/less/init';

.message {
  .cover {
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    z-index: 100;
    display: none;
  }
  .mu-list {
    background: white;
    padding: 0;
    overflow-x: visible;
    >div {
      position: relative;
      .delete {
        position: absolute;
        left: 40%;
        background: white;
        padding: @_10 @_10;
        z-index: 10000;
        box-shadow: 0 0 5px #333333;
      }
      .top {
        top: -@_5;
      }
      .bottom {
        top: @_40;
      }
      .mu-item {
        height: @_56;
      }
    }
    .longTouch {
      background: #F1F1F1;
    }
  }
  .noMessage {
    height: calc(100% - 2rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
