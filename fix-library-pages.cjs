const fs = require('fs');
const path = require('path');

const files = [
	'해돋이도서관.astro',
	'해찬솔공원작은도서관.astro',
	'선학별빛도서관.astro',
	'동춘나래도서관.astro',
	'함박비류도서관.astro',
	'누리공원작은도서관.astro',
	'옥련1동작은도서관.astro',
	'옥련2동어린이작은도서관.astro',
	'연수1동작은도서관.astro',
	'송도2동작은도서관.astro',
	'송도3동작은도서관.astro',
	'송도5동작은도서관.astro',
	'송도국제어린이도서관.astro',
	'솔안공원작은도서관.astro',
];

const pagesDir = path.join(__dirname, 'src', 'pages');
let fixed = 0;

files.forEach((filename) => {
	const filePath = path.join(pagesDir, filename);

	if (!fs.existsSync(filePath)) {
		console.log(`File not found: ${filename}`);
		return;
	}

	let content = fs.readFileSync(filePath, 'utf8');

	// Skip if already fixed
	if (content.includes('공통 정보 - 탭과 무관하게 항상 표시')) {
		console.log(`Already fixed: ${filename}`);
		return;
	}

	// Find the UiSubTab section and extract address/transport info
	const uiSubTabMatch = content.match(/<!-- Sub Tab -->\s*<UiSubTab[^>]*>([\s\S]*?)<\/UiSubTab>/);

	if (!uiSubTabMatch) {
		console.log(`No UiSubTab found in: ${filename}`);
		return;
	}

	const originalSubTabSection = uiSubTabMatch[0];
	const subTabContent = uiSubTabMatch[1];

	// Extract address info (first occurrence)
	const addressMatch = subTabContent.match(/<!-- Address Info Box -->\s*<div class="address-info-box">[\s\S]*?<\/div>\s*<\/div>/);

	if (!addressMatch) {
		console.log(`No address info found in: ${filename}`);
		return;
	}

	const addressInfo = addressMatch[0];

	// Extract transportation info (first occurrence)
	const transportMatch = subTabContent.match(/<!-- Transportation Info -->\s*<div class="transportation-section">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);

	if (!transportMatch) {
		console.log(`No transportation info found in: ${filename}`);
		return;
	}

	const transportInfo = transportMatch[0];

	// Clean the subtab panels - remove address and transport info, keep only maps
	let newSubTabContent = subTabContent;

	// Remove all address-info-box sections
	newSubTabContent = newSubTabContent.replace(/\s*<!-- Address Info Box -->[\s\S]*?<div class="address-info-box">[\s\S]*?<\/div>\s*<\/div>/g, '');

	// Remove all transportation-section sections
	newSubTabContent = newSubTabContent.replace(/\s*<!-- Transportation Info -->[\s\S]*?<div class="transportation-section">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');

	// Build the new UiSubTab section
	const newSubTabSection = `<!-- Sub Tab -->
\t\t\t\t\t<UiSubTab tabs={mapTabs} activeTab={0} class="library-directions-subtab">
${newSubTabContent}\t\t\t\t\t</UiSubTab>

\t\t\t\t\t<!-- Address Info Box (공통 정보 - 탭과 무관하게 항상 표시) -->
\t\t\t\t\t${addressInfo}

\t\t\t\t\t<!-- Transportation Info (공통 정보 - 탭과 무관하게 항상 표시) -->
\t\t\t\t\t${transportInfo}`;

	// Replace in the full content
	const newContent = content.replace(originalSubTabSection, newSubTabSection);

	// Write the fixed file
	fs.writeFileSync(filePath, newContent, 'utf8');

	console.log(`✓ Fixed: ${filename}`);
	fixed++;
});

console.log(`\n${'='.repeat(60)}`);
console.log(`Summary: Fixed ${fixed} out of ${files.length} files`);
console.log(`${'='.repeat(60)}`);
