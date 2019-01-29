import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LineBadge } from './LineBadge';
import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore, ChevronRight } from '@material-ui/icons';
import Step from './Step';

export default function OptionExpandable(props) {
  const { lines, stopCount, interchangeCount } = props.option;
  const stopOverview = `${stopCount} stop${stopCount > 1 ? 's' : ''}`;
  const changeOverview = interchangeCount ? `${interchangeCount} int.` : '';
  return (
    <Container expanded={props.expanded}>
      <Option button onClick={props.onClick}>
        <ExpendableHeader>
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
        </ExpendableHeader>
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

const Container = styled.div`
  border-left: 4px solid ${props => props.expanded ? '#ccc' : 'transparent'};
  ${props => props.expanded && 'background-color: #f1f1f1;'}
`;

const ExpendableHeader = styled(ListItemText)`
  & > span {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const StepsContainer = styled(List)`
  && {
    border-top: 1px solid #c8c8c8;
    margin-left: 16px;
    padding-bottom: 32px;
  }
`;

const Option = styled(ListItem)`
`;

const LineOverview = styled.div`
  display: flex;
  overflow: scroll;
  position: relative;
  &:before {
    content:'';
    width: 100%;
    height: 100%;    
    position: absolute;
    right:0;
    top:0;
    background: linear-gradient(to right, transparent 80%, #f1f1f1);
  }
  &:after {
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      #f00 100%
      // rgba(255, 255, 255, 1) 100%
    );
  }
`;

const StopOverview = styled.div`
  font-size: 12px;
  line-height: 1em;
  color: #555;
  text-align: right;
  white-space: nowrap;
`;
