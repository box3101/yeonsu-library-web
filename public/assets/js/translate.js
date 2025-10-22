/**
 * Google Translate Integration for Yeonsu Library
 * Simple and reliable translation system
 */

// Global flag to track initialization
var isTranslateReady = false;

/**
 * Initialize Google Translate
 * Called automatically by Google Translate API
 */
function googleTranslateElementInit() {
	// Create the translate element in a visible container
	new google.translate.TranslateElement(
		{
			pageLanguage: 'ko',
			includedLanguages:
				'ko,en,zh-CN,zh-TW,ja,vi,mn,tl,my,ne,th,uz,af,am,ar,az,be,bg,bn,bs,ca,ceb,cs,cy,da,de,el,eo,es,et,eu,fa,fi,fil,fr,fy,ga,gd,gl,gu,ha,haw,he,hi,hmn,hr,ht,hu,hy,id,ig,is,it,jv,ka,kk,km,kn,ku,ky,lb,la,lo,lt,lv,mg,mi,mk,ml,mr,ms,mt,nl,no,ny,pa,pl,ps,pt,ro,ru,rw,sd,si,sk,sl,sm,sn,so,sq,sr,st,su,sv,sw,ta,te,tg,tr,uk,ur,xh,yi,yo,zu',
			layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
		},
		'google_translate_element'
	);

	console.log('✓ Google Translate initialized');

	// Mark as ready after a delay to ensure DOM updates
	setTimeout(function () {
		isTranslateReady = true;
		console.log('✓ Google Translate ready');

		// Hide the default UI
		hideGoogleTranslateUI();

		// Check for saved language
		checkSavedLanguage();
	}, 1500);
}

/**
 * Hide Google Translate default UI
 */
function hideGoogleTranslateUI() {
	var style = document.createElement('style');
	style.innerHTML = `
		/* Hide Google Translate default toolbar and banner */
		.goog-te-banner-frame.skiptranslate {
			display: none !important;
		}
		body {
			top: 0px !important;
		}
		/* Hide the widget container */
		#google_translate_element {
			position: absolute;
			left: -9999px;
			top: 0;
		}
		/* Hide translation attribution */
		.goog-logo-link {
			display: none !important;
		}
		.goog-te-gadget {
			color: transparent !important;
		}
		/* Optional: Style for translated elements */
		.goog-text-highlight {
			background-color: transparent !important;
			box-shadow: none !important;
		}
	`;
	document.head.appendChild(style);
}

/**
 * Check and apply saved language preference
 */
function checkSavedLanguage() {
	var savedLang = localStorage.getItem('preferredLanguage');
	if (savedLang && savedLang !== 'ko') {
		console.log('Applying saved language:', savedLang);
		triggerTranslation(savedLang);
	}
}

/**
 * Change page language
 * @param {string} langCode - Language code (e.g., 'en', 'ja', 'zh-CN')
 */
function setPageLang(langCode) {
	console.log('Language requested:', langCode);

	// Save preference
	localStorage.setItem('preferredLanguage', langCode);

	// Close dropdowns
	if (typeof jQuery !== 'undefined') {
		jQuery('.langBox').removeClass('on');
		jQuery('.infoBox').removeClass('on');
	}

	// For Korean, remove translation
	if (langCode === 'ko') {
		resetToKorean();
		return;
	}

	// Trigger translation
	if (isTranslateReady) {
		triggerTranslation(langCode);
	} else {
		console.log('Waiting for Google Translate to load...');
		// Wait and try again
		var attempts = 0;
		var interval = setInterval(function () {
			attempts++;
			if (isTranslateReady) {
				clearInterval(interval);
				triggerTranslation(langCode);
			} else if (attempts > 20) {
				clearInterval(interval);
				console.error('Google Translate failed to load');
				alert('번역 서비스를 불러올 수 없습니다. 페이지를 새로고침해주세요.');
			}
		}, 500);
	}
}

/**
 * Trigger Google Translate
 * @param {string} langCode - Language code
 */
function triggerTranslation(langCode) {
	// Method 1: Try using the select dropdown
	var selectField = document.querySelector('.goog-te-combo');
	if (selectField) {
		selectField.value = langCode;
		selectField.dispatchEvent(new Event('change'));
		console.log('✓ Translation triggered:', langCode);
		return;
	}

	// Method 2: Use iframe approach
	var iframe = document.querySelector('.goog-te-menu-frame');
	if (!iframe) {
		iframe = document.querySelector('iframe.goog-te-menu-frame:first');
	}

	if (iframe) {
		var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
		var langLinks = innerDoc.querySelectorAll('.goog-te-menu2-item span.text');

		for (var i = 0; i < langLinks.length; i++) {
			var langLink = langLinks[i];
			if (langLink.textContent && langLink.textContent.includes(langCode)) {
				langLink.click();
				console.log('✓ Translation triggered via iframe:', langCode);
				return;
			}
		}
	}

	// Method 3: Cookie-based approach (fallback)
	console.log('Using cookie-based translation');
	document.cookie = 'googtrans=/ko/' + langCode + '; path=/';
	setTimeout(function () {
		location.reload();
	}, 100);
}

/**
 * Reset to Korean (remove translation)
 */
function resetToKorean() {
	console.log('Resetting to Korean');
	localStorage.setItem('preferredLanguage', 'ko');

	// Clear cookies
	document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
	document.cookie =
		'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;

	// Reload page
	location.reload();
}

/**
 * Reset language preference
 */
function resetLanguage() {
	resetToKorean();
}

// Export functions globally
window.setPageLang = setPageLang;
window.resetLanguage = resetLanguage;
window.googleTranslateElementInit = googleTranslateElementInit;

console.log('✓ Translation script loaded');
