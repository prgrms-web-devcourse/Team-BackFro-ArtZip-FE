import { render } from '@testing-library/react';
import ReviewEditForm from '.';
import { ThemeProvider } from '@emotion/react';
import theme from 'styles/global/theme';

const setup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <ReviewEditForm type="create" />
    </ThemeProvider>,
  );
};

describe('ReviewEditForm 테스트', () => {
  beforeEach(() => {
    setup();
  });

  it('화면에 출력', () => {
    render(
      <ThemeProvider theme={theme}>
        <ReviewEditForm type="create" />
      </ThemeProvider>,
    );
  });
});

// TypeError: window.matchMedia is not a function을 해결하는 코드
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
