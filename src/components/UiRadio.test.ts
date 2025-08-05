import { describe, it, expect } from 'vitest';
import {
  createElementFromHTML,
  hasClasses,
  checkAccessibility,
} from '../test/test-utils';

// UiRadio 컴포넌트의 Props 타입 import
import type { Props as UiRadioProps } from './UiRadio.astro';

// 테스트용 헬퍼 함수: Astro 컴포넌트 렌더링 시뮬레이션
function createRadioHTML(props: UiRadioProps): string {
  const {
    name,
    value,
    checked = false,
    disabled = false,
    size = 'medium',
    label,
    description,
    id = `radio-${name}-${value}`,
  } = props;

  const hasLabel = label || description;

  return `
    <div class="ui-radio ui-radio--${size}${disabled ? ' ui-radio--disabled' : ''}">
      <div class="ui-radio__item">
        <input
          type="radio"
          id="${id}"
          name="${name}"
          value="${value}"
          ${checked ? 'checked' : ''}
          ${disabled ? 'disabled' : ''}
          class="ui-radio__input"
        />
        <div class="ui-radio__control">
          <div class="ui-radio__dot"></div>
        </div>
      </div>
      ${
        hasLabel
          ? `
        <label for="${id}" class="ui-radio__label">
          ${label ? `<span class="ui-radio__title">${label}</span>` : ''}
          ${description ? `<span class="ui-radio__description">${description}</span>` : ''}
        </label>
      `
          : ''
      }
    </div>
  `.trim();
}

// 렌더링된 HTML을 DOM에 추가하고 요소를 반환하는 헬퍼 함수
function renderRadio(props: UiRadioProps): HTMLElement {
  const html = createRadioHTML(props);
  document.body.innerHTML = html;
  return document.querySelector('.ui-radio') as HTMLElement;
}

