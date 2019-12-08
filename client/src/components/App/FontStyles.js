import { createGlobalStyle } from 'styled-components';

import BlackWoff2 from 'shared/assets/fonts/CircularStd-Black.woff2';
import BoldWoff2 from 'shared/assets/fonts/CircularStd-Bold.woff2';
import MediumWoff2 from 'shared/assets/fonts/CircularStd-Medium.woff2';
import BookWoff2 from 'shared/assets/fonts/CircularStd-Book.woff2';
import BlackWoff from 'shared/assets/fonts/CircularStd-Black.woff';
import BoldWoff from 'shared/assets/fonts/CircularStd-Bold.woff';
import MediumWoff from 'shared/assets/fonts/CircularStd-Medium.woff';
import BookWoff from 'shared/assets/fonts/CircularStd-Book.woff';
import IconsSvg from 'shared/assets/icons/jira.svg';
import IconsTtf from 'shared/assets/icons/jira.ttf';
import IconsWoff from 'shared/assets/icons/jira.woff';

export default createGlobalStyle`
  @font-face {
    font-family: "CircularStdBlack";
    src: url("${BlackWoff2}") format("woff2"),
         url("${BlackWoff}") format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "CircularStdBold";
    src: url("${BoldWoff2}") format("woff2"),
         url("${BoldWoff}") format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "CircularStdMedium";
    src: url("${MediumWoff2}") format("woff2"),
         url("${MediumWoff}") format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "CircularStdBook";
    src: url("${BookWoff2}") format("woff2"),
         url("${BookWoff}") format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "jira";
    src:
      url("${IconsTtf}") format("truetype"),
      url("${IconsWoff}") format("woff"),
      url("${IconsSvg}#jira") format("svg");
    font-weight: normal;
    font-style: normal;
  }
`;
