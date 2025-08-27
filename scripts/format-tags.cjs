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
    
    // 모든 연결된 태그들을 분리하되, 각 컨테이너별로 첫 번째 태그 기준으로 정렬
    // 1. button 태그들을 그룹별로 처리
    content = content.replace(/(<div[^>]*>[\s\S]*?<\/div>)/g, (divContent) => {
      // 이 div 내의 첫 번째 button 태그 들여쓰기 찾기
      const firstButtonMatch = divContent.match(/\n(\t*)<button/);
      if (!firstButtonMatch) return divContent;
      
      const firstButtonTabs = firstButtonMatch[1];
      
      // 이 div 내의 모든 </button><button 패턴을 동일한 들여쓰기로 변경
      return divContent.replace(/(<\/button>)(<button)/g, (match, closingTag, openingTag) => {
        return closingTag + '\n' + firstButtonTabs + openingTag;
      });
    });
    
    // 2. a 태그들도 그룹별로 처리 (div 처리 후 다시)
    content = content.replace(/(<div[^>]*>[\s\S]*?<\/div>)/g, (divContent) => {
      // 이 div 내의 첫 번째 a 태그 들여쓰기 찾기
      const firstAMatch = divContent.match(/\n(\t*)<a/);
      if (!firstAMatch) return divContent;
      
      const firstATabs = firstAMatch[1];
      
      // 이 div 내의 모든 </a><a 패턴을 동일한 들여쓰기로 변경
      return divContent.replace(/(<\/a>)(<a)/g, (match, closingTag, openingTag) => {
        return closingTag + '\n' + firstATabs + openingTag;
      });
    });
    
    // 3. input, select, textarea 태그들도 동일하게 처리 - 첫 번째 태그와 같은 들여쓰기 수준으로 통일
    ['input', 'select', 'textarea'].forEach(tagName => {
      const regex = new RegExp(`(<\/${tagName}>)(<${tagName})`, 'g');
      content = content.replace(regex, (match, closingTag, openingTag, offset, string) => {
        // 첫 번째 해당 태그의 들여쓰기 수준을 찾기
        const firstTagMatch = string.match(new RegExp(`\\n(\\t*)<${tagName}`));
        const firstTagTabs = firstTagMatch ? firstTagMatch[1] : '';
        
        return closingTag + '\n' + firstTagTabs + openingTag;
      });
    });
    
    // 빈 줄 완전 제거 (탭만 있는 줄, 공백만 있는 줄, 완전 빈 줄 모두 제거)
    content = content.replace(/\n\s*\n/g, '\n');
    
    // 연속된 줄바꿈 제거 (2개 이상의 연속 줄바꿈을 1개로)
    content = content.replace(/\n{2,}/g, '\n');
    
    // HTML 태그 사이의 구조적 빈 줄도 제거 (단, 들여쓰기는 유지)
    content = content.replace(/>\n\s*\n\s*</g, '>\n<');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Formatted: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
});

console.log(`Processed ${htmlFiles.length} HTML files`);