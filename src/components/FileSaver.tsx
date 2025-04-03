import React, { ChangeEvent } from "react";

import "../styles/FileSaver.css";

type FileSaverProps = {
  title: string;
};

const FileSaver = (props: FileSaverProps) => {
  return (
    <div className="file-saver--wrapper">
      <label
        className="file-saver--header"
        htmlFor={`file-saver-${props.title}`}
      >
        {props.title}
      </label>
      {/* <input className="file-saver--text" id={`file-saver-${props.title}`} onChange={props.onFileLoad} /> */}
    </div>
  );
};

export { FileSaver };
