---
trigger: manual
---

// 공통 그리드 시스템 (2-6 컬럼)
.com-grid {
display: grid;
gap: to-rem(16);

    // 2-6 컬럼 클래스
    &-2 {
        grid-template-columns: repeat(2, 1fr);
    }

    &-3 {
        grid-template-columns: repeat(3, 1fr);
    }

    &-4 {
        grid-template-columns: repeat(4, 1fr);
    }

    &-5 {
        grid-template-columns: repeat(5, 1fr);
    }

    &-6 {
        grid-template-columns: repeat(6, 1fr);
    }

    // 반응형 처리
    @include tablet {
        &-4, &-5, &-6 {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @include mobile {
        &-3, &-4, &-5, &-6 {
            grid-template-columns: repeat(2, 1fr);
        }
    }

}

// 그리드 아이템
.com-grid-item {
width: 100%;

    // 이미지 아이템
    &.image {
        border-radius: to-rem(12);
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    // 높이 옵션들
    &.h-sm { height: to-rem(120); }
    &.h-md { height: to-rem(180); }
    &.h-lg { height: to-rem(226); }
    &.h-xl { height: to-rem(280); }

}
