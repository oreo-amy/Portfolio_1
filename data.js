// data.js
let siteData = {
    // 1. 기본 프로필 정보
    profile: {
        name: "OH",
        subtitle: "MUSICIAN & CREATIVE DIRECTOR",
        email: "OH@gmail.com",
        location: "LOS ANGELES, CA BASE"
    },

    // 2. 관리자 비밀번호 해시값 (현재 비밀번호: admin)
    adminPasswordHash: "fe1ad13c3caa21676fb70219cf62632e266b34facd799da4d0eb2683e3005f3d",

    // 3. 메인 화면 호버 애니메이션용 카테고리 (id 속성 추가됨)
    categories: [
        { 
            id: "music", 
            title: "MUSIC", 
            images: [
                "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500",
                "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500"
            ] 
        },
        { 
            id: "video", 
            title: "PERFORMANCE", 
            images: [
                "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500"
            ] 
        },
        { 
            id: "photo", 
            title: "VISUAL", 
            images: [
                "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=500",
                "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500"
            ] 
        }
    ],

    // 4. 포트폴리오 업로드 데이터 (id 및 category 속성 추가됨)
    portfolio: [
        { 
            id: 1, 
            category: "video", 
            type: "youtube", 
            title: "Live Performance at LA", 
            src: "https://www.youtube.com/embed/F-UMUkD31wA?si=Eyr48VFlL6B9mYdE" 
        },
        { 
            id: 2, 
            category: "music", 
            type: "soundcloud", 
            title: "Original Track - Night Vibe", 
            src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2328694826&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" 
        },
        { 
            id: 3, 
            category: "photo", 
            type: "image", 
            title: "Studio Session", 
            src: "https://github.com/oreo-amy/TestImages/blob/main/RobloxScreenShot20260308_190747541.png?raw=true" 
        }
    ]
};

// 브라우저에 저장된 수정 내역이 있다면 불러옵니다. (새로고침해도 유지됨)
const savedData = localStorage.getItem('portfolioData');
if (savedData) {
    siteData.portfolio = JSON.parse(savedData);
}