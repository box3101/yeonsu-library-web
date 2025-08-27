const fs = require('fs');
const path = require('path');

// dist 디렉토리 순회하여 HTML 파일 찾기
function findHtmlFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findHtmlFiles(fullPath));
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// HTML 파일들을 찾아서 처리
const htmlFiles = findHtmlFiles('dist');

htmlFiles.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // </a><a>, </button><button>, </a><button> 등의 패턴을 줄바꿈으로 분리
    content = content.replace(/(<\/(?:a|button|input|select|textarea)>)(<(?:a|button|input|select|textarea))/g, (match, closingTag, openingTag) => {
      // 현재 위치의 들여쓰기 수준 파악
      const beforeMatch = content.substring(0, content.indexOf(match));
      const lines = beforeMatch.split('\n');
      const lastLine = lines[lines.length - 1];
      const tabCount = (lastLine.match(/\t/g) || []).length;
      
      // 같은 수준의 들여쓰기로 줄바꿈 추가
      const tabs = '\t'.repeat(tabCount);
      
      return closingTag + '\n' + tabs + openingTag;
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Formatted: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
});

console.log(`Processed ${htmlFiles.length} HTML files`);