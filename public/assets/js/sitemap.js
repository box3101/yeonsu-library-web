/**
 * Sitemap Tab Functionality
 * 사이트맵 탭 전환 기능
 */

(function () {
	'use strict';

	function initSitemapTabs() {
		const tabs = document.querySelectorAll('.sitemap-tab');

		if (tabs.length === 0) return;

		// Set first tab as active
		tabs[0]?.classList.add('active');

		tabs.forEach(tab => {
			tab.addEventListener('click', function () {
				// Remove active class from all tabs
				tabs.forEach(t => t.classList.remove('active'));

				// Add active class to clicked tab
				this.classList.add('active');

				// You can add filtering logic here if needed
				// For now, all columns are always visible
			});
		});
	}

	// Initialize when DOM is ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initSitemapTabs);
	} else {
		initSitemapTabs();
	}
})();
