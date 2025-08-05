import { describe, it, expect, beforeEach } from 'vitest';

/**
 * UiRadio 컴포넌트 통합 테스트
 * 실제 브라우저 환경에서의 동작을 시뮬레이션합니다.
 */
describe('UiRadio 통합 테스트', () => {
  beforeEach(() => {
    // 각 테스트 전에 DOM 초기화
    document.body.innerHTML = '';
  });

  it('라디오 그룹에서 하나만 선택되어야 한다', () => {
    // 라디오 그룹 HTML 생성
    document.body.innerHTML = `
      <form>
        <div class="ui-radio ui-radio--medium">
          <div class="ui-radio__item">
            <input type="radio" id="option1" name="test-group" value="option1" class="ui-radio__input" />
            <div class="ui-radio__control"><div class="ui-radio__dot"></div></div>
          </div>
          <label for="option1" class="ui-radio__label">
            <span class="ui-radio__title">옵션 1</span>
          </label>
        </div>
        
        <div class="ui-radio ui-radio--medium">
          <div class="ui-radio__item">
            <input type="radio" id="option2" name="test-group" value="option2" class="ui-radio__input" />
            <div class="ui-radio__control"><div class="ui-radio__dot"></div></div>
          </div>
          <label for="option2" class="ui-radio__label">
            <span class="ui-radio__title">옵션 2</span>
          </label>
        </div>
        
        <div class="ui-radio ui-radio--medium">
          <div class="ui-radio__item">
            <input type="radio" id="option3" name="test-group" value="option3" class="ui-radio__input" />
            <div class="ui-radio__control"><div class="ui-radio__dot"></div></div>
          </div>
          <label for="option3" class="ui-radio__label">
            <span class="ui-radio__title">옵션 3</span>
          </label>
        </div>
      </form>
    `;

    const radio1 = document.getElementById('option1') as HTMLInputElement;
    const radio2 = document.getElementById('option2') as HTMLInputElement;
    const radio3 = document.getElementById('option3') as HTMLInputElement;

    // 첫 번째 라디오 선택
    radio1.checked = true;
    radio1.dispatchEvent(new Event('change'));

    expect(radio1.checked).toBe(true);
    expect(radio2.checked).toBe(false);
    expect(radio3.checked).toBe(false);

    // 두 번째 라디오 선택
    radio2.checked = true;
    radio2.dispatchEvent(new Event('change'));

    // 라디오 그룹에서는 하나만 선택되어야 함
    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(true);
    expect(radio3.checked).toBe(false);
  });

  it('라벨 클릭 시 라디오 버튼이 선택되어야 한다', () => {
    document.body.innerHTML = `
      <div class="ui-radio ui-radio--medium">
        <div class="ui-radio__item">
          <input type="radio" id="clickable-radio" name="clickable-group" value="clickable" class="ui-radio__input" />
          <div class="ui-radio__control"><div class="ui-radio__dot"></div></div>
        </div>
        <label for="clickable-radio" class="ui-radio__label">
          <span class="ui-radio__title">클릭 가능한 라벨</span>
        </label>
      </div>
    `;

    const radio = document.getElementById(
      'clickable-radio'
    ) as HTMLInputElement;
    const label = document.querySelector(
      'label[for="clickable-radio"]'
    ) as HTMLLabelElement;

    expect(radio.checked).toBe(false);

    // 라벨 클릭 시뮬레이션
    label.click();

    expect(radio.checked).toBe(true);
  });

  it('비활성화된 라디오 버튼은 선택할 수 없어야 한다', () => {
    document.body.innerHTML = `
      <div class="ui-radio ui-radio--medium ui-radio--disabled">
        <div class="ui-radio__item">
          <input type="radio" id="disabled-radio" name="disabled-group" value="disabled" class="ui-radio__input" disabled />
          <div class="ui-radio__control"><div class="ui-radio__dot"></div></div>
        </div>
        <label for="disabled-radio" class="ui-radio__label">
          <span class="ui-radio__title">비활성화된 라벨</span>
        </label>
      </div>
    `;

    const radio = document.getElementById('disabled-radio') as HTMLInputElement;
    const label = document.querySelector(
      'label[for="disabled-radio"]'
    ) as HTMLLabelElement;

    expect(radio.disabled).toBe(true);
    expect(radio.checked).toBe(false);

    // 비활성화된 라디오는 라벨 클릭해도 선택되지 않음
    label.click();
    expect(radio.checked).toBe(false);
  });

  it('폼 제출 시 선택된 라디오 값이 포함되어야 한다', () => {
    document.body.innerHTML = `
      <form id="test-form">
        <div class="ui-radio ui-radio--medium">
          <div class="ui-radio__item">
            <input type="radio" id="form-option1" name="form-group" value="value1" class="ui-radio__input" />
            <div class="ui-radio__control"><div class="ui-radio__dot"></div></div>
          </div>
          <label for="form-option1" class="ui-radio__label">
            <span class="ui-radio__title">값 1</span>
          </label>
        </div>
        
        <div class="ui-radio ui-radio--medium">
          <div class="ui-radio__item">
            <input type="radio" id="form-option2" name="form-group" value="value2" class="ui-radio__input" checked />
            <div class="ui-radio__control"><div class="ui-radio__dot"></div></div>
          </div>
          <label for="form-option2" class="ui-radio__label">
            <span class="ui-radio__title">값 2</span>
          </label>
        </div>
      </form>
    `;

    const form = document.getElementById('test-form') as HTMLFormElement;
    const formData = new FormData(form);

    expect(formData.get('form-group')).toBe('value2');
  });

  it('키보드 네비게이션이 작동해야 한다', () => {
    document.body.innerHTML = `
      <div class="ui-radio ui-radio--medium">
        <div class="ui-radio__item">
          <input type="radio" id="keyboard-option1" name="keyboard-group" value="kb1" class="ui-radio__input" />
          <div class="ui-radio__control"><div class="ui-radio__dot"></div></div>
        </div>
        <label for="keyboard-option1" class="ui-radio__label">
          <span class="ui-radio__title">키보드 옵션 1</span>
        </label>
      </div>
      
      <div class="ui-radio ui-radio--medium">
        <div class="ui-radio__item">
          <input type="radio" id="keyboard-option2" name="keyboard-group" value="kb2" class="ui-radio__input" />
          <div class="ui-radio__control"><div class="ui-radio__dot"></div></div>
        </div>
        <label for="keyboard-option2" class="ui-radio__label">
          <span class="ui-radio__title">키보드 옵션 2</span>
        </label>
      </div>
    `;

    const radio1 = document.getElementById(
      'keyboard-option1'
    ) as HTMLInputElement;
    const radio2 = document.getElementById(
      'keyboard-option2'
    ) as HTMLInputElement;

    // 첫 번째 라디오에 포커스
    radio1.focus();
    expect(document.activeElement).toBe(radio1);

    // Space 키로 선택
    radio1.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    expect(radio1.checked).toBe(true);

    // Arrow 키로 다음 라디오로 이동 (실제 브라우저 동작 시뮬레이션)
    radio2.focus();
    radio2.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(true);
  });
});
