<template>
  <view class="hbxw-confirm-dialog" v-if="isShow" :style="{'z-index': zIndex}">
    <view class="hbxw-confirm-mask" :style="maskStyle" @click="maskClick"></view>
    <view class="hbxw-confirm-content hbxw-confirm-content-default">
      <!-- 标题 -->
      <slot v-if="$slots.title" name="title"></slot>
      <view v-else-if="title" class="hbxw-confirm-title" :style="titleStyle">{{title}}</view>
      
      <!-- 正文 -->
      <slot v-if="$slots.content" name="content"></slot>
      <view v-else class="hbxw-confirm-main" :style="contentStyle">{{content}}</view>
      
      <!-- 底部按钮 -->
      <slot name="btns" v-if="$slots.btns"></slot>
      <view v-else-if="cancelText || sureText" class="hbxw-confirm-button">
        <view v-if="cancelText" class="hbxw-cancel-btn" @click="cancel" :style="cancelStyle">{{cancelText}}</view>
        <view v-if="cancelText && sureText" class="hbxw-confirm-separation-line"></view>
        <view v-if="sureText" class="hbxw-confirm-btn" @click="sure" :style="sureStyle">{{sureText}}</view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      cancelStyle: {
        type: String,
        default: ''
      },
      sureStyle: {
        type: String,
        default: ''
      },
      titleStyle: {
        type: String,
        default: ''
      },
      contentStyle: {
        type: String,
        default: ''
      },
      maskStyle: {
        type: String,
        default: ''
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      sureText: {
        type: String,
        default: '确定'
      },
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      zIndex: {
        type: Number,
        default: 999
      }
    },
    methods: {
      maskClick() {
        this.$emit('maskClick');
      },
      cancel() {
        this.$emit('cancel');
      },
      sure() {
        this.$emit('sure');
      }
    }
  }
</script>
<style scoped>
  .hbxw-confirm-dialog{
    position: fixed;
    top: 0;
    left:0;
    right: 0;
    bottom: 0;
  }
  .hbxw-confirm-content{
    width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    z-index: 2;
  }
  .hbxw-confirm-content-default{
    border-radius: 16rpx;
    background-color: white;
  }
  .hbxw-confirm-mask{
    width:100%;
    height:100%;
    background-color: rgba(0,0,0,.8);
  }
  .hbxw-confirm-button{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #f5f5f5;
  }
  .hbxw-confirm-separation-line{
    width: 1px;
    height: 90rpx;
    flex: none;
    background-color: #f5f5f5;
  }
  .hbxw-cancel-btn,.hbxw-confirm-btn{
    flex:1;
    gap:1px;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    font-size: 30rpx;
  }
  .hbxw-cancel-btn{
    color:#333;
  }
  .hbxw-confirm-btn{
    color:#007aff;
  }
  .hbxw-confirm-title{
    width: 100%;
    text-align: center;
    font-size: 32rpx;
    padding-top: 40rpx;
    color: #333;
    font-weight: bold;
  }
  .hbxw-confirm-main{
    font-size: 26rpx;
    text-align: center;
    white-space: pre-wrap;
    word-break: break-all;
    padding: 40rpx;
  }
</style>
