#!/usr/bin/env node

/**
 * Git Hooks 설정 스크립트
 * .githooks 폴더의 hook들을 .git/hooks로 복사하고 실행 권한을 부여합니다.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function setupGitHooks() {
  console.log('🔧 Git Hooks를 설정합니다...\n');

  try {
    // Git hooks 디렉토리 경로 설정
    execSync('git config core.hooksPath .githooks', { stdio: 'inherit' });
    console.log('✅ Git hooks 경로가 .githooks로 설정되었습니다.');

    // Hook 파일들에 실행 권한 부여 (Unix 계열 시스템)
    if (process.platform !== 'win32') {
      try {
        execSync('chmod +x .githooks/*', { stdio: 'inherit' });
        console.log('✅ Hook 파일들에 실행 권한을 부여했습니다.');
      } catch (error) {
        console.log('⚠️  실행 권한 설정을 건너뜁니다. (Windows 환경이거나 권한 없음)');
      }
    }

    console.log('\n🎉 Git Hooks 설정이 완료되었습니다!');
    console.log('\n📝 이제 커밋할 때마다 guide.astro가 자동으로 업데이트됩니다.');
    console.log('\n사용법:');
    console.log('  git add .');
    console.log('  git commit -m "Footer 모바일 반응형 개선"');
    console.log('  → guide.astro에 자동으로 작업 내역이 추가됩니다!\n');

  } catch (error) {
    console.error('❌ Git Hooks 설정 중 오류가 발생했습니다:', error.message);
    console.log('\n💡 수동 설정 방법:');
    console.log('  git config core.hooksPath .githooks');
    console.log('  chmod +x .githooks/pre-commit');
  }
}

// 스크립트 실행
if (require.main === module) {
  setupGitHooks();
}

module.exports = { setupGitHooks };
