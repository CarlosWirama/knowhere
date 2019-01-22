import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { Collapse, List, ListItem } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

export default function OptionExpandable(props) {
  return (
    <React.Fragment>
      <Option button onClick={props.onClick}>
        {props.option}
        {props.expanded ? <ExpandLess /> : <ExpandMore />}
      </Option>
      <Collapse in={props.expanded}>
        <List>
          <Step>
            sdfsdf
          </Step>
        </List>
      </Collapse>
    </React.Fragment>
  );
}

const Option = styled(ListItem)`
justify-content: space-between;
`;

const Step = styled(ListItem)`
justify-content: space-between;
`;