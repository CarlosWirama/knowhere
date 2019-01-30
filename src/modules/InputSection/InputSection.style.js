import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const Container = styled.div`
  background-color: #fffbca;
  padding: 32px 16px;
  z-index: 2;
`;

export const Header = styled.h4`
  margin: 0 0 32px;
  text-align: center;
`;

export const PrimaryButton = styled(Button).attrs({
  variant: 'contained',
})`
  && {
    height: 48px;
    margin-top: 16px;
    background-color: #30aabc;
    color: white;
    font-weight: bold;
  }
`;
