import React from 'react';
import styled from 'styled-components';
import { ListItem, ListItemText } from '@material-ui/core';
import { LineBadge, LineContainer } from './LineBadge';

export default function Step(props) {
  const { line, destination, stopCount } = props.step;
  return (
    <StyledListItem>
      <LineContainer>
        <div>Take </div>
        <InlineBadgeContainer><LineBadge line={line} /></InlineBadgeContainer>
        <div>{` to ${destination}`}</div>
      </LineContainer>
      <StopCount>{`${stopCount} stop${stopCount > 1 ? 's' : ''}`}</StopCount>
    </StyledListItem>
  );
}

const InlineBadgeContainer = styled.div`
  display: flex;
  margin: 0 4px;
`;
const StyledListItem = styled(ListItem)`
  && {
    justify-content: space-between;
    font-size: 14px;
  }
`;

const StopCount = styled.span`
  font-size: 12px;
  color: #555;
`;