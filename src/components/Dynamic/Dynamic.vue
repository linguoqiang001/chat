<template>
  <div class="dynamic">
    <my-search placeholder="大家都在搜：火影忍者"/>
    <div class="top">
      <div>
        <mu-icon size="36" value="star" color="#FFD600"/>
        <span>好友动态</span>
      </div>
      <div>
        <mu-icon size="36" value="place" color="#F05E5C"/>
        <span>附近</span>
      </div>
      <div>
        <mu-icon size="36" value="terrain" color="#FEA354"/>
        <span>兴趣部落</span>
      </div>
    </div>
    <mu-list style="margin-top: 15px;">
      <mu-list-item button :ripple="false">
        <mu-list-item-action>
          <mu-icon value="videogame_asset" color="#53CCF8"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>游戏</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button :ripple="false">
        <mu-list-item-action>
          <mu-icon value="book" color="#1976D3"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>图书</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button :ripple="false">
        <mu-list-item-action>
          <mu-icon value="shop" color="#FFD600"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>购物</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button :ripple="false">
        <mu-list-item-action>
          <mu-icon value="videocam" color="#F3890C"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>小视频</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
    </mu-list>
    <mu-list style="margin-top: 15px;">
      <mu-list-item button :ripple="false">
        <mu-list-item-action>
          <mu-icon value="filter_drama" color="#53CCF8"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>天气</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button :ripple="false">
        <mu-list-item-action>
          <mu-icon value="movie" color="#5773F6"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>电影</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
    </mu-list>
  </div>
</template>
<style lang="less">
@import '~static/less/init';

.dynamic {
  .top {
    background: white;
    display: flex;
    justify-content: space-between;
    >div {
      width: 33.3vw;
      padding: @_10 0;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      span{
        font-size: @_13;
      }
    }
  }
  .mu-list{
    background: white;
    padding: 0;
    .mu-item-action {
      min-width: @_40;
    }
  }
}
</style>
