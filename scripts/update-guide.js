#!/usr/bin/env node

/**
 * Guide.astro 자동 업데이트 스크립트
 * Git 커밋 시 변경된 파일들을 분석하여 guide.astro에 작업 내역을 자동으로 추가합니다.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 설정
const GUIDE_FILE = 'src/pages/guide.astro';
const WORK_LOG_SECTION = '// 🔄 최근 작업 내역';

/**
 * Git에서 마지막 커밋의 변경된 파일 목록을 가져옵니다.
 */
function getChangedFiles() {
  try {
    // 스테이지된 파일들 가져오기
    const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(file => file);

    return stagedFiles;
  } catch (error) {
    console.log('Git staged files를 가져올 수 없습니다. 전체 변경사항을 확인합니다.');
    
    try {
      // 최근 변경된 파일들 가져오기 (fallback)
      const recentFiles = execSync('git diff --name-only HEAD~1', { encoding: 'utf8' })
        .trim()
        .split('\n')
        .filter(file => file);
      
      return recentFiles;
    } catch (fallbackError) {
      console.log('변경된 파일을 찾을 수 없습니다.');
      return [];
    }
  }
}

/**
 * 파일 변경사항을 분석하여 작업 내역을 생성합니다.
 */
function analyzeChanges(changedFiles) {
  const changes = [];
  const currentDate = new Date().toLocaleDateString('ko-KR');
  const currentTime = new Date().toLocaleTimeString('ko-KR');

  changedFiles.forEach(file => {
    const change = {
      file,
      type: getChangeType(file),
      description: getChangeDescription(file),
      date: currentDate,
      time: currentTime
    };

    if (change.description) {
      changes.push(change);
    }
  });

  return changes;
}

/**
 * 파일 경로를 분석하여 변경 타입을 결정합니다.
 */
function getChangeType(filePath) {
  if (filePath.includes('components/')) return 'Component';
  if (filePath.includes('pages/')) return 'Page';
  if (filePath.includes('styles/')) return 'Style';
  if (filePath.includes('public/assets/js/')) return 'JavaScript';
  if (filePath.includes('public/assets/images/')) return 'Asset';
  if (filePath.includes('layouts/')) return 'Layout';
  return 'Other';
}

/**
 * 파일 경로를 분석하여 변경 설명을 생성합니다.
 */
function getChangeDescription(filePath) {
  const fileName = path.basename(filePath);
  const dir = path.dirname(filePath);

  // 스타일 파일
  if (filePath.includes('styles/components/')) {
    const componentName = fileName.replace(/^_|\.scss$/g, '');
    return `${componentName} 컴포넌트 스타일 개선`;
  }

  if (filePath.includes('styles/utilities/')) {
    return `유틸리티 클래스 업데이트`;
  }

  if (filePath.includes('styles/variables/')) {
    return `디자인 시스템 변수 수정`;
  }

  // 컴포넌트 파일
  if (filePath.includes('components/UI/')) {
    const componentName = fileName.replace('.astro', '');
    return `${componentName} 컴포넌트 개선`;
  }

  if (filePath.includes('components/layout/')) {
    const layoutName = fileName.replace('.astro', '');
    return `${layoutName} 레이아웃 수정`;
  }

  // 페이지 파일
  if (filePath.includes('pages/') && fileName.endsWith('.astro')) {
    const pageName = fileName.replace('.astro', '');
    return `${pageName} 페이지 업데이트`;
  }

  // JavaScript 파일
  if (filePath.includes('public/assets/js/')) {
    const jsName = fileName.replace('.js', '');
    return `${jsName} 스크립트 기능 개선`;
  }

  return null; // 설명이 없는 경우 제외
}

/**
 * Guide.astro 파일을 업데이트합니다.
 */
function updateGuideFile(changes) {
  if (changes.length === 0) {
    console.log('업데이트할 변경사항이 없습니다.');
    return;
  }

  try {
    let guideContent = fs.readFileSync(GUIDE_FILE, 'utf8');

    // 작업 내역 섹션 찾기
    const workLogIndex = guideContent.indexOf(WORK_LOG_SECTION);
    
    if (workLogIndex === -1) {
      console.log('Guide 파일에 작업 내역 섹션을 추가합니다.');
      // 섹션이 없으면 파일 끝에 추가
      const newSection = generateWorkLogSection(changes);
      guideContent += '\n\n' + newSection;
    } else {
      console.log('기존 작업 내역 섹션을 업데이트합니다.');
      // 기존 섹션 업데이트
      const beforeSection = guideContent.substring(0, workLogIndex);
      const afterSectionIndex = guideContent.indexOf('\n---', workLogIndex);
      const afterSection = afterSectionIndex !== -1 ? guideContent.substring(afterSectionIndex) : '';
      
      const updatedSection = generateWorkLogSection(changes);
      guideContent = beforeSection + updatedSection + afterSection;
    }

    // 파일 저장
    fs.writeFileSync(GUIDE_FILE, guideContent, 'utf8');
    console.log(`✅ Guide.astro 파일이 업데이트되었습니다. (${changes.length}개 항목 추가)`);

    // 변경사항 출력
    changes.forEach(change => {
      console.log(`   📝 [${change.type}] ${change.description} (${change.file})`);
    });

  } catch (error) {
    console.error('❌ Guide 파일 업데이트 중 오류가 발생했습니다:', error.message);
  }
}

/**
 * 작업 내역 섹션을 생성합니다.
 */
function generateWorkLogSection(changes) {
  const currentDate = new Date().toLocaleDateString('ko-KR');
  
  let section = `${WORK_LOG_SECTION}\nconst recentWork = [\n`;

  changes.forEach(change => {
    section += `  {\n`;
    section += `    date: '${change.date}',\n`;
    section += `    time: '${change.time}',\n`;
    section += `    type: '${change.type}',\n`;
    section += `    description: '${change.description}',\n`;
    section += `    file: '${change.file}'\n`;
    section += `  },\n`;
  });

  section += `];\n`;

  return section;
}

/**
 * 메인 실행 함수
 */
function main() {
  console.log('🔄 Guide.astro 자동 업데이트를 시작합니다...\n');

  // 변경된 파일 가져오기
  const changedFiles = getChangedFiles();
  
  if (changedFiles.length === 0) {
    console.log('변경된 파일이 없습니다.');
    return;
  }

  console.log(`📁 변경된 파일 ${changedFiles.length}개를 분석 중...\n`);

  // 변경사항 분석
  const changes = analyzeChanges(changedFiles);

  if (changes.length === 0) {
    console.log('Guide에 추가할 의미있는 변경사항이 없습니다.');
    return;
  }

  // Guide 파일 업데이트
  updateGuideFile(changes);

  console.log('\n✨ Guide.astro 업데이트가 완료되었습니다!');
}

// 스크립트 실행
if (require.main === module) {
  main();
}

module.exports = { main, analyzeChanges, updateGuideFile };
