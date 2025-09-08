---
description:
auto_execution_mode: 1
---

1. Pages 안에 내가 원하는 파일이름.astro 생성
2. ***
   import Layout from '../layouts/Layout.astro';
   import SubLayout from '../components/layout/SubLayout.astro';

const breadcrumbItems = [
{ label: '홈', href: '/' },
{ label: '나의도서관', href: '/my-library' },
{ label: '내책장', href: '/my-library/my-shelf' },
];

---

<Layout title="내책장">
	<SubLayout title="내책장" breadcrumbItems={breadcrumbItems} menuType="나의도서관">23</SubLayout>
</Layout>
이렇게 기본적으로 생성
