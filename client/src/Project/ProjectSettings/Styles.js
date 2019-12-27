import styled from 'styled-components';

import { font } from 'shared/utils/styles';
import { Button, Form } from 'shared/components';

export const FormCont = styled.div`
  display: flex;
  justify-content: center;
`;

export const FormElement = styled(Form.Element)`
  max-width: 640px;
  padding: 20px 0;
`;

export const FormHeading = styled.div`
  padding-bottom: 15px;
  ${font.size(24)}
  ${font.medium}
`;

export const ActionButton = styled(Button)`
  margin-top: 30px;
`;
