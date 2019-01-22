import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, Button } from '@material-ui/core';
import * as Text from '../constants/uiTexts';

export default function InputSection(props) {
  return (
    <Container>
      <InputField>
        <TitleText>
          Starting station
        </TitleText>
        <StationInput
          value={props.startingStation}
          placeholder={Text.SEARCH_PLACEHOLDER}
        />
      </InputField>

      <InputField>
        <TitleText>
          Destination station
        </TitleText>
        <StationInput
          value={props.destinationStation}
          placeholder={Text.SEARCH_PLACEHOLDER}
        />
      </InputField>

      <PrimaryButton fullWidth onClick={props.onSubmit}>
        Go
      </PrimaryButton>
    </Container>
  );
}

InputSection.propTypes = {
  startingStation: PropTypes.string.isRequired,
  destinationStation: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

const Container = styled.div`
  background-color: lightblue;
  padding: 32px 16px;
`;

const TitleText = styled.div`
  text-align: left;
  font-weight: bold;
  margin: 8px 0;
`;

const StationInput = styled(Input)`
  width: calc(100% - 16px);
  border: solid gray .2px;
  padding: 8px;
`;

const InputField = styled.div`
  width: 70vw;
  margin: 0 auto;
  padding-bottom: 32px;
`;

const PrimaryButton = styled(Button).attrs({
  variant: 'contained',
  color: 'primary'
})`
  height: 48px;
`;
