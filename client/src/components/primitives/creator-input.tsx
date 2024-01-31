import React, { useState } from 'react';

import AddButton from './add-button';
import Input from './styled/input';

type Props = {
  onSubmit: (value: string) => void;
};

function CreatorInput({ onSubmit }: Props) {
  const [name, setName] = useState('');

  const onClick = () => {
    setName('');
    onSubmit(name);
  };

  return (
    <>
      <Input
        className="creator-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fontSize="medium"
        width={250}
      />
      <AddButton onClick={onClick} />
    </>
  );
}

export default CreatorInput;
