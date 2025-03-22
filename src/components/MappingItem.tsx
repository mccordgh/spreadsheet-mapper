import React, { useContext } from 'react';

import '../styles/MappingItem.css';

import { Button } from './Button';
import { MappingsContext, MappingsContextType } from '../context/MappingsContext';
import { HeaderMapping } from '../models/HeaderMapping';

type MappingItemProps = {
    headerMapping: HeaderMapping;
}

const MappingItem = (props: MappingItemProps) => {
    const { confirmMapping, deleteMapping } = useContext<MappingsContextType>(MappingsContext);
    const { mapFromColumn, mapToColumn, confirmed, id } = props?.headerMapping;

    const iconName = confirmed ? 'x' : 'checkmark';
    
    const onClickCallback = () => {
        if (confirmed) {
            deleteMapping(id);
        } else {
            confirmMapping(id);
        }
    }

    return (
        <div className='mapping-item-wrapper'>
            <div className='mapping-item mapping-item-from'>
                {mapFromColumn}
            </div>
            
            <div className='mapping-item mapping-item-arrow'>
                &rarr;
            </div>
            
            <div className='mapping-item mapping-item-to'>
                {mapToColumn}
            </div>

            <Button icon={iconName} onClick={onClickCallback} />
        </div>
    );
}

export { MappingItem };