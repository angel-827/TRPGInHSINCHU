// 导航菜单切换
document.getElementById('menu-toggle').addEventListener('click', function() {
	const navMenu = document.getElementById('nav-menu');
	navMenu.classList.toggle('hidden');
	navMenu.classList.toggle('flex');
});
// 获取语言选择器和下拉菜单
const languageSelector = document.getElementById('language-selector');
const languageDropdown = document.getElementById('language-dropdown');
const currentLanguage = document.getElementById('current-language');

// 显示或隐藏语言下拉菜单
languageSelector.addEventListener('click', () => {
	languageDropdown.classList.toggle('hidden');
});

// 处理语言切换事件
const languageOptions = document.querySelectorAll('.language-option');
languageOptions.forEach(option => {
	option.addEventListener('click', () => {
		const selectedLanguage = option.dataset.lang;
		currentLanguage.textContent = option.textContent;
		languageDropdown.classList.add('hidden');

		// 更新页面上的文本
		const elements = document.querySelectorAll('[data-lang-key]');
		elements.forEach(element => {
			const langKey = element.dataset.langKey;
			if (languages[selectedLanguage][langKey]) {
				if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
					element.placeholder = languages[selectedLanguage][langKey];
				} else {
					element.innerHTML = languages[selectedLanguage][langKey];
				}
			}
		});
	});
});

// 实时更新时间
function updateTime() {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');
	
	document.getElementById('current-time').textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 初始化时间并每秒更新一次
updateTime();
setInterval(updateTime, 1000);
setInterval(updateTime, 1000);

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function(e) {
		e.preventDefault();
		
		const targetId = this.getAttribute('href');
		const targetElement = document.querySelector(targetId);
		
		if (targetElement) {
			window.scrollTo({
				top: targetElement.offsetTop - 100,
				behavior: 'smooth'
			});
			
			// 在移动设备上点击导航链接后关闭菜单
			if (window.innerWidth < 768) {
				const navMenu = document.getElementById('nav-menu');
				navMenu.classList.add('hidden');
				navMenu.classList.remove('flex');
			}
		}
	});
});