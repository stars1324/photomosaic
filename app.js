// 主应用逻辑
class PhotoMosaicApp {
    constructor() {
        this.processor = new PhotoMosaicProcessor();
        this.initializeElements();
        this.setupEventListeners();
        this.setupProgressCallback();
    }

    // 初始化DOM元素
    initializeElements() {
        // 上传相关元素
        this.bgDropZone = document.getElementById('bg-drop-zone');
        this.bgFileInput = document.getElementById('bg-file-input');
        this.bgUploadBtn = document.getElementById('bg-upload-btn');
        this.bgCount = document.getElementById('bg-count');
        this.clearBgBtn = document.getElementById('clear-bg-btn');

        this.targetDropZone = document.getElementById('target-drop-zone');
        this.targetFileInput = document.getElementById('target-file-input');
        this.targetUploadBtn = document.getElementById('target-upload-btn');
        this.targetDropContent = document.getElementById('target-drop-content');
        this.targetPreview = document.getElementById('target-preview');
        this.targetImg = document.getElementById('target-img');
        this.removeTargetBtn = document.getElementById('remove-target-btn');

        // 配置相关元素
        this.gridSizeSlider = document.getElementById('grid-size');
        this.gridValue = document.getElementById('grid-value');
        this.allowReuseCheckbox = document.getElementById('allow-reuse');
        this.outputQualitySelect = document.getElementById('output-quality');

        // 操作按钮
        this.generateBtn = document.getElementById('generate-btn');
        this.resetBtn = document.getElementById('reset-btn');

        // 进度相关元素
        this.progressSection = document.getElementById('progress-section');
        this.progressFill = document.getElementById('progress-fill');
        this.progressText = document.getElementById('progress-text');

        // 结果相关元素
        this.resultSection = document.getElementById('result-section');
        this.resultCanvas = document.getElementById('result-canvas');
        this.downloadPngBtn = document.getElementById('download-png-btn');
        this.downloadJpgBtn = document.getElementById('download-jpg-btn');
    }

    // 设置事件监听器
    setupEventListeners() {
        // 背景图片上传
        this.bgUploadBtn.addEventListener('click', () => this.bgFileInput.click());
        this.bgFileInput.addEventListener('change', (e) => this.handleBackgroundFiles(e.target.files));
        this.clearBgBtn.addEventListener('click', () => this.clearBackgroundImages());

        // 背景图片拖拽
        this.setupDragAndDrop(this.bgDropZone, (files) => this.handleBackgroundFiles(files));

        // 目标图片上传
        this.targetUploadBtn.addEventListener('click', () => this.targetFileInput.click());
        this.targetFileInput.addEventListener('change', (e) => this.handleTargetFile(e.target.files[0]));
        this.removeTargetBtn.addEventListener('click', () => this.removeTargetImage());

        // 目标图片拖拽
        this.setupDragAndDrop(this.targetDropZone, (files) => this.handleTargetFile(files[0]));

        // 配置变化
        this.gridSizeSlider.addEventListener('input', (e) => {
            this.gridValue.textContent = e.target.value;
            this.processor.setGridSize(parseInt(e.target.value));
        });

        this.allowReuseCheckbox.addEventListener('change', (e) => {
            this.processor.setAllowReuse(e.target.checked);
        });

        this.outputQualitySelect.addEventListener('change', (e) => {
            this.processor.setOutputQuality(e.target.value);
        });

        // 操作按钮
        this.generateBtn.addEventListener('click', () => this.generateMosaic());
        this.resetBtn.addEventListener('click', () => this.resetAll());

        // 下载按钮
        this.downloadPngBtn.addEventListener('click', () => this.downloadResult('png'));
        this.downloadJpgBtn.addEventListener('click', () => this.downloadResult('jpg'));
    }

