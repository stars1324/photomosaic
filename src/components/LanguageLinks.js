// 语言链接组件
class LanguageLinks {
    constructor() {
        this.createLanguageLinks();
        this.bindEvents();
        this.handleURLChange();
    }

    createLanguageLinks() {
        // 创建语言链接HTML结构
        const languageLinksHTML = `
            <div class="language-links" id="language-links">
                ${this.generateLanguageLinks()}
            </div>
        `;

        // 将语言链接添加到页面头部
        const header = document.querySelector('header');
        if (header) {
            header.insertAdjacentHTML('beforeend', languageLinksHTML);
        }
    }

    generateLanguageLinks() {
        const links = window.i18n.getLanguageLinks();
        return links.map(link => `
            <a href="${link.url}" 
               class="language-link ${link.active ? 'active' : ''}" 
               data-language="${link.code}"
               title="Switch to ${link.name}">
                <span class="language-flag">${link.flag}</span>
                <span class="language-name">${link.name}</span>
            </a>
        `).join('');
    }

    bindEvents() {
        // 监听语言链接点击事件
        document.addEventListener('click', (e) => {
            if (e.target.closest('.language-link')) {
                e.preventDefault();
                const link = e.target.closest('.language-link');
                const language = link.dataset.language;
                this.switchLanguage(language);
            }
        });

        // 监听浏览器后退/前进按钮
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.language) {
                window.i18n.currentLanguage = e.state.language;
                window.i18n.updatePage();
                this.updateActiveLink();
            } else {
                this.handleURLChange();
            }
        });
    }

    handleURLChange() {
        // 处理页面加载时的URL语言参数
        const urlLang = window.i18n.getLanguageFromURL();
        if (urlLang && urlLang !== window.i18n.getCurrentLanguage()) {
            window.i18n.currentLanguage = urlLang;
            window.i18n.setStoredLanguage(urlLang);
            window.i18n.updatePage();
            this.updateActiveLink();
        }
    }

    switchLanguage(language) {
        // 切换语言
        window.i18n.setLanguage(language);

        // 更新链接状态
        this.updateActiveLink();

        // 触发自定义事件
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language }
        }));
    }

    updateActiveLink() {
        const links = document.querySelectorAll('.language-link');
        const currentLang = window.i18n.getCurrentLanguage();

        links.forEach(link => {
            if (link.dataset.language === currentLang) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }

            // 更新href属性
            const url = new URL(window.location);
            url.searchParams.set('lang', link.dataset.language);
            link.href = url.toString();
        });
    }

    // 刷新语言链接
    refresh() {
        const container = document.getElementById('language-links');
        if (container) {
            container.innerHTML = this.generateLanguageLinks();
        }
    }
}

// 页面加载完成后初始化语言链接
document.addEventListener('DOMContentLoaded', () => {
    // 初始化语言链接
    window.languageLinks = new LanguageLinks();

    // 初始化页面语言
    window.i18n.updatePage();

    // 监听语言变化事件
    document.addEventListener('languageChanged', (e) => {
        console.log('Language changed to:', e.detail.language);

        // 这里可以添加其他需要在语言切换时执行的逻辑
        // 比如重新加载某些数据、更新动态内容等
    });
});

export default LanguageLinks;
