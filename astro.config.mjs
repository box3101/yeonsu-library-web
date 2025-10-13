import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	build: {
		// Example: Generate `page.html` instead of `page/index.html` during build.
		format: 'file',
		assets: '_custom',
	},

	// 컴파일러 옵션 추가 - data-astro-* 속성 제거
	compilerOptions: {
		// 개발/프로덕션 모두에서 astro 디버그 속성 제거
		jsx: 'preserve',
		sourcemap: true,
	},

	vite: {
		css: {
			devSourcemap: true, // 개발시에만 소스맵 활성화
		},
		resolve: {
			alias: {
				'@': '/src',
				'@components': '/src/components',
				'@ui': '/src/components/UI',
				'@styles': '/src/styles',
				'@layouts': '/src/layouts',
			},
		},
		build: {
			sourcemap: false,
			cssCodeSplit: true,
			rollupOptions: {
				output: {
					assetFileNames: assetInfo => {
						return assetInfo.name;
					},
					sourcemap: false,
				},
			},
		},
	},

	devToolbar: {
		enabled: false,
	},

	server: {
		host: true,
		port: 3000,
	},
});
