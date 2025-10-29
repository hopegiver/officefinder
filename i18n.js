// 다국어 지원 시스템
let currentLang = localStorage.getItem('language') || 'ko';

// 언어 변경 함수
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.body.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);

    translatePage(lang);
    updateActiveLangButton(lang);
}

// 페이지 내 모든 번역 가능한 요소 번역
function translatePage(lang) {
    const langData = translations[lang];
    if (!langData) {
        console.error(`Language '${lang}' not found`);
        return;
    }

    // data-i18n 속성을 가진 모든 요소 번역
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (langData[key]) {
            element.textContent = langData[key];
        }
    });

    // data-i18n-placeholder 속성을 가진 input/textarea placeholder 번역
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (langData[key]) {
            element.placeholder = langData[key];
        }
    });

    // 페이지 타이틀 업데이트
    const titleElement = document.querySelector('title[data-i18n]');
    if (titleElement) {
        const key = titleElement.getAttribute('data-i18n');
        if (langData[key]) {
            document.title = langData[key];
        }
    }
}

// 활성 언어 버튼 업데이트
function updateActiveLangButton(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang-btn') === lang) {
            btn.classList.add('active');
        }
    });
}

// 언어 버튼 이벤트 리스너 설정
function initLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang-btn');
            changeLanguage(lang);
        });
    });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 언어 버튼 초기화
    initLanguageButtons();

    // 저장된 언어 또는 기본 언어로 번역
    translatePage(currentLang);
    updateActiveLangButton(currentLang);

    console.log(`OfficeFinder loaded with language: ${currentLang}`);
});

// 언어 코드를 이름으로 변환
function getLanguageName(lang) {
    const names = {
        'ko': '한국어',
        'uz': 'O\'zbek',
        'ru': 'Русский'
    };
    return names[lang] || lang;
}

// 현재 언어 가져오기
function getCurrentLanguage() {
    return currentLang;
}

// 지원되는 언어 목록
function getSupportedLanguages() {
    return Object.keys(translations);
}
