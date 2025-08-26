// PhotoMosaic 核心处理类
class PhotoMosaicProcessor {
    constructor() {
        this.backgroundImages = [];
        this.backgroundFeatures = [];
        this.targetImage = null;
        this.gridSize = 50;
        this.allowReuse = true;
        this.outputQuality = 'high'; // 添加输出质量设置
        this.onProgress = null;
    }

    // 设置进度回调
    setProgressCallback(callback) {
        this.onProgress = callback;
    }

    // 更新进度
    updateProgress(percentage, message) {
        if (this.onProgress) {
            this.onProgress(percentage, message);
        }
    }

    // 添加背景图片
    async addBackgroundImages(files) {
        const newImages = [];
        let processed = 0;

        for (const file of files) {
            try {
                const img = await this.loadImage(file);
                if (img) {
                    newImages.push(img);
                    processed++;
                    this.updateProgress(
                        (processed / files.length) * 100,
                        `加载背景图片 (${processed}/${files.length})`
                    );
                }
            } catch (error) {
                console.warn('无法加载图片:', file.name, error);
            }
        }

        this.backgroundImages.push(...newImages);
        return newImages.length;
    }

    // 从ZIP文件添加背景图片
    async addBackgroundImagesFromZip(zipFile) {
        this.updateProgress(0, '正在解压ZIP文件...');
        
        try {
            const zip = await JSZip.loadAsync(zipFile);
            const imageFiles = [];
            
            // 筛选图片文件
            zip.forEach((relativePath, file) => {
                if (!file.dir && this.isImageFile(relativePath)) {
                    imageFiles.push(file);
                }
            });

            if (imageFiles.length === 0) {
                throw new Error('ZIP文件中没有找到图片文件');
            }

            const newImages = [];
            let processed = 0;

            for (const file of imageFiles) {
                try {
                    const blob = await file.async('blob');
                    const img = await this.loadImageFromBlob(blob);
                    if (img) {
                        newImages.push(img);
                    }
                    processed++;
                    this.updateProgress(
                        (processed / imageFiles.length) * 100,
                        `解压图片 (${processed}/${imageFiles.length})`
                    );
                } catch (error) {
                    console.warn('无法加载图片:', file.name, error);
                }
            }

            this.backgroundImages.push(...newImages);
            return newImages.length;
        } catch (error) {
            throw new Error('ZIP文件解压失败: ' + error.message);
        }
    }

    // 检查是否为图片文件
    isImageFile(filename) {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
        const ext = filename.toLowerCase().substr(filename.lastIndexOf('.'));
        return imageExtensions.includes(ext);
    }

