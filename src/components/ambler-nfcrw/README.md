### 使用方法

```
<template>
	<view class="content">
		<button size="default" type="primary" @click="nfcReadModShow=true">读取NFC</button>
		<button size="default" type="primary" @click="nfcWriteModShow=true">写入NFC</button>


		<nfcRW :modShow="nfcReadModShow" mode="read" @readOk="readOk" @closeMod="closeReadMod">
		</nfcRW>

		<nfcRW :modShow="nfcWriteModShow" :modData="modData" mode="write" @writeOk="writeOk"
			@writeError="closeWriteMod" @closeMod="closeWriteMod">
		</nfcRW>
	</view>
</template>

<script>
	import nfcRW from "@/components/ambler-nfcrw/ambler-nfcrw.vue"
	export default {
		components: {
			nfcRW
		},
		data() {
			return {
				nfcReadModShow: false,
				nfcWriteModShow: false,
				modData: "123456", //要写入的数据
			}
		},
		onLoad() {

		},
		methods: {
			readOk(e) {
				console.log(e);
			},

			writeOk() {
				this.closeMod()
			},

			closeReadMod() {
				this.nfcReadModShow = false
			},
			closeWriteMod() {
				this.nfcWriteModShow = false
			},
		}
	}
</script>

<style>
	.content {}
</style>
```

### 参数说明

|  参数   | 类型  | 说明 |
|  ----  | ----  | ---- |
| modShow  | bool | 开关 |
| modData  | string | 写入数据 |
| mode  | string | 读写模式write/read |

### 事件说明

|  事件  | 说明 |
|  ----  | ----  | 
| readOk  | 读取成功回调,返回读取的数据 | 
| writeError  | 读取失败 | 
| writeOk  | 写入成功回调 | 
| closeMod  | 关闭回调 | 