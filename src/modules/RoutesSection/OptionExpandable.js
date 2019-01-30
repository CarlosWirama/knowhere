import React from 'react';
import PropTypes from 'prop-types';
import { LineBadge } from '../../components/LineBadge';
import { Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore, ChevronRight } from '@material-ui/icons';
import Step from './Step';
import {
  Container,
  Option,
  LineOverview,
  StopOverview,
  StepsContainer,
  ExpandableHeader,
} from './OptionExpandable.style';

export default function OptionExpandable(props) {
  const { lines, stopCount, interchangeCount } = props.option;
  const stopOverview = `${stopCount} stop${stopCount > 1 ? 's' : ''}`;
  const changeOverview = interchangeCount ? `${interchangeCount} int.` : '';
  return (
    <Container expanded={props.expanded}>
      <Option button onClick={props.onClick}>
        <ExpandableHeader>
          <LineOverview>
            { lines.map((lineCode, i) => (
              <React.Fragment key={i}>
                <ChevronRight />
                <LineBadge line={lineCode} />
              </React.Fragment>
            ))}
          </LineOverview>
          <StopOverview>
            <div>{stopOverview}</div>
            <div>{changeOverview}</div>
          </StopOverview>
        </ExpandableHeader>
        {props.expanded ? <ExpandLess /> : <ExpandMore />}
      </Option>
      <Collapse in={props.expanded}>
        <StepsContainer>
          {props.option.steps.map((step, i) =>
            <Step step={step} key={i} />
          )}
        </StepsContainer>
      </Collapse>
    </Container>
  );
}

OptionExpandable.propTypes = {
  option: PropTypes.shape({
    lines: PropTypes.array.isRequired,
    stopCount: PropTypes.number.isRequired,
    interchangeCount: PropTypes.number,
  }).isRequired,
}
