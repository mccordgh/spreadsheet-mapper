import React from 'react';

import { Button } from './components/Button';
import { ListItem } from './components/ListItem';
import { MappingItem } from './components/MappingItem';
import { TextBox } from './components/TextBox';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Spread Sheet Mapper</h2>
      </header>

      <div className="App-body">
        <TextBox />
        <Button />
        <ListItem />
        <MappingItem />
      </div>

      <div className="App-footer">
        <p>Author: Matt McCord [<a href="mailto:mattm.eternal@gmail.com">mattm.eternal@gmail.com]</a></p>
      </div>
    </div>
  );
}

export default App;
