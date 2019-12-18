import styled from 'styled-components';

import Modal from 'shared/components/Modal';
import Input from 'shared/components/Input';
import Button from 'shared/components/Button';
import { font } from 'shared/utils/styles';

export const StyledConfirmModal = styled(Modal)`
  padding: 45px 50px 50px;
`;

export const Title = styled.div`
  padding-bottom: 25px;
  ${font.medium}
  ${font.size(22)}
  line-height: 1.5;
`;

export const Message = styled.p`
  padding-bottom: 25px;
  white-space: pre-wrap;
  ${font.size(15)}
`;

export const InputLabel = styled.div`
  padding-bottom: 12px;
  ${font.bold}
  ${font.size(15)}
`;

export const StyledInput = styled(Input)`
  margin-bottom: 25px;
  max-width: 220px;
`;

export const Actions = styled.div`
  display: flex;
`;

export const StyledButton = styled(Button)`
  margin: 5px 20px 0 0;
`;
