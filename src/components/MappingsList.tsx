import React from 'react';

import '../styles/MappingsList.css';

import { MappingItem } from './MappingItem';

type MappingsListProps = {
  title: string;
}

export type HeaderMapping = {
    mapFromColumn: string;
    mapToColumn: string;
}

const dummyMapping: HeaderMapping[] = [
    { mapFromColumn: 'Item', mapToColumn: 'Product' },
    { mapFromColumn: 'Date', mapToColumn: 'Time' },
    { mapFromColumn: 'One Thing', mapToColumn: 'Another' },
];

const MappingsList = (props: MappingsListProps) => {
    // Always want to have one blank or "new" mapping ready to go
    // TODO: Remove dummy data when done styling and testing
    const [mappings, setMappings] = React.useState<HeaderMapping[]>(dummyMapping);

    const getListContainer = () => {
        if (mappings?.length === 0) {
            return <></>;
        }

        return (
            <div className='mappings-list--items'>
                {mappings.map((mapping: HeaderMapping, index) => <MappingItem key={index} headerMapping={mapping} />)}
            </div>
        )
    }

    return (
        <div className='mappings-list'>
            <span className='mappings-list--title'>{props.title}</span>
            {getListContainer()}
        </div>
    );
}

export { MappingsList };