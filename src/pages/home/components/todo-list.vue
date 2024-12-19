<template>
	<uni-section title="待办事项(6条)" type="line" padding>
		<template v-slot:right>
			<text>更多</text>
			<uni-icons type="right" size="14"></uni-icons>
		</template>
		<scroll-view scroll-x="true">
			<view class="todo-container">
				<view class="todo-item" v-for="n in 6" :key="n">
					<view>
						<view class="todo-title">
							<text>租赁合同审批</text>
						</view>
						<view class="todo-name">
							<text>上海影响事业有限公司</text>
						</view>
					</view>
					<view class="todo-btn">
						<text>去处理</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</uni-section>
</template>

<script setup></script>

<style lang="scss" scoped>
.todo-container {
	width: auto;
	height: 170px;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: space-between;
	padding-bottom: 10px;
	.todo-item {
		height: 80px;
		width: 240px;
		border: 1px solid #f0f0f0;
		border-radius: 8px;
		margin-right: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
		.todo-title {
			font-size: 14px;
			color: #333;
		}
		.todo-name {
			font-size: 12px;
			color: #c8c8c8;
			margin-top: 8px;
		}
		.todo-btn {
			font-size: 12px;
			padding: 4px 10px;
			border-radius: 12px;
			background-color: #eaf7fd;
			color: #429ecd;
		}
	}
}
</style>
