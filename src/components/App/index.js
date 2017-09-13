import React from 'react';
import ItemCreator from '../Item/ItemCreator';
import ItemsList from '../ItemsList';
import './styles.css';

const App = () => (
  <div className="app">
    <div>
      <ItemCreator />
      <ItemsList />
    </div>
  </div>
);

export default App;
