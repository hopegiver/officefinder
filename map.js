// 네이버 지도 관련 코드
let map;
let marker;

// 지도 초기화 (서울시청 기본 위치)
function initMap() {
    const defaultPosition = new naver.maps.LatLng(37.5665, 126.9780);

    const mapOptions = {
        center: defaultPosition,
        zoom: 15,
        zoomControl: true,
        zoomControlOptions: {
            position: naver.maps.Position.TOP_RIGHT
        }
    };

    map = new naver.maps.Map('map', mapOptions);

    // 기본 마커 생성
    marker = new naver.maps.Marker({
        position: defaultPosition,
        map: map,
        title: '서울시청'
    });

    // 지도 클릭 이벤트
    naver.maps.Event.addListener(map, 'click', function(e) {
        searchCoordinateToAddress(e.coord);
    });
}

// 주소 검색
function searchAddress() {
    const address = document.getElementById('mapSearch').value;

    if (!address) {
        alert(getTranslation('map_alert_empty'));
        return;
    }

    naver.maps.Service.geocode({
        query: address
    }, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            alert(getTranslation('map_alert_error'));
            return;
        }

        if (response.v2.meta.totalCount === 0) {
            alert(getTranslation('map_alert_notfound'));
            return;
        }

        const item = response.v2.addresses[0];
        const point = new naver.maps.Point(item.x, item.y);
        const position = new naver.maps.LatLng(point.y, point.x);

        // 지도 이동
        map.setCenter(position);
        map.setZoom(16);

        // 마커 위치 업데이트
        marker.setPosition(position);
        marker.setTitle(item.roadAddress || item.jibunAddress);

        // 정보 창 표시
        const infoWindow = new naver.maps.InfoWindow({
            content: `
                <div style="padding: 15px; min-width: 200px;">
                    <h4 style="margin: 0 0 10px 0; color: #333;">${item.roadAddress || item.jibunAddress}</h4>
                    <p style="margin: 0; color: #666; font-size: 0.9em;">
                        ${item.jibunAddress ? item.jibunAddress : ''}
                    </p>
                </div>
            `
        });

        infoWindow.open(map, marker);
    });
}

// 좌표로 주소 검색
function searchCoordinateToAddress(coord) {
    naver.maps.Service.reverseGeocode({
        coords: coord,
        orders: [
            naver.maps.Service.OrderType.ADDR,
            naver.maps.Service.OrderType.ROAD_ADDR
        ].join(',')
    }, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            return;
        }

        const items = response.v2.results;
        let address = '';

        if (items[1]) {
            address = items[1].land.addition0.value || items[1].land.name;
        }

        // 마커 위치 업데이트
        marker.setPosition(coord);
        marker.setTitle(address);

        // 정보 창 표시
        const infoWindow = new naver.maps.InfoWindow({
            content: `
                <div style="padding: 15px; min-width: 200px;">
                    <h4 style="margin: 0 0 10px 0; color: #333;">${address}</h4>
                    <p style="margin: 0; color: #666; font-size: 0.9em;">
                        위도: ${coord.y.toFixed(5)}<br>
                        경도: ${coord.x.toFixed(5)}
                    </p>
                </div>
            `
        });

        infoWindow.open(map, marker);
    });
}

// Enter 키로 검색
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('mapSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchAddress();
            }
        });
    }

    // 지도 초기화
    if (typeof naver !== 'undefined') {
        initMap();
    } else {
        console.error('네이버 지도 API가 로드되지 않았습니다.');
    }
});

// 번역 헬퍼 함수
function getTranslation(key) {
    const lang = getCurrentLanguage();
    return translations[lang] && translations[lang][key] ? translations[lang][key] : key;
}
