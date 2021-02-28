import {Breakpoint} from 'antd/es/_util/responsiveObserve';

export const responsiveWidth = (
  screens: Partial<Record<Breakpoint, boolean>>,
  width: Partial<Record<Breakpoint, string | number>>,
) => {
  let size;

  if (screens.xxl === true) {
    size = width.xxl;
  } else if (screens.xl === true) {
    size = width.xl;
  } else if (screens.lg === true) {
    size = width.lg;
  } else if (screens.md === true) {
    size = width.md;
  } else if (screens.sm === true) {
    size = width.sm;
  } else if (screens.xs === true) {
    size = width.xs;
  }

  if (typeof size === 'number') return size.toString().concat('px');
  return size || '50px';
};
