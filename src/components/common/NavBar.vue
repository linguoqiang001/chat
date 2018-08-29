<!-- 自定义顶部导航栏 -->
<template>
  <div class="nav" ref="nav">
    <div>
      <div class="left">
        <img :src="avatar" v-if="avatar != undefined" @click="$emit('sidebar')">
        <mu-icon :value="leftIcon" size="30" v-if="avatar == undefined" @click="back" :color="textColor"/>
        <span ref="leftText" @click="back" style="font-size:16px;">{{leftText}}</span>
      </div>
      <span class="title">{{title}}</span>
      <div class="right">
        <span ref="rightText" style="font-size:16px;" @click="$emit('rightClick')">{{rightText}}</span>
        <mu-icon :value="rightIcon" size="30" @click="$emit('rightClick')"/>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  name: 'NavBar',
  data () {
    return {
    }
  },
  props: ['title', 'avatar', 'leftIcon', 'rightIcon', 'color', 'leftText', 'rightText', 'textColor'],
  mounted () {
    this.$refs.nav.style.backgroundColor = this.color
    this.$refs.leftText.style.color = this.textColor
    this.$refs.rightText.style.color = this.textColor
  },
  methods: {
    back () {
      if (this.$route.name === 'Dialogue') {
        this.$router.replace({name: 'Message'})
      } else {
        this.$router.back()
      }
    }
  }
}
</script>
<style scoped lang="less">
@import '~static/less/init';

.nav {
  height: @_50;
  background: #2196F3;
  >div{
    height: @_50;
    color: white;
    position: fixed;
    top: 0;
    width: 100%;
    >div,.title{
      display: flex;
      align-items: center;
      height: 100%;
    }
    .left {
      width: 25vw;
      padding-left: @_10;
      float: left;
      img{
        width: @_35;
        height: @_35;
        border-radius: @_17;
      }
    }
    .title {
      width: 50vw;
      font-size: @_17;
      text-align: center;
      justify-content: center;
      float: left;
    }
    .right {
      width: 25vw;
      padding-right: @_10;
      float: right;
      justify-content: flex-end;
    }
  }
}
</style>
