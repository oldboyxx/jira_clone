/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import 'quill/dist/quill.snow.css';

import { Content } from './Styles';

const propTypes = {
  content: PropTypes.string.isRequired,
};

const TextEditedContent = ({ content, ...otherProps }) => (
  <div className="ql-snow">
    <Content className="ql-editor" dangerouslySetInnerHTML={{ __html: content }} {...otherProps} />
  </div>
);

TextEditedContent.propTypes = propTypes;

export default TextEditedContent;
