<template>
	<div class="register-container">
		<!-- 注册内容 -->
		<form class="register">
			<h3>注册新用户
				<span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
				</span>
			</h3>
			<div class="content">
				<label>手机号:</label>
				<input type="text" placeholder="请输入你的手机号" v-model="FormData.phone">
				<span class="error-msg">{{yhm}}
					<!-- 错误提示信息 -->
				</span>
			</div>
			<div class="content">
				<label>验证码:</label>
				<input type="text" placeholder="请输入验证码" v-model="FormData.pwy">
				<button @click.prevent="yzm()">获取验证码</button>
				<span class="error-msg">{{yzms}}
					<!-- 错误提示信息 -->
				</span>
			</div>
			<div class="content">
				<label>登录密码:</label>
				<input type="text" placeholder="请输入你的登录密码" v-model="FormData.list">
				<span class="error-msg">{{mmqd}}
					<!-- 错误提示信息 -->
				</span>
			</div>
			<div class="content">
				<label>确认密码:</label>
				<input type="text" placeholder="请输入确认密码" v-model="FormData.mylist">
				<span class="error-msg">{{cfmm}}
					<!-- 错误提示信息 -->
				</span>
			</div>
			<div class="controls">
				<input name="m1" type="checkbox" v-model="FormData.flag">
				<span>同意协议并注册《尚品汇用户协议》</span>
				<span class="error-msg">{{qdxy}}
					<!-- 错误提示信息 -->
				</span>
			</div>
			<div class="btn">
				<button @click.prevent="zc()">完成注册</button>
			</div>
		</form>

		<!-- 底部 -->
		<div class="copyright">
			<ul>
				<li>关于我们</li>
				<li>联系我们</li>
				<li>联系客服</li>
				<li>商家入驻</li>
				<li>营销中心</li>
				<li>手机尚品汇</li>
				<li>销售联盟</li>
				<li>尚品汇社区</li>
			</ul>
			<div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
			<div class="beian">京ICP备19006430号
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Register',
		data() {
			return {
				yhm:'1',
				yzms:'1',
				mmqd:'1',
				cfmm:'1',
				qdxy:'1',
				FormData: {
					phone: '',
					pwy:'',
					list:'',
					mylist:'',
					flag:true,
				}
			}
		},
		methods: {
			yzm() {
				var reg=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/g
				if (reg.test(this.FormData.phone)) {
					this.$http.get('/api/user/passport/sendCode/' + this.FormData.phone).then(res => {
						console.log(res)
						alert('你的验证码为:'+res.data)
						this.FormData.pwy=res.data
					})
				} else {
					this.yzms='你输入的手机号不合法'
				}
			},
			zc(){
				if(this.FormData.mylist===this.FormData.list){
					this.$http.post('/api/user/passport/register',{
						phone:this.FormData.phone,
						password:this.FormData.list,
						code:this.FormData.pwy
					}).then(res=>{
						console.log(res)
						if(res.code===200){
							this.$router.push('/Login')
						}else{
							alert(res.message)
						}
					})
				}else{
					this.cfmm='两次密码不一致,请重新输入'
					this.FormData.mylist=''
					this.FormData.list=''
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.register-container {
		.register {
			width: 1200px;
			height: 445px;
			border: 1px solid rgb(223, 223, 223);
			margin: 0 auto;

			h3 {
				background: #ececec;
				margin: 0;
				padding: 6px 15px;
				color: #333;
				border-bottom: 1px solid #dfdfdf;
				font-size: 20.04px;
				line-height: 30.06px;

				span {
					font-size: 14px;
					float: right;

					a {
						color: #e1251b;
					}
				}
			}

			div:nth-of-type(1) {
				margin-top: 40px;
			}

			.content {
				padding-left: 390px;
				margin-bottom: 18px;
				position: relative;

				label {
					font-size: 14px;
					width: 96px;
					text-align: right;
					display: inline-block;
				}

				input {
					width: 270px;
					height: 38px;
					padding-left: 8px;
					box-sizing: border-box;
					margin-left: 5px;
					outline: none;
					border: 1px solid #999;
				}

				img {
					vertical-align: sub;
				}

				.error-msg {
					position: absolute;
					top: 100%;
					left: 495px;
					color: red;
				}
			}

			.controls {
				text-align: center;
				position: relative;

				input {
					vertical-align: middle;
				}

				.error-msg {
					position: absolute;
					top: 100%;
					left: 495px;
					color: red;
				}
			}

			.btn {
				text-align: center;
				line-height: 36px;
				margin: 17px 0 0 55px;

				button {
					outline: none;
					width: 270px;
					height: 36px;
					background: #e1251b;
					color: #fff !important;
					display: inline-block;
					font-size: 16px;
				}
			}
		}

		.copyright {
			width: 1200px;
			margin: 0 auto;
			text-align: center;
			line-height: 24px;

			ul {
				li {
					display: inline-block;
					border-right: 1px solid #e4e4e4;
					padding: 0 20px;
					margin: 15px 0;
				}
			}
		}
	}
</style>
