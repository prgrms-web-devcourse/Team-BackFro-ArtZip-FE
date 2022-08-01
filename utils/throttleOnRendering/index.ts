export default function throttleOnRendering(callbackFunction: () => void) {
  if (!callbackFunction) {
    throw Error('Invalid required arguments');
  }

  let tick = false;

  return function () {
    if (tick) {
      return;
    }

    tick = true;
    return requestAnimationFrame(() => {
      tick = false;
      return callbackFunction();
    });
  };
}
