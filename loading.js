export const loading = {
    intervalId: null,
    overlay: null,
    container: null,
    textElement: null,
    
    start() {
        if (this.overlay) return; // Nếu đang chạy thì không tạo thêm
        
        // Tạo overlay bao phủ toàn màn hình
        this.overlay = document.createElement('div');
        this.overlay.className = 'overlay-loading';
        this.overlay.style.display = 'block';
        
        // Tạo container loading bên trong overlay
        this.container = document.createElement('div');
        this.container.className = 'loading-container';
        
        // Tạo universe flow
        const universeFlow = document.createElement('div');
        universeFlow.className = 'universe-flow';
        
        // energy path
        const energyPath = document.createElement('div');
        energyPath.className = 'energy-path';
        universeFlow.appendChild(energyPath);
        
        // particles
        const particleColors = [
            { bg: '#00f2fe', shadow: '#00f2fe' },
            { bg: '#4facfe', shadow: '#4facfe' },
            { bg: '#a6c1ee', shadow: '#a6c1ee' },
            { bg: '#f093fb', shadow: '#f093fb' },
            { bg: '#f5576c', shadow: '#f5576c' }
        ];
        
        particleColors.forEach(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            universeFlow.appendChild(particle);
        });
        
        // loading text
        this.textElement = document.createElement('div');
        this.textElement.className = 'loading-text';
        this.textElement.textContent = 'Đang kết nối vũ trụ...';
        universeFlow.appendChild(this.textElement);
        
        // stars container
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars';
        universeFlow.appendChild(starsContainer);
        
        // generate stars
        const starCount = 30;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
            star.style.animationDelay = `${Math.random() * 5}s`;
            starsContainer.appendChild(star);
        }
        
        this.container.appendChild(universeFlow);
        this.overlay.appendChild(this.container);
        document.body.appendChild(this.overlay);
        
        // Text animation
        const loadingTexts = [
            "Đang tải dữ liệu...",
            "Đang kết nối lượng tử...",
            "Đang mở cổng không gian...",
            "Đang thu thập năng lượng...",
            "Đang đồng bộ vũ trụ..."
        ];
        
        let currentIndex = 0;
        this.intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % loadingTexts.length;
            this.textElement.style.opacity = 0;
            setTimeout(() => {
                this.textElement.textContent = loadingTexts[currentIndex];
                this.textElement.style.opacity = 1;
            }, 500);
        }, 3000);
    },
    
    finish() {
        if (!this.overlay) return;
        clearInterval(this.intervalId);
        this.overlay.remove();
        this.overlay = null;
        this.container = null;
        this.textElement = null;
        this.intervalId = null;
    }
};

