const fs = require('fs');
const path = require('path');

/**
 * 연수도서관 웹사이트 HTML 포맷팅 스크립트
 *
 * 문제: Astro 빌드 시 연속된 태그들(a, button 등)이 붙어서 나오는 현상
 * 해결: 각 태그를 적절한 들여쓰기와 함께 개별 줄로 분리
 *
 * 처리 대상:
 * - button 태그들의 연속 배치
 * - a 태그들의 연속 배치 (div 내부 + 전역)
 * - input, select, textarea 등 폼 요소들
 *
 * 주의사항:
 * - 각 컨테이너별로 첫 번째 태그의 들여쓰기 기준으로 통일
 * - 빈 줄 제거 시 의도하지 않은 태그 연결 방지
 * - 기존 들여쓰기 구조 최대한 보존
 */

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

		/**
		 * 태그 분리 처리 시작
		 *
		 * 전략: 컨테이너별로 처리해서 각 영역의 들여쓰기 일관성 유지
		 * 순서: button → a태그(div내부) → a태그(전역) → 기타폼요소
		 */

		// 1. button 태그들을 그룹별로 처리 (예: 페이지네이션, 필터 버튼들)
		content = content.replace(/(<div[^>]*>[\s\S]*?<\/div>)/g, divContent => {
			// 이 div 내의 첫 번째 button 태그 들여쓰기 찾기
			const firstButtonMatch = divContent.match(/\n(\t*)<button/);
			if (!firstButtonMatch) return divContent;

			const firstButtonTabs = firstButtonMatch[1];

			// 이 div 내의 모든 </button><button 패턴을 동일한 들여쓰기로 변경
			return divContent.replace(/(<\/button>)(<button)/g, (match, closingTag, openingTag) => {
				return closingTag + '\n' + firstButtonTabs + openingTag;
			});
		});

		// 2. a 태그들 전역 처리 (공지사항 리스트, 네비게이션 링크 등)
		// 먼저 div 컨테이너 내부의 a 태그들 처리
		content = content.replace(/(<div[^>]*>[\s\S]*?<\/div>)/g, divContent => {
			// 이 div 내의 첫 번째 a 태그 들여쓰기 찾기
			const firstAMatch = divContent.match(/\n(\t*)<a/);
			if (!firstAMatch) return divContent;

			const firstATabs = firstAMatch[1];

			// 이 div 내의 모든 </a><a 패턴을 동일한 들여쓰기로 변경
			return divContent.replace(/(<\/a>)(<a)/g, (match, closingTag, openingTag) => {
				return closingTag + '\n' + firstATabs + openingTag;
			});
		});

		// div 밖에 있는 연속된 a 태그들 처리 (메인 네비게이션, 브레드크럼 등)
		// 문제 상황: </a><a href="#" class="notice-item" 형태로 붙어있는 경우
		content = content.replace(/(<\/a>)(<a)/g, (match, closingTag, openingTag, offset, string) => {
			// 이전 부분에서 마지막 줄의 들여쓰기 찾기
			const beforeContent = string.substring(0, offset);
			const lastLineMatch = beforeContent.match(/\n(\t*).*$/);
			const indentTabs = lastLineMatch ? lastLineMatch[1] : '';

			return closingTag + '\n' + indentTabs + openingTag;
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

		/**
		 * 빈 줄 정리 단계 - 태그 연결 방지가 최우선
		 *
		 * 원칙:
		 * - 의미없는 빈 줄만 제거
		 * - 연속된 동일 태그들 사이의 줄바꿈은 절대 제거 안함
		 * - 과도한 빈 줄만 축소 (완전 제거 X)
		 */

		// 1. 탭이나 공백만 있는 완전히 빈 줄 제거
		content = content.replace(/\n[\t ]*\n/g, '\n');

		// 2. 3개 이상의 연속 줄바꿈을 2개로 축소 (구조적 여백 보존)
		content = content.replace(/\n{3,}/g, '\n\n');

		// 3. 서로 다른 태그 간의 불필요한 빈 줄만 제거 (a, button 등 연속 태그는 보호)
		content = content.replace(/(<\/(?!a|button|input|select|textarea)[^>]+>)\n\s*\n\s*(<(?!a|button|input|select|textarea)[^>]*>)/g, '$1\n$2');

		fs.writeFileSync(filePath, content, 'utf8');
		console.log(`Formatted: ${filePath}`);
	} catch (error) {
		console.error(`Error processing ${filePath}:`, error.message);
	}
});

console.log(`Processed ${htmlFiles.length} HTML files`);

/**
 * 사용법:
 * 1. npm run build 실행 후
 * 2. node scripts/format-tags.cjs 실행
 *
 * 또는 package.json의 build:clean 스크립트 사용:
 * npm run build:clean
 *
 * 처리 결과:
 * - </a><a> → </a>\n{들여쓰기}<a>
 * - </button><button> → </button>\n{들여쓰기}<button>
 * - 기타 폼 요소들도 동일하게 처리
 */
