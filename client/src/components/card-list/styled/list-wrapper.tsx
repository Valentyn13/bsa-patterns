import { colors } from '@atlaskit/theme';
import styled from '@emotion/styled';
import type { DroppableProvidedProps } from '@hello-pangea/dnd';

import { SPACE_IN_PX } from '../../../common/constants';

const getBackgroundColor = (
  isDraggingOver: boolean,
  isDraggingFrom: boolean,
): string => {
  if (isDraggingOver) {
    return colors.R50;
  }

  if (isDraggingFrom) {
    return colors.T50;
  }

  return colors.N30;
};

type Props = DroppableProvidedProps & {
  isDraggingOver: boolean;
  isDraggingFrom: boolean;
};

const ListWrapper = styled.div<Props>`
  background-color: ${(props) => getBackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
  display: flex;
  flex-direction: column;
  opacity: inherit;
  padding: ${SPACE_IN_PX}px;
  border: ${SPACE_IN_PX}px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 300px;
`;

export default ListWrapper;
