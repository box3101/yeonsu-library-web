const fs = require('fs');
const path = require('path');
const glob = require('glob');

// SCSS 파일들 찾기
const scssFiles = glob.sync('src/styles/**/*.scss');

scssFiles.forEach(filePath => {
  if (filePath.includes('_globals.scss') || filePath.includes('_functions.scss') || filePath.includes('_mixins.scss') || filePath.includes('variables/')) {
    return; // 기본 파일들은 건드리지 않음
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // font-size px를 to-rem으로 변경
  content = content.replace(/font-size:\s*(\d+)px;/g, 'font-size: to-rem($1);');
  
  // @include mixin들을 일반 CSS로 변경
  content = content.replace(/@include\s+flex-center;/g, 'display: flex;\n  justify-content: center;\n  align-items: center;');
  content = content.replace(/@include\s+flex-between;/g, 'display: flex;\n  justify-content: space-between;\n  align-items: center;');
  content = content.replace(/@include\s+flex-column;/g, 'display: flex;\n  flex-direction: column;');
  content = content.replace(/@include\s+flex;/g, 'display: flex;');
  
  // shadow mixin 제거
  content = content.replace(/@include\s+shadow\(\d+\);/g, 'box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);');
  
  // bg-image mixin 제거
  content = content.replace(/@include\s+bg-image\([^)]+\);/g, '');
  
  // position mixins 제거
  content = content.replace(/@include\s+absolute\([^)]*\);/g, 'position: absolute;');
  content = content.replace(/@include\s+relative\([^)]*\);/g, 'position: relative;');
  
  // font-size mixin을 일반 CSS로 변경
  content = content.replace(/@include\s+font-size\((\d+),?\s*([^)]*)\);/g, (match, size, lineHeight) => {
    const lh = lineHeight ? lineHeight.trim() : '1.4';
    return `font-size: to-rem(${size});\n  line-height: ${lh};`;
  });
  
  // responsive mixins를 media queries로 변경
  content = content.replace(/@include\s+mobile\s*\{/g, '@media (max-width: 575px) {');
  content = content.replace(/@include\s+tablet\s*\{/g, '@media (min-width: 576px) and (max-width: 991px) {');
  content = content.replace(/@include\s+desktop\s*\{/g, '@media (min-width: 992px) {');
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated: ${filePath}`);
});

console.log('SCSS conversion completed!');