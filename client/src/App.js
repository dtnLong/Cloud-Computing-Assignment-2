import React from 'react';
import './App.css';
import VietnamSummary from './components/vietnam_summary/vietnam_summary';
import WorldSummary from './components/world_summary/world_summary';
import WorldTable from './components/world_table/world_table';
import VietnamTable from './components/vietnam_table/vietnam_table';

function App() {
  return (
    <div className="App">
      <WorldSummary />
      <VietnamSummary />
      <WorldTable />
      <VietnamTable />
    </div>
  );
}

export default App;
