---
description:
auto_execution_mode: 1
---

- info-notice

  ```jsx
  <div class="info-notice program-notice">
  	<div class="info-notice__header">
  		<div class="info-notice__icon">
  			<img src="./assets/images/icon/icon-info.svg" alt="안내" class="icon icon-sm" />
  		</div>
  		<h3 class="info-notice__title">신청접수 시 주의사항</h3>
  	</div>
  	<div class="program-notice__content">
  		<ul class="program-notice__list">
  			<li>신청접수 시 주의사항</li>
  			<li>회원님의 PC 시간과 서버 시간은 오차가 있을 수 있습니다.</li>
  			<li>새로 고침을 반복적으로 하시면 접속이 느려질 수 있습니다.</li>
  		</ul>
  	</div>
  </div>
  ```

- **usage-guide-list**

  ```jsx
  <div class="usage-guide">
  	<h3 class="usage-guide__title">이용대상</h3>
  	<ul class="usage-guide__content">
  		<li>지역주민 누구나</li>
  	</ul>
  </div>
  ```

- **usage-guide-table**

  ```jsx
  <UserGuideTable
  	title="이용안내"
  	headers={['상영 도서관', '상영 시간', '상영 장소', '좌석수']}
  	guideData={[
  		{
  			'상영 도서관': '연수중앙도서관',
  			'상영 시간': '매주 토요일 오후 2시',
  			'상영 장소': '지하 1층 강당실',
  			좌석수: '67석',
  		},
  		{
  			'상영 도서관': '연수어린이도서관',
  			'상영 시간': '매주 토요일 오후 2시',
  			'상영 장소': '4층 강당실',
  			좌석수: '50석',
  		},
  		{
  			'상영 도서관': '송도국제어린이도서관',
  			'상영 시간': '매주 일요일 오후 2시',
  			'상영 장소': '2층 강당실',
  			좌석수: '80석',
  		},
  		{
  			'상영 도서관': '청학마을도서관',
  			'상영 시간': '매주 토요일 오후 2시',
  			'상영 장소': '2층 세미나실',
  			좌석수: '72석',
  		},
  		{
  			'상영 도서관': '선학별빛도서관',
  			'상영 시간': '토요일: 매월 셋째주 오후 2시 / 일요일: 매월 셋째주 오후 2시',
  			'상영 장소': '5층 전시복합실',
  			좌석수: '103석',
  		},
  	]}
  />
  ```

- user-guide-table-vertical

  ```jsx
  <div class="contact-info">
  	<h3>처인구</h3>
  	<div class="contact-table-wrp scroll-x">
  		<table class="contact-table">
  			<colgroup>
  				<col width="20%" />
  				<col width="30%" />
  				<col width="20%" />
  				<col width="30%" />
  			</colgroup>
  			<tr>
  				<th>용인중앙도서관</th>
  				<td>031-6193-1260</td>
  				<th>포곡도서관</th>
  				<td>031-6193-1290</td>
  			</tr>
  			<tr>
  				<th>동백도서관</th>
  				<td>031-6193-1330</td>
  				<th>남사도서관</th>
  				<td>031-6193-1370</td>
  			</tr>
  			<tr>
  				<th>양지백현도서관</th>
  				<td>031-6193-1285</td>
  				<th>어울림도서관</th>
  				<td>031-6193-1390</td>
  			</tr>
  		</table>
  	</div>
  </div>
  ```
