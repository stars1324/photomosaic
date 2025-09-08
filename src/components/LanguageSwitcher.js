// 语言切换组件
class LanguageSwitcher {
    constructor() {
        this.createLanguageSwitcher();
        this.bindEvents();
    }

    createLanguageSwitcher() {
        // 创建语言切换器HTML结构
        const languageSwitcherHTML = `
            <div class="language-switcher" id="language-switcher">
                <button class="language-current" id="language-current" aria-label="选择语言">
                    <span class="language-flag" id="current-flag">${window.i18n.translations[window.i18n.getCurrentLanguage()].flag}</span>
                    <span class="language-name" id="current-name">${window.i18n.translations[window.i18n.getCurrentLanguage()].name}</span>
                    <svg class="language-arrow" viewBox="0 0 24 24" width="16" height="16">
                        <path d="M7 10l5 5 5-5z"/>
                    </svg>
                </button>
                <div class="language-dropdown" id="language-dropdown">
                    ${this.generateLanguageOptions()}
                </div>
            </div>
        `;

        // 将语言切换器添加到页面头部
        const header = document.querySelector('header');
        if (header) {
            header.insertAdjacentHTML('beforeend', languageSwitcherHTML);
        }
    }

    generateLanguageOptions() {
        const languages = window.i18n.getAvailableLanguages();
        return languages.map(lang => `
            <button class="language-option ${lang.code === window.i18n.getCurrentLanguage() ? 'active' : ''}" 
                    data-language="${lang.code}" 
                    aria-label="切换到${lang.name}">
                <span class="language-flag">${lang.flag}</span>
                <span class="language-name">${lang.name}</span>
            </button>
        `).join('');
    }

    bindEvents() {
        // 切换下拉菜单显示/隐藏
        document.addEventListener('click', (e) => {
            const languageCurrent = document.getElementById('language-current');
            const languageDropdown = document.getElementById('language-dropdown');

            if (e.target.closest('#language-current')) {
                e.preventDefault();
                languageDropdown.classList.toggle('show');
            } else if (!e.target.closest('#language-switcher')) {
                languageDropdown.classList.remove('show');
            }
        });

        // 语言选择事件
        document.addEventListener('click', (e) => {
            if (e.target.closest('.language-option')) {
                const option = e.target.closest('.language-option');
                const language = option.dataset.language;
                this.switchLanguage(language);
            }
        });

        // 键盘导航支持
        document.addEventListener('keydown', (e) => {
            const languageDropdown = document.getElementById('language-dropdown');
            if (e.key === 'Escape' && languageDropdown.classList.contains('show')) {
                languageDropdown.classList.remove('show');
                document.getElementById('language-current').focus();
            }
        });
    }

    switchLanguage(language) {
        // 切换语言
        window.i18n.setLanguage(language);

        // 更新当前语言显示
        this.updateCurrentLanguage();

        // 更新下拉菜单中的活动状态
        this.updateActiveOption(language);

        // 隐藏下拉菜单
        document.getElementById('language-dropdown').classList.remove('show');

        // 触发自定义事件
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language }
        }));
    }

    updateCurrentLanguage() {
        const currentLang = window.i18n.translations[window.i18n.getCurrentLanguage()];
        document.getElementById('current-flag').textContent = currentLang.flag;
        document.getElementById('current-name').textContent = currentLang.name;
    }

    updateActiveOption(activeLanguage) {
        const options = document.querySelectorAll('.language-option');
        options.forEach(option => {
            if (option.dataset.language === activeLanguage) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
}

// 页面加载完成后初始化语言切换器
document.addEventListener('DOMContentLoaded', () => {
    // 初始化语言切换器
    window.languageSwitcher = new LanguageSwitcher();

    // 初始化页面语言
    window.i18n.updatePage();

    // 监听语言变化事件
    document.addEventListener('languageChanged', (e) => {
        console.log('Language changed to:', e.detail.language);

        // 这里可以添加其他需要在语言切换时执行的逻辑
        // 比如重新加载某些数据、更新动态内容等
    });
});

export default LanguageSwitcher;