    // 从文件加载图片
    loadImage(file) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // 从Blob加载图片
    loadImageFromBlob(blob) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                URL.revokeObjectURL(img.src);
                resolve(img);
            };
            img.onerror = () => {
                URL.revokeObjectURL(img.src);
                reject();
            };
            img.src = URL.createObjectURL(blob);
        });
    }

    // 设置目标图片
    async setTargetImage(file) {
        this.targetImage = await this.loadImage(file);
        return this.targetImage;
    }

    // 清空背景图库
    clearBackgroundImages() {
        this.backgroundImages = [];
        this.backgroundFeatures = [];
    }

    // 移除目标图片
    clearTargetImage() {
        this.targetImage = null;
    }

    // 设置网格大小
    setGridSize(size) {
        this.gridSize = Math.max(20, Math.min(200, size));
    }

    // 设置是否允许重复使用
    setAllowReuse(allow) {
        this.allowReuse = allow;
    }

    // 设置输出质量
    setOutputQuality(quality) {
        this.outputQuality = quality;
    }

    // 获取背景图片数量
    getBackgroundImageCount() {
        return this.backgroundImages.length;
    }

    // 计算图片的平均颜色
    calculateAverageColor(img, size = 100) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = size;
        canvas.height = size;
        
        // 使用高质量的图像缩放
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, size, size);
        
        const imageData = ctx.getImageData(0, 0, size, size);
        const data = imageData.data;
        
        let r = 0, g = 0, b = 0;
        const pixelCount = data.length / 4;
        
        for (let i = 0; i < data.length; i += 4) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
        }
        
        return {
            r: Math.round(r / pixelCount),
            g: Math.round(g / pixelCount),
            b: Math.round(b / pixelCount)
        };
    }

    // 计算颜色距离
    calculateColorDistance(color1, color2) {
        const dr = color1.r - color2.r;
        const dg = color1.g - color2.g;
        const db = color1.b - color2.b;
        return Math.sqrt(dr * dr + dg * dg + db * db);
    }

    // 预处理背景图片特征
    async preprocessBackgroundImages() {
        this.backgroundFeatures = [];
        
        for (let i = 0; i < this.backgroundImages.length; i++) {
            const img = this.backgroundImages[i];
            const color = this.calculateAverageColor(img);
            this.backgroundFeatures.push(color);
            
            this.updateProgress(
                ((i + 1) / this.backgroundImages.length) * 100,
                `分析背景图片色彩 (${i + 1}/${this.backgroundImages.length})`
            );
        }
    }

    // 生成马赛克图片
    async generateMosaic(outputCanvas) {
        if (!this.targetImage || this.backgroundImages.length === 0) {
            throw new Error('请先上传目标图片和背景图片');
        }

        // 预处理背景图片
        await this.preprocessBackgroundImages();

        const canvas = outputCanvas;
        const ctx = canvas.getContext('2d');
        
        // 计算输出尺寸 - 优化：使用更高的分辨率
        const targetAspectRatio = this.targetImage.width / this.targetImage.height;
        
        // 根据质量设置确定单元格大小和分辨率
        let cellSize, minResolution;
        switch (this.outputQuality) {
            case 'standard':
                cellSize = Math.max(15, Math.min(50, Math.floor(1500 / this.gridSize)));
                minResolution = 800;
                break;
            case 'high':
                cellSize = Math.max(20, Math.min(80, Math.floor(2500 / this.gridSize)));
                minResolution = 1500;
                break;
            case 'ultra':
                cellSize = Math.max(30, Math.min(120, Math.floor(4000 / this.gridSize)));
                minResolution = 2500;
                break;
            default:
                cellSize = Math.max(20, Math.min(80, Math.floor(2500 / this.gridSize)));
                minResolution = 1500;
        }
        
        let outputWidth = this.gridSize * cellSize;
        let outputHeight = this.gridSize * cellSize;
        
        // 保持原图宽高比
        if (targetAspectRatio > 1) {
            // 宽图
            outputHeight = Math.round(outputWidth / targetAspectRatio);
        } else {
            // 高图
            outputWidth = Math.round(outputHeight * targetAspectRatio);
        }
        
        // 确保最小分辨率
        if (Math.min(outputWidth, outputHeight) < minResolution) {
            const scale = minResolution / Math.min(outputWidth, outputHeight);
            outputWidth = Math.round(outputWidth * scale);
            outputHeight = Math.round(outputHeight * scale);
        }

        canvas.width = outputWidth;
        canvas.height = outputHeight;

        // 显示输出分辨率信息
        this.updateProgress(0, `开始生成 ${outputWidth}×${outputHeight} 分辨率的马赛克图片...`);

        // 计算每个网格的大小
        const cellWidth = outputWidth / this.gridSize;
        const cellHeight = outputHeight / this.gridSize;
        
        // 创建临时canvas用于分析目标图片
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = this.gridSize;
        tempCanvas.height = this.gridSize;
        
        // 将目标图片绘制到临时canvas
        tempCtx.drawImage(this.targetImage, 0, 0, this.gridSize, this.gridSize);
        const targetData = tempCtx.getImageData(0, 0, this.gridSize, this.gridSize);
        
        // 用于跟踪已使用的背景图片
        const usedImages = new Set();
        let totalCells = this.gridSize * this.gridSize;
        let processedCells = 0;

        // 处理每个网格
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                // 获取当前网格的颜色
                const pixelIndex = (row * this.gridSize + col) * 4;
                const targetColor = {
                    r: targetData.data[pixelIndex],
                    g: targetData.data[pixelIndex + 1],
                    b: targetData.data[pixelIndex + 2]
                };

                // 找到最匹配的背景图片
                let bestMatch = 0;
                let bestDistance = Infinity;

                for (let i = 0; i < this.backgroundFeatures.length; i++) {
                    // 如果不允许重复使用且已经使用过，跳过
                    if (!this.allowReuse && usedImages.has(i)) {
                        continue;
                    }

                    const distance = this.calculateColorDistance(targetColor, this.backgroundFeatures[i]);
                    if (distance < bestDistance) {
                        bestDistance = distance;
                        bestMatch = i;
                    }
                }

                // 如果不允许重复使用，标记为已使用
                if (!this.allowReuse) {
                    usedImages.add(bestMatch);
                }

                // 绘制匹配的背景图片到对应位置
                const x = col * cellWidth;
                const y = row * cellHeight;
                
                // 启用高质量图像缩放
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                
                ctx.drawImage(
                    this.backgroundImages[bestMatch],
                    x, y, cellWidth, cellHeight
                );

                processedCells++;
                
                // 更新进度
                if (processedCells % 10 === 0 || processedCells === totalCells) {
                    this.updateProgress(
                        (processedCells / totalCells) * 100,
                        `正在匹配网格 (${processedCells}/${totalCells})`
                    );
                    
                    // 让出控制权，避免阻塞UI
                    await new Promise(resolve => setTimeout(resolve, 1));
                }
            }
        }

        this.updateProgress(100, '马赛克生成完成！');
        return canvas;
    }

    // 下载图片
    downloadImage(canvas, filename, format = 'png') {
        const link = document.createElement('a');
        link.download = filename;
        
        if (format === 'jpg' || format === 'jpeg') {
            // 对于JPG格式，使用较高的质量设置
            link.href = canvas.toDataURL('image/jpeg', 0.95);
        } else {
            // PNG格式保持无损
            link.href = canvas.toDataURL('image/png');
        }
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
