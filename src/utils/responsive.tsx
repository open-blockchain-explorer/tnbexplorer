import { Breakpoint } from "antd/es/_util/responsiveObserve";

export const layoutPadding = (
  screens: Partial<Record<Breakpoint, boolean>>
) => {
  return screens.xxl
    ? "150px"
    : screens.xl
    ? "70px"
    : screens.lg
    ? "70px"
    : screens.md
    ? "10px"
    : screens.sm
    ? "25px"
    : "12.5px";
};

export const responsiveWidth = (
  screens: Partial<Record<Breakpoint, boolean>>,
  width: Partial<Record<Breakpoint, string | number>>
) => {
  return screens.xxl
    ? width.xxl
    : screens.xl
    ? width.xl
    : screens.lg
    ? width.lg
    : screens.md
    ? width.md
    : screens.sm
    ? width.sm
    : width.xs;
};
