import React from 'react';

import '../styles/ListItem.css';
import { HeaderItem } from '../models/HeaderItem';

type ListItemProps = {
    header: HeaderItem;
    type: 'from' | 'to';
    // onClick: (id: number, type: 'from' | 'to') => void;
}

const ListItem = (props: ListItemProps) => {
    const { header, type } = props;
  
    // onClick(header.id, type)
    return (
        <div className='list-item' onClick={() => { console.log("get onClick from context type: ", type) }}>
            <span>
                {header.text}
            </span>
        </div>
    );
}

export { ListItem };