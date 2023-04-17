window.onload = function() {
	var preview_img = document.querySelector('.event')
	var mask = document.querySelector('.mask')
	var big = document.querySelector('.big')
	var img = document.querySelector('.big>img')
	fdj(preview_img,mask,img,big)
	function fdj(nimimg,nimdiv,maximg,maxdiv){
		var maskX = nimdiv.offsetLeft
		var maskY = nimdiv.offsetTop
		var imgX = maximg.offsetLeft
		var imgY = maximg.offsetTop
		console.log(imgX, imgY);
		nimimg.addEventListener('mouseover', function(e) {
			nimdiv.style.display = 'block'
			maxdiv.style.display = 'block'
			nimimg.addEventListener('mousemove', function(e) {
		
				if (e.pageX - nimimg.offsetLeft - nimdiv.offsetWidth / 2 < 0) {
					var x = 0
					var X = 0
				} else if (e.pageX - nimimg.offsetLeft - nimdiv.offsetWidth / 2 > nimimg
					.offsetWidth - nimdiv.offsetWidth) {
					x = nimimg.offsetWidth - nimdiv.offsetWidth
					X = maximg.offsetWidth - maxdiv.offsetWidth
				} else {
					x = e.pageX - nimimg.offsetLeft - nimdiv.offsetWidth / 2
					X = x * ((maximg.offsetWidth - maxdiv.offsetWidth) / (nimimg.offsetWidth - nimdiv
						.offsetWidth))
				}
				if (e.pageY - nimimg.offsetTop - nimdiv.offsetHeight / 2 < 0) {
					var y = 0
					var Y = 0
				} else if (e.pageY - nimimg.offsetTop - nimdiv.offsetHeight / 2 > nimimg
					.offsetHeight - nimdiv.offsetHeight) {
					y = nimimg.offsetHeight - nimdiv.offsetHeight
					Y = img.offsetHeight - maxdiv.offsetHeight
				} else {
					y = e.pageY - nimimg.offsetTop - nimdiv.offsetHeight / 2
					Y = y * ((maximg.offsetHeight - maxdiv.offsetHeight) / (nimimg.offsetHeight - nimdiv
						.offsetHeight))
				}
				nimdiv.style.left = maskX + x + 'px'
				nimdiv.style.top = maskY + y + 'px'
				maximg.style.left = imgX - X + 'px'
				maximg.style.top = imgY - Y + 'px'
			})
		
		})
		nimimg.addEventListener('mouseout', function() {
			nimdiv.style.display = 'none'
			maxdiv.style.display = 'none'
		})
	}
}
