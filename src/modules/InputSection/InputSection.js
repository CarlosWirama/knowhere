import React from 'react';
import PropTypes from 'prop-types';
import * as Text from '../../constants/uiTexts';
import InputField from './InputField';
import { Container, Header, PrimaryButton } from './InputSection.style';

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
    console.log('click')
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
          {Text.HEADER}
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

InputSection.propTypes = {
  submitAction: PropTypes.func.isRequired,
  collapsed: PropTypes.bool,
}
