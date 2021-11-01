import styled from 'styled-components';
import generalColorStyle from 'styles/colors/generalColorStyle';

export enum GeneralFontSize {
  SIZE_08 = 8,
  SIZE_10 = 10,
  SIZE_12 = 12,
  SIZE_14 = 14,
  SIZE_16 = 16,
  SIZE_20 = 20,
  SIZE_24 = 24,
  SIZE_28 = 28,
  SIZE_32 = 32,
  SIZE_36 = 36,
  SIZE_48 = 48,
  SIZE_52 = 52,
  SIZE_56 = 56,
  SIZE_60 = 60,
  SIZE_80 = 80,
}

export enum GeneralFontWeight {
  NORMAL = 400,
  BOLD = 700,
  HEAVY = 800,
  BLACK = 900,
}

export type GeneralTextStyleProps = {
  fontSize: GeneralFontSize;
  fontColor?: string;
  fontWeight?: GeneralFontWeight;
};

export const generalText = styled.span<GeneralTextStyleProps>`
  font-size: ${(props) => props.fontSize}px;
  line-height: ${(props) => (props.fontSize > 20 ? 1.5 : 2)};
  color: ${(props) => props.fontColor || generalColorStyle.black};
  font-weight: ${(props) => props.fontWeight || GeneralFontWeight.NORMAL};
`;

export const generalTextParagraph = styled(generalText.withComponent('p'))`
  white-space: pre-wrap;
  word-break: break-all;
`;
