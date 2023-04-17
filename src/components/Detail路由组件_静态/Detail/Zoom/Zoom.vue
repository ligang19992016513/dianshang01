<template>
	<div class="spec-preview">
		<img :src="skuDefaultImg" />
		<div class="event" @mousemove="ydsj"></div>
		<div class="big">
			<img :src="skuDefaultImg" />
		</div>
		<div class="mask"></div>
	</div>
</template>

<script>
	export default {
		name: 'Zoom',
		data() {
			return {}
		},
		props: ['skuDefaultImg'],
		methods: {
			ydsj(e) {
				var preview_img = document.querySelector('.event')
				var mask = document.querySelector('.mask')
				var big = document.querySelector('.big')
				var img = document.querySelector('.big>img')
				if (e.pageX - 75 - preview_img.offsetLeft - mask.offsetWidth / 2 < 0) {
					var x = 0
					var X = 0
				} else if (e.pageX - 75 - preview_img.offsetLeft - mask.offsetWidth / 2 > preview_img
					.offsetWidth - mask.offsetWidth) {
					x = preview_img.offsetWidth - mask.offsetWidth
					X = img.offsetWidth - big.offsetWidth
				} else {
					var x = e.pageX - 75 - preview_img.offsetLeft - mask.offsetWidth / 2
					var X = x * ((img.offsetWidth - big.offsetWidth) / (preview_img.offsetWidth - mask
						.offsetWidth))
				}
				if (e.pageY - 242 - preview_img.offsetTop - mask.offsetHeight / 2 < 0) {
					var y = 0
					var Y = 0
				} else if (e.pageY - 242 - preview_img.offsetTop - mask.offsetHeight / 2 > preview_img
					.offsetHeight - mask.offsetHeight) {
					y = preview_img.offsetHeight - mask.offsetHeight
					Y = img.offsetHeight - big.offsetHeight
				} else {
					var y = e.pageY - 242 - preview_img.offsetTop - mask.offsetHeight / 2
					var Y = y * ((img.offsetHeight - big.offsetHeight) / (preview_img.offsetHeight - mask
						.offsetHeight))
				}
				mask.style.left = x + 'px'
				mask.style.top = y + 'px'
				img.style.left = -X + 'px'
				img.style.top = -Y + 'px'

			}
		}
	}
</script>

<style lang="less">
	.spec-preview {
		position: relative;
		width: 400px;
		height: 400px;
		border: 1px solid #ccc;

		img {
			width: 100%;
			height: 100%;
		}

		.event {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 998;
		}

		.mask {
			width: 50%;
			height: 50%;
			background-color: rgba(0, 255, 0, 0.3);
			position: absolute;
			left: 0;
			top: 0;
			display: none;
		}

		.big {
			width: 100%;
			height: 100%;
			position: absolute;
			top: -1px;
			left: 100%;
			border: 1px solid #aaa;
			overflow: hidden;
			z-index: 998;
			display: none;
			background: white;

			img {
				width: 200%;
				max-width: 200%;
				height: 200%;
				position: absolute;
				left: 0;
				top: 0;
			}
		}

		.event:hover~.mask,
		.event:hover~.big {
			display: block;
		}
	}
</style>
