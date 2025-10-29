// 네비게이션 스크롤 효과
const navbar = document.getElementById('navbar');
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        scrollTop.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        scrollTop.classList.remove('visible');
    }
});

// 햄버거 메뉴 토글
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 네비게이션 링크 클릭 시 메뉴 닫기
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 부드러운 스크롤
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// 맨 위로 버튼
scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 스크롤 애니메이션
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100 && elementBottom > 0) {
            element.classList.add('animated');
        }
    });
};

// 초기 로드 시 애니메이션 체크
animateOnScroll();

// 스크롤 시 애니메이션 체크
window.addEventListener('scroll', animateOnScroll);

// 활성 네비게이션 링크 표시
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const highlightNavigation = () => {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', highlightNavigation);

// 폼 제출 처리
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const message = document.getElementById('message').value;

    // 실제 구현 시 서버로 데이터 전송
    console.log('문의 내용:', { name, email, company, message });

    // 성공 메시지 표시
    alert('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.');

    // 폼 초기화
    contactForm.reset();
});

// 숫자 카운터 애니메이션 (필요시 사용)
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

// 페이지 로드 완료 시
document.addEventListener('DOMContentLoaded', () => {
    console.log('오피스파인더 홈페이지 로드 완료');

    // 초기 애니메이션 실행
    animateOnScroll();

    // 네비게이션 하이라이트 초기화
    highlightNavigation();
});

// 이미지 레이지 로딩 (필요시 사용)
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

// 디바운스 함수
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// 스크롤 이벤트 최적화
const optimizedScroll = debounce(() => {
    animateOnScroll();
    highlightNavigation();
}, 10);

window.addEventListener('scroll', optimizedScroll);

// 브라우저 리사이즈 처리
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // 리사이즈 후 필요한 작업 수행
        animateOnScroll();
    }, 250);
});

// 키보드 접근성 개선
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            element.click();
        }
    });
});

// 외부 링크 새 탭에서 열기
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// 스크롤 진행률 표시 (선택사항)
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// 스크롤 진행률 표시 활성화 (원하면 주석 해제)
// createScrollProgress();

// 인터랙티브 요소 애니메이션
const addHoverEffects = () => {
    const cards = document.querySelectorAll('.problem-card, .feature-card, .customer-card, .revenue-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });
};

addHoverEffects();

// 터치 디바이스 감지 및 호버 효과 조정
const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0) ||
           (navigator.msMaxTouchPoints > 0));
};

if (isTouchDevice()) {
    document.body.classList.add('touch-device');
}

// 다크모드 지원 (선택사항)
const initDarkMode = () => {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 999;
        display: none;
    `;

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });

    // document.body.appendChild(darkModeToggle); // 필요시 활성화
};

// 성능 모니터링
const logPerformance = () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`페이지 로드 시간: ${pageLoadTime}ms`);
    }
};

window.addEventListener('load', logPerformance);

// 에러 핸들링
window.addEventListener('error', (e) => {
    console.error('에러 발생:', e.error);
});

// 서비스 워커 등록 (PWA 지원 시)
if ('serviceWorker' in navigator) {
    // navigator.serviceWorker.register('/sw.js') // 필요시 활성화
    //     .then(registration => console.log('Service Worker 등록 성공:', registration))
    //     .catch(error => console.log('Service Worker 등록 실패:', error));
}