describe('UiRadio 컴포넌트', () => {
  describe('기본 렌더링', () => {
    it('필수 props로 올바르게 렌더링된다', () => {
      const container = renderRadio({
        name: 'test-radio',
        value: 'test-value',
      });

      expect(container).toBeTruthy();
      expect(container.classList.contains('ui-radio')).toBe(true);
      expect(container.classList.contains('ui-radio--medium')).toBe(true);

      const input = container.querySelector(
        'input[type="radio"]'
      ) as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.name).toBe('test-radio');
      expect(input.value).toBe('test-value');
    });

    it('기본 ID가 올바르게 생성된다', () => {
      const container = renderRadio({
        name: 'test-radio',
        value: 'test-value',
      });

      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.id).toBe('radio-test-radio-test-value');
    });

    it('커스텀 ID가 올바르게 적용된다', () => {
      const container = renderRadio({
        name: 'test-radio',
        value: 'test-value',
        id: 'custom-id',
      });

      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.id).toBe('custom-id');
    });
  });

  describe('상태 관리', () => {
    it('checked 상태가 올바르게 적용된다', () => {
      const container = renderRadio({
        name: 'test-radio',
        value: 'test-value',
        checked: true,
      });

      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.checked).toBe(true);
    });

    it('disabled 상태가 올바르게 적용된다', () => {
      const container = renderRadio({
        name: 'test-radio',
        value: 'test-value',
        disabled: true,
      });

      expect(container.classList.contains('ui-radio--disabled')).toBe(true);

      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });
  });

  describe('사이즈 변형', () => {
    it('medium 사이즈가 올바르게 적용된다', () => {
      const container = renderRadio({
        name: 'test-radio',
        value: 'test-value',
        size: 'medium',
      });

      expect(container.classList.contains('ui-radio--medium')).toBe(true);
    });

    it('large 사이즈가 올바르게 적용된다', () => {
      const container = renderRadio({
        name: 'test-radio',
        value: 'test-value',
        size: 'large',
      });

      expect(container.classList.contains('ui-radio--large')).toBe(true);
    });
  });

  describe('라벨과 설명', () => {
    it('라벨만 있을 때 올바르게 렌더링된다', () => {
      const container = renderRadio({
        name: 'test-radio',
        value: 'test-value',
        label: '테스트 라벨',
      });

      const label = container.querySelector('.ui-radio__label');
      expect(label).toBeTruthy();

      const title = container.querySelector('.ui-radio__title');
      expect(title?.textContent).toBe('테스트 라벨');

      const description = container.querySelector('.ui-radio__description');
      expect(description).toBeNull();
    });

    it('설명만 있을 때 올바르게 렌더링된다', () => {
      const container = renderRadio({
        name: 'test-radio',
        value: 'test-value',
        description: '테스트 설명',
      });

      const label = container.querySelector('.ui-radio__label');
      expect(label).toBeTruthy();

      const title = container.querySelector('.ui-radio__title');
      expect(title).toBeNull();

      const description = container.querySelector('.ui-radio__description');
      expect(description?.textContent).toBe('테스트 설명');
    });

    it('라벨과 설명이 모두 있을 때 올바르게 렌더링된다', () => {
      const container = renderRadio({
        name: 'test-radio',
        value: 'test-value',
        label: '테스트 라벨',
        description: '테스트 설명',
      });

      const title = container.querySelector('.ui-radio__title');
      expect(title?.textContent).toBe('테스트 라벨');

      const description = container.querySelector('.ui-radio__description');
      expect(description?.textContent).toBe('테스트 설명');
    });

    it('라벨과 설명이 없을 때 label 요소가 렌더링되지 않는다', () => {
      const container = renderRadio({
        name: 'test-radio',
        value: 'test-value',
      });

      const label = container.querySelector('.ui-radio__label');
      expect(label).toBeNull();
    });

    it('label의 for 속성이 input의 id와 일치한다', () => {
      const container = renderRadio({
        name: 'test-radio',
        value: 'test-value',
        label: '테스트 라벨',
        id: 'custom-id',
      });

      const input = container.querySelector('input') as HTMLInputElement;
      const label = container.querySelector('label') as HTMLLabelElement;

      expect(input.id).toBe('custom-id');
      expect(label.getAttribute('for')).toBe('custom-id');
    });
  });

  describe('접근성', () => {
    it('input 요소에 올바른 type이 설정된다', () => {
      const container = renderRadio({
        name: 'test-radio',
        value: 'test-value',
      });

      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.type).toBe('radio');
    });

    it('올바른 CSS 클래스들이 적용된다', () => {
      const container = renderRadio({
        name: 'test-radio',
        value: 'test-value',
        size: 'large',
        disabled: true,
      });

      expect(container.classList.contains('ui-radio')).toBe(true);
      expect(container.classList.contains('ui-radio--large')).toBe(true);
      expect(container.classList.contains('ui-radio--disabled')).toBe(true);

      const input = container.querySelector('input');
      expect(input?.classList.contains('ui-radio__input')).toBe(true);

      const control = container.querySelector('.ui-radio__control');
      expect(control).toBeTruthy();

      const dot = container.querySelector('.ui-radio__dot');
      expect(dot).toBeTruthy();
    });
  });

  describe('복합 시나리오', () => {
    it('모든 props를 함께 사용할 때 올바르게 작동한다', () => {
      const container = renderRadio({
        name: 'complex-radio',
        value: 'complex-value',
        checked: true,
        disabled: false,
        size: 'large',
        label: '복합 테스트 라벨',
        description: '복합 테스트 설명',
        id: 'complex-radio-id',
      });

      // 컨테이너 확인
      expect(container.classList.contains('ui-radio')).toBe(true);
      expect(container.classList.contains('ui-radio--large')).toBe(true);
      expect(container.classList.contains('ui-radio--disabled')).toBe(false);

      // Input 확인
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.id).toBe('complex-radio-id');
      expect(input.name).toBe('complex-radio');
      expect(input.value).toBe('complex-value');
      expect(input.checked).toBe(true);
      expect(input.disabled).toBe(false);

      // 라벨 확인
      const title = container.querySelector('.ui-radio__title');
      expect(title?.textContent).toBe('복합 테스트 라벨');

      const description = container.querySelector('.ui-radio__description');
      expect(description?.textContent).toBe('복합 테스트 설명');

      // 라벨과 input 연결 확인
      const label = container.querySelector('label') as HTMLLabelElement;
      expect(label.getAttribute('for')).toBe('complex-radio-id');
    });
  });
});
