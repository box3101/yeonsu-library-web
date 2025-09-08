---
description: step
auto_execution_mode: 1
---

<div class="step-process">
				{
					[...Array(5)].map((_, index) => {
						const stepNumber = index + 1;
						const stepContent = [
							{
								content: "희망전자책신청<br /><span class='step-sub'>(상시, 월 1일 1권)</span>",
								arrow: true,
							},
							{
								content:
									"자료 소장여부<br />신청가능/불가 파악<br /><span class='step-sub'>(매월 1일, 전일 신청분까지 처리)</span>",
								arrow: true,
							},
							{
								content: "목록작성<br />및 발주<br /><span class='step-sub'>(매월 5일 이전)</span>",
								arrow: true,
							},
							{
								content:
									"전자도서관 시스템에<br />전자책 서버 탑재<br /><span class='step-sub'>(도서 입수 3~4주 소요)</span>",
								arrow: true,
							},
							{
								content: '자료대출 실시',
								arrow: false,
							},
						][index];

    					return (
    						<div class="step-item" key={stepNumber}>
    							<div class="step-number">{stepNumber}</div>
    							<div class="step-content" set:html={stepContent.content} />
    							{stepContent.arrow && (
    								<div class="step-arrow">
    									<img src="./assets/images/icon/icon-arrow-right.svg" alt="다음 단계" class="step-arrow-icon" />
    								</div>
    							)}
    						</div>
    					);
    				})
    			}
    		</div>
