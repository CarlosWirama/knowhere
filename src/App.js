import React, { Component } from 'react';
import styled from 'styled-components';
import findShortestRoute from './modules/shortestPathLogics';
import InputSection from './modules/InputSection';
import RoutesSection from './modules/RoutesSection';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeOptions: [],
      isInputCollapsed: false,
      expandedIndex: 0,
    };
    this.onSearch = this.onSearch.bind(this);
    this.collapseInput = this.collapseInput.bind(this);
    this.onClickExpandable = this.onClickExpandable.bind(this);
  }

  onSearch(start, end) {
    const routeOptions = findShortestRoute(start, end);
    this.setState({ routeOptions, expandedIndex: 0 });
    this.collapseInput();
  }

  collapseInput() {
    this.setState({ isInputCollapsed: true });
  }

  onClickExpandable(index) {
    if (this.state.expandedIndex === index) {
      this.setState({ expandedIndex: null });
    } else {
      this.setState({ expandedIndex: index });
    }
    this.collapseInput();
  }

  render() {
    const { routeOptions, isInputCollapsed } = this.state;
    const hasResult = (routeOptions.length > 0);
    return (
      <Home>
        <InputSection
          collapsed={isInputCollapsed}
          submitAction={this.onSearch}
          onClick={() => this.setState({ isInputCollapsed: false })}
        />
        { hasResult &&
          <RoutesSection
            routeOptions={routeOptions}
            collapseInput={this.collapseInput}
            onClickExpandable={this.onClickExpandable}
            expandedIndex={this.state.expandedIndex}
          />
        }
      </Home>
    );
  }
}

const Home = styled.div`
  // display: flex;
  // height: 100vh;
  // flex-direction: column;
  // justify-content: center;
`;
