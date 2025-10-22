/**
 * Alternative Translation System for Yeonsu Library Website
 * 연수구립도서관 대체 번역 시스템
 *
 * Uses Google Translate with page reload for more reliable translation
 */

/**
 * Change page language using Google Translate URL parameter
 * @param {string} langCode - Language code (e.g., 'en', 'ja', 'zh-CN')
 */
function setPageLang(langCode) {
	try {
		// Save language preference
		localStorage.setItem('preferredLanguage', langCode);

		// Close language selection dropdown if open
		if (typeof jQuery !== 'undefined') {
			jQuery('.langBox').removeClass('on');
			jQuery('.infoBox').removeClass('on');
		}

		// For Korean, just reload the page without translation
		if (langCode === 'ko') {
			// Remove the Google Translate cookie
			document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
			document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
			window.location.reload();
			return;
		}

		// Set Google Translate cookies
		var googleTransValue = '/ko/' + langCode;
		document.cookie = 'googtrans=' + googleTransValue + '; path=/';
		document.cookie = 'googtrans=' + googleTransValue + '; path=/; domain=' + window.location.hostname;

		console.log('Language changed to:', langCode);

		// Reload the page to apply translation
		window.location.reload();
	} catch (error) {
		console.error('Error setting language:', error);
	}
}

/**
 * Reset to original language (Korean)
 */
function resetLanguage() {
	localStorage.removeItem('preferredLanguage');
	setPageLang('ko');
}

/**
 * Check and apply saved language on page load
 */
(function () {
	// Check if there's a saved language preference
	var savedLang = localStorage.getItem('preferredLanguage');

	// Only auto-apply if not already translated
	var currentLang = getCookie('googtrans');

	if (savedLang && savedLang !== 'ko' && !currentLang) {
		// Apply saved language
		setPageLang(savedLang);
	}
})();

/**
 * Helper function to get cookie value
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null
 */
function getCookie(name) {
	var value = '; ' + document.cookie;
	var parts = value.split('; ' + name + '=');
	if (parts.length === 2) return parts.pop().split(';').shift();
	return null;
}

// Export functions globally
window.setPageLang = setPageLang;
window.resetLanguage = resetLanguage;
