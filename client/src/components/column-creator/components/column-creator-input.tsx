import React from 'react';
import CreatorInput from '../../primitives/creator-input';
import ColumnCreatorContainer from '../styled/column-creator-container';

type Props = {
  onCreateList: (name: string) => void;
};

function ColumnCreatorInput({ onCreateList }: Props) {
  return (
    <ColumnCreatorContainer className="column-creator-container">
      <CreatorInput onSubmit={onCreateList} />
    </ColumnCreatorContainer>
  );
}

export default ColumnCreatorInput;
