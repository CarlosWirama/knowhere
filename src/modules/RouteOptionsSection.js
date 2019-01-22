import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { List, ListSubheader } from '@material-ui/core';
import OptionExpandable from './OptionExpandable';

export default class RouteOptionsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedIndex: null,
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
        <List subheader={<ListSubheader>Nested List Items</ListSubheader>}>
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

RouteOptionsSection.propTypes = {
  routeOptions: PropTypes.array.isRequired,
}

const Container = styled.div`
  background-color: lightgreen;
  padding: 16px;
`;
