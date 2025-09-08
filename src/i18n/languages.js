// 多语言配置文件
const languages = {
    zh: {
        name: '中文',
        flag: '🇨🇳',
        data: {
            // Meta 信息
            title: '千图成像工具 - 在线马赛克拼图生成器 | 免费照片马赛克制作',
            description: '专业的千图成像在线工具，支持上传多张背景图片生成艺术马赛克效果图。免费使用，无需安装，支持高质量输出，适合个人创作和商业设计。',
            keywords: '千图成像,马赛克拼图,照片马赛克,图片拼接,在线设计工具,艺术效果,免费工具,图像处理',

            // 页面标题和描述
            pageTitle: '千图成像工具',
            pageSubtitle: '上传目标图片和背景图片库，生成艺术马赛克效果图',

            // 使用说明
            instructionsTitle: '使用说明',
            instructions: [
                '上传多张背景图片或ZIP包到"背景图片库"区。',
                '上传一张目标图片到"目标图片"区。',
                '可调整分割精度、输出质量、是否允许背景图复用。',
                '点击"开始生成"按钮，等待进度完成。',
                '生成结果将在下方预览，可下载PNG/JPG。'
            ],

            // 上传区域
            bgUploadTitle: '背景图片库上传',
            bgUploadText: '拖拽多张图片或ZIP文件到此处，支持JPG、PNG、WebP等格式',
            bgUploadBtn: '选择文件',
            bgUploadCount: '已上传: {count} 张图片',
            bgClearBtn: '清空图库',
            bgUploadHelp: '建议上传50-200张不同的高质量图片以获得最佳马赛克效果',

            targetUploadTitle: '目标图片上传',
            targetUploadText: '拖拽目标图片到此处，将被转换为马赛克艺术作品',
            targetUploadBtn: '选择图片',
            targetUploadHelp: '支持JPG、PNG、WebP格式，建议使用高分辨率图片',
            targetRemoveBtn: '移除',

            // 配置区域
            configTitle: '马赛克生成参数配置',
            gridSizeLabel: '分割精度 (网格数量):',
            gridSizeHelp: '数值越大，马赛克细节越丰富，但生成时间越长。推荐值：50-100',
            outputQualityLabel: '输出质量:',
            qualityStandard: '标准质量 (适合网页预览和社交分享)',
            qualityHigh: '高质量 (适合打印和专业用途)',
            qualityUltra: '超高质量 (适合大幅面打印)',
            qualityHelp: '质量越高，生成的马赛克图片分辨率越大，文件也越大',
            allowReuseLabel: '允许重复使用背景图片',
            allowReuseHelp: '允许重复可提高匹配度，但可能降低视觉多样性',

            // 操作按钮
            generateBtn: '开始生成马赛克',
            resetBtn: '重置',
            generateHelp: '请先上传背景图片库和目标图片',

            // 进度和结果
            progressTitle: '生成进度',
            progressPreparing: '准备中...',
            resultTitle: '马赛克生成结果',
            downloadPngBtn: '下载 PNG',
            downloadJpgBtn: '下载 JPG',
            resultDescription: '您的马赛克艺术作品已生成完成！可以右键保存或点击下载按钮获取高清图片。',

            // 页脚
            footerCopyright: '© 2025 千图成像工具 - 专业的在线马赛克拼图生成器',
            footerFeatures: '免费使用 • 无需注册 • 支持多种格式 • 高质量输出',
            tutorial: '使用教程',
            faq: '常见问题',
            contact: '联系我们',
            privacy: '隐私政策'
        }
    },

    en: {
        name: 'English',
        flag: '🇺🇸',
        data: {
            // Meta information
            title: 'Photo Mosaic Tool - Online Mosaic Generator | Free Photo Mosaic Creator',
            description: 'Professional online photo mosaic tool. Upload multiple background images to create artistic mosaic effects. Free to use, no installation required, high-quality output for personal and commercial design.',
            keywords: 'photo mosaic,mosaic generator,photo collage,image mosaic,online design tool,artistic effects,free tool,image processing',

            // Page title and description
            pageTitle: 'Photo Mosaic Tool',
            pageSubtitle: 'Upload target image and background image library to create artistic mosaic effects',

            // Instructions
            instructionsTitle: 'How to Use',
            instructions: [
                'Upload multiple background images or ZIP files to the "Background Library" section.',
                'Upload one target image to the "Target Image" section.',
                'Adjust grid precision, output quality, and background image reuse settings.',
                'Click "Generate Mosaic" button and wait for completion.',
                'Preview the result below and download in PNG/JPG format.'
            ],

            // Upload areas
            bgUploadTitle: 'Background Image Library',
            bgUploadText: 'Drag multiple images or ZIP files here, supports JPG, PNG, WebP formats',
            bgUploadBtn: 'Select Files',
            bgUploadCount: 'Uploaded: {count} images',
            bgClearBtn: 'Clear Library',
            bgUploadHelp: 'Recommend uploading 50-200 different high-quality images for best mosaic effects',

            targetUploadTitle: 'Target Image Upload',
            targetUploadText: 'Drag target image here to convert into mosaic artwork',
            targetUploadBtn: 'Select Image',
            targetUploadHelp: 'Supports JPG, PNG, WebP formats. High-resolution images recommended',
            targetRemoveBtn: 'Remove',

            // Configuration
            configTitle: 'Mosaic Generation Parameters',
            gridSizeLabel: 'Grid Precision (Grid Count):',
            gridSizeHelp: 'Higher values create more detailed mosaics but take longer to generate. Recommended: 50-100',
            outputQualityLabel: 'Output Quality:',
            qualityStandard: 'Standard Quality (suitable for web preview and social sharing)',
            qualityHigh: 'High Quality (suitable for printing and professional use)',
            qualityUltra: 'Ultra Quality (suitable for large format printing)',
            qualityHelp: 'Higher quality produces larger resolution images and file sizes',
            allowReuseLabel: 'Allow background image reuse',
            allowReuseHelp: 'Allowing reuse improves matching accuracy but may reduce visual diversity',

            // Action buttons
            generateBtn: 'Generate Mosaic',
            resetBtn: 'Reset',
            generateHelp: 'Please upload background library and target image first',

            // Progress and results
            progressTitle: 'Generation Progress',
            progressPreparing: 'Preparing...',
            resultTitle: 'Mosaic Generation Result',
            downloadPngBtn: 'Download PNG',
            downloadJpgBtn: 'Download JPG',
            resultDescription: 'Your mosaic artwork is complete! Right-click to save or use download buttons for high-quality images.',

            // Footer
            footerCopyright: '© 2025 Photo Mosaic Tool - Professional Online Mosaic Generator',
            footerFeatures: 'Free to Use • No Registration • Multiple Formats • High Quality Output',
            tutorial: 'Tutorial',
            faq: 'FAQ',
            contact: 'Contact',
            privacy: 'Privacy Policy'
        }
    },

    ja: {
        name: '日本語',
        flag: '🇯🇵',
        data: {
            // メタ情報
            title: 'フォトモザイクツール - オンラインモザイクジェネレーター | 無料写真モザイク作成',
            description: 'プロフェッショナルなオンラインフォトモザイクツール。複数の背景画像をアップロードして芸術的なモザイク効果を作成。無料で使用でき、インストール不要、高品質出力で個人および商用デザインに対応。',
            keywords: 'フォトモザイク,モザイクジェネレーター,写真コラージュ,画像モザイク,オンラインデザインツール,芸術効果,無料ツール,画像処理',

            // ページタイトルと説明
            pageTitle: 'フォトモザイクツール',
            pageSubtitle: 'ターゲット画像と背景画像ライブラリをアップロードして、芸術的なモザイク効果を作成',

            // 使用方法
            instructionsTitle: '使用方法',
            instructions: [
                '複数の背景画像またはZIPファイルを「背景画像ライブラリ」セクションにアップロードします。',
                'ターゲット画像を「ターゲット画像」セクションにアップロードします。',
                'グリッド精度、出力品質、背景画像の再利用設定を調整します。',
                '「モザイク生成」ボタンをクリックして完了を待ちます。',
                '下部で結果をプレビューし、PNG/JPG形式でダウンロードします。'
            ],

            // アップロード領域
            bgUploadTitle: '背景画像ライブラリ',
            bgUploadText: '複数の画像またはZIPファイルをここにドラッグ、JPG、PNG、WebP形式をサポート',
            bgUploadBtn: 'ファイルを選択',
            bgUploadCount: 'アップロード済み: {count} 枚の画像',
            bgClearBtn: 'ライブラリをクリア',
            bgUploadHelp: '最高のモザイク効果を得るために、50-200枚の異なる高品質画像のアップロードを推奨',

            targetUploadTitle: 'ターゲット画像アップロード',
            targetUploadText: 'ターゲット画像をここにドラッグしてモザイク作品に変換',
            targetUploadBtn: '画像を選択',
            targetUploadHelp: 'JPG、PNG、WebP形式をサポート。高解像度画像を推奨',
            targetRemoveBtn: '削除',

            // 設定
            configTitle: 'モザイク生成パラメータ',
            gridSizeLabel: 'グリッド精度（グリッド数）:',
            gridSizeHelp: '値が大きいほど詳細なモザイクになりますが、生成時間が長くなります。推奨値：50-100',
            outputQualityLabel: '出力品質:',
            qualityStandard: '標準品質（ウェブプレビューとソーシャル共有に適している）',
            qualityHigh: '高品質（印刷とプロ用途に適している）',
            qualityUltra: '超高品質（大判印刷に適している）',
            qualityHelp: '品質が高いほど解像度と ファイルサイズが大きくなります',
            allowReuseLabel: '背景画像の再利用を許可',
            allowReuseHelp: '再利用を許可するとマッチング精度が向上しますが、視覚的多様性が減る可能性があります',

            // アクションボタン
            generateBtn: 'モザイク生成',
            resetBtn: 'リセット',
            generateHelp: '最初に背景ライブラリとターゲット画像をアップロードしてください',

            // 進行状況と結果
            progressTitle: '生成進行状況',
            progressPreparing: '準備中...',
            resultTitle: 'モザイク生成結果',
            downloadPngBtn: 'PNG ダウンロード',
            downloadJpgBtn: 'JPG ダウンロード',
            resultDescription: 'モザイク作品が完成しました！右クリックで保存するか、ダウンロードボタンで高品質画像を取得してください。',

            // フッター
            footerCopyright: '© 2025 フォトモザイクツール - プロフェッショナルオンラインモザイクジェネレーター',
            footerFeatures: '無料使用 • 登録不要 • 複数形式対応 • 高品質出力',
            tutorial: 'チュートリアル',
            faq: 'FAQ',
            contact: 'お問い合わせ',
            privacy: 'プライバシーポリシー'
        }
    },

    ko: {
        name: '한국어',
        flag: '🇰🇷',
        data: {
            // 메타 정보
            title: '포토 모자이크 도구 - 온라인 모자이크 생성기 | 무료 사진 모자이크 제작',
            description: '전문적인 온라인 포토 모자이크 도구입니다. 여러 배경 이미지를 업로드하여 예술적인 모자이크 효과를 만드세요. 무료 사용, 설치 불필요, 개인 및 상업적 디자인을 위한 고품질 출력.',
            keywords: '포토 모자이크,모자이크 생성기,사진 콜라주,이미지 모자이크,온라인 디자인 도구,예술 효과,무료 도구,이미지 처리',

            // 페이지 제목과 설명
            pageTitle: '포토 모자이크 도구',
            pageSubtitle: '타겟 이미지와 배경 이미지 라이브러리를 업로드하여 예술적인 모자이크 효과 생성',

            // 사용 방법
            instructionsTitle: '사용 방법',
            instructions: [
                '여러 배경 이미지 또는 ZIP 파일을 "배경 이미지 라이브러리" 섹션에 업로드하세요.',
                '타겟 이미지를 "타겟 이미지" 섹션에 업로드하세요.',
                '그리드 정밀도, 출력 품질, 배경 이미지 재사용 설정을 조정하세요.',
                '"모자이크 생성" 버튼을 클릭하고 완료될 때까지 기다리세요.',
                '아래에서 결과를 미리 보고 PNG/JPG 형식으로 다운로드하세요.'
            ],

            // 업로드 영역
            bgUploadTitle: '배경 이미지 라이브러리',
            bgUploadText: '여러 이미지 또는 ZIP 파일을 여기에 드래그하세요. JPG, PNG, WebP 형식 지원',
            bgUploadBtn: '파일 선택',
            bgUploadCount: '업로드됨: {count}개 이미지',
            bgClearBtn: '라이브러리 지우기',
            bgUploadHelp: '최상의 모자이크 효과를 위해 50-200개의 서로 다른 고품질 이미지 업로드를 권장합니다',

            targetUploadTitle: '타겟 이미지 업로드',
            targetUploadText: '타겟 이미지를 여기에 드래그하여 모자이크 작품으로 변환',
            targetUploadBtn: '이미지 선택',
            targetUploadHelp: 'JPG, PNG, WebP 형식을 지원합니다. 고해상도 이미지를 권장합니다',
            targetRemoveBtn: '제거',

            // 설정
            configTitle: '모자이크 생성 매개변수',
            gridSizeLabel: '그리드 정밀도 (그리드 수):',
            gridSizeHelp: '값이 클수록 더 세밀한 모자이크가 생성되지만 생성 시간이 길어집니다. 권장값: 50-100',
            outputQualityLabel: '출력 품질:',
            qualityStandard: '표준 품질 (웹 미리보기 및 소셜 공유에 적합)',
            qualityHigh: '고품질 (인쇄 및 전문적 용도에 적합)',
            qualityUltra: '초고품질 (대형 인쇄에 적합)',
            qualityHelp: '품질이 높을수록 해상도와 파일 크기가 커집니다',
            allowReuseLabel: '배경 이미지 재사용 허용',
            allowReuseHelp: '재사용을 허용하면 매칭 정확도가 향상되지만 시각적 다양성이 감소할 수 있습니다',

            // 작업 버튼
            generateBtn: '모자이크 생성',
            resetBtn: '재설정',
            generateHelp: '먼저 배경 라이브러리와 타겟 이미지를 업로드하세요',

            // 진행상황과 결과
            progressTitle: '생성 진행상황',
            progressPreparing: '준비 중...',
            resultTitle: '모자이크 생성 결과',
            downloadPngBtn: 'PNG 다운로드',
            downloadJpgBtn: 'JPG 다운로드',
            resultDescription: '모자이크 작품이 완성되었습니다! 마우스 오른쪽 버튼으로 저장하거나 다운로드 버튼을 사용하여 고품질 이미지를 얻으세요.',

            // 푸터
            footerCopyright: '© 2025 포토 모자이크 도구 - 전문 온라인 모자이크 생성기',
            footerFeatures: '무료 사용 • 등록 불필요 • 다중 형식 지원 • 고품질 출력',
            tutorial: '튜토리얼',
            faq: 'FAQ',
            contact: '문의하기',
            privacy: '개인정보처리방침'
        }
    }
};

