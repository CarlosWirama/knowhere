import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { List, ListSubheader } from '@material-ui/core';
import OptionExpandable from './OptionExpandable';
import * as Text from '../../constants/uiTexts';

export default class RoutesSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedIndex: 0,
    };
  }

  expand(index) {
    if (this.state.expandedIndex === index) {
      this.setState({ expandedIndex: null });
    } else {
      this.setState({ expandedIndex: index });
    }
  }

  render() {
    return (
      <Container>
        <List subheader={<ListSubheader>{Text.LIST_HEADER}</ListSubheader>}>
          {this.props.routeOptions.map((option, i) =>
            <OptionExpandable
              option={option}
              expanded={this.state.expandedIndex === i}
              onClick={() => this.expand(i)}
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
  background-color: lightgreen;
  padding: 16px;
`;
