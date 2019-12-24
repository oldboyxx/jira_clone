import React from 'react';
import PropTypes from 'prop-types';

import { Image, Letter } from './Styles';

const propTypes = {
  className: PropTypes.string,
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
};

const defaultProps = {
  className: undefined,
  avatarUrl: null,
  name: '',
  size: 32,
};

const Avatar = ({ className, avatarUrl, name, size, ...otherProps }) => {
  if (avatarUrl) {
    return <Image className={className} size={size} avatarUrl={avatarUrl} {...otherProps} />;
  }
  return (
    <Letter className={className} size={size} color={getColorFromName(name)} {...otherProps}>
      <span>{name.charAt(0)}</span>
    </Letter>
  );
};

const colors = [
  '#DA7657',
  '#6ADA57',
  '#5784DA',
  '#AA57DA',
  '#DA5757',
  '#DA5792',
  '#57DACA',
  '#57A5DA',
];

const getColorFromName = name => colors[name.toLocaleLowerCase().charCodeAt(0) % colors.length];

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
