import React from 'react';

import '../styles/HeaderList.css';

import { ListItem } from './ListItem';

type HeaderListProps = {
  headers: string[];
  title: string;
  onClick: () => void;
}

const HeaderList = (props: HeaderListProps) => {
    const getListContainer = () => {
        if (!props?.headers || props?.headers?.length === 0) {
            return <></>;
        }

        return (
            <div className='header-list--container'>
                {props?.headers?.map((header, index) => <ListItem key={index} text={header} />)}
            </div>
        )
    }

    return (
        <div className='header-list' onClick={props.onClick}>
            <span className='header-list--title'>{props.title}</span>
            {getListContainer()}
        </div>
    );
}

export { HeaderList };