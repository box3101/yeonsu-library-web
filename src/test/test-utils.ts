/**
 * 테스트 유틸리티 함수들
 * Astro 컴포넌트 테스트를 위한 헬퍼 함수들을 제공합니다.
 */

/**
 * HTML 문자열을 DOM 요소로 변환하는 헬퍼 함수
 */
export function createElementFromHTML(htmlString: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstElementChild as HTMLElement;
}

/**
 * 여러 클래스가 요소에 존재하는지 확인하는 헬퍼 함수
 */
export function hasClasses(element: Element, classes: string[]): boolean {
  return classes.every(className => element.classList.contains(className));
}

/**
 * 요소의 속성 값들을 객체로 반환하는 헬퍼 함수
 */
export function getElementAttributes(element: Element): Record<string, string> {
  const attributes: Record<string, string> = {};
  for (let i = 0; i < element.attributes.length; i++) {
    const attr = element.attributes[i];
    attributes[attr.name] = attr.value;
  }
  return attributes;
}

/**
 * 폼 요소의 값이 예상과 일치하는지 확인하는 헬퍼 함수
 */
export function expectFormElementValue(
  element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  expectedValue: string | boolean
): void {
  if (element.type === 'checkbox' || element.type === 'radio') {
    expect((element as HTMLInputElement).checked).toBe(expectedValue);
  } else {
    expect(element.value).toBe(expectedValue);
  }
}

/**
 * 접근성 관련 속성들을 확인하는 헬퍼 함수
 */
export function checkAccessibility(element: Element): {
  hasId: boolean;
  hasLabel: boolean;
  labelFor: string | null;
  ariaDescribedBy: string | null;
} {
  const id = element.getAttribute('id');
  const label = document.querySelector(`label[for="${id}"]`);

  return {
    hasId: !!id,
    hasLabel: !!label,
    labelFor: label?.getAttribute('for') || null,
    ariaDescribedBy: element.getAttribute('aria-describedby'),
  };
}
