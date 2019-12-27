import styled from 'styled-components';

import { color, font } from 'shared/utils/styles';

export const EditorCont = styled.div`
  .ql-toolbar.ql-snow {
    border-radius: 4px 4px 0 0;
    border: 1px solid ${color.borderLightest};
    border-bottom: none;
  }
  .ql-container.ql-snow {
    border-radius: 0 0 4px 4px;
    border: 1px solid ${color.borderLightest};
    border-top: none;
    color: ${color.textDarkest};
    ${font.size(15)}
    ${font.regular}
  }
  .ql-editor {
    min-height: 110px;
  }
`;
