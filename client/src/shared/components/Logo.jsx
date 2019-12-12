import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

const defaultProps = {
  className: undefined,
  size: 28,
};

const Logo = ({ className, size }) => (
  <span className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75.76 75.76" width={size}>
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="34.64"
          y1="15.35"
          x2="19"
          y2="30.99"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.18" stopColor="rgba(0, 82, 204, 0.2)" />
          <stop offset="1" stopColor="#DEEBFE" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="38.78"
          y1="60.28"
          x2="54.39"
          y2="44.67"
          xlinkHref="#linear-gradient"
        />
      </defs>
      <title>Jira Software-blue</title>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Blue">
          <path
            style={{ fill: '#DEEBFE' }}
            d="M72.4,35.76,39.8,3.16,36.64,0h0L12.1,24.54h0L.88,35.76A3,3,0,0,0,.88,40L23.3,62.42,36.64,75.76,61.18,51.22l.38-.38L72.4,40A3,3,0,0,0,72.4,35.76ZM36.64,49.08l-11.2-11.2,11.2-11.2,11.2,11.2Z"
          />
          <path
            style={{ fill: 'url(#linear-gradient)' }}
            d="M36.64,26.68A18.86,18.86,0,0,1,36.56.09L12.05,24.59,25.39,37.93,36.64,26.68Z"
          />
          <path
            style={{ fill: 'url(#linear-gradient-2)' }}
            d="M47.87,37.85,36.64,49.08a18.86,18.86,0,0,1,0,26.68h0L61.21,51.19Z"
          />
        </g>
      </g>
    </svg>
  </span>
);

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;

export default Logo;
