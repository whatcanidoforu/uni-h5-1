<template>
	<view>
		<view class="mask" v-if="modShow">

		</view>
		<view class="nfcBox" v-if="modShow" :style="{'bottom':bottom+'px'}">
			<view class="close" @click="close">
				×
			</view>

			<view class="title">
				{{mode==='read'?'NFC读取':'NFC写入'}}
			</view>
			<img src="./NFC.png" class="img" />

			<view class="contant">
				<view class="readContant" v-if="mode==='read'">
					<p style="text-align: center;">读取内容: </p>
					<p style="text-align: center;">{{read.payload?read.payload:'待读取'}}</p>
				</view>
				<view class="readContant" v-if="mode==='write'">
					<p style="text-align: center;">写入内容: </p>
					<p style="text-align: center;">{{payload}}</p>
				</view>
				<view class="type">
					类型:<span>{{mode==='read'?(read.type?read.type:'待读取'):type}}</span>
				</view>
				<view class="status">
					状态:{{title}}
				</view>
				<view class="support">
					{{content?content:'等待识别'}}
				</view>
			</view>

			<view class="fixed-btn">
				<view class="my-button-primary" v-if="isWrite&&mode==='write'" @click="writeData">
					写入数据</view>
			</view>
			<view class="fixed-btn" v-if="read.payload&&mode==='read'">
				<view class="my-button-primary" @click="readOk">确认</view>
				<p style="color: red;font-size: 12px;text-align: center;">请移开卡片后确认</p>
			</view>

		</view>
	</view>
</template>
 
<script>
	export default {
		name: "ambler-nfcrw",
		data() {
			return {
				tab: {},
				aid: "",
				NFCAdapter: null,
				NFCTab: null,
				title: "初始化...", // 视图提示
				content: "", // 视图内容
				isWrite: false, // 支持写入
				id: '', // 数据
				payload: "",
				type: "text/plain",
				read: {
					id: '',
					payload: '',
					type: ''
				},
				bottom: -200
			};
		},

		props: ["modShow", 'modData', "mode"],

		watch: {
			modShow(newValue) {
				if (newValue) {
					this.bottom = 20
					this.initData()
					this.initDevice()
				} else {
					this.bottom = -200
				}
			}
		},
		methods: {
			initData() {
				if (this.mode === 'write') {
					this.payload = this.modData.contant
				}
			},
			initDevice() {
				this.isWrite = false
				this.NFCAdapter = wx.getNFCAdapter();
				this.tab = {
					'ISO-DEP': this.NFCAdapter.getIsoDep(),
					'MIFARE Classic': this.NFCAdapter.getMifareClassic(),
					'MIFARE Ultraligh': this.NFCAdapter.getMifareUltralight(),
					NDEF: this.NFCAdapter.getNdef(),
					'NFC-A': this.NFCAdapter.getNfcA(),
					'NFC-B': this.NFCAdapter.getNfcB(),
					'NFC-F': this.NFCAdapter.getNfcF(),
					'NFC-V': this.NFCAdapter.getNfcV()
				};
				this.NFClistener();
			},

			//  触发监听NFG事件
			NFClistener() {
				this.NFCAdapter.startDiscovery({
					success: res => {
						this.title = '请将设备放入识别区NFC';
					},
					fail: error => {
						this.title = '刷新重试';
					},
					complete: res => {}
				});
				// 监听 NFC 标签
				this.NFCAdapter.onDiscovered(this.callbackFuc);
			},

			/**
			 * 监听回调方法
			 */
			callbackFuc(callback) {
				console.log("callbackFuc", callback);
				this.aid = parseInt(this.ab2hex(callback.id), 16) + '';
				this.id = this.aid
				if (callback.messages) {
					let cordsArray = callback.messages[0].records;
					cordsArray.find(item => {
						this.read.payload = this.byteToString(new Uint8Array(item
							.payload));
						this.read.id = this.byteToString(new Uint8Array(item.id));
						this.read.type = this.byteToString(new Uint8Array(item
							.type));
					});
					if (this.mode === "read") {
						console.log("读取数据", this.read.payload);
					}
				}

				if (callback.techs.length != 0) {
					this.title = '识别成功！';
					this.content = '可支持标签：';
					callback.techs.forEach((res, index) => {
						if (index != 0) {
							this.content += '、';
						}
						this.content += res;
						// 支持写入
						if (res == 'NDEF') {
							this.isWrite = true;
						}
					});
				} else {
					this.title = '无效设备';
				}
			},


			readOk() {
				this.$emit("readOk", this.read.payload)
				this.close()
				this.bottom = -200
			},

			// getAtqa() {
			// 	this.NFCTab.getAtqa({
			// 		success: res => {
			// 			console.log(res);
			// 		},
			// 		fail: error => {
			// 			console.error(error);
			// 		},
			// 		complete: res => {
			// 			console.log(res);
			// 		}
			// 	});
			// },
			/* 获取最大传输长度 */
			// getMaxTransceiveLength() {
			// 	this.NFCTab.getMaxTransceiveLength({
			// 		success: res => {
			// 			console.log(res);
			// 		},
			// 		fail: error => {
			// 			console.error(error);
			// 		},
			// 		complete: res => {
			// 			console.log(res);
			// 		}
			// 	});
			// },
			/* 获取SAK信息 */
			// getSak() {
			// 	this.NFCTab.getSak({
			// 		success: res => {
			// 			console.log(res);
			// 		},
			// 		fail: error => {
			// 			console.error(error);
			// 		},
			// 		complete: res => {
			// 			console.log(res);
			// 		}
			// 	});
			// },

			/**
			 * 写入数据
			 */
			async writeData() {
				// 获取初始化标签对象——连接设备
				this.NFCTab = await this.initTab('NDEF');
				// 准备写入的数据
				const records = [{
					id: this.string2ArrayBuffer(this.id),
					payload: this.string2ArrayBuffer(this.payload),
					type: this.string2ArrayBuffer(this.type),
					tnf: 2
				}];
				// 执行写入
				this.NFCTab.writeNdefMessage({
					records: records,
					success: res => {
						this.title = '数据写入成功,请移除卡片';
						let that = this
						setTimeout(function() {
							that.$emit("writeOk")
							that.close()
							that.bottom = -200
						}, 2000)
					},
					fail: error => {
						this.title = '数据写入失败';
						this.closeConnect();
						this.$emit("writeError")
						this.bottom = -200
					},
					complete: res => {
						this.closeConnect();
						this.isWrite = false
						this.title = "请将设备放入识别区NFC"
					}
				});
			},

			/* 设备标签 */
			initTab(item) {
				this.NFCTab = this.tab[item];
				this.NFCTab.connect({
					success: res => {
						this.title = '连接设备成功';
					},
					fail: error => {
						this.title = '连接设备失败';
						console.error(error);
					},
					complete: res => {}
				});
				return this.NFCTab;
			},

			// 关闭 连接
			closeConnect() {
				if (this.NFCTab) {
					this.NFCTab.close({
						success: res => {
							this.title = '清除标签连接成功';
							console.log('清除标签连接成功');
						},
						fail: error => {
							this.title = '清除标签连接失败';
							console.error('清除标签连接失败');
						},
						complete: res => {
							console.log(res);
						}
					});
				}
			},

			close() {
				this.closeNFC()
				this.$emit("closeMod")
				this.content = "" // 视图内容
				this.payload = ""
				this.read = {
					id: '',
					payload: '',
					type: ''
				}
			},
			/* 取消取消监听 NFC Tag */
			closeNFC() {
				this.NFCAdapter.offDiscovered(this.callbackFuc)
				this.NFCAdapter.stopDiscovery();
				this.NFCAdapter = null
				console.log("stopDiscovery", this.NFCAdapter);
			},

			byteToString(arr) {
				if (typeof arr === 'string') {
					return arr;
				}
				var str = '',
					_arr = arr;
				for (var i = 0; i < _arr.length; i++) {
					var one = _arr[i].toString(2),
						v = one.match(/^1+?(?=0)/);
					if (v && one.length == 8) {
						var bytesLength = v[0].length;
						var store = _arr[i].toString(2).slice(7 - bytesLength);
						for (var st = 1; st < bytesLength; st++) {
							store += _arr[st + i].toString(2).slice(2);
						}
						str += String.fromCharCode(parseInt(store, 2));
						i += bytesLength - 1;
					} else {
						str += String.fromCharCode(_arr[i]);
					}
				}
				return str;
			},

			string2ArrayBuffer(str) {
				// 首先将字符串转为16进制
				let val = '';
				for (let i = 0; i < str.length; i++) {
					if (val === '') {
						val = str.charCodeAt(i).toString(16);
					} else {
						val += ',' + str.charCodeAt(i).toString(16);
					}
				}
				// 将16进制转化为ArrayBuffer
				return new Uint8Array(
					val.match(/[\da-f]{2}/gi).map(function(h) {
						return parseInt(h, 16);
					})
				).buffer;
			},

			ab2hex(buffer) {
				var hexArr = Array.prototype.map.call(
					new Uint8Array(buffer),

					function(bit) {
						return ('00' + bit.toString(16)).slice(-2);
					}
				);
				return hexArr.join('');
			},
		},

	}
