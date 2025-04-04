import React, { ChangeEvent, useContext } from "react";

import "../styles/components/FileLoader.css";
import { FileContext } from "../context/FileContext";

type FileLoaderProps = {
  title: string;
  type: "from" | "to";
};

const FileLoader = (props: FileLoaderProps) => {
  const { onFileLoad } = useContext(FileContext);
  const { title, type } = props;
  return (
    <div className="file-loader--wrapper">
      <label className="file-loader--header" htmlFor={`file-loader-${title}`}>
        {title}
      </label>
      <input
        className="file-loader--button"
        type="file"
        id={`file-loader-${title}`}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onFileLoad(event, type);
        }}
      />
    </div>
  );
};

export { FileLoader };
