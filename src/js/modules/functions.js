/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
export function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}
// Меню бургер
export function mobilMenu() {
	const iconMenu = document.querySelector('.menu__icon');
	const menuBody = document.querySelector('.menu__body');
	if (iconMenu) {
		iconMenu.addEventListener("click", function (e) {
			document.body.classList.toggle('_lock');
			iconMenu.classList.toggle('_active');
			menuBody.classList.toggle('_active');
		});
	}

	// Прокрутка при клике
	// const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
	// if (menuLinks.length > 0) {
	// 	menuLinks.forEach(menuLink => {
	// 		menuLink.addEventListener("click", onMenuLinkClick);
	// 	});

	// 	function onMenuLinkClick(e) {
	// 		const menuLink = e.target;
	// 		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
	// 			const gotoBlock = document.querySelector(menuLink.dataset.goto);
	// 			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollX - document.querySelector('header').offsetHeight;

	document.querySelectorAll('a[href^="#"').forEach(link => {

		link.addEventListener('click', function (e) {
			e.preventDefault();
	
			let href = this.getAttribute('href').substring(1);
	
			const scrollTarget = document.getElementById(href);
	
			const topOffset = document.querySelector('.header').offsetHeight;
			// const topOffset = 0; // если не нужен отступ сверху 
			const elementPosition = scrollTarget.getBoundingClientRect().top;
			const offsetPosition = elementPosition - topOffset;

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			// window.scrollTo({
			// 	top: gotoBlockValue,
			// 	behavior: "smooth"
			// });
			// e.preventDefault();
			window.scrollBy({
				top: offsetPosition,
				behavior: 'smooth'
			});
		});	
	});
};
// Анимация в офере по кругу
export function circle() {
	const text = document.querySelector(".item-circle__text p");
	text.innerHTML = text.innerText.split("").map((letter, i) =>
	`<span style="transform:rotate(${i * 7.5}deg")>${letter}</span>`
	)
	.join("");
}


// Scroll To top
export function scrollTop() {
	let topBtn = document.querySelector('.footer__icon-top');

	topBtn.addEventListener("click", scrollToTop);

	function scrollToTop() {
		window.scrollTo({
    		top: 0,
    		behavior: "smooth"
		});
	}
}


