import React from 'react';
import PropTypes from 'prop-types';
import {
  InputFieldContainer,
  Label,
  InputFieldText,
  ReadOnlyValue,
  StyledSelect,
} from './InputField.style';
import { stationNames } from '../shortestPathLogics/initializeData';

export default function InputField(props) {
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

InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  collapsed: PropTypes.bool,
  onKeyPress: PropTypes.func,
  error: PropTypes.bool,
}
