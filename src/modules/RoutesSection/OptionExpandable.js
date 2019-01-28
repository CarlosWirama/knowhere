import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LineBadge, LineContainer } from './LineBadge';
import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Step from './Step';

export default function OptionExpandable(props) {
  const { lines, stopCount, interchangeCount } = props.option;
  const stopOverview = `${stopCount} stop${stopCount > 1 ? 's' : ''}`;
  const changeOverview = interchangeCount ? `${interchangeCount} interchanges` : '';
  return (
    <Container expanded={props.expanded}>
      <Option button onClick={props.onClick}>
        <ExpendableHeader>
          <LineContainer>
            { lines.map((lineCode, i) =>
              <LineBadge line={lineCode} key={i} />
            )}
          </LineContainer>
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

const StopOverview = styled.div`
  font-size: 12px;
  line-height: 1em;
  color: #555;
  text-align: right;
`;
