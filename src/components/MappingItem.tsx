import React from 'react';

import '../styles/MappingItem.css';

import { Button } from './Button';
import { HeaderMapping } from './MappingsList';

type MappingItemProps = {
    headerMapping: HeaderMapping
}

const MappingItem = (props: MappingItemProps) => {
    const { mapFromColumn, mapToColumn } = props.headerMapping;
    
    return (
        <div className='mapping-item-wrapper'>
            <div className='mapping-item-from'>
                {mapFromColumn}
            </div>
            
            <div className='mapping-item-arrow'>
                &rarr;
            </div>
            
            <div className='mapping-item-to'>
                {mapToColumn}
            </div>

            <Button icon='checkmark' onClick={() => console.log('checkmark')} />
        </div>
    );
}

export { MappingItem };