<template>
	<div class="cart-complete-wrap">
		<div class="cart-complete">
			<h3><i class="sui-icon icon-pc-right"></i>商品已成功加入购物车！</h3>
			<div class="goods">
				<div class="left-good">
					<div class="left-pic">
						<img :src="good.skuDefaultImg">
					</div>
					<div class="right-info">
						<p class="title">{{good.skuName}}</p>
						<p class="attr">
							颜色：WFZ5099IH/5L钛金釜内胆 数量：{{skuNum}}
							</p>
					</div>
				</div>
				<div class="right-gocart">
					<a href="javascript:" class="sui-btn btn-xlarge" @click="fh()">查看商品详情</a>
					<a href="javascript:" @click="gwc()">去购物车结算 > </a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'AddCartSuccess',
		data() {
			return {
				good: {
					skuDefaultImg: '',
					skuImageList: [],
					skuName: '',
					skuDesc: '',
					price: '',
					skuSaleAttrValueList: []
				},
				skuId: '',
				skuNum: '',
			}
		},
		mounted() {
			this.postAddCartSuccess()
		},
		methods: {
			postAddCartSuccess() {
				this.skuId = this.$route.params.skuId
				this.skuNum = this.$route.params.skuNum
				this.$http.post('/api/cart/addToCart/' + this.skuId + '/' + this.skuNum).then(res => {
					console.log(res)
				})
				this.$http.get('/api/item/' + this.skuId).then(res => {
					console.log(res.data)
					this.good = res.data.skuInfo
				})
			},
			fh(){
				this.$router.go(-1)
			},
			gwc(){
				this.$router.push('/ShopCart')
			}
		}
	}
</script>

<style lang="less" scoped>
	.cart-complete-wrap {
		background-color: #f4f4f4;

		.cart-complete {
			width: 1200px;
			margin: 0 auto;

			h3 {
				font-weight: 400;
				font-size: 16px;
				color: #6aaf04;
				padding-top: 15px;
				padding-bottom: 15px;
				margin: 0;

				.icon-pc-right {
					background-color: #fff;
					border: 2px solid #6aaf04;
					padding: 3px;
					margin-right: 8px;
					border-radius: 15px;
				}
			}

			.goods {
				overflow: hidden;
				padding: 10px 0;

				.left-good {
					float: left;

					.left-pic {
						border: 1px solid #dfdfdf;
						width: 60px;
						float: left;

						img {
							width: 60px;
							height: 60px;
						}
					}

					.right-info {
						color: #444;
						float: left;
						margin-left: 10px;

						.title {
							width: 100%;
							line-height: 28px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-size: 14px;
						}

						.attr {
							color: #aaa;
						}
					}
				}

				.right-gocart {
					float: right;

					a {
						padding: 7px 36px;
						font-size: 15px;
						line-height: 22px;
						color: #333;
						background-color: #eee;
						text-decoration: none;
						box-sizing: border-box;
						border: 1px solid #e1e1e1;
					}

					a:hover {
						background-color: #f7f7f7;
						border: 1px solid #eaeaea;
					}

					a:active {
						background-color: #e1e1e1;
						border: 1px solid #d5d5d5;
					}

					.btn-danger {
						background-color: #e1251b;
						color: #fff;
					}

					.btn-danger:hover {
						background-color: #e1251b;
					}
				}

			}
		}
	}
</style>
