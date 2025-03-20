import React, { ChangeEvent } from 'react';
import { FileLoader } from './components/FileLoader';
import { HeaderList } from './components/HeaderList';

import { parse, ParseResult, LocalFile } from 'papaparse';

import './App.css';


function App() {
  const [headerListA, setHeaderListA] = React.useState<string[]>([]);
  const [headerListB, setHeaderListB] = React.useState<string[]>([]);

  const onFileLoad = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event?.target?.files) {
      const file: File = (event.target.files[0] as File);

      const config = {
        header: true,
        complete: (results: ParseResult<File>, file: LocalFile): void => {
          if (results?.meta?.fields) {
            console.log('Fields:', results.meta.fields);
            setHeaderListA(results.meta.fields);
          }
          // console.log('Parsing complete:', results);
        },
        error: (error: unknown, file: LocalFile): void => {
          console.error('Error parsing file:', error);
        },
      }
  
      parse<File>(file, config);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Spread Sheet Mapper</h2>
      </header>

      <div className="App-body">
        <div className="App-body-left">
          <FileLoader title="Load File A" onFileLoad={onFileLoad}/>
          <hr />
          <HeaderList title="Columns in File A:" headers={headerListA} onClick={() => { console.log('header list clicked'); }}/>
        </div>
        
        <div className="App-body-center">
          {/* <FileSaver title="Save New File"/> */}
        </div>

        <div className="App-body-right">
          <FileLoader title="Load File B" onFileLoad={onFileLoad}/>
        </div>
      </div>

      <div className="App-footer">
        <p>Author: Matt McCord [<a href="mailto:mattm.eternal@gmail.com">mattm.eternal@gmail.com]</a></p>
      </div>
    </div>
  );
}

export default App;
