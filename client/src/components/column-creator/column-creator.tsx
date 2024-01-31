import React from 'react';
import ColumnCreatorInput from './components/column-creator-input';
import Container from './styled/container';

type Props = {
  onCreateList: (name: string) => void;
};

function ColumnCreator({ onCreateList }: Props) {
  return (
    <Container>
      <ColumnCreatorInput onCreateList={onCreateList} />
    </Container>
  );
}

export default ColumnCreator;