</script>

<style lang="scss" scoped>
	.mask {
		position: fixed;
		top: 0px;
		width: 100vw;
		height: 100vh;
		z-index: 998;
		background: rgba(0, 0, 0, 0.3);
	}

	.popOn {
		bottom: 40px !important;
	}

	.nfcBox {
		position: fixed;
		right: 0;
		left: 0;
		width: calc(100vw - 68px);
		background: #ffffff;
		padding: 10px 30px 50px 30px;
		border-radius: 25px;
		margin: 0 auto;
		box-shadow: 0px 0px 8px 3px #7f7f7f;
		z-index: 1001;
		transition: bottom 0.2s linear;


		.close {
			font-size: 25px;
			color: rgb(145, 145, 145);
			width: 28px;
			height: 28px;
			border-radius: 25px;
			position: absolute;
			right: 12px;
			top: 8px;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.title {
			font-size: 22px;
			font-weight: bold;
			padding-bottom: 12px;
			color: rgb(145, 145, 145);
			text-align: center;
		}

		.status {
			font-size: 14px;
			color: #8f8f8f;
			padding-bottom: 15px;
			text-align: center;
		}

		.img {
			width: 80px;
			height: 80px;
			margin: 0 auto;
			display: flex;
			justify-content: center;
		}

		.contant {
			padding: 0px 10px 15px 10px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.readContant {
				width: 100%;
				color: #000000;
				font-weight: bold;
				padding-bottom: 15px;
				overflow: hidden;

				span {
					margin-left: 10px;
				}
			}

			.type {
				display: flex;
				align-items: center;
				padding-bottom: 15px;
				text-align: center;

				span {
					padding: 3px 8px;
					color: #ffffff;
					border-radius: 25px;
					font-size: 12px;
					background: #55aaff;
					margin-left: 10px;
				}
			}

			.support {
				font-size: 12px;
				color: #b6b6b6;
			}
		}

		.fixed-btn {
			.my-button-primary {
				padding: 10px 15px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 25px;
				background: #0055ff;
				color: #ffffff;
			}
		}
	}
</style>