export const show = (element: HTMLElement) => {
  element.classList.add('show');
  element.classList.remove('hide');
};

export const hide = (element: HTMLElement) => {
  element.classList.add('hide');
  element.classList.remove('show');
};
