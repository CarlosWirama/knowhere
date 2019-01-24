import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';

export default function Step(props) {
  const { line, destination, stopCount } = props.step;
  return (
    <ListItem>
      {`Take ${line} line to ${destination} station (${stopCount} stops)`}
    </ListItem>
  );
}
