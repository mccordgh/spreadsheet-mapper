import React from 'react';

import '../styles/ListItem.css';

type ListItemProps = {
    text?: string;
    onClick?: () => void;
}

const ListItem = (props: ListItemProps) => {
    const { onClick, text } = props;
  
    return (
        <div className='list-item' onClick={onClick}>
            <span>
                {text}
            </span>
        </div>
    );
}

export { ListItem };