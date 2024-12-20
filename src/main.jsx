import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
    //reset.css
    @font-face {
        font-family: 'GmarketSansBold';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'GmarketSansMedium';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'GmarketSansLight';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }

    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    body {
        color: #333;
        line-height: 1.2;
        font-family: "GmarketSansMedium","GmarketSansLight","GmarketSansBold" ,'Noto Sans', sans-serif;
        background-color: black;
        letter-spacing: -0.5px;
        max-width: 100%;
        min-width: 1400px;

    }

    ol, ul, li {
        list-style: none;
    }

    blockquote, q {
        quotes: none;
    }
    
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    a {
        text-decoration: none;
    }
    button {
        cursor: pointer;
        border: none;
        font-weight: 700;
    }

input{
    outline: none;
}
`;

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <GlobalStyle />
    <App />
  </StrictMode>,
)
