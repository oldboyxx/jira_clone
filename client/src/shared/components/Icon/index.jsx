import React from 'react';
import PropTypes from 'prop-types';

import StyledIcon from './Styles';

const codes = {
  [`check-circle`]: '\\e86c',
  [`check-fat`]: '\\f00c',
  [`arrow-left`]: '\\e900',
  [`arrow-right`]: '\\e912',
  [`upload-thin`]: '\\e91f',
  [`bell`]: '\\e901',
  [`calendar`]: '\\e903',
  [`check`]: '\\e904',
  [`chevron-down`]: '\\e905',
  [`chevron-left`]: '\\e906',
  [`chevron-right`]: '\\e907',
  [`chevron-up`]: '\\e908',
  [`clock`]: '\\e909',
  [`download`]: '\\e90a',
  [`plus`]: '\\e90c',
  [`refresh`]: '\\e90d',
  [`search`]: '\\e90e',
  [`upload`]: '\\e90f',
  [`close`]: '\\e910',
  [`archive`]: '\\e915',
  [`briefcase`]: '\\e916',
  [`settings`]: '\\e902',
  [`email`]: '\\e914',
  [`lock`]: '\\e913',
  [`dashboard`]: '\\e917',
  [`alert`]: '\\e911',
  [`edit`]: '\\e918',
  [`delete`]: '\\e919',
  [`sort`]: '\\f0dc',
  [`sort-up`]: '\\f0d8',
  [`sort-down`]: '\\f0d7',
  [`euro`]: '\\f153',
  [`folder-plus`]: '\\e921',
  [`folder-minus`]: '\\e920',
  [`file`]: '\\e90b',
  [`file-text`]: '\\e924',
};

const propTypes = {
  type: PropTypes.oneOf(Object.keys(codes)).isRequired,
  className: PropTypes.string,
  size: PropTypes.number,
  left: PropTypes.number,
  top: PropTypes.number,
};

const defaultProps = {
  className: undefined,
  size: 16,
  left: 0,
  top: 0,
};

const Icon = ({ type, ...iconProps }) => <StyledIcon {...iconProps} code={codes[type]} />;

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
