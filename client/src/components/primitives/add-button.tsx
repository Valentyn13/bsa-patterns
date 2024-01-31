import React from 'react';
import Icon from '../icon/icon';
import Button from './styled/button';

type Props = {
  onClick: () => void;
};

function AddButton({ onClick }: Props) {
  return (
    <Button className="add-btn" onClick={onClick}>
      <Icon iconName="add" />
    </Button>
  );
}

export default AddButton;
