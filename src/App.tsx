import React, { useState, ChangeEvent } from "react";
import { FileLoader } from "./components/FileLoader";
import { FileSaver } from "./components/FileSaver";
import { HeaderList } from "./components/HeaderList";
import { MappingsList } from "./components/MappingsList";

// import { parse, ParseResult, LocalFile } from "papaparse";

import "./styles/App.css";
import { MappingsContext } from "./context/MappingsContext";
import { HeadersContext } from "./context/HeadersContext";
import { HeaderItem } from "./models/HeaderItem";
import { HeaderMapping } from "./models/HeaderMapping";
import { CsvHelper } from "./helpers/CsvHelper";
import { LocalFile, ParseResult } from "papaparse";
import Footer from "./components/sections/Footer";
import Header from "./components/sections/Header";
import Body from "./components/sections/Body";
import LoadingOverlay from "./components/sections/LoadingOverlay";
import { FileContext } from "./context/FileContext";

// TODO: Remove when done testing
// const dummyHeaderListFrom: HeaderItem[] = [
//   { id: 0, text: "Item Name" },
//   { id: 1, text: "Token" },
//   { id: 2, text: "Unit and Precision" },
//   { id: 3, text: "Variation Name" },
// ];
// const dummyHeaderListTo: HeaderItem[] = [
//   { id: 0, text: "Description" },
//   { id: 1, text: "Product category" },
//   { id: 2, text: "Title" },
//   { id: 3, text: "URL handle" },
//   { id: 4, text: "Vendor" },
// ];

function App() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [headersFrom, setHeadersFrom] = useState<HeaderItem[]>([]);
  const [headersTo, setHeadersTo] = useState<HeaderItem[]>([]);

  const createEmptyMapping = (id: number): HeaderMapping => ({
    id,
    mapFromColumn: { id: -1, text: "" },
    mapToColumn: { id: -1, text: "" },
    confirmed: false,
  });

  const createHeader = (id: number, text: string): HeaderItem => {
    return { id, text };
  };

  // Always want to have one blank or "new" mapping ready to go
  const [mappings, setMappings] = useState<HeaderMapping[]>([
    createEmptyMapping(0),
  ]);

  const updateMappings = (mappings: HeaderMapping[]): void => {
    mappings = mappings.map((mapping, index) => {
      mapping.id = index;
      return mapping;
    });

    setMappings(mappings);
  };

  const confirmMapping = (id: number): void => {
    const newMappings = Array.from(mappings);
    const found = newMappings.find((mapping) => mapping.id === id);

    if (found) {
      found.confirmed = true;
    }

    newMappings.push(createEmptyMapping(newMappings.length));
    updateMappings(newMappings);
  };

  const sortHeaders = (headers: HeaderItem[]): HeaderItem[] => {
    return [...headers].sort((headerA, headerB) =>
      headerA.text.localeCompare(headerB.text)
    );
  };

  const deleteMapping = (id: number): void => {
    let newMappings = Array.from(mappings);
    const foundMapping = newMappings.find((mapping) => mapping.id === id);

    if (!foundMapping) {
      return;
    }

    const mappingsLen = newMappings.length;
    newMappings = newMappings.filter((mapping) => mapping.id !== id);

    // Check if mapping was found and deleted
    if (newMappings.length !== mappingsLen) {
      let newHeadersFrom = Array.from(headersFrom);
      let newHeadersTo = Array.from(headersTo);

      newHeadersFrom.push(createHeader(0, foundMapping?.mapFromColumn?.text));
      newHeadersTo.push(createHeader(0, foundMapping?.mapToColumn?.text));

      newHeadersFrom = sortHeaders(newHeadersFrom);
      newHeadersTo = sortHeaders(newHeadersTo);

      updateMappings(newMappings);
      setHeadersFrom(newHeadersFrom);
      setHeadersTo(newHeadersTo);
    }
  };

  const canAddHeaders = (type: string): boolean => {
    const newMapping = mappings[mappings.length - 1];
    const headerField =
      type === "from" ? newMapping?.mapFromColumn : newMapping?.mapToColumn;

    return (
      headerField === undefined ||
      headerField === null ||
      headerField.text === ""
    );
  };

  const headerClicked = (id: number, type: "from" | "to"): void => {
    if (!canAddHeaders(type)) {
      console.log(`Cannot add more headers to "${type}" field`);
      return;
    }

    const newMappings = Array.from(mappings);
    const newMapping = newMappings[newMappings.length - 1];
    const headerFields = type === "from" ? headersFrom : headersTo;
    const headerToAdd = headerFields.find((field) => field.id === id);

    if (type === "from") {
      newMapping.mapFromColumn.id = id;
      newMapping.mapFromColumn.text = headerToAdd?.text ?? "";
      const headers = headersFrom.filter((header) => header.id !== id);
      setHeadersFrom(headers);
    } else if (type === "to") {
      newMapping.mapToColumn.id = id;
      newMapping.mapToColumn.text = headerToAdd?.text ?? "";
      const headers = headersTo.filter((header) => header.id !== id);
      setHeadersTo(headers);
    } else {
      throw new Error(`type not recognized: ${type}`);
    }

    newMappings[newMappings.length - 1] = newMapping;
    updateMappings(newMappings);
  };

  const onFileLoad = (
    event: ChangeEvent<HTMLInputElement>,
    type: "from" | "to"
  ) => {
    const completionCallback = (
      results: ParseResult<File>,
      file: LocalFile
    ): void => {
      if (results?.meta?.fields) {
        let preparedFields: HeaderItem[] = CsvHelper.prepareHeaderItems(
          results.meta.fields
        );

        preparedFields = sortHeaders(preparedFields);

        if (type === "from") {
          setHeadersFrom(preparedFields);
        } else if (type === "to") {
          setHeadersTo(preparedFields);
        } else {
          throw new Error(`unknown header type: ${type}`);
        }
      }
    };

    CsvHelper.parseFile(event, type, completionCallback);
  };

  const onFileSave = (): void => {
    setShowOverlay(true);
  };

  return (
    <HeadersContext.Provider value={{ headersFrom, headersTo, headerClicked }}>
      <MappingsContext.Provider
        value={{ mappings, confirmMapping, deleteMapping }}
      >
        <FileContext.Provider value={{ onFileLoad, onFileSave }}>
          <div className="App">
            {showOverlay && <LoadingOverlay />}

            <Header />
            <Body />
            <Footer />
          </div>
        </FileContext.Provider>
      </MappingsContext.Provider>
    </HeadersContext.Provider>
  );
}

export default App;
