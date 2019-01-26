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
    };
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(start, end) {
    const routeOptions = findShortestRoute(start, end);
    this.setState({ routeOptions, isInputCollapsed: true });
  }

  render() {
    const { routeOptions, isInputCollapsed } = this.state;
    const hasResult = (routeOptions.length > 0);
    return (
      <React.Fragment>
        <header>
          Header
        </header>
        <Home>
          <InputSection
            collapsed={isInputCollapsed}
            submitAction={this.onSearch}
            onClick={() => this.setState({ isInputCollapsed: false })}
          />
          { hasResult &&
            <RoutesSection routeOptions={routeOptions} />
          }
        </Home>
      </React.Fragment>
    );
  }
}

const Home = styled.div`
  // display: flex;
  // height: 100vh;
  // flex-direction: column;
  // justify-content: center;
`;
