// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 检查登录状态
    checkLoginStatus();
    
    // 初始化滚动进度条
    initScrollProgress();
    
    // 初始化回到顶部按钮
    initBackToTop();

    // 初始化滚动动画
    initScrollAnimations();

    // 初始化移动端菜单
    initMobileMenu();

    // 初始化产品筛选
    initProductFilter();

    // 初始化平滑滚动
    initSmoothScroll();

    // 发展前景图表
    initMarketChart();

    // 初始化粒子效果
    initParticleEffect();

    // 初始化导航栏效果
    initNavbarEffects();
});

// 检查登录状态
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');
    
    if (isLoggedIn && username) {
        document.getElementById('userNotLoggedIn').classList.add('hidden');
        document.getElementById('userLoggedIn').classList.remove('hidden');
        const userNameEl = document.getElementById('userName');
        if (userNameEl) {
            userNameEl.textContent = username;
        }
    }
}

// 初始化滚动进度条
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });
}

// 初始化回到顶部按钮
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// 初始化滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察所有带有 fade-in 类的元素
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// 初始化移动端菜单
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // 动画效果
            const icon = menuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });
    }
}

// 初始化产品筛选
function initProductFilter() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有按钮的 active 类
            categoryBtns.forEach(b => b.classList.remove('active'));
            // 添加当前按钮的 active 类
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            // 筛选产品
            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category.includes(category)) {
                    card.style.display = 'block';
                    // 添加淡入动画
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// 初始化平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 初始化粒子效果
function initParticleEffect() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    // 创建更多粒子
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(59, 130, 246, 0.6);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// 初始化导航栏效果
function initNavbarEffects() {
    const navbar = document.querySelector('nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            if (currentScrollY > 100) {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.8)';
                navbar.style.backdropFilter = 'blur(12px)';
            }
        }
        
        lastScrollY = currentScrollY;
    });
}

// 初始化折线图
function initMarketChart() {
    const ctx = document.getElementById('marketChart');
    if (!ctx || typeof Chart === 'undefined') return;

    // 创建渐变背景
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
    gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.2)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2024', '2025', '2026', '2027', '2028', '2029', '2030'],
            datasets: [{
                label: '情感计算市场规模（亿美元）',
                data: [100, 150, 220, 300, 400, 520, 686.86],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: gradient,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: 'rgb(59, 130, 246)',
                pointBorderColor: '#fff',
                pointBorderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: 'rgb(139, 92, 246)',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                    borderWidth: 2,
                    padding: 16,
                    displayColors: false,
                    cornerRadius: 12,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            return `市场规模: ${context.parsed.y}亿美元`;
                        },
                        afterLabel: function(context) {
                            const growth = context.dataIndex > 0 ? 
                                ((context.parsed.y - context.dataset.data[context.dataIndex - 1]) / context.dataset.data[context.dataIndex - 1] * 100).toFixed(1) : 0;
                            return context.dataIndex > 0 ? `增长率: +${growth}%` : '';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#9CA3AF',
                        font: {
                            family: "'Inter', sans-serif",
                            size: 12
                        },
                        callback: function(value) {
                            return value + '亿';
                        },
                        padding: 10
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#9CA3AF',
                        font: {
                            family: "'Inter', sans-serif",
                            size: 12,
                            weight: '500'
                        },
                        padding: 10
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// 产品卡片点击事件
document.addEventListener('click', function(e) {
    const productCard = e.target.closest('.product-card');
    if (productCard) {
        const productId = productCard.dataset.productId;
        // 这里可以添加产品详情页面的逻辑
        console.log('Product clicked:', productId);
        
        // 添加点击动画效果
        productCard.style.transform = 'scale(0.98)';
        setTimeout(() => {
            productCard.style.transform = '';
        }, 150);
    }
});

// 退出登录
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.reload();
}

// 添加页面加载动画
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // 打字机效果
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        setTimeout(() => {
            typingText.style.borderRight = 'none';
        }, 4000);
    }
});

// 鼠标跟随效果（可选）
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    // 更新浮动元素位置
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        const speed = (index + 1) * 0.0002;
        const x = Math.sin(Date.now() * speed) * 20;
        const y = Math.cos(Date.now() * speed) * 15;
        icon.style.transform = `translate(${x}px, ${y}px) rotate(${Math.sin(Date.now() * speed) * 5}deg)`;
    });
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// 视差滚动效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-icon');
    
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        element.style.transform += ` translateY(${scrolled * speed * 0.1}px)`;
    });
});

// 添加音效（可选，需要音频文件）
function playClickSound() {
    // const audio = new Audio('/sounds/click.mp3');
    // audio.volume = 0.3;
    // audio.play().catch(() => {});
}

// 为按钮添加点击音效
document.querySelectorAll('button, .hero-btn, .product-btn').forEach(btn => {
    btn.addEventListener('click', playClickSound);
});

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动事件
const optimizedScrollHandler = debounce(() => {
    // 滚动相关逻辑
}, 16); // 约60fps

window.addEventListener('scroll', optimizedScrollHandler);

// 添加键盘导航支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // 关闭移动端菜单
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
});

// 预加载关键图片
function preloadImages() {
    const imageUrls = [
        'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// 页面加载完成后预加载图片
window.addEventListener('load', preloadImages);