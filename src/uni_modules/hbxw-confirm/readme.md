# hbxw-confirm组件

## 介绍
高度可自定义的确认弹框组件，虽然uniapp有原生的确认弹窗，使用简单而且层级有保存，但面对形形色色的产品业务需求，经常需要自定义确认弹框，此组件就是一个确认弹框组件，它可以通过配置实现自己的弹窗，也可以只用它的总架子，再通过slot来实现弹窗各部件内容和UI。

## 使用示例
推荐先直接复制示例代码到工程中看效果了解下使用方法再投入项目使用。

```html

<template>
	<view>
    <button @click="showConfirm">显示带标题+确认取消双按钮确认弹框</button>
    <button @click="showConfirm0">显示不带标题只有确认按钮确认弹框</button>
    <button @click="showConfirm1">完全自定义内容的弹窗</button>
    
		<hbxw-confirm 
      :is-show="isShowConfirm"
       @cancel="cancel"
       @sure="sure"
       @maskClick="maskClick"
       title="呵呵"
       content="知受省今象等增件准主委京院部东关电需认点率好四节空华术龙八素制海易月外置数张手最准声增除上火历算团除。"
    ></hbxw-confirm>
    
    <hbxw-confirm
      :is-show="isShowConfirm0"
       @cancel="cancel0"
       @sure="sure0"
       @maskClick="maskClick"
       cancel-text=""
      content="知受省今象等增件准主委京院部东关电需认点率好四节空华术龙八素制海易月外置数张手最准声增除上火历算团除。"
    ></hbxw-confirm>
    
    <hbxw-confirm
      :is-show="isShowConfirm1"
      @maskClick="maskClick"
    >
      <template #title>
        <view style="width:100%;text-align: center;margin-top: 20rpx;color: red;">我是标签</view>
      </template>
      <template #content>
        <view style="width:100%;text-align: center;color: green;padding: 16rpx;">知受省今象等增件准主委京院部东关电需认点率好四节空华术龙八素制海易月外置数张手最准声增除上火历算团除</view>
      </template>
      <template #btns>
        <view style="display: flex;flex-direction: row;">
          <button style="flex:1" @click="cancel1">取消</button>
          <button style="flex:1" @click="sure1">确认</button>
        </view>
      </template>
    </hbxw-confirm>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowConfirm: false,
				isShowConfirm0: false,
				isShowConfirm1: false
			}
		},
		methods: {
      showConfirm() {
        this.isShowConfirm = true;
      },
			cancel() {
        this.isShowConfirm = false;
        console.log('---- cancel ----:',  '点击了取消');
      },
			sure() {
        this.isShowConfirm = false;
        console.log('---- sure ----:',  '点击了确认');
      },
      showConfirm0() {
        this.isShowConfirm0 = true;
      },
			cancel0() {
        this.isShowConfirm0 = false;
        console.log('---- cancel ----:',  '点击了取消');
      },
			sure0() {
        this.isShowConfirm0 = false;
        console.log('---- sure ----:',  '点击了确认');
      },
      showConfirm1() {
        this.isShowConfirm1 = true;
      },
			cancel1() {
        this.isShowConfirm1 = false;
        console.log('---- cancel ----:',  '点击了取消');
      },
			sure1() {
        this.isShowConfirm1 = false;
        console.log('---- sure ----:',  '点击了确认');
      },
      maskClick() {
        console.log('---- mask ----:',  '蒙版被点击了');
      }
		}
	}
</script>

<style>

</style>



```

## API

### Props

| 属性名            | 类型          | 默认值         | 必填 | 说明                               |
| ---------------- | --------------| --------       | ---- | -----------------------------------|
| isShow           | Boolean        | false              | 是   | 显示隐藏弹框                     |
| cancelText       | String         | 取消           | 否   | 取消按钮文字，传空就是没有       |
| sureText         | String         | 确认           | 否   | 确认按钮文字，传空就是没有      |
| title            | String         |""           | 否   | 弹窗标题，传空是没有       |
| content          | String         | ""           | 是   | 弹窗主体内容       |
| titleStyle       | String       | ""          | 否   | 弹窗标题样式控制       |
| contentStyle     | String        | ""             | 否   | 弹窗主体内容样式配置       |
| cancelStyle      | String        | ""              | 否   | 取消按钮样式配置   |
| sureStyle        | String        | ""              | 否   | 确定按钮样式配置       |
| maskStyle        | String         | ""            | 否   | 蒙版样式控制       |
| zIndex           | Number         | 999           | 否   | 弹窗层级控制       |

### Events

| 事件名       | 说明   | 返回值                                                                                                                                                               |
| ------------ | ------------  |  ------------ 
| sure         | 确认按钮点击触发事件 |  无返回 |
| cancel       | 取消按钮点击触发事件 |  无返回 |
| maskClick    | 蒙版点击触发事件 |  无返回 |

