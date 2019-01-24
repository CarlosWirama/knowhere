import React, { Component } from 'react';
import styled from 'styled-components';
import InputSection from './modules/InputSection';
import RoutesSection from './modules/RoutesSection';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startingStation: '',
      destinationStation: '',
      routeOptions: [
        {
          lines: 'EW-NS-CC',
          stopCount: 8,
          interchangeCount: 2,
          steps: [
            {
              line: 'EW',
              destination: 'City Hall',
              stopCount: 1, 
            },
            {
              line: 'NS',
              destination: 'Bishan',
              stopCount: 5, 
            },
            {
              line: 'CC',
              destination: 'Caldecott',
              stopCount: 2, 
            }
          ]
        },
        {
          lines: 'EW',
          stopCount: 10,
          steps: [
            {
              line: 'EW',
              destination: 'Clementi',
              stopCount: 10, 
            },
          ]
        }
      ],
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
