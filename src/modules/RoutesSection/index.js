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
        <StyledList>
          <StyledListSubheader>{Text.LIST_HEADER}</StyledListSubheader>
          <div>
            {this.props.routeOptions.map((option, i) =>
              <OptionExpandable
                option={option}
                expanded={this.props.expandedIndex === i}
                onClick={() => this.props.onClickExpandable(i)}
                key={i}
              />
            )}
          </div>
        </StyledList>
      </Container>
    );
  }
}

RoutesSection.propTypes = {
  routeOptions: PropTypes.array.isRequired,
}

const Container = styled.div`
  // background-color: #fafafa;
  padding: 0 16px 16px;
  flex: 1;
  overflow: scroll;
`;

const StyledList = styled(List)`
  && {
    padding-top: 0;    
  }
`;

const StyledListSubheader = styled(ListSubheader)`
  && {
    background-color: white;
  }
`;
