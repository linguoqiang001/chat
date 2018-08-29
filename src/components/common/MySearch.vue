<template>
  <div class="mySearch">
    <input :placeholder="placeholder" type="search" />
  </div>
</template>
<script>
export default {
  name: 'MySearch',
  props: ['placeholder']
}
</script>
<style lang="less">
@import '~static/less/init';

.mySearch {
  padding: @_5 @_10;
  background: white;
  input {
    width: 100%;
    height: @_30;
    background: #F2F2F2;
    border:none;
    text-align: center;
    border-radius: @_5;
    font-size: @_13;
  }
  input:focus{
    text-align: left;
    text-indent: @_5;
  }
}
</style>
