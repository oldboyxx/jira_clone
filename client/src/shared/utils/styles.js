import Color from 'color';

export const color = {
  primary: '#2553B3', // blue
  success: '#29A638', // green
  danger: '#E13C3C', // red
  warning: '#F89C1C', // orange
  accent: '#8A46D7', // purple

  textDarkest: '#323232',
  textDark: '#616161',
  textMedium: '#75787D',
  textMediumBlue: '#78869F',
  textLight: '#959595',
  textLightBlue: '#96A1B5',

  backgroundDark: '#8393AD',
  backgroundMedium: '#D8DDE6',
  backgroundLight: '#F7F9FB',

  borderLightest: '#E1E6F0',
  borderLight: '#D8DDE6',
  borderMedium: '#B9BDC4',
  borderBlue: '#C5D3EB',
};

export const sizes = {
  appNavBarLeftWidth: 75,
  minViewportWidth: 1000,
  secondarySideBarWidth: 230,
};

export const zIndexValues = {
  modal: 1000,
  dropdown: 101,
  navLeft: 100,
};

export const font = {
  regular: 'font-family: "CircularStdBook"; font-weight: normal;',
  medium: 'font-family: "CircularStdMedium"; font-weight: normal;',
  bold: 'font-family: "CircularStdBold"; font-weight: normal;',
  black: 'font-family: "CircularStdBlack"; font-weight: normal;',
  size: size => `font-size: ${size}px;`,
};

export const mixin = {
  darken: (colorValue, amount) =>
    Color(colorValue)
      .darken(amount)
      .string(),
  lighten: (colorValue, amount) =>
    Color(colorValue)
      .lighten(amount)
      .string(),
  rgba: (colorValue, opacity) =>
    Color(colorValue)
      .alpha(opacity)
      .string(),
  boxShadowMedium: `
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
  `,
  boxShadowBorderMedium: `
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
    border: 1px solid ${color.borderLight};
    border-top: 1px solid ${color.borderLightest};
  `,
  truncateText: `
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  clickable: `
    cursor: pointer;
    user-select: none;
  `,
  hardwareAccelerate: `
    transform: translateZ(0);
  `,
  clearfix: `
    *zoom: 1;
    &:before,
    &:after {
      content: " ";
      display: table;
    }
    &:after {
      clear: both;
    }
  `,
  cover: `
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  `,
  placeholderColor: colorValue => `
    ::-webkit-input-placeholder {
      color: ${colorValue} !important;
      opacity: 1 !important;
    }
    :-moz-placeholder {
      color: ${colorValue} !important;
      opacity: 1 !important;
    }
    ::-moz-placeholder {
      color: ${colorValue} !important;
      opacity: 1 !important;
    }
    :-ms-input-placeholder {
      color: ${colorValue} !important;
      opacity: 1 !important;
    }
  `,
  scrollableY: `
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  `,
  customScrollbar: ({ width = 8, background = mixin.darken(color.backgroundMedium, 0.2) } = {}) => `
    &::-webkit-scrollbar {
      width: ${width}px;
    }
    &::-webkit-scrollbar-track {
      background: none;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 99px;
      background: ${background};
    }
  `,
  backgroundImage: `
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: ${color.backgroundLight};
  `,
  link: (colorValue = color.primary) => `
    cursor: pointer;
    color: ${colorValue};
    ${font.medium}
    &:hover, &:visited, &:active {
      color: ${colorValue};
    }
    &:hover {
      text-decoration: underline;
    }
  `,
  tag: `
    display: inline-block;
    height: 24px;
    line-height: 22px;
    padding: 0 6px 0 8px;
    border: 1px solid ${color.borderLight};
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    background: ${color.backgroundLight};
    ${font.medium}
    ${font.size(12)}
    i {
      margin-left: 4px;
      vertical-align: middle;
      font-size: 14px;
    }
  `,
};