// 다국어 관리 클래스
class I18n {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || 'zh';
        this.translations = languages;
    }

    // 저장된 언어 설정 가져오기
    getStoredLanguage() {
        return localStorage.getItem('photomosaic_language');
    }

    // 언어 설정 저장
    setStoredLanguage(language) {
        localStorage.setItem('photomosaic_language', language);
    }

    // 현재 언어 가져오기
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // 언어 설정
    setLanguage(language) {
        if (this.translations[language]) {
            this.currentLanguage = language;
            this.setStoredLanguage(language);
            this.updatePage();
        }
    }

    // 번역 텍스트 가져오기
    t(key, params = {}) {
        const keys = key.split('.');
        let value = this.translations[this.currentLanguage]?.data;

        for (const k of keys) {
            value = value?.[k];
        }

        if (typeof value === 'string' && Object.keys(params).length > 0) {
            // 매개변수 치환
            return value.replace(/\{(\w+)\}/g, (match, param) => {
                return params[param] !== undefined ? params[param] : match;
            });
        }

        return value || key;
    }

    // 사용 가능한 언어 목록
    getAvailableLanguages() {
        return Object.keys(this.translations).map(code => ({
            code,
            name: this.translations[code].name,
            flag: this.translations[code].flag
        }));
    }

    // 페이지 업데이트
    updatePage() {
        // 문서 제목 및 메타 태그 업데이트
        document.title = this.t('title');
        document.querySelector('meta[name="description"]').content = this.t('description');
        document.querySelector('meta[name="keywords"]').content = this.t('keywords');
        document.querySelector('html').lang = this.currentLanguage;

        // Open Graph 메타 태그 업데이트
        document.querySelector('meta[property="og:title"]').content = this.t('pageTitle');
        document.querySelector('meta[property="og:description"]').content = this.t('description');
        document.querySelector('meta[property="og:site_name"]').content = this.t('pageTitle');

        // Twitter 메타 태그 업데이트
        document.querySelector('meta[name="twitter:title"]').content = this.t('pageTitle');
        document.querySelector('meta[name="twitter:description"]').content = this.t('description');

        // JSON-LD 구조화 데이터 업데이트
        const jsonLdScript = document.querySelector('script[type="application/ld+json"]');
        if (jsonLdScript) {
            const jsonLd = JSON.parse(jsonLdScript.textContent);
            jsonLd.name = this.t('pageTitle');
            jsonLd.description = this.t('description');
            jsonLdScript.textContent = JSON.stringify(jsonLd, null, 4);
        }

        // 페이지 콘텐츠 업데이트
        this.updatePageContent();
    }

    // 페이지 콘텐츠 업데이트
    updatePageContent() {
        // 헤더
        const h1 = document.querySelector('header h1');
        if (h1) h1.textContent = this.t('pageTitle');

        const subtitle = document.querySelector('header p');
        if (subtitle) subtitle.textContent = this.t('pageSubtitle');

        // 사용 방법
        const instructionsTitle = document.querySelector('section h2');
        if (instructionsTitle && instructionsTitle.textContent.includes('使用说明') ||
            instructionsTitle.textContent.includes('How to Use') ||
            instructionsTitle.textContent.includes('使用方法') ||
            instructionsTitle.textContent.includes('사용 방법')) {
            instructionsTitle.textContent = this.t('instructionsTitle');
        }

        const instructionsList = document.querySelector('section ol');
        if (instructionsList) {
            const instructions = this.t('instructions');
            instructionsList.innerHTML = instructions.map(instruction =>
                `<li>${instruction}</li>`
            ).join('');
        }

        // 업로드 영역
        this.updateElement('h3', '背景图片库上传', 'bgUploadTitle');
        this.updateElement('[id="bg-drop-zone"] p', null, 'bgUploadText');
        this.updateElement('[id="bg-upload-btn"]', null, 'bgUploadBtn');
        this.updateElement('[id="clear-bg-btn"]', null, 'bgClearBtn');
        this.updateElement('[id="bg-upload-help"]', null, 'bgUploadHelp');

        this.updateElement('h3', '目标图片上传', 'targetUploadTitle');
        this.updateElement('[id="target-drop-zone"] p', null, 'targetUploadText');
        this.updateElement('[id="target-upload-btn"]', null, 'targetUploadBtn');
        this.updateElement('[id="target-upload-help"]', null, 'targetUploadHelp');
        this.updateElement('[id="remove-target-btn"]', null, 'targetRemoveBtn');

        // 설정 영역
        this.updateElement('[id="config-heading"]', null, 'configTitle');
        this.updateElement('label[for="grid-size"]', null, 'gridSizeLabel');
        this.updateElement('[id="grid-size-help"]', null, 'gridSizeHelp');
        this.updateElement('label[for="output-quality"]', null, 'outputQualityLabel');
        this.updateElement('[id="quality-help"]', null, 'qualityHelp');
        this.updateElement('label[for="allow-reuse"]', null, 'allowReuseLabel');
        this.updateElement('[id="reuse-help"]', null, 'allowReuseHelp');

        // 품질 옵션
        const qualitySelect = document.querySelector('#output-quality');
        if (qualitySelect) {
            const options = qualitySelect.querySelectorAll('option');
            if (options[0]) options[0].textContent = this.t('qualityStandard');
            if (options[1]) options[1].textContent = this.t('qualityHigh');
            if (options[2]) options[2].textContent = this.t('qualityUltra');
        }

        // 버튼
        this.updateElement('[id="generate-btn"]', null, 'generateBtn');
        this.updateElement('[id="reset-btn"]', null, 'resetBtn');
        this.updateElement('[id="generate-help"]', null, 'generateHelp');

        // 진행상황 및 결과
        this.updateElement('[id="progress-heading"]', null, 'progressTitle');
        this.updateElement('[id="result-heading"]', null, 'resultTitle');
        this.updateElement('[id="download-png-btn"]', null, 'downloadPngBtn');
        this.updateElement('[id="download-jpg-btn"]', null, 'downloadJpgBtn');
        this.updateElement('.result-description', null, 'resultDescription');

        // 푸터
        const footerP = document.querySelectorAll('footer p');
        if (footerP[0]) footerP[0].textContent = this.t('footerCopyright');
        if (footerP[1]) footerP[1].textContent = this.t('footerFeatures');

        const footerLinks = document.querySelectorAll('footer a');
        const linkKeys = ['tutorial', 'faq', 'contact', 'privacy'];
        footerLinks.forEach((link, index) => {
            if (linkKeys[index]) {
                link.textContent = this.t(linkKeys[index]);
            }
        });

        // 업로드 카운트 업데이트
        this.updateBgCount();
    }

    // 요소 업데이트 헬퍼
    updateElement(selector, fallbackText, translationKey) {
        const element = document.querySelector(selector);
        if (element && (fallbackText === null || element.textContent.includes(fallbackText))) {
            element.textContent = this.t(translationKey);
        }
    }

    // 배경 이미지 카운트 업데이트
    updateBgCount() {
        const bgCountElement = document.querySelector('#bg-count');
        if (bgCountElement && window.backgroundImages) {
            const count = window.backgroundImages.length;
            bgCountElement.textContent = this.t('bgUploadCount', { count });
        }
    }
}

// 전역 i18n 인스턴스
window.i18n = new I18n();

export default window.i18n;

