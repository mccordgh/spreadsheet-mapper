import React, { useState, ChangeEvent } from "react";
import { FileLoader } from "./components/FileLoader";
import { FileSaver } from "./components/FileSaver";
import { HeaderList } from "./components/HeaderList";
import { MappingsList } from "./components/MappingsList";

import { parse, ParseResult, LocalFile } from "papaparse";

import "./App.css";
import { MappingsContext } from "./context/MappingsContext";
import { HeadersContext } from "./context/HeadersContext";
import { HeaderItem } from "./models/HeaderItem";
import { HeaderMapping } from "./models/HeaderMapping";

// TODO: Remove when done testing
const dummyHeaderListFrom: HeaderItem[] = [
  { id: 0, text: "Token" },
  { id: 1, text: "Item Name" },
  { id: 2, text: "Variation Name" },
  { id: 3, text: "Unit and Precision" },
];
const dummyHeaderListTo: HeaderItem[] = [
  { id: 0, text: "Title" },
  { id: 1, text: "URL handle" },
  { id: 2, text: "Description" },
  { id: 3, text: "Vendor" },
  { id: 4, text: "Product category" },
];

function App() {
  // TODO: Reset initial value to '[]' when done testing
  const [headersFrom, setHeadersFrom] =
    useState<HeaderItem[]>(dummyHeaderListFrom);
  const [headersTo, setHeadersTo] = useState<HeaderItem[]>(dummyHeaderListTo);

  // Always want to have one blank or "new" mapping ready to go
  const [mappings, setMappings] = useState<HeaderMapping[]>([
    { id: 0, mapFromColumn: "", mapToColumn: "", confirmed: false },
  ]);

  const prepareHeaderItems = (fields: string[]): HeaderItem[] => {
    return fields.map((field, index) => ({ id: index, text: field }));
  };

  const parseFile = (
    event: ChangeEvent<HTMLInputElement>,
    type: "from" | "to"
  ): void => {
    if (event?.target?.files) {
      const file: File = event.target.files[0] as File;

      const config = {
        header: true,
        complete: (results: ParseResult<File>, file: LocalFile): void => {
          if (results?.meta?.fields) {
            console.log("Fields:", results.meta.fields);
            if (type === "from") {
              setHeadersFrom(prepareHeaderItems(results.meta.fields));
            } else {
              setHeadersTo(prepareHeaderItems(results.meta.fields));
            }
          }
          // console.log('Parsing complete:', results);
        },
        error: (error: unknown, file: LocalFile): void => {
          console.error("Error parsing file:", error);
        },
      };

      parse<File>(file, config);
    }
  };

  const confirmMapping = (id: number): void => {
    console.log("Confirming mapping:", id);
  };

  const deleteMapping = (id: number): void => {
    console.log("Deleting mapping:", id);
  };

  const canAddHeaders = (type: string): boolean => {
    const newMapping = mappings[mappings.length - 1];
    const headerField =
      type === "from" ? newMapping?.mapFromColumn : newMapping?.mapToColumn;

    return (
      headerField === undefined || headerField === null || headerField === ""
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
      newMapping.mapFromColumn = headerToAdd?.text ?? "";
    } else if (type === "to") {
      newMapping.mapToColumn = headerToAdd?.text ?? "";
    } else {
      throw new Error(`type not recognized: ${type}`);
    }

    newMappings[newMappings.length - 1] = newMapping;

    setMappings(newMappings);
  };

  return (
    <HeadersContext.Provider value={{ headersFrom, headersTo, headerClicked }}>
      <MappingsContext.Provider
        value={{ mappings, confirmMapping, deleteMapping }}
      >
        <div className="App">
          <header className="App-header">
            <h2>Spread Sheet Mapper</h2>
          </header>

          <div className="App-body">
            <div className="App-body-left">
              <FileLoader
                title="Load Columns From File"
                onFileLoad={(event: ChangeEvent<HTMLInputElement>) => {
                  parseFile(event, "from");
                }}
              />
              {headersFrom && headersFrom.length && (
                <>
                  <hr />
                  <HeaderList
                    title="Columns Mapping From:"
                    headers={headersFrom}
                    type="from"
                  />
                </>
              )}
            </div>

            <div className="App-body-center">
              <FileSaver title="New File To Save" />
              <hr />
              <MappingsList />
            </div>

            <div className="App-body-right">
              <FileLoader
                title="Load Columns To File"
                onFileLoad={(event: ChangeEvent<HTMLInputElement>) => {
                  parseFile(event, "to");
                }}
              />
              {headersTo && headersTo.length && (
                <>
                  <hr />
                  <HeaderList
                    title="Columns Mapping To:"
                    headers={headersTo}
                    type="to"
                  />
                </>
              )}
            </div>
          </div>

          <div className="App-footer">
            <p>
              Author: Matt McCord [
              <a href="mailto:mattm.eternal@gmail.com">
                mattm.eternal@gmail.com]
              </a>
            </p>
          </div>
        </div>
      </MappingsContext.Provider>
    </HeadersContext.Provider>
  );
}

export default App;
