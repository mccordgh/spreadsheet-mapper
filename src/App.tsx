import React, { ChangeEvent } from 'react';
import { FileLoader } from './components/FileLoader';
import { HeaderList } from './components/HeaderList';

import { parse, ParseResult, LocalFile } from 'papaparse';

import './App.css';

// TODO: Remove when done testing
const dummyHeaderListA: string[] = ['Token', 'Item Name', 'Variation Name', 'Unit and Precision', 'SKU', 'Description', 'Reporting Category', 'SEO Title', 'SEO Description', 'Permalink', 'GTIN', 'Square Online Item Visibility', 'Item Type', 'Weight (lb)', 'Social Media Link Title', 'Social Media Link Description', 'Shipping Enabled', 'Self-serve Ordering Enabled', 'Delivery Enabled', 'Pickup Enabled', 'Price', 'Online Sale Price', 'Archived', 'Sellable', 'Stockable', 'Skip Detail Screen in POS', 'Option Name 1', 'Option Value 1', 'Option Name 2', 'Option Value 2', 'Option Name 3', 'Option Value 3', 'Default Unit Cost', 'Default Vendor Name', 'Default Vendor Code', 'Current Quantity Erdé', 'New Quantity Erdé', 'Stock Alert Enabled Erdé', 'Stock Alert Count Erdé'];
const dummyHeaderListB: string[] = ['Title', 'URL handle', 'Description', 'Vendor', 'Product category', 'Type', 'Tags', 'Published on online store', 'Status', 'SKU', 'Barcode', 'Option1 name', 'Option1 value', 'Option2 name', 'Option2 value', 'Option3 name', 'Option3 value', 'Price', 'Price / International', 'Compare-at price', 'Compare-at price / International', 'Cost per item', 'Charge tax', 'Tax code', 'Inventory tracker', 'Inventory quantity', 'Continue selling when out of stock', 'Weight value (grams)', 'Weight unit for display', 'Requires shipping', 'Fulfillment service', 'Product image URL', 'Image position', 'Image alt text', 'Variant image URL', 'Gift card', 'SEO title', 'SEO description', 'Google Shopping / Google product category', 'Google Shopping / Gender', 'Google Shopping / Age group', 'Google Shopping / MPN', 'Google Shopping / AdWords Grouping', 'Google Shopping / AdWords labels', 'Google Shopping / Condition', 'Google Shopping / Custom product', 'Google Shopping / Custom label 0', 'Google Shopping / Custom label 1', 'Google Shopping / Custom label 2', 'Google Shopping / Custom label 3', 'Google Shopping / Custom label 4'];

function App() {
  // TODO: Reset initial value to '[]' when done testing
  const [headerListA, setHeaderListA] = React.useState<string[]>(dummyHeaderListA);
  const [headerListB, setHeaderListB] = React.useState<string[]>(dummyHeaderListB);

  const onFileLoad = (event: ChangeEvent<HTMLInputElement>, callback: (fields: string[]) => void): void => {
    if (event?.target?.files) {
      const file: File = (event.target.files[0] as File);

      const config = {
        header: true,
        complete: (results: ParseResult<File>, file: LocalFile): void => {
          if (results?.meta?.fields) {
            console.log('Fields:', results.meta.fields);
            callback(results.meta.fields);
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
          <FileLoader title="Load File A" onFileLoad={(event: ChangeEvent<HTMLInputElement>) => { onFileLoad(event, setHeaderListA) }}/>
          <hr />
          <HeaderList title="Columns in File A:" headers={headerListA} onClick={() => { console.log('header list A clicked'); }}/>
        </div>
        
        <div className="App-body-center">
          {/* <FileSaver title="Save New File"/> */}
        </div>

        <div className="App-body-right">
          <FileLoader title="Load File B" onFileLoad={(event: ChangeEvent<HTMLInputElement>) => { onFileLoad(event, setHeaderListB) }}/>
            <hr />
          <HeaderList title="Columns in File B:" headers={headerListB} onClick={() => { console.log('header list B clicked'); }}/>
        </div>
      </div>

      <div className="App-footer">
        <p>Author: Matt McCord [<a href="mailto:mattm.eternal@gmail.com">mattm.eternal@gmail.com]</a></p>
      </div>
    </div>
  );
}

export default App;
