<template>
	<view class="date-container">
		<view class="date-item" :class="{ active: date == 'today' }" @click="date = 'today'">
			<text>今日</text>
			<view class="date-bottom"></view>
		</view>
		<view class="date-item" :class="{ active: date == 'week' }" @click="date = 'week'">
			<text>本周</text>
			<view class="date-bottom"></view>
		</view>
		<view class="date-item" :class="{ active: date == 'month' }" @click="date = 'month'">
			<text>本月</text>
			<view class="date-bottom"></view>
		</view>
	</view>
	<view class="overview-container">
		<view class="overview-item">
			<text>新增线索</text>
			<view class="overview-value">
				<text class="overview-num">0</text>
				<text>条</text>
			</view>
		</view>
		<view class="overview-item">
			<text>新增商机</text>
			<view class="overview-value">
				<text class="overview-num">0</text>
				<text>条</text>
			</view>
		</view>
		<view class="overview-item">
			<text>成交金额</text>
			<view class="overview-value">
				<text class="overview-num">0</text>
				<text>条</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
	parkId: {
		type: Number,
		default: 0
	}
})

const date = ref('today')
</script>

<style lang="scss" scoped>
.date-container {
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-top: 10px;
	.date-item {
		font-weight: 500;
		.date-bottom {
			height: 4px;
			border-radius: 5px;
			margin-top: 4px;
		}
		&.active {
			color: #3897c7;
			.date-bottom {
				background-image: linear-gradient(90deg, #0696ec, #445ff6);
			}
		}
	}
}

.overview-container {
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-top: 10px;
	padding: 0 10px 10px;
	.overview-item {
		width: 30%;
		text-align: center;
		border-radius: 8px 8px 0 0;
		background-image: linear-gradient(#d1eefe, #fff);
		color: #1b93d0;
		padding: 10px 0 14px;
		.overview-value {
			margin-top: 10px;
			.overview-num {
				font-size: 1.2em;
				margin-right: 2px;
			}
		}
	}
}
</style>
