# OfficeFinder - 투명한 사무실 임대 플랫폼

실시간 공실 정보와 입주자 리뷰로 완벽한 사무실을 찾을 수 있는 플랫폼입니다.

## 다국어 지원

- 한국어 (Korean)
- 우즈베키스탄어 (Uzbek)
- 러시아어 (Russian)

## 파일 구조

```
hogangnono/
├── index.html               # 메인 홈페이지
├── search.html              # 지도 기반 검색 페이지
├── index_i18n.html          # 다국어 백업 버전
├── styles.css               # 공통 스타일시트
├── search.css               # 검색 페이지 스타일
├── script.js                # 기본 JavaScript
├── map.js                   # 네이버 지도 기능 (홈페이지용)
├── search-map.js            # 검색 페이지 지도 기능
├── search.js                # 검색 필터 기능
├── translations.js          # 다국어 번역 데이터
├── search-translations.js   # 검색 페이지 번역
├── i18n.js                  # 다국어 변환 로직
└── README.md                # 이 파일
```

## 사용 방법

### 네이버 지도 API 설정

네이버 지도 기능을 사용하려면 네이버 클라우드 플랫폼에서 API 키를 발급받아야 합니다:

1. [네이버 클라우드 플랫폼](https://www.ncloud.com/)에 접속하여 로그인
2. Console > Services > AI·NAVER API > Application 등록
3. Client ID를 복사
4. `index.html` 파일에서 `YOUR_CLIENT_ID`를 발급받은 Client ID로 교체:
   ```html
   <script type="text/javascript" src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID&submodules=geocoder"></script>
   ```

### 다국어 버전 사용

`index.html` 파일을 열면 다국어를 지원하는 버전을 사용할 수 있습니다.

- 우측 상단의 언어 버튼을 클릭하여 언어를 변경할 수 있습니다
- 선택한 언어는 브라우저에 저장되어 다음 방문 시에도 유지됩니다

### 지도 기반 검색 페이지

`search.html` 파일을 열면 호갱노노 스타일의 사무실 검색 페이지를 사용할 수 있습니다.

**주요 기능:**
- 좌측 사이드바: 검색 필터 및 매물 리스트
- 우측 지도: 네이버 지도에 매물 위치 표시
- 실시간 필터링: 면적, 임대료, 보증금, 건물 유형, 편의시설
- 지도 상호작용: 마커 클릭으로 매물 정보 확인
- 매물 상세 모달: 자세한 정보 팝업
- 반응형 레이아웃: 모바일/데스크톱 최적화

## 기능

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원
- **부드러운 애니메이션**: 스크롤 시 요소가 나타나는 효과
- **다국어 지원**: 한국어, 우즈베키스탄어, 러시아어
- **네이버 지도 통합**: 사무실 위치 검색 및 지도 표시 기능
- **지도 기반 검색 페이지**: 호갱노노 스타일의 실시간 검색 인터페이스
- **섹션 구성**:
  - 히어로 (메인 소개)
  - 문제 정의 (네이버 지도 포함)
  - 해결 방법
  - 주요 기능
  - 차별화 요소
  - 고객 세그먼트
  - 수익 모델
  - 제품 로드맵
  - 기술 스택
  - 리스크 관리
  - 기대 효과
  - 문의 폼

## 기술 스택

- HTML5
- CSS3 (순수 CSS, 프레임워크 없음)
- JavaScript (바닐라 JS, 프레임워크 없음)

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 라이선스

© 2025 OfficeFinder. All rights reserved.
