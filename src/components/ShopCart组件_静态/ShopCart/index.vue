<template>
	<div class="cart">
		<h4>全部商品</h4>
		<div class="cart-main">
			<div class="cart-th">
				<div class="cart-th1">全部</div>
				<div class="cart-th2">商品</div>
				<div class="cart-th3">种类</div>
				<div class="cart-th4">单价（元）</div>
				<div class="cart-th5">数量</div>
				<div class="cart-th6">小计（元）</div>
				<div class="cart-th7">操作</div>
			</div>
			<div class="cart-body">
				<ul class="cart-list" v-if="shoplist.length==0"></ul>
				<ul class="cart-list" v-for="(item,index) in shoplist" v-else>
					<li class="cart-list-con1">
						<input type="checkbox" name="chk_list" :checked="item.isChecked==1?true:false"
							@click="xzsp(item.skuId,item.isChecked)">
					</li>
					<li class="cart-list-con2">
						<img :src="item.imgUrl">
						<div class="item-msg">{{item.skuName}}</div>
					</li>
					<li class="cart-list-con3">
						<div class="item-txt">语音升级款</div>
					</li>
					<li class="cart-list-con4">
						<span class="price">{{item.cartPrice.toFixed(2)}}</span>
					</li>
					<li class="cart-list-con5">
						<a href="javascript:void(0)" class="mins" @click="spjian(item.skuId,item.skuNum)">-</a>
						<input autocomplete="off" type="text" minnum="1" class="itxt" v-model.number="item.skuNum"
							@blur="spsr(item.skuId,item.skuNum)" @focus="skuNum=item.skuNum">
						<a href="javascript:void(0)" class="plus" @click="addsp(item.skuId,item.skuNum)">+</a>
					</li>
					<li class="cart-list-con6">
						<span class="sum">{{(item.cartPrice*item.skuNum).toFixed(2)}}</span>
					</li>
					<li class="cart-list-con7">
						<a class="sindelet" @click="scsp(item.skuId)">删除</a>
						<br>
						<a href="#none">移到收藏</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="cart-tool">
			<div class="select-all" @click="qxsp()">
				<input class="chooseAll" type="checkbox" v-model="flag">
				<span>全选</span>
			</div>
			<div class="option">
				<a @click="scxzsp()">删除选中的商品</a>
				<a href="#none">移到我的关注</a>
				<a href="#none">清除下柜商品</a>
			</div>
			<div class="money-box">
				<div class="chosed">已选择
					<span>{{Num}}</span>件商品
				</div>
				<div class="sumprice">
					<em>总价（不含运费） ：</em>
					<i class="summoney">{{zj}}</i>
				</div>
				<div class="sumbtn">
					<a class="sum-btn" target="_blank" @click="jssp()">结算</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ShopCart',
		data() {
			return {
				flag: true,
				skuNum: 0,
				Num: 0,
				zj: 0,
				shoplist: [

				]
			}
		},
		mounted() {
			this.getlist()
		},
		methods: {
			getlist() {
				this.$http.get('/api/cart/cartList').then(res => {
					this.Num = 0
					this.zj = 0
					this.flag = true
					this.shoplist = res.data[0].cartInfoList
					res.data[0].cartInfoList.forEach(item => {
						if (item.isChecked == 1) {
							this.Num++
							this.zj += item.skuNum * item.cartPrice
						} else {
							this.flag = false
						}
					})
					this.zj = this.zj.toFixed(2)
				})
			},
			// 减数量
			spjian(skuId, skuNum) {
				if (skuNum > 1) {
					this.$http.post('/api/cart/addToCart/' + skuId + '/-1').then(res => {
						this.getlist()
					})
				} else {
					alert('不能再减少了')
				}
			},
			// 加数量
			addsp(skuId, skuNum) {
				this.$http.post('/api/cart/addToCart/' + skuId + '/+1').then(res => {
					this.getlist()
				})
			},
			// 输入数量
			spsr(skuId, skuNum) {
				if (skuNum <= 0) {
					alert('数量不能为负数和0')
				} else {
					skuNum -= this.skuNum
					this.$http.post('/api/cart/addToCart/' + skuId + '/' + skuNum).then(res => {
						console.log(res)
						this.getlist()
					})
				}
			},
			// 选中状态
			xzsp(skuId, isChecked) {
				if (isChecked == 1) {
					isChecked = 0
				} else {
					isChecked = 1
				}
				
				this.$http.get('/api/cart/checkCart/' + skuId + '/' + isChecked).then(res => {
					this.getlist()
				})
			},
			// 删除商品
			scsp(skuId) {
				this.$http.delete('/api/cart/deleteCart/' + skuId).then(res => {
					this.getlist()
				})
			},
			// 全选商品
			qxsp() {
				this.flag = !this.flag
				if (this.flag) {
					this.shoplist.forEach(item => {
						this.$http.get('/api/cart/checkCart/' + item.skuId + '/1').then(res => {
							this.getlist()
						})
					})
				} else {
					this.shoplist.forEach(item => {
						this.$http.get('/api/cart/checkCart/' + item.skuId + '/0').then(res => {
							this.getlist()
						})
					})
				}
			},
			// 结算
			jssp() {
				this.$router.push('/Trade')
			},
			// 删除选中商品
			scxzsp() {
				this.shoplist.forEach(item => {
					if (item.isChecked == 1) {
						this.$http.delete('/api/cart/deleteCart/' + item.skuId).then(res => {
							this.getlist()
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.cart {
		width: 1200px;
		margin: 0 auto;

		h4 {
			margin: 9px 0;
			font-size: 14px;
			line-height: 21px;
		}

		.cart-main {
			.cart-th {
				background: #f5f5f5;
				border: 1px solid #ddd;
				padding: 10px;
				overflow: hidden;

				&>div {
					float: left;
				}

				.cart-th2 {
					width: 25%;

					input {
						vertical-align: middle;
					}

					span {
						vertical-align: middle;
					}
				}

				.cart-th1,
				.cart-th3,
				.cart-th4,
				.cart-th5,
				.cart-th6,
				.cart-th7 {
					width: 12.5%;

				}
			}

			.cart-body {
				margin: 15px 0;
				border: 1px solid #ddd;

				.cart-list {
					padding: 10px;
					border-bottom: 1px solid #ddd;
					overflow: hidden;

					&>li {
						float: left;
					}

					.cart-list-con1 {
						width: 4.1667%;
					}

					.cart-list-con2 {
						width: 25%;

						img {
							width: 82px;
							height: 82px;
							float: left;
						}

						.item-msg {
							float: left;
							width: 150px;
							margin: 0 10px;
							line-height: 18px;
						}
					}

					.cart-list-con3 {
						width: 20.8333%;

						.item-txt {
							text-align: center;
						}
					}

					.cart-list-con4 {
						width: 12.5%;

					}

					.cart-list-con5 {
						width: 12.5%;

						.mins {
							border: 1px solid #ddd;
							border-right: 0;
							float: left;
							color: #666;
							width: 6px;
							text-align: center;
							padding: 8px;
						}

						input {
							border: 1px solid #ddd;
							width: 40px;
							height: 33px;
							float: left;
							text-align: center;
							font-size: 14px;
						}

						.plus {
							border: 1px solid #ddd;
							border-left: 0;
							float: left;
							color: #666;
							width: 6px;
							text-align: center;
							padding: 8px;
						}
					}

					.cart-list-con6 {
						width: 12.5%;

						.sum {
							font-size: 16px;
						}
					}

					.cart-list-con7 {
						width: 12.5%;

						a {
							color: #666;
						}
					}
				}
			}
		}

		.cart-tool {
			overflow: hidden;
			border: 1px solid #ddd;

			.select-all {
				padding: 10px;
				overflow: hidden;
				float: left;

				span {
					vertical-align: middle;
				}

				input {
					vertical-align: middle;
				}
			}

			.option {
				padding: 10px;
				overflow: hidden;
				float: left;

				a {
					float: left;
					padding: 0 10px;
					color: #666;
				}
			}

			.money-box {
				float: right;

				.chosed {
					line-height: 26px;
					float: left;
					padding: 0 10px;
				}

				.sumprice {
					width: 200px;
					line-height: 22px;
					float: left;
					padding: 0 10px;

					.summoney {
						color: #c81623;
						font-size: 16px;
					}
				}

				.sumbtn {
					float: right;

					a {
						display: block;
						position: relative;
						width: 96px;
						height: 52px;
						line-height: 52px;
						color: #fff;
						text-align: center;
						font-size: 18px;
						font-family: "Microsoft YaHei";
						background: #e1251b;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>
