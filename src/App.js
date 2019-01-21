import React, { Component } from 'react';
import { Input, Button } from '@material-ui/core';
import styled from 'styled-components';
import * as Text from './constants/uiTexts';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <header className="App-header">
          Header
        </header>
        <Home>
          <Section>
            <InputField>
              <TitleText>
                Starting station
              </TitleText>
              <StationInput placeholder={Text.SEARCH_PLACEHOLDER}/>
            </InputField>

            <InputField>
              <TitleText>
                Destination station
              </TitleText>
              <StationInput placeholder={Text.SEARCH_PLACEHOLDER}/>
            </InputField>

            <Button variant="contained" fullWidth color="primary">
              Go
            </Button>
          </Section>
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

const TitleText = styled.div`
  text-align: left;
  font-weight: bold;
  margin: 16px 0;
`;

const StationInput = styled(Input)`
  width: calc(100% - 16px);
  border: solid gray .2px;
  padding: 8px;
`;

const InputField = styled.div`
  width: 70vw;
  margin: 48px auto;
`;

const Section = styled.div`
  background-color: lightblue;
  padding: 16px;
`;

export default App;
