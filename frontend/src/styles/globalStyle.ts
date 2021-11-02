import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  html {
    box-sizing: border-box;
    font-size: ${({ theme }) => theme.fontSizes.size_16};
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    line-height: 1.7;
    letter-spacing:0.05rem;
  } 
  body {
    margin: 0;
    color: ${({ theme }) => theme.colors.primary.black};
    background: ${({ theme }) => theme.colors.primary.white};
    word-break: break-word;
    word-wrap: break-word;
    font-family: "Inter", "BlinkMacSystemFont", "Hiragino Kaku Gothic ProN",
      "Hiragino Sans", Meiryo, sans-serif;
  }

  img {
    max-width: 100%;
  }
  p,
  blockquote,
  dl,
  dd,
  dt,
  section {
    margin: 0;
  }
  a {
    text-decoration: none;
    transition: 0.25s;
    color: inherit;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-weight: bold;
    line-height: 1.5;
  }
  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  hr {
    border: none;
  }
  button {
    font-family: inherit;
    border: none;
    cursor: pointer;
    appearance: none;
    background: transparent;
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
    transition: 0.25s;
    padding: 0;
    margin: 0;
  }
`;
