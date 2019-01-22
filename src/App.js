import React, { Component } from 'react';
import styled from 'styled-components';
import InputSection from './modules/InputSection';
import RouteOptionsSection from './modules/RouteOptionsSection';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startingStation: '',
      destinationStation: '',
      routeOptions: [3,9,0],
    }
  }

  onSubmit() {
    const { startingStation, destinationStation } = this.state;
    fetch(startingStation, destinationStation);
  }

  render() {
    const {
      routeOptions,
      startingStation,
      destinationStation
    } = this.state;
    return (
      <React.Fragment>
        <header>
          Header
        </header>
        <Home>
          <InputSection
            startingStation={startingStation}
            destinationStation={destinationStation}
            onSubmit={this.onSubmit}
          />
          { routeOptions.length > 0 &&
            <RouteOptionsSection routeOptions={routeOptions} />
          }
        </Home>
      </React.Fragment>
    );
  }
}

const Home = styled.div`
  text-align: center;
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
`;
