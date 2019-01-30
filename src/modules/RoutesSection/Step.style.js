import styled from 'styled-components';
import { ListItem } from '@material-ui/core';

export const InlineBadgeContainer = styled.div`
  display: flex;
  margin: 0 4px;
`;
export const StyledListItem = styled(ListItem)`
  && {
    justify-content: space-between;
    font-size: 14px;
  }
`;

export const StopCount = styled.span`
  font-size: 12px;
  color: #555;
`;
