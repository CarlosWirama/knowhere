import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, Button } from '@material-ui/core';
import * as Text from '../constants/uiTexts';

export default class InputSection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startingStation: '',
      destinationStation: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  
  onSubmit() {
    const { startingStation, destinationStation } = this.state;
    this.props.submitAction(startingStation, destinationStation);
  }

  setDestinationInputRef = ref => this.destInput = ref;

  render() {
    return (
      <Container onClick={this.props.onClick}>
        <InputField
          label="Starting station"
          name="startingStation"
          onChange={this.onChange}
          value={this.state.startingStation}
          collapsed={this.props.collapsed}
          onKeyPress={e => e.key === 'Enter' && this.destInput.focus()}
        />
        <InputField
          label="Destination station"
          name="destinationStation"
          onChange={this.onChange}
          value={this.state.destinationStation}
          collapsed={this.props.collapsed}
          setRef={this.setDestinationInputRef}
          onKeyPress={e => e.key === 'Enter' && this.onSubmit()}
        />
        { !this.props.collapsed &&
          <PrimaryButton fullWidth onClick={this.onSubmit}>
            Go
          </PrimaryButton>
        }
      </Container>
    );
  }
}

function InputField(props) {
  return(
    <InputFieldContainer collapsed={props.collapsed}>
      <InputFieldText>
        <Label>
          {props.label}
        </Label>
        { props.collapsed ? <span>{props.value}</span> : '' }
      </InputFieldText>
      { props.collapsed ?
        ''
      :
        <StationInput
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          placeholder={Text.SEARCH_PLACEHOLDER}
          onKeyPress={props.onKeyPress}
          inputRef={props.setRef}
        />
      }
    </InputFieldContainer>
  );
}
InputSection.propTypes = {
  submitAction: PropTypes.func.isRequired,
  collapsed: PropTypes.bool,
}

const Container = styled.div`
  background-color: lightblue;
  padding: 32px 16px;
`;

const Label = styled.div`
  text-align: left;
  font-weight: bold;
`;

const InputFieldText = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
`;

const StationInput = styled(Input)`
  width: calc(100% - 16px);
  border: solid gray .2px;
  padding: 8px;
`;

const InputFieldContainer = styled.div`
  width: 70vw;
  margin: 0 auto;
  padding-bottom: ${props => props.collapsed ? '8px' : '32px'};
`;

const PrimaryButton = styled(Button).attrs({
  variant: 'contained',
  color: 'primary',
})`
  height: 48px;
`;
