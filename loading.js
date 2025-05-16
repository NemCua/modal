const loading = {
    intervalId: null,
    container: null,
    textElement: null,
    
    start() {
        // If already running, do nothing
        if (this.container) return;
        
        // Create loading container
        this.container = document.createElement('div');
        this.container.className = 'loading-container';
        this.container.style.display = 'block';
        
        // Create universe flow
        const universeFlow = document.createElement('div');
        universeFlow.className = 'universe-flow';
        
        // Create energy path
        const energyPath = document.createElement('div');
        energyPath.className = 'energy-path';
        universeFlow.appendChild(energyPath);
        
        // Create particles
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
        
        // Create loading text
        this.textElement = document.createElement('div');
        this.textElement.className = 'loading-text';
        this.textElement.textContent = 'Đang kết nối vũ trụ...';
        universeFlow.appendChild(this.textElement);
        
        // Create stars container
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars';
        universeFlow.appendChild(starsContainer);
        
        // Generate stars
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
        
        // Append to app
        this.container.appendChild(universeFlow);
        document.getElementById('app').appendChild(this.container);
        
        // Start text animation
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
        // If not running, do nothing
        if (!this.container) return;
        
        // Clear interval and remove container
        clearInterval(this.intervalId);
        this.container.remove();
        this.container = null;
        this.textElement = null;
        this.intervalId = null;
    }
};

// Example usage (for testing)
loading.start();
setTimeout(() => loading.finish(), 10000);