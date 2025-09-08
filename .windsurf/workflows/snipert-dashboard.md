---
description: borad
auto_execution_mode: 1
---

    <div class="com-search">
    		<div class="com-search__filters">
    			<div class="com-search__select">
    				<UiSelect options={[{ value: '', label: '전체도서관' }]} name="library" size="medium" class="w-200-mobile-full" variant="default" />
    			</div>
    			<div class="com-search__select">
    				<UiSelect options={[{ value: '', label: '제목' }]} name="library" size="medium" class="w-200-mobile-full" variant="default" />
    			</div>
    			<div class="com-search__input">
    				<UiInput placeholder="검색어를 입력해주세요." class="w-370-mobile-full" />
    			</div>
    			<div class="com-search__button">
    				<UiButton text="검색" class="w-100-mobile-full" />
    			</div>
    		</div>
    	</div>

<div class="bbs-total">
		총 <strong class="text-primary">459</strong>건 ( <strong class="text-primary">1</strong> / 46 )
</div>

<!-- 개인정보의 수집·이용 동의  -->

    	<section class="privacy-section">
    		<h3 class="section-title-type2">개인정보의 수집·이용 동의</h3>

    		<!-- 개인정보 수집 이용 내용 박스 -->
    		<div class="info-box">
    			<div class="info-box__header">
    				<div class="info-box__icon">
    					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    						<rect x="3.33" y="3.33" width="13.33" height="13.33" fill="#323333"></rect>
    					</svg>
    				</div>
    				<h4 class="info-box__title">개인정보의 수집 및 이용</h4>
    			</div>
    			<div class="info-box__content">
    				<ol class="info-list">
    					<li class="list-none">
    						1. 제공기관 : 행정안전부 행정정보공동이용
    						<p><span class="text-primary">프로그램 업무</span>를 목적으로 개인정보를 수집ㆍ이용합니다.</p>
    					</li>
    					<li class="list-none">
    						2. 수집하려는 개인정보의 항목
    						<ul>
    							<li>가. 필수항목 : <span class="text-primary">성명, 이동전화번호, 참여인원</span></li>
    							<li>나. 선택항목 : <span class="text-primary">전화번호, 학교, 학년, 성별, 나이</span></li>
    						</ul>
    					</li>
    					<li class="list-none">3. 개인정보의 보유 및 이용기간 : 1년</li>
    					<li class="list-none">
    						4. 동의 거부 권리 및 불이익 : 개인정보 수집ㆍ이용과 관련하여 동의를 거부할 수 있으며,<br />거부시 프로그램 신청을 하실 수 없습니다.
    					</li>
    				</ol>
    			</div>
    		</div>

    		<!-- 동의 라디오 버튼 -->
    		<div class="terms-item__radio flex-col items-end gap-15 mt15">
    			<p class="radio-question">
    				본인은 위 내용과 관련하여 「개인정보보호법」제15조 1항(개인정보의 수집․이용)에 의거하여 개인정보 제공이 아닌 수집ㆍ이용에 동의합니다.
    			</p>
    			<div class="radio-group">
    				<div class="ui-radio ui-radio--medium">
    					<div class="ui-radio__item">
    						<input type="radio" id="privacy-disagree" name="privacy-collection" value="disagree" class="ui-radio__input" />
    						<div class="ui-radio__control">
    							<div class="ui-radio__dot"></div>
    						</div>
    					</div>
    					<label for="privacy-disagree" class="ui-radio__label">
    						<span class="ui-radio__title">동의안함</span>
    					</label>
    				</div>
    				<div class="ui-radio ui-radio--medium">
    					<div class="ui-radio__item">
    						<input type="radio" id="privacy-agree" name="privacy-collection" value="agree" class="ui-radio__input" />
    						<div class="ui-radio__control">
    							<div class="ui-radio__dot"></div>
    						</div>
    					</div>
    					<label for="privacy-agree" class="ui-radio__label">
    						<span class="ui-radio__title">동의함</span>
    					</label>
    				</div>
    			</div>
    		</div>
    	</section>
