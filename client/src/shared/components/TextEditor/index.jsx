import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Quill from 'quill';

import { EditorCont } from './Styles';

import('quill/dist/quill.snow.css');

const propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  getEditor: PropTypes.func.isRequired,
};

const defaultProps = {
  className: undefined,
  placeholder: undefined,
  defaultValue: undefined,
};

const TextEditor = ({ className, placeholder, defaultValue, getEditor, ...otherProps }) => {
  const $editorContRef = useRef();
  const $editorRef = useRef();

  useLayoutEffect(() => {
    let editor = null;

    const setup = async () => {
      editor = new Quill($editorRef.current, { placeholder, ...editorConfig });

      editor.clipboard.dangerouslyPasteHTML(0, defaultValue);

      getEditor({
        getHTML: () => $editorContRef.current.querySelector('.ql-editor').innerHTML,
      });
    };
    setup();

    return () => {
      editor = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EditorCont className={className} ref={$editorContRef}>
      <div ref={$editorRef} {...otherProps} />
    </EditorCont>
  );
};

const editorConfig = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
  },
};

TextEditor.propTypes = propTypes;
TextEditor.defaultProps = defaultProps;

export default TextEditor;
