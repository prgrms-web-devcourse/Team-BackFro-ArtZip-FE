import { render, screen } from '@testing-library/react';
import ExhibitionSearchBar from '.';
import { ThemeProvider } from '@emotion/react';
import theme from 'styles/global/theme';

const setup = () => {
  return render(
    <ThemeProvider theme={theme}>
      <ExhibitionSearchBar type="create" />
    </ThemeProvider>,
  );
};

describe('ExhibitionSearchBar 테스트', () => {
  beforeEach(() => {
    setup();
  });

  it('요소들이 HTML 문서에 있다', () => {
    const searchBar = screen.getByPlaceholderText('전시회 제목을 검색해 주세요');
    const resultList = screen.getByRole('list');
    const poster = screen.getByAltText('전시회 포스터 이미지');

    expect(searchBar).toBeInTheDocument();
    expect(resultList).toBeInTheDocument();
    expect(poster).toBeInTheDocument();
  });
});
