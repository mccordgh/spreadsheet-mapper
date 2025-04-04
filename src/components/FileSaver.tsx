import React, { ChangeEvent, useContext } from "react";

import "../styles/components/FileSaver.css";
import { CsvHelper } from "../helpers/CsvHelper";
import { FileContext } from "../context/FileContext";

type FileSaverProps = {
  title: string;
};

const FileSaver = (props: FileSaverProps) => {
  const { title } = props;
  const { onFileSave } = useContext(FileContext);
  // const data = [
  //   { name: "Alfreds Futterkiste", city: "Berlin", country: "Germany" },
  //   {
  //     name: "Centro comercial Moctezuma",
  //     city: "Mexico City",
  //     country: "Mexico",
  //   },
  //   { name: "Ernst Handel", city: "Graz", country: "Austria" },
  // ];

  // const fileName = "mapped-data";

  // const downloadFile = () => {
  //   const csvData = CsvHelper.prepareCsvData(data);
  //   const blob = new Blob([csvData], { type: "text/csv" });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = `${fileName}.csv`;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <div className="file-saver--wrapper">
      <label className="file-saver--header" htmlFor="file-saver--button">
        {title}
      </label>
      <button id="file-saver--button" onClick={onFileSave}>
        Download CSV
      </button>
    </div>
  );
};

export { FileSaver };
