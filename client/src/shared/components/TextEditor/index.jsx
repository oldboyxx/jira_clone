import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Quill from 'quill';

import { EditorCont } from './Styles';

import('quill/dist/quill.snow.css');

const propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  getEditor: PropTypes.func,
};

const defaultProps = {
  className: undefined,
  placeholder: undefined,
  defaultValue: undefined,
  value: undefined,
  onChange: () => {},
  getEditor: () => {},
};

const TextEditor = ({
  className,
  placeholder,
  defaultValue,
  // we're not really feeding new value to quill instance on each render because it's too
  // expensive, but we're still accepting 'value' prop as alias for defaultValue because
  // other components like <Form.Field> feed their children with data via the 'value' prop
  value: alsoDefaultValue,
  onChange,
  getEditor,
}) => {
  const $editorContRef = useRef();
  const $editorRef = useRef();
  const quillRef = useRef();
  const initialValueRef = useRef(defaultValue || alsoDefaultValue || '');

  useLayoutEffect(() => {
    const setupQuill = () => {
      quillRef.current = new Quill($editorRef.current, { placeholder, ...quillConfig });
    };
    const insertInitialValue = () => {
      quillRef.current.clipboard.dangerouslyPasteHTML(0, initialValueRef.current);
    };
    const handleContentsChange = () => {
      onChange(getHTMLValue());
    };
    const getHTMLValue = () => $editorContRef.current.querySelector('.ql-editor').innerHTML;

    setupQuill();
    insertInitialValue();
    getEditor({ getValue: getHTMLValue });

    quillRef.current.on('text-change', handleContentsChange);
    return () => {
      quillRef.current.off('text-change', handleContentsChange);
      quillRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EditorCont className={className} ref={$editorContRef}>
      <div ref={$editorRef} />
    </EditorCont>
  );
};

const quillConfig = {
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
