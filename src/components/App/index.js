import React from 'react';
import ItemCreator from '../Item/ItemCreator';
import ItemsList from '../ItemsList';
import './styles.css';

export const App = () => (
  <div className="app">
    <ItemCreator />
    <ItemsList />
  </div>
);

export default App;
