import { ChangeEvent, useContext, useEffect, useState } from 'react';

import { useComponentVisible } from '../../hooks/useComponentVisible';
import { BasicTitle } from './styled/basic-title';
import { TitleContainer } from './styled/title-container';
import { TitleInput } from './styled/title-input';
import { SocketContext } from '../../context/socket';
import { ListEvent } from '../../common/enums';

type Props = {
  fontSize: "x-large" | "large" | "medium";
  isBold?: boolean;
  title: string;
  width?: number;
  listId:string
  onChange: (title:string) => void;
};

export const Title = ({ onChange, title, fontSize, isBold, listId, width }: Props) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const socket = useContext(SocketContext)

  const [value, setValue] = useState(title);

  useEffect(() => setValue(title), [title]);

  const handleEnterKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) =>{
    if(e.key ==='Enter'){
      onChange(value)
      e.currentTarget.blur()
    }
  }
  const handleOnBlur = () =>{
    setIsComponentVisible(false)
  }

  const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <TitleContainer className="title-container" ref={ref}>
      {isComponentVisible ? (
        <TitleInput
          className="title-input"
          value={value}
          onChange={onEdit}
          onBlur={handleOnBlur}
          onKeyDown={handleEnterKeyDown}
          fontSize={fontSize}
          isBold={isBold}
          autoFocus={isComponentVisible}
          width={width ?? 250}
        />
      ) : (
        <BasicTitle
          className="title-content"
          onClick={() => setIsComponentVisible(true)}
        >
          {value}
        </BasicTitle>
      )}
    </TitleContainer>
  );
};
