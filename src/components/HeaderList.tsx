import React from 'react';

import '../styles/HeaderList.css';

import { ListItem } from './ListItem';
import { HeaderItem } from '../models/HeaderItem';

type HeaderListProps = {
  headers: HeaderItem[];
  title: string;
  type: 'from' | 'to';
//   onClick: (id: number, type: 'from' | 'to') => void;
}

const HeaderList = (props: HeaderListProps) => {
    const { headers, title, type } = props;

    const getListContainer = () => {
        if (!headers || headers?.length === 0) {
            return <></>;
        }

        return (
            <div className='header-list--container'>
                {headers?.map((header, index) => <ListItem key={index} type={type} header={header} />)}
            </div>
        )
    }

    return (
        <div className='header-list'>
            <span className='header-list--title'>{title}</span>
            {getListContainer()}
        </div>
    );
}

export { HeaderList };