import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Step from './Step';

export default function OptionExpandable(props) {
  const { lines, stopCount, interchangeCount } = props.option;
  const stopOverview = `(${stopCount} stops${
    interchangeCount ? `, ${interchangeCount} interchanges` : ''
  })`;
  return (
    <React.Fragment>
      <Option button onClick={props.onClick}>
        <ExpendableHeader>
          <div>
            {lines}
          </div>
          <div>
            {stopOverview}
          </div>
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
    </React.Fragment>
  );
}

const ExpendableHeader = styled(ListItemText)`
  & > span {
    display: flex;
    justify-content: space-between;
  }
`;

const StepsContainer = styled(List)`
  && {
    margin-left: 16px;
  }
`;

const Option = styled(ListItem)`
`;
