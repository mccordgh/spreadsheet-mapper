import React, { ChangeEvent } from 'react';

import "../styles/FileLoader.css";

type FileLoaderProps = {
    title: string;
    onFileLoad: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileLoader = (props: FileLoaderProps) => {
  return (
    <div className="file-loader--wrapper">
        <label className="file-loader--header" htmlFor={`file-loader-${props.title}`}>
            {props.title}
        </label>
        <input className="file-loader--button" type="file" id={`file-loader-${props.title}`} onChange={props.onFileLoad} />
    </div>
  );
}

export { FileLoader };