import styled from 'styled-components';
import Select from 'react-select';

export const Label = styled.div`
  font-size: 13px;
  font-weight: bold;
  text-align: left;
`;

export const ReadOnlyValue = styled.span`
  font-size: 14px;
`;

export const InputFieldText = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
`;

export const InputFieldContainer = styled.div`
  width: 70vw;
  margin: 0 auto;
  padding-bottom: ${props => props.collapsed ? '8px' : '16px'};
  transition-duration: 150ms;
`;

export const StyledSelect = styled(Select)`
  div {
    ${props => props.error && 'border-color: red;'}
  }
`;
