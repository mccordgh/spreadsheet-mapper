import React from 'react';

type ListItemProps = {
  text?: string;
  onClick?: () => void;
}

const ListItem = (props: ListItemProps) => {
  return <div className='list-item' onClick={props.onClick}>
    <span>
      {props.text}
    </span>
  </div>;
}

export { ListItem };