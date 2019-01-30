import React from 'react';
import PropTypes from 'prop-types';
import { LineBadge, LineContainer } from '../../components/LineBadge';
import {
  StyledListItem,
  InlineBadgeContainer,
  StopCount,
} from './Step.style';

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

Step.propTypes = {
  step: PropTypes.shape({
    line: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    stopCount: PropTypes.number.isRequired,
  }).isRequired,
}
