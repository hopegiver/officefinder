// 검색 페이지 필터 및 기능

// 위치로 검색
function searchByLocation() {
    const location = document.getElementById('locationInput').value;
    if (!location) {
        alert('지역을 입력해주세요');
        return;
    }

    // 네이버 지오코딩으로 위치 검색
    naver.maps.Service.geocode({
        query: location
    }, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            alert('주소 검색 중 오류가 발생했습니다');
            return;
        }

        if (response.v2.meta.totalCount === 0) {
            alert('검색 결과가 없습니다');
            return;
        }

        const item = response.v2.addresses[0];
        const point = new naver.maps.Point(item.x, item.y);
        const position = new naver.maps.LatLng(point.y, point.x);

        searchMap.setCenter(position);
        searchMap.setZoom(15);

        // 주변 매물 필터링 (실제로는 서버에서 가져와야 함)
        filterOfficesByLocation(position);
    });
}

// 위치 기반 매물 필터링
function filterOfficesByLocation(position) {
    // 간단한 거리 계산 (실제로는 더 정확한 계산 필요)
    const filtered = sampleOffices.filter(office => {
        const officePos = new naver.maps.LatLng(office.lat, office.lng);
        const distance = searchMap.getProjection().getDistance(position, officePos);
        return distance < 5000; // 5km 이내
    });

    displayOffices(filtered);
}

// 필터 적용
function applyFilters() {
    const areaMin = parseInt(document.getElementById('areaMin').value) || 0;
    const areaMax = parseInt(document.getElementById('areaMax').value) || Infinity;
    const rentMin = parseInt(document.getElementById('rentMin').value) || 0;
    const rentMax = parseInt(document.getElementById('rentMax').value) || Infinity;
    const depositMin = parseInt(document.getElementById('depositMin').value) || 0;
    const depositMax = parseInt(document.getElementById('depositMax').value) || Infinity;

    // 건물 유형 필터
    const buildingTypes = [];
    document.querySelectorAll('.filter-group:nth-of-type(5) input[type="checkbox"]:checked').forEach(cb => {
        buildingTypes.push(cb.value);
    });

    // 편의시설 필터
    const amenities = [];
    document.querySelectorAll('.filter-group:nth-of-type(6) input[type="checkbox"]:checked').forEach(cb => {
        amenities.push(cb.value);
    });

    // 필터 적용
    const filtered = sampleOffices.filter(office => {
        // 면적 필터
        if (office.area < areaMin || office.area > areaMax) return false;

        // 임대료 필터
        if (office.rent < rentMin || office.rent > rentMax) return false;

        // 보증금 필터
        if (office.deposit < depositMin || office.deposit > depositMax) return false;

        // 건물 유형 필터
        if (buildingTypes.length > 0 && !buildingTypes.includes(office.type)) return false;

        // 편의시설 필터
        if (amenities.length > 0) {
            const hasAllAmenities = amenities.every(amenity =>
                office.amenities.includes(amenity)
            );
            if (!hasAllAmenities) return false;
        }

        return true;
    });

    displayOffices(filtered);
}

// 필터 초기화
function resetFilters() {
    document.getElementById('locationInput').value = '';
    document.getElementById('areaMin').value = '';
    document.getElementById('areaMax').value = '';
    document.getElementById('rentMin').value = '';
    document.getElementById('rentMax').value = '';
    document.getElementById('depositMin').value = '';
    document.getElementById('depositMax').value = '';

    // 모든 체크박스 체크
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (cb.closest('.filter-group:nth-of-type(5)')) {
            cb.checked = true; // 건물 유형은 전체 선택
        } else {
            cb.checked = false; // 편의시설은 전체 해제
        }
    });

    displayOffices(sampleOffices);
    resetMapCenter();
}

// 햄버거 메뉴 (기존 script.js와 중복되지만 독립적으로 작동하도록)
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Enter 키로 검색
    const locationInput = document.getElementById('locationInput');
    if (locationInput) {
        locationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchByLocation();
            }
        });
    }

    // 모달 외부 클릭 시 닫기
    const modal = document.getElementById('officeModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

// 네비게이션 스크롤 효과
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
