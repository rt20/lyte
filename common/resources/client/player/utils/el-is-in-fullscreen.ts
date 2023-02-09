import fscreen from 'fscreen';

export function elIsInFullscreen(el: HTMLElement): boolean {
  if (fscreen.fullscreenElement === el) return true;

  try {
    // Throws in iOS Safari...
    // @ts-expect-error
    return el.classList.contains(fscreen.fullscreenPseudoClass);
  } catch (error) {
    return false;
  }
}
