import { ChangeEvent, useContext } from "react";
import { FileLoader } from "../FileLoader";
import { FileSaver } from "../FileSaver";
import { HeaderList } from "../HeaderList";
import { MappingsList } from "../MappingsList";
import { HeadersContext } from "../../context/HeadersContext";

const Body = () => {
  const { headersFrom, headersTo } = useContext(HeadersContext);
  return (
    <div className="App-body">
      <div className="App-body-left">
        <FileLoader title="Load Columns From File" type="from" />
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
        <FileLoader title="Load Columns To File" type="to" />
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
  );
};

export default Body;
