<template>
	<div class="trade-container">
		<h3 class="title">填写并核对订单信息</h3>
		<div class="content">
			<h5 class="receive">收件人信息</h5>
			<div class="address clearFix" v-for="item in Tradelist.userAddressList"
				v-if="Tradelist.userAddressList.length>=1&&item.isDefault=='1'">
				<span class="username selected">{{item.consignee}}</span>
				<p>
					<span class="s1">{{item.userAddress}}</span>
					<span class="s2">{{item.phoneNum}}</span>
					<span class="s3">默认地址</span>
				</p>
			</div>
			<div class="address clearFix" v-for="item in Tradelist.userAddressList"
				v-if="Tradelist.userAddressList.length>=1&&item.isDefault=='0'">
				<span class="username">{{item.consignee}}</span>
				<p>
					<span class="s1">{{item.userAddress}}</span>
					<span class="s2">{{item.phoneNum}}</span>
				</p>
			</div>
			<div class="address clearFix">
				<a @click="dialogVisible=true">+ 收件人信息</a>
			</div>
			<div class="line"></div>
			<h5 class="pay">支付方式</h5>
			<div class="address clearFix">
				<span class="username selected">在线支付</span>
				<span class="username" style="margin-left:5px;">货到付款</span>

			</div>
			<div class="line"></div>
			<h5 class="pay">送货清单</h5>
			<div class="way">
				<h5>配送方式</h5>
				<div class="info clearFix">
					<span class="s1">天天快递</span>
					<p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
				</div>
			</div>
			<div class="detail">
				<h5>商品清单</h5>
				<ul class="list clearFix" v-for="item in Tradelist.detailArrayList">
					<li>
						<img :src="item.imgUrl" alt="">
					</li>
					<li>
						<p>{{item.skuName}}</p>
						<h4>7天无理由退货</h4>
					</li>
					<li>
						<h3>￥{{(item.orderPrice).toFixed(2)}}</h3>
					</li>
					<li>X{{item.skuNum}}</li>
					<li>有货</li>
				</ul>
			</div>
			<div class="bbs">
				<h5>买家留言：</h5>
				<textarea placeholder="建议留言前先与商家沟通确认" class="remarks-cont"></textarea>
			</div>
			<div class="line"></div>
			<div class="bill">
				<h5>发票信息：</h5>
				<div>普通发票（电子） 个人 明细</div>
				<h5>使用优惠/抵用</h5>
			</div>
		</div>
		<div class="money clearFix">
			<ul>
				<li>
					<b><i>{{Tradelist.totalNum}}</i>件商品，总商品金额</b>
					<span>¥{{(Tradelist.totalAmount).toFixed(2)}}</span>
				</li>
				<li>
					<b>返现：</b>
					<span>0.00</span>
				</li>
				<li>
					<b>运费：</b>
					<span>0.00</span>
				</li>
			</ul>
		</div>
		<div class="trade">
			<div class="price">应付金额:　<span>¥{{(Tradelist.totalAmount).toFixed(2)}}</span></div>
			<div class="receiveInfo" v-for="item in Tradelist.userAddressList"
				v-if="Tradelist.userAddressList.length>=1&&item.isDefault=='1'">
				寄送至:
				<span>{{item.fullAddress}}</span>
				收货人：<span>{{item.consignee}}</span>
				<span>{{item.phoneNum}}</span>
			</div>
		</div>
		<div class="sub clearFix">
			<a class="subBtn" @click="tjdd()">提交订单</a>
		</div>
		<el-dialog title="添加收件人信息" :visible.sync="dialogVisible" width="30%">
			<el-form :label-position="labelPosition" label-width="100px" :model="ruleForm" :rules="rules"
				ref="ruleForm">
				<el-form-item label="收件人:" prop="consignee">
					<el-input v-model="ruleForm.consignee"></el-input>
				</el-form-item>
				<el-form-item label="收件人电话:" prop="phoneNum">
					<el-input v-model="ruleForm.phoneNum"></el-input>
				</el-form-item>
				<el-form-item label="收件人地址:" prop="userAddress">
					<el-input v-model="ruleForm.userAddress"></el-input>
				</el-form-item>
				<el-form-item label="是否设置为默认收件人:" label-width="200px">
					<el-checkbox-group v-model="ruleForm.isDefault">
						<el-checkbox label="" name="isDefault"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addForm()">确 定</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		name: 'Trade',
		data() {
			return {
				Tradelist: {},
				dialogVisible: false,
				labelPosition: 'right',
				ruleForm: {
					consignee: '',
					isDefault: true,
					phoneNum: '',
					provinceId: 25,
					regionId: 4,
					userAddress: '天麓尚层',
				},
				rules: {
					consignee: [{
						required: true,
						message: '请输入收件人姓名',
						trigger: 'blur'
					}, ],
					phoneNum: [{
						required: true,
						message: '请输入收件人电话',
						trigger: 'blur'
					}],
					userAddress: [{
						required: true,
						message: '请输入收件人地址',
						trigger: 'blur'
					}]
				}
			}
		},
		mounted() {
			this.getTrade()
		},
		methods: {
			getTrade() {
				this.$http.get('/api/order/auth/trade').then(res => {
					console.log(res.data)
					this.Tradelist = res.data
				})
			},
			addForm() {
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
						this.$message({
							message: '添加成功',
							type: 'success'
						});
						if (this.ruleForm.isDefault) {
							this.ruleForm.isDefault = '1'
						}
						this.$http.post('/api/user/userAddress/auth/save', this.ruleForm).then(res => {
							this.getTrade()
						})
						this.dialogVisible = false
					} else {
						this.$message.error('收件人信息不完整');
					}
				});
			},
			tjdd() {
				var obj={}
				this.Tradelist.userAddressList.forEach(item=>{
					if(item.isDefault=='1'){
						obj.consignee=item.consignee
						obj.consigneeTel=item.phoneNum
						obj.deliveryAddress=item.fullAddress
						obj.paymentWay='ONLINE'
						obj.orderComment=''
						obj.orderDetailList=this.Tradelist.detailArrayList
					}
				})
				this.$http.post(`/api/order/auth/submitOrder?tradeNo=${this.Tradelist.tradeNo}`, obj).then(res=>{
					console.log(res)
					this.$router.push('/pay/'+res.data)
				})
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.trade-container {
		.title {
			width: 1200px;
			margin: 0 auto;
			font-size: 14px;
			line-height: 21px;
		}

		.content {
			width: 1200px;
			margin: 10px auto 0;
			border: 1px solid rgb(221, 221, 221);
			padding: 25px;
			box-sizing: border-box;

			.receive,
			.pay {
				line-height: 36px;
				margin: 18px 0;
			}

			.address {
				padding-left: 20px;
				margin-bottom: 15px;

				.username {
					float: left;
					width: 100px;
					height: 30px;
					line-height: 30px;
					text-align: center;
					border: 1px solid #ddd;
					position: relative;
				}

				.username::after {
					content: "";
					display: none;
					width: 13px;
					height: 13px;
					position: absolute;
					right: 0;
					bottom: 0;
					background: url(./images/choosed.png) no-repeat;
				}

				a {
					display: inline-block;
					width: 100px;
					height: 30px;
					line-height: 30px;
					text-align: center;
					border: 1px solid #e1251b;
				}

				.username.selected {
					border-color: #e1251b;
				}

				.username.selected::after {
					display: block;
				}

				p {
					width: 610px;
					float: left;
					line-height: 30px;
					margin-left: 10px;
					padding-left: 5px;
					cursor: pointer;

					.s1 {
						float: left;

					}

					.s2 {
						float: left;
						margin: 0 5px;
					}

					.s3 {
						float: left;
						width: 56px;
						height: 24px;
						line-height: 24px;
						margin-left: 10px;
						background-color: #878787;
						color: #fff;
						margin-top: 3px;
						text-align: center;
					}
				}

				p:hover {
					background-color: #ddd;
				}
			}

			.line {
				height: 1px;
				background-color: #ddd;
			}

			.way {
				width: 1080px;
				height: 110px;
				background: #f4f4f4;
				padding: 15px;
				margin: 0 auto;

				h5 {
					line-height: 50px;
				}

				.info {
					margin-top: 20px;

					.s1 {
						float: left;
						border: 1px solid #ddd;
						width: 120px;
						height: 30px;
						line-height: 30px;
						text-align: center;
						margin-right: 10px;
					}

					p {
						line-height: 30px;
					}
				}
			}

			.detail {
				width: 1080px;

				background: #feedef;
				padding: 15px;
				margin: 2px auto 0;

				h5 {
					line-height: 50px;
				}

				.list {
					display: flex;
					justify-content: space-between;

					li {
						line-height: 30px;

						&:nth-child(2) {
							width: 500px;
						}

						&:nth-child(4) {
							width: 50px;
						}

						&:nth-child(5) {
							width: 50px;
						}

						img {
							width: 70px;
							height: 70px;
						}

						p {

							margin-bottom: 20px;
						}

						h4 {
							color: #c81623;
							font-weight: 400;
						}

						h3 {
							width: 100px;
							color: #e12228;
						}
					}
				}
			}

			.bbs {
				margin-bottom: 15px;

				h5 {
					line-height: 50px;
				}

				textarea {
					width: 100%;
					border-color: #e4e2e2;
					line-height: 1.8;
					outline: none;
					resize: none;
				}
			}

			.bill {
				h5 {
					line-height: 50px;
				}

				div {
					padding-left: 15px;
				}
			}
		}

		.money {
			width: 1200px;
			margin: 20px auto;

			ul {
				width: 220px;
				float: right;

				li {
					line-height: 30px;
					display: flex;
					justify-content: space-between;

					i {
						color: red;
					}
				}
			}
		}

		.trade {
			box-sizing: border-box;
			width: 1200px;
			padding: 10px;
			margin: 10px auto;
			text-align: right;
			background-color: #f4f4f4;
			border: 1px solid #ddd;

			div {
				line-height: 30px;
			}

			.price span {
				color: #e12228;
				font-weight: 700;
				font-size: 14px;
			}

			.receiveInfo {
				color: #999;
			}
		}

		.sub {
			width: 1200px;
			margin: 0 auto 10px;

			.subBtn {
				float: right;
				width: 164px;
				height: 56px;
				font: 700 18px "微软雅黑";
				line-height: 56px;
				text-align: center;
				color: #fff;
				background-color: #e1251b;

			}
		}

	}
</style>
