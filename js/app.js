window.addEventListener('DOMContentLoaded', function () {
	let ua = window.navigator.userAgent;
	const msie = ua.indexOf("MSIE ");
	const isMobile = {
		Android: function () { return navigator.userAgent.match(/Android/i); },
		BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
		iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
		Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
		Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};
	function isIE() {
		ua = navigator.userAgent;
		const isIe = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return isIe;
	}
	if (isIE()) {
		document.querySelector('html').classList.add('ie');
	}
	if (isMobile.any()) {
		document.querySelector('html').classList.add('_touch');
	}

	function testWebP(callback) {
		const webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	testWebP(function (support) {
		if (support === true) {
			document.querySelector('html').classList.add('_webp');
		} else {
			document.querySelector('html').classList.add('_no-webp');
		}
	});

	function ibg() {
		if (isIE()) {
			let ibg = document.querySelectorAll("._ibg");
			ibg.forEach((item) => {
				if (item.querySelector('img') && item.querySelector('img').getAttribute('src') != null) {
					item.style.backgroundImage = 'url(' + item.querySelector('img').getAttribute('src') + ')';
				}
			});
			// for (var i = 0; i < ibg.length; i++) {
			// 	if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
			// 		ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			// 	}
			// }
		}
	}
	ibg();

	window.addEventListener("load", function () {
		if (document.querySelector('.wrapper')) {
			setTimeout(function () {
				document.querySelector('.wrapper').classList.add('_loaded');
			}, 0);
		}
	});

	let unlock = true;

	//=================
	//Menu
	let iconMenu = document.querySelector(".icon-menu");
	if (iconMenu != null) {
		let delay = 500;
		let menuBody = document.querySelector(".menu__body");
		iconMenu.addEventListener("click", function (e) {
			if (unlock) {
				bodyLock(delay);
				iconMenu.classList.toggle("_active");
				menuBody.classList.toggle("_active");
			}
		});
	}

	function menuClose() {
		let iconMenu = document.querySelector(".icon-menu");
		let menuBody = document.querySelector(".menu__body");
		iconMenu.classList.remove("_active");
		menuBody.classList.remove("_active");
	}
	//=================
	//BodyLock
	function bodyLock(delay) {
		let body = document.querySelector("body");
		if (body.classList.contains('_lock')) {
			bodyLockRemove(delay);
		} else {
			bodyLockAdd(delay);
		}
	}

	function bodyLockRemove(delay) {
		let body = document.querySelector("body");
		if (unlock) {
			let lockPadding = document.querySelectorAll("._lp");
			setTimeout(() => {
				for (let index = 0; index < lockPadding.length; index++) {
					const el = lockPadding[index];
					el.style.paddingRight = '0px';
				}
				body.style.paddingRight = '0px';
				body.classList.remove("_lock");
			}, delay);
			unlock = false;
			setTimeout(function () {
				unlock = true;
			}, delay);
		}
	}

	function bodyLockAdd(delay) {
		let body = document.querySelector("body");
		if (unlock) {
			let lockPadding = document.querySelectorAll("._lp");
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
			}
			body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
			body.classList.add("_lock");
			unlock = false;
			setTimeout(function () {
				unlock = true;
			}, delay);
		}
	}
	//=================
});