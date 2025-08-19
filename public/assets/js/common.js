(function () {
  'use strict';

  // LibraryCommon 전역 객체 초기화
  window.LibraryCommon = {
    features: {},

    // 모든 기능 초기화
    init: function () {
      for (const featureName in this.features) {
        const feature = this.features[featureName];
        if (feature.init && typeof feature.init === 'function') {
          try {
            feature.init();
            console.log(`✅ ${featureName} 기능이 초기화되었습니다.`);
          } catch (error) {
            console.error(`❌ ${featureName} 기능 초기화 실패:`, error);
          }
        }
      }
    },

    // 특정 기능만 초기화
    initFeature: function (featureName) {
      const feature = this.features[featureName];
      if (feature && feature.init && typeof feature.init === 'function') {
        try {
          feature.init();
          console.log(`✅ ${featureName} 기능이 초기화되었습니다.`);
        } catch (error) {
          console.error(`❌ ${featureName} 기능 초기화 실패:`, error);
        }
      }
    },
  };

  // DOM 로드 완료 후 모든 기능 자동 초기화
  document.addEventListener('DOMContentLoaded', function () {
    // 약간의 지연을 두어 다른 스크립트들이 로드될 시간을 줌
    setTimeout(function () {
      window.LibraryCommon.init();
    }, 100);
  });
})();