    // 设置拖拽功能
    setupDragAndDrop(dropZone, callback) {
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            callback(e.dataTransfer.files);
        });
    }

    // 设置进度回调
    setupProgressCallback() {
        this.processor.setProgressCallback((percentage, message) => {
            this.updateProgress(percentage, message);
        });
    }

    // 处理背景图片文件
    async handleBackgroundFiles(files) {
        if (!files || files.length === 0) return;

        this.showProgress();
        
        try {
            let addedCount = 0;

            for (const file of files) {
                if (file.type === 'application/zip' || file.name.toLowerCase().endsWith('.zip')) {
                    // 处理ZIP文件
                    const count = await this.processor.addBackgroundImagesFromZip(file);
                    addedCount += count;
                } else if (file.type.startsWith('image/')) {
                    // 处理图片文件
                    const count = await this.processor.addBackgroundImages([file]);
                    addedCount += count;
                }
            }

            this.updateBackgroundCount();
            this.checkCanGenerate();
            this.showMessage(`成功添加 ${addedCount} 张背景图片`, 'success');
        } catch (error) {
            this.showMessage('背景图片处理失败: ' + error.message, 'error');
        } finally {
            this.hideProgress();
        }
    }

    // 处理目标图片文件
    async handleTargetFile(file) {
        if (!file || !file.type.startsWith('image/')) {
            this.showMessage('请选择有效的图片文件', 'error');
            return;
        }

        try {
            const img = await this.processor.setTargetImage(file);
            this.showTargetPreview(img);
            this.checkCanGenerate();
            this.showMessage('目标图片上传成功', 'success');
        } catch (error) {
            this.showMessage('目标图片加载失败: ' + error.message, 'error');
        }
    }

    // 显示目标图片预览
    showTargetPreview(img) {
        this.targetImg.src = img.src;
        this.targetDropContent.style.display = 'none';
        this.targetPreview.style.display = 'block';
    }

    // 移除目标图片
    removeTargetImage() {
        this.processor.clearTargetImage();
        this.targetDropContent.style.display = 'block';
        this.targetPreview.style.display = 'none';
        this.targetImg.src = '';
        this.checkCanGenerate();
    }

    // 清空背景图库
    clearBackgroundImages() {
        this.processor.clearBackgroundImages();
        this.updateBackgroundCount();
        this.checkCanGenerate();
        this.showMessage('背景图库已清空', 'warning');
    }

    // 更新背景图片数量显示
    updateBackgroundCount() {
        const count = this.processor.getBackgroundImageCount();
        this.bgCount.textContent = `已上传: ${count} 张图片`;
    }

    // 检查是否可以生成
    checkCanGenerate() {
        const canGenerate = this.processor.targetImage && this.processor.getBackgroundImageCount() > 0;
        this.generateBtn.disabled = !canGenerate;
    }

    // 生成马赛克
    async generateMosaic() {
        this.generateBtn.disabled = true;
        this.showProgress();
        this.hideResult();

        try {
            await this.processor.generateMosaic(this.resultCanvas);
            this.showResult();
            this.showMessage('马赛克生成成功！', 'success');
        } catch (error) {
            this.showMessage('生成失败: ' + error.message, 'error');
        } finally {
            this.hideProgress();
            this.generateBtn.disabled = false;
        }
    }

    // 下载结果
    downloadResult(format) {
        const filename = `photomosaic_result.${format}`;
        this.processor.downloadImage(this.resultCanvas, filename, format);
    }

    // 重置所有
    resetAll() {
        this.processor.clearBackgroundImages();
        this.processor.clearTargetImage();
        this.removeTargetImage();
        this.updateBackgroundCount();
        this.hideProgress();
        this.hideResult();
        this.gridSizeSlider.value = 50;
        this.gridValue.textContent = '50';
        this.allowReuseCheckbox.checked = true;
        this.outputQualitySelect.value = 'high';
        this.processor.setGridSize(50);
        this.processor.setAllowReuse(true);
        this.processor.setOutputQuality('high');
        this.checkCanGenerate();
        this.showMessage('已重置所有设置', 'warning');
    }

    // 显示进度
    showProgress() {
        this.progressSection.style.display = 'block';
    }

    // 隐藏进度
    hideProgress() {
        this.progressSection.style.display = 'none';
    }

    // 更新进度
    updateProgress(percentage, message) {
        this.progressFill.style.width = `${percentage}%`;
        this.progressText.textContent = message;
    }

    // 显示结果
    showResult() {
        this.resultSection.style.display = 'block';
        this.resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    // 隐藏结果
    hideResult() {
        this.resultSection.style.display = 'none';
    }

    // 显示消息
    showMessage(message, type = 'info') {
        // 移除已存在的消息
        const existingMessage = document.querySelector('.status-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // 创建新消息
        const messageEl = document.createElement('div');
        messageEl.className = `status-message status-${type}`;
        messageEl.textContent = message;

        // 插入到主内容区顶部
        const main = document.querySelector('main');
        main.insertBefore(messageEl, main.firstChild);

        // 3秒后自动移除
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 3000);
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new PhotoMosaicApp();
});
