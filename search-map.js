// 검색 페이지 지도 관련 코드
let searchMap;
let markers = [];
let currentInfoWindow = null;

// 샘플 매물 데이터
const sampleOffices = [
    {
        id: 1,
        name: "강남 프라임 오피스",
        type: "일반사무실",
        address: "서울시 강남구 테헤란로 427",
        lat: 37.5048,
        lng: 127.0495,
        area: 30,
        rent: 250,
        deposit: 5000,
        amenities: ["주차장", "엘리베이터", "카페"],
        rating: 4.5,
        description: "강남역 인근 최고급 오피스 공간"
    },
    {
        id: 2,
        name: "서초 비즈니스 센터",
        type: "오피스텔",
        address: "서울시 서초구 서초대로 396",
        lat: 37.4936,
        lng: 127.0279,
        area: 25,
        rent: 200,
        deposit: 3000,
        amenities: ["주차장", "엘리베이터", "편의점"],
        rating: 4.2,
        description: "서초역 도보 5분 거리"
    },
    {
        id: 3,
        name: "판교 테크노밸리",
        type: "지식산업센터",
        address: "경기도 성남시 분당구 판교역로 235",
        lat: 37.3953,
        lng: 127.1109,
        area: 50,
        rent: 350,
        deposit: 7000,
        amenities: ["주차장", "엘리베이터", "카페", "편의점"],
        rating: 4.8,
        description: "IT 기업 집중 지역"
    },
    {
        id: 4,
        name: "역삼 스타트업 허브",
        type: "공유오피스",
        address: "서울시 강남구 역삼로 156",
        lat: 37.5006,
        lng: 127.0358,
        area: 15,
        rent: 150,
        deposit: 1000,
        amenities: ["카페", "엘리베이터"],
        rating: 4.3,
        description: "스타트업 최적화 공간"
    },
    {
        id: 5,
        name: "종로 프리미엄 타워",
        type: "일반사무실",
        address: "서울시 종로구 종로 1",
        lat: 37.5703,
        lng: 126.9772,
        area: 40,
        rent: 300,
        deposit: 6000,
        amenities: ["주차장", "엘리베이터", "카페"],
        rating: 4.6,
        description: "도심 중심부 프리미엄 오피스"
    }
];

// 지도 초기화
function initSearchMap() {
    const defaultPosition = new naver.maps.LatLng(37.4979, 127.0276); // 강남역

    const mapOptions = {
        center: defaultPosition,
        zoom: 14,
        zoomControl: false,
        mapTypeControl: false
    };

    searchMap = new naver.maps.Map('searchMap', mapOptions);

    // 샘플 매물 표시
    displayOffices(sampleOffices);
}

// 매물 표시
function displayOffices(offices) {
    // 기존 마커 제거
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    // 리스트 업데이트
    updateOfficeList(offices);

    // 마커 생성
    offices.forEach((office, index) => {
        const position = new naver.maps.LatLng(office.lat, office.lng);

        const marker = new naver.maps.Marker({
            position: position,
            map: searchMap,
            title: office.name,
            icon: {
                content: `<div style="
                    background: ${index === 0 ? '#3b82f6' : 'white'};
                    color: ${index === 0 ? 'white' : '#3b82f6'};
                    border: 2px solid #3b82f6;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 14px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                ">${index + 1}</div>`,
                anchor: new naver.maps.Point(20, 20)
            }
        });

        // 마커 클릭 이벤트
        naver.maps.Event.addListener(marker, 'click', function() {
            showOfficeInfo(office, marker);
            highlightOfficeCard(office.id);
        });

        markers.push(marker);
    });

    // 지도 범위 조정
    if (offices.length > 0) {
        const bounds = new naver.maps.LatLngBounds();
        offices.forEach(office => {
            bounds.extend(new naver.maps.LatLng(office.lat, office.lng));
        });
        searchMap.fitBounds(bounds);
    }
}

// 매물 정보 표시
function showOfficeInfo(office, marker) {
    if (currentInfoWindow) {
        currentInfoWindow.close();
    }

    const content = `
        <div style="padding: 15px; min-width: 200px; max-width: 300px;">
            <h4 style="margin: 0 0 8px 0; font-size: 16px; color: #333;">${office.name}</h4>
            <div style="color: #666; font-size: 13px; margin-bottom: 8px;">${office.address}</div>
            <div style="display: flex; gap: 10px; margin-bottom: 8px; font-size: 13px;">
                <span>📏 ${office.area}평</span>
                <span>⭐ ${office.rating}</span>
            </div>
            <div style="border-top: 1px solid #eee; padding-top: 8px; margin-top: 8px;">
                <div style="font-size: 14px; color: #3b82f6; font-weight: bold;">
                    월 ${office.rent}만원 / 보증금 ${office.deposit}만원
                </div>
            </div>
            <button onclick="showOfficeDetail(${office.id})" style="
                margin-top: 10px;
                width: 100%;
                padding: 8px;
                background: #3b82f6;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
            ">상세보기</button>
        </div>
    `;

    const infoWindow = new naver.maps.InfoWindow({
        content: content,
        borderColor: '#3b82f6',
        borderWidth: 2,
        anchorSize: new naver.maps.Size(20, 20),
        backgroundColor: 'white'
    });

    infoWindow.open(searchMap, marker);
    currentInfoWindow = infoWindow;
}

