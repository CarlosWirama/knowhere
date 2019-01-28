import React from 'react';
import styled from 'styled-components';

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


export const LineContainer = styled.div`
  display: flex;
`;

export const Badge = styled.div.attrs(props => ({
  children: props.line,
}))`
  color: #fff;
  background-color: ${props => getLineColor(props.line)};
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  padding: 2px 4px;
  ${LineContainer} > & {
    height: 18px;
    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
`;

function getLineColor(lineCode) {
  switch(lineCode) {
    case 'NS': return '#d62821';
    case 'EW': return '#189e4a';
    case 'CG': return '#189e4a';
    case 'NE': return '#844184';
    case 'CC': return '#f2ad27';
    case 'CE': return '#f2ad27';
    case 'DT': return '#0354a6';
    case 'TE': return '#784008';
    // case 'JS': return '#a8a8a8';
    // case 'JW': return '#a8a8a8';
    // case 'JE': return '#a8a8a8';
    // case 'BP': return '#a8a8a8';
    // case 'SW': return '#a8a8a8';
    // case 'SE': return '#a8a8a8';
    // case 'PW': return '#a8a8a8';
    // case 'PE': return '#a8a8a8';
    default: return '#a8a8a8';
  }
};
