import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { List, ListSubheader } from '@material-ui/core';
import OptionExpandable from './OptionExpandable';
import * as Text from '../../constants/uiTexts';

export default class RoutesSection extends React.Component {
  render() {
    return (
      <Container>
        <List subheader={<ListSubheader>{Text.LIST_HEADER}</ListSubheader>}>
          {this.props.routeOptions.map((option, i) =>
            <OptionExpandable
              option={option}
              expanded={this.props.expandedIndex === i}
              onClick={() => this.props.onClickExpandable(i)}
              key={i}
            />
          )}
        </List>
      </Container>
    );
  }
}

RoutesSection.propTypes = {
  routeOptions: PropTypes.array.isRequired,
}

const Container = styled.div`
  // background-color: #fafafa;
  padding: 16px;
`;