// 매물 리스트 업데이트
function updateOfficeList(offices) {
    const officeItems = document.getElementById('officeItems');
    const listCount = document.getElementById('listCount');

    listCount.textContent = `${offices.length}개`;

    if (offices.length === 0) {
        officeItems.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🏢</div>
                <div class="empty-state-text" data-i18n="search_empty_title">검색 결과가 없습니다</div>
                <div class="empty-state-subtext" data-i18n="search_empty_text">다른 조건으로 검색해보세요</div>
            </div>
        `;
        return;
    }

    officeItems.innerHTML = offices.map((office, index) => `
        <div class="office-card" id="office-${office.id}" onclick="selectOffice(${office.id})">
            <div class="office-card-header">
                <div>
                    <div class="office-card-title">${index + 1}. ${office.name}</div>
                    <div class="office-card-address">${office.address}</div>
                </div>
                <div class="office-card-badge">${office.type}</div>
            </div>
            <div class="office-card-info">
                <div class="info-item">
                    <span class="info-icon">📏</span>
                    <span>${office.area}평</span>
                </div>
                <div class="info-item">
                    <span class="info-icon">⭐</span>
                    <span>${office.rating}</span>
                </div>
                <div class="info-item">
                    <span class="info-icon">🏢</span>
                    <span>${office.amenities.length}개</span>
                </div>
            </div>
            <div class="office-card-price">
                <div class="price-item">
                    <span class="price-label">월세</span>
                    <span class="price-value">${office.rent}만원</span>
                </div>
                <div class="price-item">
                    <span class="price-label">보증금</span>
                    <span class="price-value">${office.deposit}만원</span>
                </div>
            </div>
        </div>
    `).join('');
}

// 매물 선택
function selectOffice(officeId) {
    const office = sampleOffices.find(o => o.id === officeId);
    if (!office) return;

    const marker = markers[sampleOffices.indexOf(office)];
    const position = new naver.maps.LatLng(office.lat, office.lng);

    searchMap.setCenter(position);
    searchMap.setZoom(16);

    showOfficeInfo(office, marker);
    highlightOfficeCard(officeId);
}

// 매물 카드 하이라이트
function highlightOfficeCard(officeId) {
    document.querySelectorAll('.office-card').forEach(card => {
        card.classList.remove('active');
    });

    const card = document.getElementById(`office-${officeId}`);
    if (card) {
        card.classList.add('active');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// 매물 상세 보기
function showOfficeDetail(officeId) {
    const office = sampleOffices.find(o => o.id === officeId);
    if (!office) return;

    const modal = document.getElementById('officeModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <h2 style="margin-bottom: 1rem; color: #333;">${office.name}</h2>
        <div style="margin-bottom: 1.5rem;">
            <div style="display: inline-block; background: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; margin-bottom: 1rem;">
                ${office.type}
            </div>
            <div style="color: #666; margin-bottom: 0.5rem;">📍 ${office.address}</div>
            <div style="color: #666;">⭐ ${office.rating} / 5.0</div>
        </div>

        <div style="background: #f9fafb; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
            <h3 style="margin-bottom: 1rem; font-size: 1.1rem;">기본 정보</h3>
            <div style="display: grid; gap: 0.75rem;">
                <div>📏 면적: <strong>${office.area}평</strong></div>
                <div>💰 월세: <strong style="color: #3b82f6;">${office.rent}만원</strong></div>
                <div>💳 보증금: <strong style="color: #3b82f6;">${office.deposit}만원</strong></div>
            </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
            <h3 style="margin-bottom: 1rem; font-size: 1.1rem;">편의시설</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${office.amenities.map(amenity => `
                    <span style="background: #e0e7ff; color: #3b82f6; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;">
                        ${amenity}
                    </span>
                `).join('')}
            </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
            <h3 style="margin-bottom: 0.5rem; font-size: 1.1rem;">설명</h3>
            <p style="color: #666; line-height: 1.6;">${office.description}</p>
        </div>

        <div style="display: flex; gap: 0.75rem;">
            <button onclick="closeModal()" style="flex: 1; padding: 1rem; background: #f3f4f6; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                닫기
            </button>
            <button style="flex: 2; padding: 1rem; background: #3b82f6; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                문의하기
            </button>
        </div>
    `;

    modal.classList.add('active');
}

// 모달 닫기
function closeModal() {
    const modal = document.getElementById('officeModal');
    modal.classList.remove('active');
}

// 지도 컨트롤
function zoomIn() {
    searchMap.setZoom(searchMap.getZoom() + 1);
}

function zoomOut() {
    searchMap.setZoom(searchMap.getZoom() - 1);
}

function resetMapCenter() {
    const center = new naver.maps.LatLng(37.4979, 127.0276);
    searchMap.setCenter(center);
    searchMap.setZoom(14);
}

// 페이지 로드 시 지도 초기화
document.addEventListener('DOMContentLoaded', function() {
    if (typeof naver !== 'undefined') {
        initSearchMap();
    } else {
        console.error('네이버 지도 API가 로드되지 않았습니다.');
    }
});
