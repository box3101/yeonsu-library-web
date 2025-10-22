/**
 * Common JavaScript for Yeonsu Library Website
 * 연수구립도서관 공통 JavaScript
 *
 * Features:
 * - Multi-language translation using Google Translate
 * - Language preference storage in localStorage
 * - Automatic language restoration on page load
 */

// ============================================================================
// Google Translate Integration
// ============================================================================

/**
 * Initialize Google Translate widget
 * This function is called by Google Translate API when it's ready
 */
function googleTranslateElementInit() {
	try {
		// Create hidden Google Translate element
		new google.translate.TranslateElement(
			{
				pageLanguage: 'ko', // Default page language is Korean
				includedLanguages:
					'ko,en,zh-CN,zh-TW,ja,vi,mn,tl,my,ne,th,uz,af,am,ar,az,be,bg,bn,bs,ca,ceb,cs,cy,da,de,el,eo,es,et,eu,fa,fi,fil,fr,fy,ga,gd,gl,gu,ha,haw,he,hi,hmn,hr,ht,hu,hy,id,ig,is,it,jv,ka,kk,km,kn,ku,ky,lb,la,lo,lt,lv,mg,mi,mk,ml,mr,ms,mt,nl,no,ny,pa,pl,ps,pt,ro,ru,rw,sd,si,sk,sl,sm,sn,so,sq,sr,st,su,sv,sw,ta,te,tg,tr,uk,ur,xh,yi,yo,zu',
				layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
				autoDisplay: false,
				multilanguagePage: true,
			},
			'google_translate_element'
		);

		console.log('Google Translate initialized');

		// Hide Google Translate toolbar immediately
		hideGoogleTranslateToolbar();

		// Wait longer for Google Translate to be fully initialized and DOM to update
		setTimeout(function () {
			// Check if there's a saved language preference
			var savedLang = localStorage.getItem('preferredLanguage');
			if (savedLang && savedLang !== 'ko') {
				// Apply saved language
				setPageLang(savedLang);
			}
		}, 2000);
	} catch (error) {
		console.error('Error initializing Google Translate:', error);
	}
}

/**
 * Set page language and trigger Google Translate
 * @param {string} langCode - Language code (e.g., 'en', 'ja', 'zh-CN')
 */
function setPageLang(langCode) {
	try {
		// Save language preference to localStorage
		localStorage.setItem('preferredLanguage', langCode);

		// Close language selection dropdown if open
		if (typeof jQuery !== 'undefined') {
			jQuery('.langBox').removeClass('on');
			jQuery('.infoBox').removeClass('on');
		}

		// Get Google Translate select element - try multiple selectors
		var selectElement =
			document.querySelector('.goog-te-combo') || document.querySelector('select.goog-te-combo');

		if (selectElement) {
			// Set the value to trigger translation
			selectElement.value = langCode;

			// Trigger change event to activate translation
			var event = new Event('change', { bubbles: true });
			selectElement.dispatchEvent(event);

			console.log('Language changed to:', langCode);
		} else {
			// Check if iframe is loaded
			var iframe = document.querySelector('.goog-te-menu-frame');
			if (!iframe) {
				console.warn('Google Translate widget not ready. Waiting...');
				// Retry with exponential backoff, max 5 times
				var retryCount = parseInt(localStorage.getItem('translateRetryCount') || '0');
				if (retryCount < 5) {
					localStorage.setItem('translateRetryCount', (retryCount + 1).toString());
					setTimeout(function () {
						setPageLang(langCode);
					}, 1000 * (retryCount + 1)); // 1s, 2s, 3s, 4s, 5s
				} else {
					console.error('Google Translate failed to load after multiple attempts');
					localStorage.removeItem('translateRetryCount');
				}
			}
		}
	} catch (error) {
		console.error('Error setting language:', error);
	}
}

/**
 * Hide Google Translate toolbar banner
 * Some users prefer a cleaner interface without the top banner
 */
function hideGoogleTranslateToolbar() {
	// Hide the top banner notification
	var style = document.createElement('style');
	style.innerHTML = `
        /* Hide Google Translate toolbar */
        .goog-te-banner-frame {
            display: none !important;
        }

        /* Remove top margin added by Google Translate */
        body {
            top: 0 !important;
        }

        /* Hide Google Translate attribution (optional) */
        .goog-logo-link {
            display: none !important;
        }

        /* Hide the Google Translate select dropdown (we use custom UI) */
        #google_translate_element {
            display: none;
        }

        /* Style adjustments for translated text */
        .goog-text-highlight {
            background-color: transparent !important;
            box-shadow: none !important;
        }
    `;
	document.head.appendChild(style);
}

/**
 * Reset to original language (Korean)
 */
function resetLanguage() {
	localStorage.removeItem('preferredLanguage');
	setPageLang('ko');
}

// ============================================================================
// Initialization
// ============================================================================

/**
 * Initialize common functionality when DOM is ready
 */
(function () {
	// Wait for DOM to be fully loaded
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

	function init() {
		console.log('Common.js initialized');

		// Create container for Google Translate widget at the end of body
		// NOT hidden - Google Translate needs it to be visible to work properly
		if (!document.getElementById('google_translate_element')) {
			var translateDiv = document.createElement('div');
			translateDiv.id = 'google_translate_element';
			// Position it off-screen but still visible to the DOM
			translateDiv.style.position = 'absolute';
			translateDiv.style.left = '-9999px';
			translateDiv.style.top = '0';
			document.body.appendChild(translateDiv);
			console.log('Google Translate container created');
		}

		// Additional initialization can go here
		// e.g., other common functionality like accessibility features
	}
})();

// ============================================================================
// Global Exports
// ============================================================================

// Make functions available globally for inline onclick handlers
window.setPageLang = setPageLang;
window.resetLanguage = resetLanguage;
window.googleTranslateElementInit = googleTranslateElementInit;
