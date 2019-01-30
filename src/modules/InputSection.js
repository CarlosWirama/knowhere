import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import * as Text from '../constants/uiTexts';
import { stationNames } from './shortestPathLogics/initializeData';

export default class InputSection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startingStation: '',
      destinationStation: '',
      error: null,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(selectedItem, componentProps) {
    const { value } = selectedItem;
    const { name: inputName } = componentProps;
    this.setState({ [inputName]: value, error: null });
  }
  
  onSubmit() {
    const { startingStation, destinationStation } = this.state;
    if (!startingStation || !destinationStation) {
      return this.setState({ error: 'EMPTY_ENTRY' });
    }
    this.props.submitAction(startingStation, destinationStation);
  }

  onClick(e) {
    // don't fire onClick at Container to keep input field closed
    e.stopPropagation();
    this.onSubmit();
  }

  setDestinationInputRef = ref => this.destInput = ref;

  render() {
    return (
      <Container onClick={this.props.onClick}>
        <Header>
          Search for MRT routes
        </Header>
        <InputField
          label="Starting station"
          name="startingStation"
          onChange={this.onChange}
          value={this.state.startingStation}
          collapsed={this.props.collapsed}
          onKeyPress={e => e.key === 'Enter' && this.destInput.focus()}
          error={this.state.error && !this.state.startingStation}
        />
        <InputField
          label="Destination station"
          name="destinationStation"
          onChange={this.onChange}
          value={this.state.destinationStation}
          collapsed={this.props.collapsed}
          setRef={this.setDestinationInputRef}
          onKeyPress={e => e.key === 'Enter' && this.onSubmit()}
          error={this.state.error && !this.state.destinationStation}
        />
        { !this.props.collapsed &&
          <PrimaryButton fullWidth onClick={this.onClick}>
            GO!
          </PrimaryButton>
        }
      </Container>
    );
  }
}

function InputField(props) {
  const options = stationNames.map(name => ({
    value: name,
    label: name,
  }));
  const defaultValue = options[stationNames.indexOf(props.value)]
  return(
    <InputFieldContainer collapsed={props.collapsed}>
      <InputFieldText>
        <Label collapsed={props.collapsed}>
          {props.label}
        </Label>
        { props.collapsed && <ReadOnlyValue>{props.value}</ReadOnlyValue> }
      </InputFieldText>
      { !props.collapsed &&
        <StyledSelect
          name={props.name}
          options={options}
          defaultValue={defaultValue}
          onChange={props.onChange}
          placeholder={Text.SEARCH_PLACEHOLDER}
          onKeyPress={props.onKeyPress}
          inputRef={props.setRef}
          error={props.error}
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
  background-color: #fffbca;
  padding: 32px 16px;
  z-index: 2;
`;

const Header = styled.h4`
  margin: 0 0 32px;
  text-align: center;
`;

const Label = styled.div`
  font-size: 13px;
  font-weight: bold;
  text-align: left;
`;

const ReadOnlyValue = styled.span`
  font-size: 14px;
`;

const InputFieldText = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
`;

const InputFieldContainer = styled.div`
  width: 70vw;
  margin: 0 auto;
  padding-bottom: ${props => props.collapsed ? '8px' : '16px'};
  transition-duration: 150ms;
`;

const StyledSelect = styled(Select)`
  div {
    ${props => props.error && 'border-color: red;'}
  }
`;

const PrimaryButton = styled(Button).attrs({
  variant: 'contained',
})`
  && {
    height: 48px;
    margin-top: 16px;
    background-color: #30aabc;
    color: white;
    font-weight: bold;
  }
`;
