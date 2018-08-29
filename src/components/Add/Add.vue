<template>
  <div class="add">
    <nav-bar leftIcon="keyboard_arrow_left" title="添加"/>
    <mu-tabs :value.sync="active" color="white" indicator-color="#2196F3" full-width>
      <mu-tab>找人</mu-tab>
      <mu-tab>找群</mu-tab>
      <mu-tab>找公众号</mu-tab>
    </mu-tabs>
    <div class="add-people" v-if="active == 0">
      <div class="input-id">
        <input placeholder="QQ号/手机号/群/公众号" v-model="value">
        <button @click="search">搜索</button>
      </div>
    </div>
    <!-- 提示框 -->
    <mu-snackbar position="top" :color="open.color" :open.sync="open.state">
      <mu-icon left :value="open.icon"></mu-icon>
      {{open.text}}
      <mu-icon value="close" slot="action" color="white" @click="open.state = false"></mu-icon>
    </mu-snackbar>
  </div>
</template>
<script>
export default {
  name: 'Add',
  data () {
    return {
      active: 0,
      open: {
        state: false,
        color: 'error',
        text: '',
        icon: 'warning'
      },
      value: ''
    }
  },
  methods: {
    search () {
      let reg = /^[0-9]*$/
      if (this.value === '') {
        this.openSnackbar('不能为空')
      } else if (!reg.test(this.value)) {
        this.openSnackbar('请输入正确的账号')
      } else {
        this.$axios.get('user/queryById', {params: {userId: this.value}})
          .then(res => {
            if (res.data === '') {
              this.openSnackbar('没有此用户')
            } else {
              this.$store.commit('setPersonIndex', res.data)
              this.$router.replace({
                name: 'PersonIndex'
              })
            }
          })
      }
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
    }
  }
}
</script>
<style lang="less">
@import '~static/less/init';

.add {
  .mu-tab {
    color: black;
  }
  .add-people {
    width: 100%;
    margin-top: @_10;
    background: white;
    .input-id {
      padding: @_10 @_15;
      display: flex;
      align-items: center;
      input {
        width: 80%;
      }
      button {
        background: rgba(0,0,0,0);
        border:none;
        color: #2196F3;
        text-align: right;
        width: 20%;
      }
    }
  }
}
</style>
