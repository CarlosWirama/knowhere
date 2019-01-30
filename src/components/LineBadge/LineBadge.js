import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from './LineBadge.style';

export function LineBadge({ line: rawLine }) {
  if (rawLine.indexOf('/') === -1) {
    return <Badge line={rawLine} />;
  } else if (rawLine.indexOf('CC') !== -1) {
    return <Badge line={'CC'} />;
  } else {
    return rawLine.split('/').map(optionalLine =>
      <Badge line={optionalLine} />
    );
  }
}

LineBadge.propTypes = {
  line: PropTypes.string.isRequired,
}
