import styled from 'styled-components';
import { List, ListItem, ListItemText } from '@material-ui/core';

export const Container = styled.div`
  border-left: 4px solid ${props => props.expanded ? '#ccc' : 'transparent'};
  ${props => props.expanded && 'background-color: #f1f1f1;'}
`;

export const ExpandableHeader = styled(ListItemText)`
  & > span {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const StepsContainer = styled(List)`
  && {
    border-top: 1px solid #c8c8c8;
    margin-left: 16px;
    padding-bottom: 32px;
  }
`;

export const Option = styled(ListItem)`
`;

export const LineOverview = styled.div`
  display: flex;
  overflow: scroll;
  position: relative;
`;

export const StopOverview = styled.div`
  font-size: 12px;
  line-height: 1em;
  color: #555;
  text-align: right;
  white-space: nowrap;
`;
