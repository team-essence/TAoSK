/**
 * 色にopacityの値を追加したrgba文字列を返す
 *
 * @param color
 * @param opacity
 */

export const convertIntoRGBA = (color: string, opacity = 1): string => {
  const colorHex = color.replace(/#/, '');
  const firstRgb = parseInt(`${colorHex.charAt(0)}${colorHex.charAt(1)}`, 16);
  const secondRgb = parseInt(`${colorHex.charAt(2)}${colorHex.charAt(3)}`, 16);
  const thirdRgb = parseInt(`${colorHex.charAt(4)}${colorHex.charAt(5)}`, 16);

  return `rgba(${firstRgb}, ${secondRgb}, ${thirdRgb}, ${opacity})`;
};
